import { useProfile } from "@/hooks/useProfile"

/**
 * Renders nothing — just ensures the signed-in Clerk user has a matching
 * `profiles` row as soon as the app loads, anywhere in the site.
 */
export function ProfileSyncGate() {
  useProfile()
  return null
}
