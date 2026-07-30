"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { OwnerMemorialCard } from "@/components/memorial/OwnerMemorialCard"

export default function DashboardMemorialsPage() {
  const [memorials, setMemorials] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("memorials").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (error) { setError(true); return }
      setMemorials(data ?? [])
      setLoading(false)
    })
  }, [])

  if (error) return <Container className="py-16"><ErrorState /></Container>

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="My memorials"
        description="Manage the memorials you've created."
        actions={
          <Link href="/dashboard/memorials/new" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80">
            Create a memorial
          </Link>
        }
      />
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
        </div>
      ) : memorials && memorials.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memorials.map((m) => <OwnerMemorialCard key={m.id} memorial={m} />)}
        </div>
      ) : (
        <EmptyState title="No memorials yet" description="Create your first memorial to get started." />
      )}
    </Container>
  )
}
