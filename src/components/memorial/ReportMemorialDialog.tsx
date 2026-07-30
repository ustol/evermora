"use client";

import { useState } from "react"
import { Flag } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
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
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { sanitizeRedirectPath } from "@/lib/utils"

interface ReportMemorialDialogProps {
  memorialId: string
  slug: string
}

export function ReportMemorialDialog({
  memorialId,
  slug,
}: ReportMemorialDialogProps) {
  const { isSignedIn } = useUser()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (reason.trim().length < 5) {
      setError("Please add a few words about the issue.")
      return
    }
    setError(null)
    setSending(true)

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      )
      const { error: insertError } = await supabase
        .from("memorial_reports")
        .insert({ memorial_id: memorialId, reason })
      if (insertError) throw insertError

      toast.success("Thank you — your report has been sent for review.")
      setOpen(false)
      setReason("")
    } catch (err) {
      console.error("report error:", err)
      toast.error("Something went wrong sending your report. Please try again.")
    } finally {
      setSending(false)
    }
  }

  if (!isSignedIn) {
    const redirectUrl = sanitizeRedirectPath(`/memorials/${slug}`)
    return (
      <Link
        href={`/sign-in${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ""}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <Flag className="size-3.5" aria-hidden="true" />
        Report this memorial
      </Link>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Flag className="size-3.5" aria-hidden="true" />
        Report this memorial
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report this memorial</DialogTitle>
            <DialogDescription>
              Let us know what's wrong. A platform administrator will review
              your report.
            </DialogDescription>
          </DialogHeader>

          <Field className="mt-4" data-invalid={!!error}>
            <FieldLabel htmlFor="report-reason">What's the issue?</FieldLabel>
            <Textarea
              id="report-reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the issue with this memorial…"
            />
            {error && <FieldError>{error}</FieldError>}
          </Field>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
