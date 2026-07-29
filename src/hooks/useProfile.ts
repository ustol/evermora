import { useUser } from "@clerk/react"
import { useQuery } from "@tanstack/react-query"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import type { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

/**
 * Ensures the signed-in Clerk user has a `profiles` row and returns it.
 *
 * Deliberately NOT an upsert: PostgREST upserts compile to
 * INSERT ... ON CONFLICT DO UPDATE with every payload column in the SET
 * clause — including clerk_user_id, which our column-level grants forbid
 * updating. Select-then-insert-or-update only ever writes columns the
 * `authenticated` role is actually allowed to touch.
 *
 * TanStack Query dedupes this across every component that calls it.
 */
export function useProfile() {
  const { user, isLoaded, isSignedIn } = useUser()
  const supabase = useSupabaseClient()

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async (): Promise<Profile> => {
      const clerkUserId = user!.id
      const displayName =
        user!.fullName ||
        user!.username ||
        user!.primaryEmailAddress?.emailAddress ||
        "Member"
      const email = user!.primaryEmailAddress?.emailAddress ?? null
      const avatarUrl = user!.imageUrl ?? null

      const { data: existing, error: selectError } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", clerkUserId)
        .maybeSingle()
      if (selectError) throw selectError

      if (existing) {
        // Refresh Clerk-managed fields if they changed since last visit.
        if (
          existing.display_name !== displayName ||
          existing.email !== email ||
          existing.avatar_url !== avatarUrl
        ) {
          const { data: updated, error: updateError } = await supabase
            .from("profiles")
            .update({
              display_name: displayName,
              email,
              avatar_url: avatarUrl,
            })
            .eq("clerk_user_id", clerkUserId)
            .select()
            .single()
          if (updateError) throw updateError
          return updated
        }
        return existing
      }

      const { data: created, error: insertError } = await supabase
        .from("profiles")
        .insert({
          clerk_user_id: clerkUserId,
          display_name: displayName,
          email,
          avatar_url: avatarUrl,
        })
        .select()
        .single()

      if (insertError) {
        // A concurrent request may have created the row between our select
        // and insert — recover by re-reading.
        if (insertError.code === "23505") {
          const { data: raced, error: retryError } = await supabase
            .from("profiles")
            .select("*")
            .eq("clerk_user_id", clerkUserId)
            .single()
          if (retryError) throw retryError
          return raced
        }
        throw insertError
      }
      return created
    },
    enabled: isLoaded && isSignedIn && !!user,
    staleTime: 5 * 60_000,
  })
}
