import { Link, NavLink, Outlet } from "react-router-dom"
import { UserButton } from "@clerk/react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const dashboardNavLinks = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/memorials", label: "Your memorials" },
  { to: "/dashboard/profile", label: "Profile" },
]

interface DashboardLayoutProps {
  navLinks?: typeof dashboardNavLinks
  title?: string
}

/**
 * Shared app shell for /dashboard/* and /admin/* — a dark sidebar nav
 * distinct from the public marketing chrome in RootLayout.
 */
export function DashboardLayout({
  navLinks = dashboardNavLinks,
  title = "Dashboard",
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col gap-1 border-b border-white/10 bg-rich-black px-4 py-6 text-soft-ivory md:w-64 md:border-b-0 md:border-r">
        <Link to="/" className="mb-6 font-heading text-lg">
          {siteConfig.name}
        </Link>
        <p className="mb-2 px-3 text-xs font-medium tracking-wide text-soft-ivory/50 uppercase">
          {title}
        </p>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={"end" in link ? link.end : undefined}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-heritage-gold text-obsidian"
                    : "text-soft-ivory/80 hover:bg-white/10 hover:text-soft-ivory"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4">
          <UserButton />
          <Link
            to="/dashboard/profile"
            className="text-sm text-soft-ivory/80 hover:text-soft-ivory"
          >
            Your profile
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  )
}
