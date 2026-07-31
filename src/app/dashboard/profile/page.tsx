import { ProfileClient } from "@/components/dashboard/ProfileClient";
import { getCurrentProfile } from "@/lib/auth-profile";
import { requireUser } from "@/lib/require-auth";

export default async function DashboardProfilePage() {
  await requireUser("/dashboard/profile");
  await getCurrentProfile();

  return <ProfileClient />;
}
