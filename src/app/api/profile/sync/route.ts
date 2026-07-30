import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { syncProfileForUser } from "@/lib/profile-resolver";

export async function POST() {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await syncProfileForUser(createAdminClient(), user);
    return NextResponse.json({ ok: true, profile });
  } catch (error) {
    console.error("profile sync failed", error);
    return NextResponse.json({ error: "Profile sync failed" }, { status: 500 });
  }
}
