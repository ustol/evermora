import { DashboardLayout } from "@/components/layout/DashboardLayout"

const adminNavLinks = [
  { to: "/admin", label: "Overview", end: true },
]

export function AdminLayout() {
  return <DashboardLayout navLinks={adminNavLinks} title="Administration" />
}
