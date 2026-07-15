import { DashboardLayout } from "@/components/layout/DashboardLayout"

const adminNavLinks = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/gifts", label: "Wreaths & roses" },
]

export function AdminLayout() {
  return <DashboardLayout navLinks={adminNavLinks} title="Administration" />
}
