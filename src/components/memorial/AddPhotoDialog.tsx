"use client"

import { useRef, useState } from "react"
import { ImagePlus } from "lucide-react"
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
import { Button, buttonVariants } from "@/components/ui/button"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface AddPhotoDialogProps {
  memorialId: string
  slug: string
  requireApproval: boolean
}

export function AddPhotoDialog({ slug, requireApproval }: AddPhotoDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [error, setError] = useState<string | null>(null)

  function resetForm() {
    setFile(null)
    setPreviewUrl(null)
    setCaption("")
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
      setError("Please choose a photo to upload.")
      return
    }
    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.set("photo", file)
      formData.set("caption", caption.trim())

      const response = await fetch(`/api/memorials/${encodeURIComponent(slug)}/photos`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
      const result = (await response.json().catch(() => null)) as { error?: string } | null
      if (!response.ok) throw new Error(result?.error ?? "Unable to upload your photo.")

      toast.success(
        requireApproval
          ? "Thank you — your photo has been sent for review."
          : "Thank you — your photo is now in the gallery."
      )
      setOpen(false)
      resetForm()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong uploading your photo. Please try again."
      setError(message)
      toast.error(message)
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
      <DialogTrigger render={<Button variant="outline" />}>
        <ImagePlus className="size-4" aria-hidden="true" />
        Add a photo
      </DialogTrigger>
      <DialogContent>
        <form
          action={`/api/memorials/${encodeURIComponent(slug)}/photos`}
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle>Add a photo</DialogTitle>
            <DialogDescription>
              {requireApproval
                ? "No account is needed. Your photo will be reviewed by the family before it appears."
                : "No account is needed. Your photo will appear in the gallery right away."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="gallery-photo-upload">Photo</FieldLabel>
              <FieldDescription>JPEG, PNG, or WebP up to 8MB.</FieldDescription>
              <Input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                onChange={handleFileChange}
                id="gallery-photo-upload"
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Selected gallery upload preview"
                className="max-h-48 w-full rounded-lg object-contain"
              />
            )}

            <Field>
              <FieldLabel htmlFor="gallery-photo-caption">
                Caption (optional)
              </FieldLabel>
              <FieldDescription>
                A short description of the photo.
              </FieldDescription>
              <Input
                id="gallery-photo-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Family gathering, Christmas 2019"
              />
            </Field>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <button type="submit" disabled={uploading} data-testid="gallery-photo-submit" className={buttonVariants()}>
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
