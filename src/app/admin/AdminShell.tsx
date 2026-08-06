"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const adminNavLinks = [
  { to: "/admin", label: "Overview", exact: true },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/memorials", label: "Memorials" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/hero-images", label: "Hero images" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/gifts", label: "Wreaths & roses" },
  { to: "/admin/gift-purchases", label: "Gift purchases" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverAuthRefreshing, setServerAuthRefreshing] = useState(false);

  const [supabase] = useState(() => createClient());
  const currentPath = `${pathname || "/admin"}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
      if (!data.user) {
        router.replace(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        router.replace(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`);
      }
    });
    return () => subscription.unsubscribe();
  }, [currentPath, router, supabase]);

  useEffect(() => {
    if (user && children == null && !serverAuthRefreshing) {
      setServerAuthRefreshing(true);
      router.refresh();
    }
  }, [children, router, serverAuthRefreshing, user]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function isActive(link: { to: string; exact?: boolean }) {
    if (link.exact) return pathname === link.to;
    return pathname.startsWith(link.to);
  }

  if (loading || (user && children == null)) {
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
          Administration
        </p>
        <nav className="flex flex-col gap-1">
          {adminNavLinks.map((link) => (
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
                {user.email?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-soft-ivory/60 underline underline-offset-2 hover:text-soft-ivory"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-xs text-soft-ivory/60 underline underline-offset-2 hover:text-soft-ivory"
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
