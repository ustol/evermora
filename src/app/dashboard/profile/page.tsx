import { requireUser } from "@/lib/require-auth";
import { ProfileClient } from "@/components/dashboard/ProfileClient";

export default async function DashboardProfilePage() {
  await requireUser("/dashboard/profile");

  return <ProfileClient />;
}
