import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Only allow same-origin, relative redirect targets (e.g. from a
 * `?redirect_url=` query param) so an attacker can't craft a sign-in link
 * that bounces an authenticated user off-site.
 */
export function sanitizeRedirectPath(path: string | null): string | undefined {
  if (!path) return undefined
  if (!path.startsWith("/") || path.startsWith("//")) return undefined
  if (path.includes("://")) return undefined
  return path
}
