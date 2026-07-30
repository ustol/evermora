"use client";

import { Heart, UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatDayMonthYear } from "@/lib/date"

interface TributeCardProps {
  contribution: {
    id: string
    contributionType: string
    title: string | null
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
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {contribution.photoUrl && (
        <img
          src={contribution.photoUrl}
          alt=""
          className="aspect-square w-full object-cover"
        />
      )}

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-6 shrink-0">
              {contribution.photoUrl ? (
                <AvatarImage src={contribution.photoUrl} alt="" />
              ) : (
                <AvatarFallback>
                  <UserRound className="size-3.5 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-heritage-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-heritage-gold">
            <Heart className="size-2.5" aria-hidden="true" />
            {typeLabels[contribution.contributionType] ?? contribution.contributionType}
          </span>
        </div>

        {contribution.title && (
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {contribution.title}
          </p>
        )}

        {contribution.content && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {contribution.content}
          </p>
        )}

        <span className="mt-1 text-xs text-muted-foreground">
          {formatDayMonthYear(contribution.createdAt)}
        </span>
      </div>
    </button>
  )
}
