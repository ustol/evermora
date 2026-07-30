"use client";

import { Heart, UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatDayMonthYear } from "@/lib/date"

interface TributeCardProps {
  contribution: {
    id: string
    contributionType: string
    content: string | null
    photoUrl: string | null
    authorName: string | null
    relationship: string | null
    createdAt: string
  }
  showContributorNames: boolean
  onOpen: () => void
}

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
}

export function TributeCard({ contribution, showContributorNames, onOpen }: TributeCardProps) {
  const displayName = showContributorNames ? (contribution.authorName || "A well-wisher") : "A well-wisher"

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          {contribution.photoUrl ? (
            <AvatarImage src={contribution.photoUrl} alt="" />
          ) : (
            <AvatarFallback>
              <UserRound className="size-4 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
          {contribution.relationship && (
            <p className="truncate text-xs text-muted-foreground">{contribution.relationship}</p>
          )}
        </div>
      </div>

      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-heritage-gold/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-heritage-gold">
        <Heart className="size-3" aria-hidden="true" />
        {typeLabels[contribution.contributionType] ?? contribution.contributionType}
      </span>

      {contribution.content && (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {contribution.content}
        </p>
      )}

      <span className="mt-auto text-xs text-muted-foreground">
        {formatDayMonthYear(contribution.createdAt)}
      </span>
    </button>
  )
}
