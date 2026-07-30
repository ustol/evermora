"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDayMonthYear } from "@/lib/date"

export default function AdminGiftPurchasesPage() {
  const [purchases, setPurchases] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("gift_purchases").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setPurchases(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Gift purchases" description="All virtual gift transactions." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="flex flex-col gap-2">
          {purchases?.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm">{p.purchaser_display_name ?? "Anonymous"} — {formatDayMonthYear(p.created_at)}</p>
              <p className="text-xs text-muted-foreground">Status: {p.status}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
