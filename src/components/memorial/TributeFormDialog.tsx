import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { HeartHandshake, ImagePlus, X } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import {
  createContribution,
  uploadContributionPhoto,
} from "@/services/contributions"
import type { Database } from "@/types/supabase"

type ContributionType = Database["public"]["Enums"]["contribution_type"]

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface TributeFormDialogProps {
  memorialId: string
  slug: string
  allowTributes: boolean
  allowCondolences: boolean
  allowPhotos: boolean
  requireApproval: boolean
}

export function TributeFormDialog({
  memorialId,
  allowTributes,
  allowCondolences,
  allowPhotos,
  requireApproval,
}: TributeFormDialogProps) {
  const { data: profile } = useProfile()
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [type, setType] = useState<ContributionType>(
    allowTributes ? "tribute" : "condolence"
  )
  const [authorName, setAuthorName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async () => {
      let photoMediaId: string | undefined
      if (file && profile) {
        photoMediaId = await uploadContributionPhoto(supabase, {
          memorialId,
          uploaderProfileId: profile.id,
          file,
        })
      }

      await createContribution(supabase, {
        memorialId,
        authorId: profile?.id,
        authorName: profile ? undefined : authorName.trim(),
        type,
        relationship: relationship.trim() || undefined,
        title: title.trim() || undefined,
        message: message.trim(),
        photoMediaId,
      })
    },
    onSuccess: () => {
      toast.success(
        requireApproval
          ? "Thank you — your message has been sent for review."
          : "Thank you — your message is now on the memorial."
      )
      queryClient.invalidateQueries({ queryKey: ["memorial-contributions", memorialId] })
      setOpen(false)
      resetForm()
    },
    onError: () => {
      toast.error("Something went wrong sending your message. Please try again.")
    },
  })

  function resetForm() {
    setAuthorName("")
    setRelationship("")
    setTitle("")
    setMessage("")
    setFile(null)
    setPreviewUrl(null)
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
    setPreviewUrl(URL.createObjectURL(selected))
  }

  function handleRemovePhoto() {
    setFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile && !authorName.trim()) {
      setError("Please enter your name.")
      return
    }
    if (message.trim().length < 5) {
      setError("Please write a few words for your message.")
      return
    }
    setError(null)
    mutation.mutate()
  }

  const triggerLabel =
    allowTributes && allowCondolences
      ? "Leave a tribute or condolence"
      : allowCondolences
        ? "Leave a condolence"
        : "Leave a tribute"

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) resetForm()
      }}
    >
      <DialogTrigger render={<Button />}>
        <HeartHandshake className="size-4" aria-hidden="true" />
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{triggerLabel}</DialogTitle>
            <DialogDescription>
              {requireApproval
                ? "Your message will be reviewed by the family before it appears."
                : "Your message will appear on the memorial right away."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-4">
            {allowTributes && allowCondolences && (
              <Tabs value={type} onValueChange={(v) => setType(v as ContributionType)}>
                <TabsList className="w-full">
                  <TabsTrigger value="tribute">Tribute</TabsTrigger>
                  <TabsTrigger value="condolence">Condolence</TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {!profile && (
              <Field data-invalid={!!error}>
                <FieldLabel htmlFor="tribute-author-name">Your name</FieldLabel>
                <Input
                  id="tribute-author-name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. your name, or a group like &quot;The Mensah Family&quot;"
                />
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="tribute-relationship">
                Your relationship (optional)
              </FieldLabel>
              <Input
                id="tribute-relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Daughter, Friend, Colleague"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tribute-title">Title (optional)</FieldLabel>
              <Input
                id="tribute-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your message a title"
              />
            </Field>

            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="tribute-message">Your message</FieldLabel>
              <Textarea
                id="tribute-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a memory, tribute, or words of comfort…"
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>

            {allowPhotos && profile && (
              <Field>
                <FieldLabel>Photo (optional)</FieldLabel>
                <FieldDescription>
                  JPEG, PNG, or WebP — up to 8MB.
                </FieldDescription>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={ALLOWED_TYPES.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                  id="tribute-photo-upload"
                />
                {previewUrl ? (
                  <div className="mt-1 flex items-center gap-3">
                    <img
                      src={previewUrl}
                      alt=""
                      className="size-16 rounded-lg object-cover"
                    />
                    <Button type="button" variant="ghost" onClick={handleRemovePhoto}>
                      <X className="size-4" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-1 w-fit"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="size-4" aria-hidden="true" />
                    Add a photo
                  </Button>
                )}
              </Field>
            )}
            {allowPhotos && !profile && (
              <p className="text-xs text-muted-foreground">
                Sign in if you'd like to attach a photo to your message.
              </p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sending…" : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
