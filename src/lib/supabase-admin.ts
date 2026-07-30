import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { createAdminClient as createServerAdminClient } from "@supabase/server/core"

/**
 * Server-side Supabase admin client (RLS-bypassing). Backed by
 * @supabase/server, which resolves the new-format secret key
 * (SUPABASE_SECRET_KEY = sb_secret_...) + SUPABASE_URL from the environment.
 * Only import in API routes — never client components.
 */
export function createAdminClient(): SupabaseClient<Database> {
  return createServerAdminClient<Database>()
}
