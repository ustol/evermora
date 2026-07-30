"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { useSession } from "@clerk/nextjs"
import { useMemo } from "react"
import type { Database } from "@/types/supabase"

/**
 * Browser Supabase client scoped to the logged-in Clerk user. The Clerk
 * session token is forwarded via `accessToken`, so RLS sees the user's
 * `sub` claim and scopes every query. Unauthenticated callers get a null
 * token and are treated as the anon role (public data only).
 */
export function useSupabaseClient(): SupabaseClient<Database> {
  const { session } = useSession()

  return useMemo(
    () =>
      createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
          accessToken: async () => (await session?.getToken()) ?? null,
          auth: { persistSession: false },
        }
      ),
    [session]
  )
}
