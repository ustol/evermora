import { UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDayMonthYear } from "@/lib/date"
import type { ContributionWithAuthor } from "@/services/contributions"

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
  memory: "Memory",
}

interface TributeCardProps {
  contribution: ContributionWithAuthor
  showContributorNames: boolean
  onOpen: () => void
}

export function TributeCard({ contribution, showContributorNames, onOpen }: TributeCardProps) {
  const displayName = showContributorNames ? contribution.authorDisplayName : "A well-wisher"

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {contribution.photoUrl && (
        <div className="aspect-square w-full overflow-hidden bg-muted">
          <img
            src={contribution.photoUrl}
            alt=""
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            {showContributorNames && contribution.authorAvatarUrl && (
              <AvatarImage src={contribution.authorAvatarUrl} alt="" />
            )}
            <AvatarFallback>
              <UserRound className="size-3.5" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
            {displayName}
          </span>
          <Badge variant="secondary" className="shrink-0">
            {typeLabels[contribution.type] ?? contribution.type}
          </Badge>
        </div>

        {contribution.title && (
          <p className="line-clamp-1 font-medium text-foreground">{contribution.title}</p>
        )}
        <p className="line-clamp-3 flex-1 text-sm text-foreground/80">
          {contribution.message}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDayMonthYear(contribution.createdAt)}
        </p>
      </div>
    </button>
  )
}
