"use client";

import { useState } from "react";
import { Images } from "lucide-react";
import { AddPhotoDialog } from "@/components/memorial/AddPhotoDialog";
import { MediaLightbox } from "@/components/memorial/MediaLightbox";

interface MediaGallerySectionProps {
  memorialId: string;
  slug: string;
  allowContributorPhotos: boolean;
  requireApproval: boolean;
  initialGallery?: Array<{
    id: string;
    url: string;
    caption: string | null;
    altText: string | null;
    sortOrder: number;
  }>;
}

export function MediaGallerySection({
  memorialId,
  slug,
  allowContributorPhotos,
  requireApproval,
  initialGallery = [],
}: MediaGallerySectionProps) {
  const [photos, setPhotos] = useState(initialGallery);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0 && !allowContributorPhotos) {
    return null;
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
        {photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={
                  photo.altText || photo.caption
                    ? `View photo: ${photo.altText || photo.caption}`
                    : `View photo ${index + 1} of ${photos.length}`
                }
                className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                {photo.url ? (
                  <img
                    src={photo.url}
                    alt=""
                    className="size-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Images className="size-6 text-muted-foreground" />
                  </div>
                )}
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
  );
}
