import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * A Supabase client with NO auth — uses the anon key directly.
 * Safe for public data queries (hero images, public memorials, blog posts).
 */
let _publicClient: SupabaseClient | null = null

export function getPublicSupabaseClient(): SupabaseClient {
  if (_publicClient) return _publicClient

  const url =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_SUPABASE_URL!
      : process.env.SUPABASE_URL!

  const anonKey =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      : process.env.SUPABASE_SERVICE_ROLE_KEY!

  _publicClient = createClient(url, anonKey, {
    auth: { persistSession: false },
  })
  return _publicClient
}
