import { useEffect } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { MediaItem } from "@/services/media"

interface MediaLightboxProps {
  photos: MediaItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function MediaLightbox({ photos, index, onClose, onNavigate }: MediaLightboxProps) {
  const photo = photos[index]

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length)
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [index, photos.length, onClose, onNavigate])

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  if (!photo) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? "Photo"}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close"
        className="absolute top-4 right-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <X className="size-6" aria-hidden="true" />
      </button>

      {photos.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index - 1 + photos.length) % photos.length)
          }}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
        >
          <ChevronLeft className="size-8" aria-hidden="true" />
        </button>
      )}

      <img
        src={photo.url}
        alt={photo.altText ?? ""}
        className="max-h-[80vh] max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {photo.caption && (
        <p className="mt-4 max-w-xl text-center text-sm text-white/80">
          {photo.caption}
        </p>
      )}

      {photos.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index + 1) % photos.length)
          }}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
        >
          <ChevronRight className="size-8" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body
  )
}
