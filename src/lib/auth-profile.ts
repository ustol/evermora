import { auth } from "@clerk/nextjs/server"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { createServerSupabaseClient } from "@/lib/supabase-server"

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"]

export interface CurrentProfile {
  userId: string
  profile: ProfileRow
  supabase: SupabaseClient<Database>
}

/**
 * Resolve the logged-in Clerk user to their Supabase `profiles` row, server-side.
 * The returned client is scoped to the user's Clerk token, so every query it
 * runs is enforced by RLS. Returns null when unauthenticated or when the
 * profile row does not exist yet (ClerkProfileSync creates it on first login).
 */
export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const { userId } = await auth()
  if (!userId) return null

  const supabase = await createServerSupabaseClient()
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", userId)
    .maybeSingle()

  if (error) throw error
  if (!profile) return null

  return { userId, profile, supabase }
}
