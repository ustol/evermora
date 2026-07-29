import { useState } from "react"
import { Flag } from "lucide-react"
import { useUser } from "@clerk/react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
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
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import { reportContribution } from "@/services/reports"

interface ReportContributionButtonProps {
  contributionId: string
}

export function ReportContributionButton({
  contributionId,
}: ReportContributionButtonProps) {
  const { isSignedIn } = useUser()
  const { data: profile } = useProfile()
  const supabase = useSupabaseClient()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async () => {
      if (!profile) throw new Error("Not signed in")
      await reportContribution(supabase, {
        contributionId,
        reportedBy: profile.id,
        reason,
      })
    },
    onSuccess: () => {
      toast.success("Thank you — your report has been sent for review.")
      setOpen(false)
      setReason("")
    },
    onError: () => {
      toast.error("Something went wrong sending your report. Please try again.")
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (reason.trim().length < 5) {
      setError("Please add a few words about the issue.")
      return
    }
    setError(null)
    mutation.mutate()
  }

  if (!isSignedIn) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Flag className="size-3" aria-hidden="true" />
        Report
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report this message</DialogTitle>
            <DialogDescription>
              Let us know what's wrong. The memorial's owner and a platform
              administrator will review your report.
            </DialogDescription>
          </DialogHeader>

          <Field className="mt-4" data-invalid={!!error}>
            <FieldLabel htmlFor="contribution-report-reason">
              What's the issue?
            </FieldLabel>
            <Textarea
              id="contribution-report-reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the issue with this message…"
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
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sending…" : "Send report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
