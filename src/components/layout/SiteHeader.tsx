import { Link } from "react-router-dom"
import { Show, UserButton } from "@clerk/react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navLinks = [
  { to: "/memorials", label: "Find a memorial" },
  { to: "/vendors", label: "Vendors" },
  { to: "/about", label: "About" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-40 mt-3 px-3 sm:top-4 sm:mt-4 sm:px-4">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/80 px-4 shadow-lg shadow-black/5 backdrop-blur-md supports-backdrop-filter:bg-background/70 sm:px-6">
        <Link
          to="/"
          className="font-heading text-xl tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Show
          when="signed-in"
          fallback={
            <div className="flex items-center gap-2">
              <Link
                to="/sign-in"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Sign in
              </Link>
              <Link
                to="/dashboard/memorials/new"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Create a memorial
              </Link>
            </div>
          }
        >
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/memorials/new"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Create a memorial
            </Link>
            <UserButton />
          </div>
        </Show>
      </div>
    </header>
  )
}
