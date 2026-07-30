"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/layout/ErrorState"

export default function DashboardPage() {
  const [data, setData] = useState<{ memorialCount: number; tributesCount: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    Promise.all([
      supabase.from("memorials").select("id", { count: "exact", head: true }),
    ]).then(([memorials]) => {
      if (memorials.error) throw memorials.error
      setData({ memorialCount: memorials.count ?? 0, tributesCount: 0 })
      setLoading(false)
    }).catch(() => {
      setError(true)
      setLoading(false)
    })
  }, [])

  if (error) return <Container className="py-16"><ErrorState /></Container>
  if (loading) return <Container className="py-16"><Skeleton className="h-64 w-full rounded-2xl" /></Container>

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to your dashboard.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-3xl font-semibold">{data?.memorialCount ?? 0}</p>
          <p className="text-sm text-muted-foreground">Memorials</p>
        </div>
      </div>
    </Container>
  )
}
