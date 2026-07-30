"use client";

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminGiftCatalogPage() {
  const [gifts, setGifts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
    supabase.from("catalog_gifts").select("*").order("price").then(({ data }) => {
      setGifts(data ?? [])
      setLoading(false)
    })
  }, [])

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
