"use client";

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useUser } from "@/hooks/useAuth"
import { HeartHandshake, ImagePlus, X } from "lucide-react"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { cn, sanitizeRedirectPath } from "@/lib/utils"

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface TributeFormDialogProps {
  memorialId: string
  slug: string
  allowTributes: boolean
  allowCondolences: boolean
  requireApproval: boolean
}

export function TributeFormDialog({
  memorialId,
  slug,
  allowTributes,
  allowCondolences,
  requireApproval,
}: TributeFormDialogProps) {
  const { isSignedIn, user } = useUser()
  const supabase = useSupabaseClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dialogToggleId = `tribute-message-dialog-${memorialId}`
  const [submitting, setSubmitting] = useState(false)
  const [type, setType] = useState<"tribute" | "condolence">("tribute")
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [authorRelationship, setAuthorRelationship] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (allowTributes) setType("tribute")
    else if (allowCondolences) setType("condolence")
  }, [allowTributes, allowCondolences])

  function resetForm() {
    setContent("")
    setAuthorName("")
    setAuthorRelationship("")
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
      toast.error("That image is larger than 8MB.")
      return
    }
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
  }

  function setDialogChecked(checked: boolean) {
    const toggle = document.getElementById(dialogToggleId) as HTMLInputElement | null
    if (toggle) toggle.checked = checked
    if (!checked) resetForm()
  }

  function handleDialogToggleKeyDown(e: React.KeyboardEvent<HTMLElement>, checked: boolean) {
    if (e.key !== "Enter" && e.key !== " ") return
    e.preventDefault()
    setDialogChecked(checked)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() && !file) {
      setError("Please add a message or a photo.")
      return
    }
    setError(null)
    setSubmitting(true)

    try {
      let profile: { id: string } | null = null
      if (user) {
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("clerk_user_id", user.id)
          .maybeSingle()
        if (profileError) throw profileError
        profile = data
      }

      if (file && !profile) {
        throw new Error("Please sign in to upload a photo with your message.")
      }

      let photoMediaId: string | null = null
      let uploadedPhotoPath: string | null = null
      if (file && profile) {
        const ext = file.name.split(".").pop() ?? "jpg"
        const path = `${memorialId}/${profile.id}/tributes/${crypto.randomUUID()}.${ext}`
        const { error: uploadError } = await supabase.storage.from("memorial-media").upload(path, file)
        if (uploadError) throw uploadError
        uploadedPhotoPath = path
        const { data: media, error: mediaError } = await supabase
          .from("memorial_media")
          .insert({
            memorial_id: memorialId,
            uploaded_by: profile.id,
            storage_path: path,
            moderation_status: requireApproval ? "pending" : "approved",
          })
          .select("id")
          .single()
        if (mediaError) throw mediaError
        photoMediaId = media.id
      }

      const { error: insertError } = await supabase.from("contributions").insert({
        memorial_id: memorialId,
        author_id: profile?.id ?? null,
        author_name: authorName.trim() || null,
        type,
        relationship: authorRelationship.trim() || null,
        message: content.trim() || "Shared a photo.",
        photo_media_id: photoMediaId,
        status: requireApproval ? "pending" : "approved",
      })
      if (insertError) {
        if (photoMediaId) {
          await supabase.from("memorial_media").delete().eq("id", photoMediaId)
        }
        if (uploadedPhotoPath) {
          await supabase.storage.from("memorial-media").remove([uploadedPhotoPath])
        }
        throw insertError
      }

      toast.success(
        requireApproval
          ? "Thank you — your message has been sent for review."
          : "Thank you — your message has been added."
      )
      setDialogChecked(false)
    } catch (err) {
      console.error("submit error:", err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <input id={dialogToggleId} type="checkbox" className="peer sr-only" aria-hidden="true" tabIndex={-1} />
      <label
        htmlFor={dialogToggleId}
        role="button"
        tabIndex={0}
        data-testid="tribute-form-trigger"
        className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
        onKeyDown={(e) => handleDialogToggleKeyDown(e, true)}
      >
        <HeartHandshake className="size-4" aria-hidden="true" />
        {allowTributes && allowCondolences ? "Leave a message" : allowTributes ? "Leave a tribute" : "Send condolences"}
      </label>

      <div className="fixed inset-0 z-50 hidden items-center justify-center p-4 peer-checked:flex" role="presentation">
        <label
          htmlFor={dialogToggleId}
          className="absolute inset-0 bg-black/10 backdrop-blur-xs"
          aria-label="Close message dialog"
          onClick={resetForm}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tribute-dialog-title"
          aria-describedby="tribute-dialog-description"
          className="relative z-10 grid max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10"
          onKeyDown={(e) => {
            if (e.key === "Escape") setDialogChecked(false)
          }}
        >
          <label
            htmlFor={dialogToggleId}
            role="button"
            tabIndex={0}
            aria-label="Close"
            className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={resetForm}
            onKeyDown={(e) => handleDialogToggleKeyDown(e, false)}
          >
            <X className="size-4" aria-hidden="true" />
          </label>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 pr-8">
              <h2 id="tribute-dialog-title" className="font-heading text-base leading-none font-medium">Leave a message</h2>
              <p id="tribute-dialog-description" className="text-sm text-muted-foreground">
                {requireApproval
                  ? "Your message will be reviewed by the family before it appears."
                  : "Your message will appear publicly."}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {allowTributes && allowCondolences && (
                <div className="flex gap-2">
                  <button type="button" onClick={() => setType("tribute")} className={cn("flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", type === "tribute" ? "border-heritage-gold bg-heritage-gold/10 text-heritage-gold" : "border-border bg-muted")}>
                    Tribute
                  </button>
                  <button type="button" onClick={() => setType("condolence")} className={cn("flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", type === "condolence" ? "border-heritage-gold bg-heritage-gold/10 text-heritage-gold" : "border-border bg-muted")}>
                    Condolence
                  </button>
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="tribute-author">Your name (optional)</FieldLabel>
                <Input id="tribute-author" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Displayed on the memorial" />
              </Field>
              <Field>
                <FieldLabel htmlFor="tribute-relationship">Relationship (optional)</FieldLabel>
                <Input id="tribute-relationship" value={authorRelationship} onChange={(e) => setAuthorRelationship(e.target.value)} placeholder="e.g. Friend, Cousin" />
              </Field>
              <Field data-invalid={!!error}>
                <FieldLabel htmlFor="tribute-content">Message</FieldLabel>
                <Textarea id="tribute-content" rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder={type === "tribute" ? "Share a memory…" : "Send your condolences…"} />
              </Field>

              {/* Message photo attachments are independent of the standalone gallery-photo setting. */}
              <Field>
                <div className="rounded-xl border border-dashed border-border bg-muted/35 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-heritage-gold ring-1 ring-border">
                      <ImagePlus className="size-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <FieldLabel htmlFor={isSignedIn ? "tribute-photo" : undefined}>Photo (optional)</FieldLabel>
                      <FieldDescription>
                        Add a picture to accompany your message. JPEG, PNG, or WebP up to 8MB.
                      </FieldDescription>
                      {isSignedIn ? (
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept={ALLOWED_TYPES.join(",")}
                          onChange={handleFileChange}
                          id="tribute-photo"
                          className="mt-3 bg-background"
                        />
                      ) : (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Please{" "}
                          <Link
                            href={`/sign-in?redirect_url=${encodeURIComponent(sanitizeRedirectPath(`/memorials/${slug}`) ?? "/")}`}
                            className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 text-sm")}
                          >
                            sign in
                          </Link>{" "}
                          to attach a photo. You can still leave a message without one.
                        </p>
                      )}
                    </div>
                  </div>
                  {previewUrl && (
                    <div className="relative mt-3 inline-block overflow-hidden rounded-lg border border-border bg-background">
                      <img src={previewUrl} alt="Selected tribute attachment preview" className="h-32 max-w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null)
                          setPreviewUrl(null)
                          if (fileInputRef.current) fileInputRef.current.value = ""
                        }}
                        className="absolute right-2 top-2 rounded-full bg-background/95 p-1 text-muted-foreground shadow-sm ring-1 ring-border transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Remove selected photo"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </Field>
            </div>

            <div className="-mx-4 -mb-4 mt-6 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end">
              <label
                htmlFor={dialogToggleId}
                role="button"
                tabIndex={0}
                className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
                onClick={resetForm}
                onKeyDown={(e) => handleDialogToggleKeyDown(e, false)}
              >
                Cancel
              </label>
              <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send"}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
