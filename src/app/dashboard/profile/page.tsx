"use client";

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useUser } from "@clerk/nextjs"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/layout/ErrorState"

export default function DashboardProfilePage() {
  const supabase = useSupabaseClient()
  const { user } = useUser()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from("profiles").select("*").eq("clerk_user_id", user.id).maybeSingle().then(({ data, error }) => {
      if (error) { setError(true); return }
      setProfile(data)
      setLoading(false)
    })
  }, [user])

  if (error) return <Container className="py-16"><ErrorState /></Container>
  if (loading || !user) return <Container className="py-16"><Skeleton className="h-64 rounded-2xl" /></Container>

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Profile</h1>
      <p className="mt-2 text-muted-foreground">Manage your account details.</p>
      {profile && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <p><span className="font-medium">Email:</span> {profile.email ?? "N/A"}</p>
          <p><span className="font-medium">Display name:</span> {profile.display_name ?? "N/A"}</p>
        </div>
      )}
    </Container>
  )
}
