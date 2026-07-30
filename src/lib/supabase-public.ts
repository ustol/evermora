import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

/**
 * A Supabase client with NO auth — uses the anon key directly.
 * Safe for public data queries (hero images, public memorials, blog posts).
 */
let _publicClient: SupabaseClient<Database> | null = null

export function getPublicSupabaseClient(): SupabaseClient<Database> {
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
  }) as unknown as SupabaseClient<Database>

  return _publicClient
}
