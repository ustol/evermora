import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const displayName = user?.fullName ?? user?.username ?? user?.firstName ?? "Akornafa user";

  const supabase = await createServerSupabaseClient();

  // `authenticated` only has UPDATE on a fixed column list (not clerk_user_id),
  // so a plain upsert's ON CONFLICT UPDATE hits permission denied (42501).
  // Update the allowed columns on the existing row; insert only when missing.
  const { data: updated, error: updateError } = await supabase
    .from("profiles")
    .update({ email, display_name: displayName })
    .eq("clerk_user_id", userId)
    .select("id")
    .maybeSingle();

  if (updateError) {
    console.error("profile sync update failed", updateError);
    return NextResponse.json({ error: "Profile sync failed" }, { status: 500 });
  }

  if (!updated) {
    const { error: insertError } = await supabase
      .from("profiles")
      .insert({ clerk_user_id: userId, email, display_name: displayName });

    // A concurrent insert (e.g. double-fired sync) can race us to the unique
    // clerk_user_id; that's fine — the row now exists either way.
    if (insertError && insertError.code !== "23505") {
      console.error("profile sync insert failed", insertError);
      return NextResponse.json({ error: "Profile sync failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
