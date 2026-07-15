import { Link } from "react-router-dom"
import { MapPin, UserRound } from "lucide-react"
import { formatLifespanYears } from "@/lib/date"
import type { MemorialCardData } from "@/types/memorial"

interface MemorialCardProps {
  memorial: MemorialCardData
}

export function MemorialCard({ memorial }: MemorialCardProps) {
  const lifespan = formatLifespanYears(
    memorial.dateOfBirth,
    memorial.dateOfDeath
  )

  return (
    <Link
      to={`/memorials/${memorial.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <div className="size-24 shrink-0 overflow-hidden rounded-full border-2 border-warm-stone bg-muted">
        {memorial.photoUrl ? (
          <img
            src={memorial.photoUrl}
            alt={memorial.photoAlt ?? ""}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <UserRound className="size-10" aria-hidden="true" />
          </div>
        )}
      </div>

      <h3 className="mt-4 font-heading text-lg text-foreground">
        {memorial.displayName}
      </h3>
      {lifespan && (
        <p className="mt-1 text-sm text-muted-foreground">{lifespan}</p>
      )}
      {memorial.hometown && (
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {memorial.hometown}
        </p>
      )}
      {memorial.shortAnnouncement && (
        <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
          {memorial.shortAnnouncement}
        </p>
      )}
    </Link>
  )
}
