import { Link } from "react-router-dom"
import { UserRound, Eye, Pencil, Settings, MessageSquareText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatLifespanYears } from "@/lib/date"
import type { MemorialWithPhoto } from "@/services/memorials"

interface OwnerMemorialCardProps {
  memorial: MemorialWithPhoto
}

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-success/10 text-success",
  archived: "bg-muted-taupe/10 text-muted-taupe",
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
}

export function OwnerMemorialCard({ memorial }: OwnerMemorialCardProps) {
  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death)

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-4 p-5">
        <div className="size-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          {memorial.photoUrl ? (
            <img
              src={memorial.photoUrl}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <UserRound className="size-7" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-heading text-lg text-foreground">
              {memorial.display_name}
            </h3>
            <Badge className={statusStyles[memorial.status]}>
              {statusLabels[memorial.status]}
            </Badge>
          </div>
          {lifespan && <p className="text-sm text-muted-foreground">{lifespan}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border/60 bg-muted/30 px-5 py-3">
        {memorial.status === "published" && (
          <Link
            to={`/memorials/${memorial.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
          >
            <Eye className="size-4" aria-hidden="true" />
            View
          </Link>
        )}
        <Link
          to={`/dashboard/memorials/${memorial.id}/edit`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </Link>
        <Link
          to={`/dashboard/memorials/${memorial.id}/content`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <MessageSquareText className="size-4" aria-hidden="true" />
          Moderate
        </Link>
        <Link
          to={`/dashboard/memorials/${memorial.id}/settings`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-heritage-gold"
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Link>
      </div>
    </div>
  )
}
