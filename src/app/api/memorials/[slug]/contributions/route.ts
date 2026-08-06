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
type ContributionType = Database["public"]["Enums"]["contribution_type"];

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
  if (!(value instanceof File) || value.size === 0) return null;
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

async function uploadContributionPhoto({
  admin,
  memorialId,
  uploaderProfileId,
  file,
  requireApproval,
}: {
  admin: AdminClient;
  memorialId: string;
  uploaderProfileId: string | null;
  file: File;
  requireApproval: boolean;
}) {
  const extension = EXTENSIONS_BY_TYPE[file.type] ?? "jpg";
  const uploaderSegment = uploaderProfileId ?? "anonymous";
  const storagePath = `${memorialId}/${uploaderSegment}/tributes/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await admin.storage
    .from("memorial-media")
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) throw uploadError;

  const { data: media, error: mediaError } = await admin
    .from("memorial_media")
    .insert({
      memorial_id: memorialId,
      uploaded_by: uploaderProfileId,
      storage_path: storagePath,
      moderation_status: requireApproval ? "pending" : "approved",
    })
    .select("id")
    .single();

  if (mediaError) {
    await admin.storage.from("memorial-media").remove([storagePath]);
    throw mediaError;
  }

  return { mediaId: media.id, storagePath };
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const admin = createAdminClient();

  try {
    assertPublicSubmissionAllowed(request);

    const formData = await request.formData();
    const requestedType = cleanText(formData.get("type"), 24);
    const type: ContributionType = requestedType === "condolence" ? "condolence" : "tribute";
    const authorName = cleanText(formData.get("authorName"), 120);
    const relationship = cleanText(formData.get("relationship"), 120);
    const message = cleanText(formData.get("message"), 4000);
    const photo = getPhoto(formData);

    if (!message && !photo) {
      throw new PublicSubmissionError("Please add a message or a photo.");
    }

    const { data: memorial, error: memorialError } = await admin
      .from("memorials")
      .select("id, status, privacy, admin_suspended, allow_tributes, allow_condolences, require_approval")
      .eq("slug", slug)
      .maybeSingle();

    if (memorialError) throw memorialError;
    if (!memorial || memorial.status !== "published" || memorial.admin_suspended || !["public", "unlisted"].includes(memorial.privacy)) {
      return jsonError("This memorial is not accepting public submissions.", 404);
    }
    if ((type === "tribute" && !memorial.allow_tributes) || (type === "condolence" && !memorial.allow_condolences)) {
      throw new PublicSubmissionError("This memorial is not accepting that type of message.");
    }

    const profile = await getOptionalProfile(admin);
    const displayName = authorName || (profile ? null : "Anonymous visitor");
    const uploaderProfileId = profile?.id ?? null;
    let uploadedPhoto: { mediaId: string; storagePath: string } | null = null;

    if (photo) {
      uploadedPhoto = await uploadContributionPhoto({
        admin,
        memorialId: memorial.id,
        uploaderProfileId,
        file: photo,
        requireApproval: memorial.require_approval,
      });
    }

    const { error: insertError } = await admin.from("contributions").insert({
      memorial_id: memorial.id,
      author_id: profile?.id ?? null,
      author_name: displayName,
      type,
      relationship: relationship || null,
      message: message || "Shared a photo.",
      photo_media_id: uploadedPhoto?.mediaId ?? null,
      status: memorial.require_approval ? "pending" : "approved",
    });

    if (insertError) {
      if (uploadedPhoto) {
        await admin.from("memorial_media").delete().eq("id", uploadedPhoto.mediaId);
        await admin.storage.from("memorial-media").remove([uploadedPhoto.storagePath]);
      }
      throw insertError;
    }

    return NextResponse.json({
      ok: true,
      pending: memorial.require_approval,
      message: memorial.require_approval
        ? "Thank you — your message has been sent for review."
        : "Thank you — your message has been added.",
    });
  } catch (error) {
    console.error("Public contribution submit failed", error);
    const safeError = getSafePublicError(error);
    return jsonError(safeError.message, safeError.status);
  }
}
