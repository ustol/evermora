"use client"

import { useMemo, useState } from "react"
import { Check, Clock, MessageSquareText, ShieldCheck, X } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase-browser"
import { formatDayMonthYear } from "@/lib/date"
import { cn } from "@/lib/utils"
import { moderateContribution, type ContributionWithAuthor } from "@/services/contributions"
import { Button } from "@/components/ui/button"

type ReviewStatus = "approved" | "rejected"

const statusStyles: Record<string, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300",
  rejected: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300",
  flagged: "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-300",
}

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
  memory: "Memory",
}

interface ContributionModerationPanelProps {
  initialContributions: ContributionWithAuthor[]
}

export function ContributionModerationPanel({ initialContributions }: ContributionModerationPanelProps) {
  const [supabase] = useState(() => createClient())
  const [contributions, setContributions] = useState(initialContributions)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const pendingCount = useMemo(
    () => contributions.filter((contribution) => contribution.status === "pending").length,
    [contributions]
  )

  async function handleModerate(contributionId: string, status: ReviewStatus) {
    setUpdatingId(contributionId)
    const contribution = contributions.find((c) => c.id === contributionId)

    try {
      await moderateContribution(supabase, contributionId, status, contribution?.photoMediaId)
      setContributions((current) =>
        current.map((contribution) =>
          contribution.id === contributionId ? { ...contribution, status } : contribution
        )
      )
      toast.success(status === "approved" ? "Contribution approved for publication." : "Contribution rejected.")
    } catch {
      toast.error("Could not update this contribution. Please try again.")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-border bg-card/80 p-5 shadow-sm sm:p-6" aria-labelledby="contribution-review-title">
      <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-heritage-gold">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Owner review queue
          </div>
          <h2 id="contribution-review-title" className="mt-2 font-heading text-xl text-foreground">
            Tributes & condolences
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Review guest submissions before they appear publicly on this memorial. Approving publishes the contribution; rejecting keeps it hidden.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" aria-hidden="true" />
          {pendingCount} pending
        </div>
      </div>

      {contributions.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background/60 py-10 text-center">
          <MessageSquareText className="size-6 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm font-medium text-foreground">No submissions yet</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Tributes and condolences from visitors will appear here for review.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {contributions.map((contribution) => (
            <article key={contribution.id} className="rounded-2xl border border-border bg-background p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {typeLabels[contribution.type] ?? contribution.type}
                    </span>
                    <span className={cn("rounded-full border px-2.5 py-1 text-xs font-medium capitalize", statusStyles[contribution.status] ?? "border-border bg-muted text-muted-foreground")}>
                      {contribution.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDayMonthYear(contribution.createdAt)}</span>
                  </div>

                  <div className="mt-3">
                    <p className="font-medium text-foreground">{contribution.authorDisplayName}</p>
                    {contribution.relationship && (
                      <p className="text-sm text-muted-foreground">{contribution.relationship}</p>
                    )}
                  </div>

                  {contribution.title && <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-foreground">{contribution.title}</h3>}
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">{contribution.message}</p>
                </div>

                {contribution.photoUrl && (
                  <img src={contribution.photoUrl} alt="" className="aspect-square w-full rounded-xl object-cover sm:w-40" />
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleModerate(contribution.id, "approved")}
                  disabled={updatingId !== null || contribution.status === "approved"}
                  className="gap-2"
                >
                  <Check className="size-4" aria-hidden="true" />
                  Approve
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleModerate(contribution.id, "rejected")}
                  disabled={updatingId !== null || contribution.status === "rejected"}
                  className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="size-4" aria-hidden="true" />
                  Reject
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
