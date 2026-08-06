import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { createAdminClient } from "@/lib/supabase-admin"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { resolveProfileForUser, syncProfileForUser } from "@/lib/profile-resolver"

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"]

export interface CurrentProfile {
  userId: string
  profile: ProfileRow | null
  ownerIds: string[]
  supabase: SupabaseClient<Database>
}

export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return null

  let profile = await resolveProfileForUser(supabase, user)

  if (!profile) {
    profile = await syncProfileForUser(createAdminClient(), user).catch((error) => {
      console.error("Profile auto-sync failed", error)
      return null
    })
  }

  const ownerIds = Array.from(new Set([profile?.id, user.id].filter((id): id is string => Boolean(id))))

  return {
    userId: user.id,
    profile,
    ownerIds,
    supabase: profile ? supabase : createAdminClient(),
  }
}
