import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import { uploadMediaPhoto } from "@/services/media"
import { cn, sanitizeRedirectPath } from "@/lib/utils"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface AddPhotoDialogProps {
  memorialId: string
  slug: string
  requireApproval: boolean
}

export function AddPhotoDialog({ memorialId, slug, requireApproval }: AddPhotoDialogProps) {
  const { isSignedIn } = useUser()
  const { data: profile } = useProfile()
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async () => {
      if (!profile || !file) throw new Error("Missing file or profile")
      await uploadMediaPhoto(supabase, {
        memorialId,
        uploaderProfileId: profile.id,
        file,
        caption: caption.trim() || undefined,
      })
    },
    onSuccess: () => {
      toast.success(
        requireApproval
          ? "Thank you — your photo has been sent for review."
          : "Thank you — your photo is now in the gallery."
      )
      queryClient.invalidateQueries({ queryKey: ["memorial-gallery", memorialId] })
      setOpen(false)
      resetForm()
    },
    onError: () => {
      toast.error("Something went wrong uploading your photo. Please try again.")
    },
  })

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) {
      setError("Please choose a photo to upload.")
      return
    }
    setError(null)
    mutation.mutate()
  }

  if (!isSignedIn) {
    const redirectUrl = sanitizeRedirectPath(`/memorials/${slug}`)
    return (
      <Link
        to={`/sign-in${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <ImagePlus className="size-4" aria-hidden="true" />
        Add a photo
      </Link>
    )
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a photo</DialogTitle>
            <DialogDescription>
              {requireApproval
                ? "Your photo will be reviewed by the family before it appears."
                : "Your photo will appear in the gallery right away."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="gallery-photo-upload">Photo</FieldLabel>
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
                alt=""
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
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Uploading…" : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
