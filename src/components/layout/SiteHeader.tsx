"use client";

import { useState } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SHOW_SERVICES_PAGE } from "@/config/featureFlags"

function safeAvatar(src: string) {
  try { const url = new URL(src); if (url.protocol !== 'https:') return null; return src; }
  catch { return null; }
}

const navLinks = [
  { to: "/memorials", label: "Find a memorial" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  ...(SHOW_SERVICES_PAGE ? [{ to: "/services", label: "Services" }] : []),
];

function AuthButtons({ className, user, loading }: { className?: string; user: User | null; loading: boolean }) {
  const signedIn = !loading && user;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {loading ? (
        <span className="h-7 w-28 rounded-full bg-muted" aria-hidden="true" />
      ) : signedIn ? (
        <>
          <Link
            href="/dashboard/memorials/new"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Create a memorial
          </Link>
          <Link
            href="/dashboard/profile"
            aria-label="Your profile"
            className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-bold text-foreground ring-1 ring-border transition-colors hover:bg-muted/80"
          >
            {(() => {
              const rawUrl = user?.user_metadata?.avatar_url as string | undefined;
              const avatarUrl = rawUrl ? safeAvatar(rawUrl) : null;
              const initial = (user?.email?.charAt(0) ?? "?").toUpperCase();
              if (avatarUrl) {
                return (
                  <>
                    <img src={avatarUrl} alt="" className="size-full object-cover" onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; el.parentElement?.querySelector(".fallback")?.classList.remove("hidden"); }} />
                    <span className="fallback hidden size-full items-center justify-center bg-heritage-gold text-[11px] font-bold text-obsidian">{initial}</span>
                  </>
                );
              }
              return (
                <span className="fallback flex size-full items-center justify-center bg-heritage-gold text-[11px] font-bold text-obsidian">
                  {initial}
                </span>
              );
            })()}
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Sign in
          </Link>
          <Link
            href="/dashboard/memorials/new"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Create a memorial
          </Link>
        </>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, isSignedIn, loading } = useAuth();

  return (
    <header className="fixed top-3 right-0 left-0 z-40 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/80 px-4 shadow-lg shadow-black/5 backdrop-blur-md supports-backdrop-filter:bg-background/70 sm:px-6">
        <Link href="/" className="shrink-0">
          <img
            src="/logo.png"
            alt={siteConfig.name}
            className="h-10 w-36 rounded-lg object-cover object-center sm:h-11 sm:w-40"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to))
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AuthButtons className="hidden sm:flex" user={user} loading={loading} />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-2 w-full max-w-5xl rounded-2xl border border-border/60 bg-background p-4 shadow-lg backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.to || (link.to !== "/" && pathname.startsWith(link.to))
                    ? "bg-heritage-gold/10 text-heritage-gold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            {loading ? (
              <span className="h-9 rounded-lg bg-muted" aria-hidden="true" />
            ) : user ? (
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileOpen(false)}
                aria-label="Your profile"
                className="flex w-fit items-center justify-center rounded-full bg-muted p-1 ring-1 ring-border hover:bg-muted/80"
              >
                {(() => {
                  const raw = user.user_metadata?.avatar_url as string | undefined;
                  const av = raw ? safeAvatar(raw) : null;
                  const initial = (user.email?.charAt(0) ?? "?").toUpperCase();
                  if (av) {
                    return (
                      <>
                        <img
                          src={av}
                          alt=""
                          className="size-8 rounded-full object-cover"
                          onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; el.parentElement?.querySelector(".m-fallback")?.classList.remove("hidden"); }}
                        />
                        <span className="m-fallback hidden size-8 items-center justify-center rounded-full bg-heritage-gold text-xs font-bold text-obsidian">{initial}</span>
                      </>
                    );
                  }
                  return (
                    <span className="m-fallback flex size-8 items-center justify-center rounded-full bg-heritage-gold text-xs font-bold text-obsidian">
                      {initial}
                    </span>
                  );
                })()}
              </Link>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                Sign in
              </Link>
            )}
            <Link
              href="/dashboard/memorials/new"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants())}
            >
              Create a memorial
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
