import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function requireUser(redirectPath: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`);
  }

  return user;
}

export async function requireAdmin(redirectPath: string) {
  const user = await requireUser(redirectPath);
  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}
