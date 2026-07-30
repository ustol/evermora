import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"

/**
 * Ensures the signed-in Clerk user has a matching `profiles` row.
 */
export function ProfileSyncGate() {
  const { user } = useUser()

  useEffect(() => {
    if (!user) return
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("profiles").upsert(
      { clerk_user_id: user.id, email: user.primaryEmailAddress?.emailAddress ?? null },
      { onConflict: "clerk_user_id" }
    ).then(({ error }) => {
      if (error) console.error("ProfileSyncGate error:", error)
    })
  }, [user])

  return null
}
