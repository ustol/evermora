import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const memorialId = formData.get("memorialId") as string | null;

  if (!file || !memorialId) {
    return NextResponse.json({ error: "Missing file or memorialId" }, { status: 400 });
  }

  // Verify ownership
  const { data: memorial } = await supabase
    .from("memorials")
    .select("owner_id")
    .eq("id", memorialId)
    .maybeSingle();
  if (!memorial || memorial.owner_id !== user.id) {
    return NextResponse.json({ error: "Not your memorial" }, { status: 403 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${memorialId}/${user.id}/${crypto.randomUUID()}.${ext}`;
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
    uploaded_by: user.id,
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
