"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminPage() {
  const [counts, setCounts] = useState<{ memorials: number; users: number; gifts: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    Promise.all([
      supabase.from("memorials").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("gift_purchases").select("id", { count: "exact", head: true }),
    ]).then(([m, p, g]) => {
      setCounts({ memorials: m.count ?? 0, users: p.count ?? 0, gifts: g.count ?? 0 })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Admin</h1>
      <p className="text-muted-foreground">Platform administration.</p>
      {loading ? <Skeleton className="mt-8 h-32 rounded-2xl" /> : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-3xl font-semibold">{counts?.memorials}</p>
            <p className="text-sm text-muted-foreground">Memorials</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-3xl font-semibold">{counts?.users}</p>
            <p className="text-sm text-muted-foreground">Users</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-3xl font-semibold">{counts?.gifts}</p>
            <p className="text-sm text-muted-foreground">Gift purchases</p>
          </div>
        </div>
      )}
    </Container>
  )
}
