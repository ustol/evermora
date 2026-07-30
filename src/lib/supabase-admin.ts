import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

/**
 * Server-side Supabase admin client with the service role key.
 * Only import and use in API routes (never client components).
 */
export function createAdminClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL/SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for admin client")
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey)
}
