"use client"

import { useRef, useState } from "react"
import { ImagePlus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface UpdateFeaturedImageDialogProps {
  /** Full API endpoint that accepts a `file` + `alt` FormData POST. */
  endpoint: string
  memorialName: string
  currentAlt: string | null
  /** Signed URL of the existing portrait, shown until a new file is chosen. */
  currentPhotoUrl?: string | null
  triggerLabel?: string
  onUpdated: () => void
}

export function UpdateFeaturedImageDialog({
  endpoint,
  memorialName,
  currentAlt,
  currentPhotoUrl,
  triggerLabel = "Change image",
  onUpdated,
}: UpdateFeaturedImageDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [alt, setAlt] = useState(currentAlt ?? "")
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  function resetForm() {
    setFile(null)
    setPreviewUrl(null)
    setAlt(currentAlt ?? "")
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error("Please choose a JPEG, PNG, or WebP image.")
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      toast.error("That image is larger than 8MB. Please choose a smaller file.")
      return
    }

    setFile(selected)
    setError(null)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setError("Please choose a new image to upload.")
      return
    }
    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("alt", alt.trim())

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Upload failed")

      toast.success("Featured image updated.")
      setOpen(false)
      resetForm()
      onUpdated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) resetForm()
      }}
    >
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <ImagePlus className="size-3.5" />
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update featured image</DialogTitle>
            <DialogDescription>
              Replace the portrait shown for {memorialName}. JPEG, PNG, or WebP — up to 8MB.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="featured-image-upload">New image</FieldLabel>
              <Input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                onChange={handleFileChange}
                id="featured-image-upload"
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>

            {(currentPhotoUrl || previewUrl) && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {previewUrl ? "New image" : "Current image"}
                </span>
                <img
                  src={previewUrl ?? currentPhotoUrl ?? ""}
                  alt={
                    previewUrl
                      ? "Preview of the new featured image"
                      : `Current featured image for ${memorialName}`
                  }
                  className="size-32 rounded-full border border-border object-cover"
                />
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="featured-image-alt">Photo description (optional)</FieldLabel>
              <FieldDescription>
                A short description for screen readers.
              </FieldDescription>
              <Input
                id="featured-image-alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder={`Portrait of ${memorialName}`}
              />
            </Field>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save image"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
