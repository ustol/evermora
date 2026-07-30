"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const dashboardNavLinks = [
  { to: "/dashboard", label: "Overview", exact: true },
  { to: "/dashboard/memorials", label: "Your memorials" },
  { to: "/dashboard/profile", label: "Profile" },
];

export function DashboardShell({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? initialUser ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? initialUser ?? null);
    });
    return () => subscription.unsubscribe();
  }, [initialUser, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function isActive(link: { to: string; exact?: boolean }) {
    if (link.exact) return pathname === link.to;
    return pathname.startsWith(link.to);
  }

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-heritage-gold" />
      </div>
    );
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
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-heritage-gold text-xs font-bold text-obsidian">
                {user.email?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-soft-ivory">
                  {user.user_metadata?.display_name as string ?? user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-left text-xs text-soft-ivory/60 hover:text-soft-ivory"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm text-soft-ivory/80 underline underline-offset-2 hover:text-soft-ivory"
            >
              Sign in
            </Link>
          )}
        </div>
      </aside>

      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
