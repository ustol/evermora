"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Trash2, Loader2, Upload } from "lucide-react"
import type { MediaItem } from "@/services/media"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-browser"

interface Props {
  memorialId: string
  photos: MediaItem[]
}

export function GalleryClient({ memorialId, photos: initialPhotos }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState(initialPhotos)
  const [uploading, setUploading] = useState(false)
  const [supabase] = useState(() => createClient())

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("memorialId", memorialId)

      const res = await fetch("/api/dashboard/memorials/upload-photo", { method: "POST", body: formData })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Upload failed")

      // Reload photos after upload
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { listMediaForModeration } = await import("@/services/media")
        const updated = await listMediaForModeration(supabase, memorialId)
        setPhotos(updated)
      }
      toast.success("Photo added.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  async function handleDelete(mediaId: string) {
    try {
      const res = await fetch(`/api/dashboard/memorials/${memorialId}/media/${mediaId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      setPhotos(photos.filter((p) => p.id !== mediaId))
      toast.success("Photo removed.")
    } catch {
      toast.error("Couldn't delete photo.")
    }
  }

  return (
    <div className="mt-6 max-w-2xl">
      {/* Upload button */}
      <div className="mb-6">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? (
            <><Loader2 className="mr-2 size-4 animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="mr-2 size-4" /> Add photo</>
          )}
        </Button>
      </div>

      {/* Photo grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-muted-foreground">No photos yet. Click &ldquo;Add photo&rdquo; to upload the first one.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              {photo.url ? (
                <img src={photo.url} alt={photo.altText ?? ""} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-xs text-muted-foreground">No preview</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleDelete(photo.id)}
                  className="flex size-9 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/80"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              {photo.status !== "approved" && (
                <span className="absolute top-2 left-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  {photo.status}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
