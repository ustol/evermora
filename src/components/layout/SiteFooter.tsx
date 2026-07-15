import { Link } from "react-router-dom"
import { Container } from "@/components/layout/Container"
import { siteConfig } from "@/config/site"

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/memorials", label: "Find a memorial" },
  { to: "/privacy", label: "Privacy policy" },
  { to: "/terms", label: "Terms & conditions" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-obsidian text-soft-ivory">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-lg">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-soft-ivory/70">
              {siteConfig.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-soft-ivory/80 transition-colors hover:text-heritage-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-xs text-soft-ivory/50">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  )
}
