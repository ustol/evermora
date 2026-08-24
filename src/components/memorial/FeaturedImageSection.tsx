"use client"

import { useRouter } from "next/navigation"
import { UserRound } from "lucide-react"
import { UpdateFeaturedImageDialog } from "@/components/memorial/UpdateFeaturedImageDialog"

interface FeaturedImageSectionProps {
  memorialId: string
  memorialName: string
  currentPhotoUrl: string | null
  currentAlt: string | null
}

export function FeaturedImageSection({
  memorialId,
  memorialName,
  currentPhotoUrl,
  currentAlt,
}: FeaturedImageSectionProps) {
  const router = useRouter()

  return (
    <section className="mt-6 max-w-2xl rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-5">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {currentPhotoUrl ? (
            <img
              src={currentPhotoUrl}
              alt={currentAlt ?? memorialName}
              className="size-full object-cover"
            />
          ) : (
            <UserRound className="size-10 text-muted-foreground/40" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Featured image
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The portrait shown at the top of the memorial page.
          </p>
        </div>
        <UpdateFeaturedImageDialog
          endpoint={`/api/dashboard/memorials/${memorialId}/featured-image`}
          memorialName={memorialName}
          currentAlt={currentAlt}
          currentPhotoUrl={currentPhotoUrl}
          triggerLabel="Replace"
          onUpdated={() => router.refresh()}
        />
      </div>
    </section>
  )
}
