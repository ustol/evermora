"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const dashboardNavLinks = [
  { to: "/dashboard", label: "Overview", exact: true },
  { to: "/dashboard/memorials", label: "Your memorials" },
  { to: "/dashboard/profile", label: "Profile" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";

  function isActive(link: { to: string; exact?: boolean }) {
    if (link.exact) return pathname === link.to;
    return pathname.startsWith(link.to);
  }

  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col gap-1 border-b border-white/10 bg-rich-black px-4 py-6 text-soft-ivory md:w-64 md:border-b-0 md:border-r">
        <Link href="/" className="mb-6 inline-block w-fit rounded-lg bg-soft-ivory p-1.5">
          <img src="/logo.png" alt={siteConfig.name} className="h-9 w-32 rounded object-cover object-center" />
        </Link>
        <p className="mb-2 px-3 text-xs font-medium tracking-wide text-soft-ivory/50 uppercase">
          Dashboard
        </p>
        <nav className="flex flex-col gap-1">
          {dashboardNavLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link)
                  ? "bg-heritage-gold text-obsidian"
                  : "text-soft-ivory/80 hover:bg-white/10 hover:text-soft-ivory"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/dashboard/profile" className="text-sm text-soft-ivory/80 hover:text-soft-ivory">
            Your profile
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
