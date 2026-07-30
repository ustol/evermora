"use client";

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminHeroImagesPage() {
  const supabase = useSupabaseClient()
  const [images, setImages] = useState<{ id: string; storagePath: string; sortOrder: number }[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("hero_images").select("*").order("sort_order").then(({ data }) => {
      setImages((data ?? []).map((r: any) => ({ id: r.id, storagePath: r.storage_path, sortOrder: r.sort_order })))
      setLoading(false)
    })
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader title="Hero images" description="Manage the homepage hero slideshow." />
      {loading ? <Skeleton className="h-64 rounded-2xl" /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {images?.map((img) => {
            const url = supabase.storage.from("hero-images").getPublicUrl(img.storagePath).data.publicUrl
            return (
              <div key={img.id} className="rounded-2xl border border-border bg-card p-4">
                <img src={url} alt="" className="aspect-video w-full rounded-lg object-cover" />
                <p className="mt-2 text-sm text-muted-foreground">Order: {img.sortOrder}</p>
              </div>
            )
          })}
        </div>
      )}
    </Container>
  )
}
