import { useMemo } from "react"
import { useSession } from "@clerk/nextjs"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
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
        // These NEXT_PUBLIC_ vars are exposed to the browser
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          async accessToken() {
            return (await session?.getToken()) ?? null
          },
        }
      ),
    [session]
  )
}
