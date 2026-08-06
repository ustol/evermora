import { NextResponse, type NextRequest } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { resolveProfileForUser } from "@/lib/profile-resolver";
import {
  assertPublicSubmissionAllowed,
  getSafePublicError,
  PublicSubmissionError,
} from "@/lib/public-submission-guard";
import type { Database } from "@/types/supabase";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const EXTENSIONS_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type AdminClient = SupabaseClient<Database>;

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function getPhoto(formData: FormData) {
  const value = formData.get("photo");
  if (!(value instanceof File) || value.size === 0) {
    throw new PublicSubmissionError("Please choose a photo to upload.");
  }
  if (!ALLOWED_TYPES.has(value.type)) {
    throw new PublicSubmissionError("Please choose a JPEG, PNG, or WebP image.");
  }
  if (value.size > MAX_FILE_SIZE) {
    throw new PublicSubmissionError("That image is larger than 8MB. Please choose a smaller file.", 413);
  }
  return value;
}

async function getOptionalProfile(admin: AdminClient) {
  const serverSupabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  if (!user) return null;
  return resolveProfileForUser(admin, user);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const admin = createAdminClient();

  try {
    assertPublicSubmissionAllowed(request);

    const formData = await request.formData();
    const photo = getPhoto(formData);
    const caption = cleanText(formData.get("caption"), 280);

    const { data: memorial, error: memorialError } = await admin
      .from("memorials")
      .select("id, status, privacy, admin_suspended, allow_contributor_photos, require_approval")
      .eq("slug", slug)
      .maybeSingle();

    if (memorialError) throw memorialError;
    if (!memorial || memorial.status !== "published" || memorial.admin_suspended || !["public", "unlisted"].includes(memorial.privacy)) {
      return jsonError("This memorial is not accepting public photo submissions.", 404);
    }
    if (!memorial.allow_contributor_photos) {
      throw new PublicSubmissionError("This memorial is not accepting gallery photos.");
    }

    const profile = await getOptionalProfile(admin);
    const uploaderProfileId = profile?.id ?? null;
    const uploaderSegment = uploaderProfileId ?? "anonymous";
    const extension = EXTENSIONS_BY_TYPE[photo.type] ?? "jpg";
    const storagePath = `${memorial.id}/${uploaderSegment}/gallery/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await admin.storage
      .from("memorial-media")
      .upload(storagePath, photo, { contentType: photo.type, upsert: false });

    if (uploadError) throw uploadError;

    const { error: insertError } = await admin.from("memorial_media").insert({
      memorial_id: memorial.id,
      uploaded_by: uploaderProfileId,
      storage_path: storagePath,
      caption: caption || null,
      moderation_status: memorial.require_approval ? "pending" : "approved",
    });

    if (insertError) {
      await admin.storage.from("memorial-media").remove([storagePath]);
      throw insertError;
    }

    return NextResponse.json({
      ok: true,
      pending: memorial.require_approval,
      message: memorial.require_approval
        ? "Thank you — your photo has been sent for review."
        : "Thank you — your photo is now in the gallery.",
    });
  } catch (error) {
    console.error("Public photo upload failed", error);
    const safeError = getSafePublicError(error);
    return jsonError(safeError.message, safeError.status);
  }
}
