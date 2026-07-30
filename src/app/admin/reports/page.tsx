"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDayMonthYear } from "@/lib/date"

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("memorial_reports").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setReports(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Reports" description="User-submitted reports requiring review." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="flex flex-col gap-2">
          {reports?.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm">{r.reason}</p>
              <p className="text-xs text-muted-foreground">{formatDayMonthYear(r.created_at)}</p>
            </div>
          ))}
          {(!reports || reports.length === 0) && <p className="text-sm text-muted-foreground">No reports.</p>}
        </div>
      )}
    </Container>
  )
}
