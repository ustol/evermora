import { DashboardLayout } from "@/components/layout/DashboardLayout"

const adminNavLinks = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/memorials", label: "Memorials" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/hero-images", label: "Hero images" },
  { to: "/admin/vendors", label: "Vendors" },
  { to: "/admin/gifts", label: "Wreaths & roses" },
]

export function AdminLayout() {
  return <DashboardLayout navLinks={adminNavLinks} title="Administration" />
}
