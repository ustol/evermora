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
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() ?? "png";
  const filePath = `avatars/${user.id}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from("profile-images")
    .upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: { publicUrl } } = admin.storage.from("profile-images").getPublicUrl(filePath);

  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: publicUrl },
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Keep profiles.avatar_url in sync so public surfaces (blog author
  // avatars, tribute authors) can read the photo via public_profiles
  // without needing the auth session's user_metadata.
  const { data: matched, error: profileError } = await admin
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("clerk_user_id", user.id)
    .select("id");
  if (profileError) {
    console.error("profile avatar sync failed", profileError);
  } else if (!matched || matched.length === 0) {
    // No profiles row yet (e.g. upload before the first profile sync).
    // The next syncProfileForUser call picks avatar_url up from the auth
    // user_metadata we just wrote, so this is non-fatal.
    console.warn("profile avatar sync: no profiles row for clerk_user_id", user.id);
  }

  return NextResponse.json({ ok: true, avatar_url: publicUrl, user: updatedUser.user });
}
