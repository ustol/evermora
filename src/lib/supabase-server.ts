import { auth } from "@clerk/nextjs/server"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { createContextClient } from "@supabase/server/core"

/**
 * Server-side Supabase client scoped to the logged-in Clerk user.
 *
 * The Clerk session token is forwarded as the request's auth token, so Postgres
 * sees `auth.jwt()->>'sub'` = the Clerk user id and every RLS policy applies.
 * Runs as the `authenticated` role — no secret key. Backed by @supabase/server,
 * which resolves SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY from the environment.
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient<Database>> {
  const { getToken } = await auth()
  const token = await getToken()

  return createContextClient<Database>({ auth: { token } })
}
