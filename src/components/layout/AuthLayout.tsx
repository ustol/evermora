import { Link, Outlet } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { siteConfig } from "@/config/site"

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Container className="py-6">
        <Link to="/" className="font-heading text-xl text-foreground">
          {siteConfig.name}
        </Link>
      </Container>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
