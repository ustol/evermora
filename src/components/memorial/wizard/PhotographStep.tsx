import { useRef, useState } from "react"
import { ImagePlus, X, UserRound } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB, matches the memorial-media bucket limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface PhotographStepProps {
  currentPhotoUrl: string | null
  currentPhotoAlt: string
  onSubmit: (result: { file: File | null; removed: boolean; alt: string }) => void
  onBack: () => void
  submitting?: boolean
}

export function PhotographStep({
  currentPhotoUrl,
  currentPhotoAlt,
  onSubmit,
  onBack,
  submitting,
}: PhotographStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl)
  const [removed, setRemoved] = useState(false)
  const [alt, setAlt] = useState(currentPhotoAlt)

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
    setRemoved(false)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  function handleRemove() {
    setFile(null)
    setPreviewUrl(null)
    setRemoved(true)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleContinue() {
    onSubmit({ file, removed, alt })
  }

  return (
    <div>
      <Field>
        <FieldLabel>Primary portrait</FieldLabel>
        <FieldDescription>
          JPEG, PNG, or WebP — up to 8MB. This photograph appears at the top
          of the memorial page.
        </FieldDescription>

        <div className="mt-3 flex items-center gap-6">
          <div className="flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-12 text-muted-foreground" aria-hidden="true" />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleFileChange}
              className="hidden"
              id="portrait-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="size-4" aria-hidden="true" />
              {previewUrl ? "Replace photo" : "Choose photo"}
            </Button>
            {previewUrl && (
              <Button type="button" variant="ghost" onClick={handleRemove}>
                <X className="size-4" aria-hidden="true" />
                Remove photo
              </Button>
            )}
          </div>
        </div>
      </Field>

      {previewUrl && (
        <Field className="mt-6">
          <FieldLabel htmlFor="photo-alt">Photo description</FieldLabel>
          <FieldDescription>
            A short description for screen readers, e.g. “Portrait of Ama
            Serwaa smiling, wearing a blue kente cloth.”
          </FieldDescription>
          <Input
            id="photo-alt"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe the photograph"
          />
        </Field>
      )}

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={handleContinue} disabled={submitting}>
          {submitting ? "Saving…" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
