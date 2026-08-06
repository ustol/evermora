import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getCurrentProfile } from "@/lib/auth-profile";

export async function POST(req: NextRequest) {
  const current = await getCurrentProfile();
  if (!current) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!current.profile) {
    return NextResponse.json({ error: "Profile is required to upload photos" }, { status: 409 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const memorialId = formData.get("memorialId") as string | null;

  if (!file || !memorialId) {
    return NextResponse.json({ error: "Missing file or memorialId" }, { status: 400 });
  }

  // Verify ownership
  const { data: memorial } = await current.supabase
    .from("memorials")
    .select("owner_id")
    .eq("id", memorialId)
    .maybeSingle();
  if (!memorial || !current.ownerIds.includes(memorial.owner_id)) {
    return NextResponse.json({ error: "Not your memorial" }, { status: 403 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${memorialId}/${current.profile.id}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from("memorial-media")
    .upload(path, buffer, { upsert: true, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: insertError } = await admin.from("memorial_media").insert({
    memorial_id: memorialId,
    uploaded_by: current.profile.id,
    storage_path: path,
    moderation_status: "approved",
  });

  if (insertError) {
    // Clean up the uploaded file
    await admin.storage.from("memorial-media").remove([path]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
