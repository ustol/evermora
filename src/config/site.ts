/**
 * Single source of truth for product identity. Import this everywhere instead
 * of hard-coding the product name so it can be renamed in one place.
 */

function getOrigin(): string {
  // Server-side: use NEXT_PUBLIC_APP_URL or fallback
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  }
  // Client-side: use the actual origin
  return window.location.origin
}

export const siteConfig = {
  name: "Akornafa",
  tagline: "Honouring lives. Preserving memories.",
  description:
    "Akornafa is a dignified place to announce a funeral, share a memorial page, and gather tributes and condolences from family, friends, and community.",
  url: getOrigin(),
  locale: "en",
  region: "Ghana",
  parentCompany: "Hoganam Ltd.",
} as const

export const legalConfig = {
  supportEmail: "support@akornafa.com",
} as const
