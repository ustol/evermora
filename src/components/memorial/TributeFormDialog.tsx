"use client";

import { useEffect, useRef, useState } from "react"
import { createClient } from "@supabase/supabase-js"
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
  allowPhotos: boolean
  requireApproval: boolean
}

export function TributeFormDialog({
  memorialId,
  slug,
  allowTributes,
  allowCondolences,
  allowPhotos,
  requireApproval,
}: TributeFormDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() && !file) {
      setError("Please add a message or a photo.")
      return
    }
    setError(null)
    setSubmitting(true)

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        { auth: { persistSession: false } }
      )

      let photoPath: string | null = null
      if (file) {
        const ext = file.name.split(".").pop() ?? "jpg"
        const path = `${memorialId}/tributes/${crypto.randomUUID()}.${ext}`
        const { error: uploadError } = await supabase.storage.from("memorial-media").upload(path, file)
        if (uploadError) throw uploadError
        photoPath = path
      }

      const { error: insertError } = await supabase.from("contributions").insert({
        memorial_id: memorialId,
        contribution_type: type,
        content: content.trim() || null,
        photo_path: photoPath,
        author_name: authorName.trim() || null,
        author_relationship: authorRelationship.trim() || null,
        status: requireApproval ? "pending" : "auto_approved",
      })
      if (insertError) throw insertError

      toast.success(
        requireApproval
          ? "Thank you — your message has been sent for review."
          : "Thank you — your message has been added."
      )
      setOpen(false)
      resetForm()
    } catch (err) {
      console.error("submit error:", err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
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
        <HeartHandshake className="size-4" aria-hidden="true" />
        {allowTributes && allowCondolences ? "Leave a message" : allowTributes ? "Leave a tribute" : "Send condolences"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Leave a message</DialogTitle>
            <DialogDescription>
              {requireApproval
                ? "Your message will be reviewed by the family before it appears."
                : "Your message will appear publicly."}
            </DialogDescription>
          </DialogHeader>

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

            {allowPhotos && (
              <Field>
                <FieldLabel htmlFor="tribute-photo">Photo (optional)</FieldLabel>
                <Input ref={fileInputRef} type="file" accept={ALLOWED_TYPES.join(",")} onChange={handleFileChange} id="tribute-photo" />
                {previewUrl && (
                  <div className="relative mt-2 inline-block">
                    <img src={previewUrl} alt="" className="h-32 rounded-lg object-cover" />
                    <button type="button" onClick={() => { setFile(null); setPreviewUrl(null); }} className="absolute -top-2 -right-2 rounded-full bg-background p-0.5 shadow-sm">
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </Field>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
