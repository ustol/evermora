import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { SHOW_SERVICES_PAGE } from "@/config/featureFlags"

const navLinks = [
  { to: "/memorials", label: "Find a memorial" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  ...(SHOW_SERVICES_PAGE ? [{ to: "/services", label: "Services" }] : []),
];

export function SiteHeader() {
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SignedOut>
          <div className="flex items-center gap-2">
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
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/memorials/new"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Create a memorial
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  )
}
