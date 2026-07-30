import { createServerSupabaseClient } from "@/lib/supabase-server";
import { DashboardShell } from "./DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <DashboardShell initialUser={user}>{children}</DashboardShell>;
}
