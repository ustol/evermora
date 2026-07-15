import { useMemo } from "react"
import { useSession } from "@clerk/react"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { env } from "@/config/env"
import type { Database } from "@/types/supabase"

/**
 * A Supabase client whose requests carry the current Clerk session token,
 * via Supabase's native third-party auth integration (no JWT template).
 * RLS policies read the Clerk user id from `auth.jwt()->>'sub'`.
 */
export function useSupabaseClient(): SupabaseClient<Database> {
  const { session } = useSession()

  return useMemo(
    () =>
      createClient<Database>(
        env.VITE_SUPABASE_URL,
        env.VITE_SUPABASE_PUBLISHABLE_KEY,
        {
          async accessToken() {
            return (await session?.getToken()) ?? null
          },
        }
      ),
    [session]
  )
}
