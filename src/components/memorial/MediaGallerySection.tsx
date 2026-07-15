import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Images } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { AddPhotoDialog } from "@/components/memorial/AddPhotoDialog"
import { MediaLightbox } from "@/components/memorial/MediaLightbox"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listApprovedMedia } from "@/services/media"

interface MediaGallerySectionProps {
  memorialId: string
  slug: string
  allowContributorPhotos: boolean
  requireApproval: boolean
}

export function MediaGallerySection({
  memorialId,
  slug,
  allowContributorPhotos,
  requireApproval,
}: MediaGallerySectionProps) {
  const supabase = useSupabaseClient()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const { data: photos, isLoading } = useQuery({
    queryKey: ["memorial-gallery", memorialId],
    queryFn: () => listApprovedMedia(supabase, memorialId),
  })

  if (!isLoading && (!photos || photos.length === 0) && !allowContributorPhotos) {
    return null
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-xl text-foreground">Photo gallery</h2>
        {allowContributorPhotos && (
          <AddPhotoDialog
            memorialId={memorialId}
            slug={slug}
            requireApproval={requireApproval}
          />
        )}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        ) : photos && photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img
                  src={photo.url}
                  alt={photo.altText ?? ""}
                  className="size-full object-cover transition-transform hover:scale-105"
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-10 text-center">
            <Images className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              No photos yet — be the first to add one.
            </p>
          </div>
        )}
      </div>

      {photos && openIndex !== null && (
        <MediaLightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  )
}
