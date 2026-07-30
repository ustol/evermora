import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const displayName = user?.fullName ?? user?.username ?? user?.firstName ?? "Akornafa user";

  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      clerk_user_id: userId,
      email,
      display_name: displayName,
    },
    { onConflict: "clerk_user_id" }
  );

  if (error) {
    console.error("profile sync failed", error);
    return NextResponse.json({ error: "Profile sync failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
