"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Images } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddPhotoDialog } from "@/components/memorial/AddPhotoDialog";
import { MediaLightbox } from "@/components/memorial/MediaLightbox";

interface MediaGallerySectionProps {
  memorialId: string;
  slug: string;
  allowContributorPhotos: boolean;
  requireApproval: boolean;
}

interface Photo {
  id: string;
  url: string;
  caption: string | null;
  altText: string | null;
  sortOrder: number;
}

export function MediaGallerySection({
  memorialId,
  slug,
  allowContributorPhotos,
  requireApproval,
}: MediaGallerySectionProps) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    );
    supabase
      .from("memorial_media")
      .select("*")
      .eq("memorial_id", memorialId)
      .in("status", ["approved", "auto_approved"])
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("media fetch error:", error);
          setPhotos([]);
        } else {
          setPhotos(
            (data ?? []).map((row: any) => ({
              id: row.id,
              url: row.storage_path
                ? supabase.storage.from("memorial-media").getPublicUrl(row.storage_path).data.publicUrl
                : "",
              caption: row.caption,
              altText: row.alt_text,
              sortOrder: row.sort_order,
            }))
          );
        }
        setLoading(false);
      });
  }, [memorialId]);

  if (!loading && (!photos || photos.length === 0) && !allowContributorPhotos) {
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
        {loading ? (
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
                aria-label={
                  photo.altText || photo.caption
                    ? `View photo: ${photo.altText || photo.caption}`
                    : `View photo ${index + 1} of ${photos.length}`
                }
                className="aspect-square overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img
                  src={photo.url}
                  alt=""
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
  );
}
