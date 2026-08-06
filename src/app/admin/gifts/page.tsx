"use client";

import { useCallback, useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { AddGiftCatalogItemDialog } from "@/components/admin/AddGiftCatalogItemDialog"
import { EditGiftCatalogItemDialog } from "@/components/admin/EditGiftCatalogItemDialog"

export default function AdminGiftCatalogPage() {
  const supabase = useSupabaseClient()
  const [gifts, setGifts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  useEffect(() => {
    supabase.from("gift_catalog").select("*").order("sort_order", { ascending: true }).then(({ data }) => {
      setGifts(data ?? [])
      setLoading(false)
    })
  }, [supabase, refreshKey])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Wreaths & roses"
        description="Manage the gift catalog. Changes take effect immediately for visitors."
        actions={<AddGiftCatalogItemDialog onAdded={refresh} />}
      />
      {loading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gifts?.map((g) => (
            <div
              key={g.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <p className="font-medium text-foreground">{g.name}</p>
              <p className="text-sm text-muted-foreground">
                {g.currency} {g.price.toLocaleString()}
              </p>
              {g.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{g.description}</p>
              )}
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-foreground">
                  {g.is_active ? "Active" : "Inactive"} · Order {g.sort_order}
                </span>
                <EditGiftCatalogItemDialog
                  gift={g}
                  onUpdated={refresh}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}
