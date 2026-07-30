"use client";

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminMemorialsPage() {
  const supabase = useSupabaseClient()
  const [memorials, setMemorials] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("memorials").select("*").order("created_at", { ascending: false }).limit(50).then(({ data }) => {
      setMemorials(data ?? [])
      setLoading(false)
    })
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="All memorials" description="View and manage every memorial on the platform." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="flex flex-col gap-2">
          {memorials?.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-medium">{m.display_name || `${m.first_name} ${m.surname}`}</p>
                <p className="text-xs text-muted-foreground">{m.status} · {m.privacy}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
