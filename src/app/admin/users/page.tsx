"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("profiles").select("*").limit(50).then(({ data }) => {
      setUsers(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Users" description="Platform user profiles." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="flex flex-col gap-2">
          {users?.map((u) => (
            <div key={u.id} className="rounded-xl border border-border bg-card p-4">
              <p className="font-medium">{u.display_name || u.email || "Unknown"}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
