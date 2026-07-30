"use client";

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminGiftCatalogPage() {
  const supabase = useSupabaseClient()
  const [gifts, setGifts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("gift_catalog").select("*").order("price").then(({ data }) => {
      setGifts(data ?? [])
      setLoading(false)
    })
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Gift catalog" description="Manage available wreaths and roses." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {gifts?.map((g) => (
            <div key={g.id} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-medium">{g.name}</p>
              <p className="text-sm text-muted-foreground">₵{g.price}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
