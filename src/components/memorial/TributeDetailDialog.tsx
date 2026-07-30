"use client";

import { UserRound } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TributePhoto } from "@/components/memorial/TributePhoto"
import { ReportContributionButton } from "@/components/memorial/ReportContributionButton"
import { formatDayMonthYear } from "@/lib/date"

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
}

interface TributeDetailDialogProps {
  contribution: {
    id: string
    contributionType: string
    title: string | null
    content: string | null
    photoUrl: string | null
    authorName: string | null
    relationship: string | null
    createdAt: string
  } | null
  showContributorNames: boolean
  onClose: () => void
}

export function TributeDetailDialog({
  contribution,
  showContributorNames,
  onClose,
}: TributeDetailDialogProps) {
  const displayName = contribution
    ? showContributorNames
      ? contribution.authorName ?? "Anonymous"
      : "A well-wisher"
    : ""

  return (
    <Dialog open={!!contribution} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {contribution && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <UserRound className="size-5" aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <DialogTitle className="text-base">{displayName}</DialogTitle>
                    <Badge variant="secondary">
                      {typeLabels[contribution.contributionType] ?? contribution.contributionType}
                    </Badge>
                  </div>
                  <DialogDescription className="text-left">
                    {showContributorNames && contribution.relationship
                      ? `${contribution.relationship} · `
                      : ""}
                    {formatDayMonthYear(contribution.createdAt)}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {contribution.photoUrl && <TributePhoto url={contribution.photoUrl} />}

            {contribution.title && (
              <p className="font-semibold uppercase tracking-wide text-foreground">
                {contribution.title}
              </p>
            )}

            <p className="clear-both whitespace-pre-wrap text-foreground/90">
              {contribution.content}
            </p>

            <div className="border-t border-border/60 pt-3">
              <ReportContributionButton contributionId={contribution.id} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
