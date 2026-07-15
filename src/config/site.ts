/**
 * Single source of truth for product identity. Import this everywhere instead
 * of hard-coding the product name so it can be renamed in one place.
 */
export const siteConfig = {
  name: "Evermora",
  tagline: "Honouring lives. Preserving memories.",
  description:
    "Evermora is a dignified place to announce a funeral, share a memorial page, and gather tributes and condolences from family, friends, and community.",
  // Prefer the actual origin the app is being served from, so shareable
  // links are correct on every deployment (production, Vercel previews,
  // local dev) without needing VITE_APP_URL kept in sync per environment.
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : (import.meta.env.VITE_APP_URL ?? "http://localhost:5173"),
  locale: "en",
  region: "Ghana",
} as const

export const legalConfig = {
  supportEmail: "support@evermora.example",
} as const
