import { Link } from "react-router-dom"
import { Show, UserButton } from "@clerk/react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navLinks = [
  { to: "/memorials", label: "Find a memorial" },
  { to: "/about", label: "About" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between">
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
      </Container>
    </header>
  )
}
