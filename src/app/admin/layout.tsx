import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { resolveProfileForUser } from "@/lib/profile-resolver";
import { AdminShell } from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Server-side auth can be unavailable during client-side admin navigation
    // because the browser session is restored by Supabase on the client. Keep
    // the requested route mounted so AdminShell can resolve the client session
    // instead of showing an empty admin shell/spinner.
    return <AdminShell>{children}</AdminShell>;
  }

  const profile = await resolveProfileForUser(createAdminClient(), user);

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <AdminShell>{children}</AdminShell>;
}
