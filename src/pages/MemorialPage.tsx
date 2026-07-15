import { useParams } from "react-router-dom"
import { MapPin, UserRound, CalendarDays, Clock, Navigation } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { ShareMemorialButton } from "@/components/memorial/ShareMemorialButton"
import { ReportMemorialDialog } from "@/components/memorial/ReportMemorialDialog"
import { MemorialGiftsSection } from "@/components/memorial/MemorialGiftsSection"
import { TributesSection } from "@/components/memorial/TributesSection"
import { useMemorialBySlug } from "@/hooks/useMemorials"
import { calculateAge, formatDayMonthYear, formatLifespanYears } from "@/lib/date"

const eventTypeLabels: Record<string, string> = {
  wake: "Wake",
  burial: "Burial",
  funeral_service: "Funeral service",
  thanksgiving_service: "Thanksgiving service",
  reception: "Reception",
  other: "Event",
}

export default function MemorialPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, refetch } = useMemorialBySlug(slug)

  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Skeleton className="size-40 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className="py-16">
        <ErrorState onRetry={() => refetch()} />
      </Container>
    )
  }

  if (!data || !data.memorial) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Memorial not found"
          description="This memorial may be private, unpublished, or the link may be incorrect."
        />
      </Container>
    )
  }

  const { memorial, events, photoUrl } = data
  const age = calculateAge(memorial.date_of_birth, memorial.date_of_death)
  const lifespan = formatLifespanYears(memorial.date_of_birth, memorial.date_of_death)

  return (
    <Container className="max-w-6xl py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="size-40 overflow-hidden rounded-full border-4 border-card bg-muted shadow-sm">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={memorial.primary_photo_alt ?? ""}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-muted-foreground">
                  <UserRound className="size-16" aria-hidden="true" />
                </div>
              )}
            </div>

            <h1 className="mt-6 font-heading text-3xl text-foreground sm:text-4xl">
              {memorial.display_name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {lifespan}
              {age !== null && ` · Age ${age}`}
            </p>
            {memorial.hometown && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" />
                {memorial.hometown}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <ShareMemorialButton
                slug={memorial.slug}
                displayName={memorial.display_name}
              />
            </div>
          </div>

          {memorial.announcement && (
            <p className="mt-10 text-center font-heading text-lg text-foreground/90 italic">
              "{memorial.announcement}"
            </p>
          )}

          {(memorial.biography || memorial.obituary) && (
            <section className="mt-12">
              <h2 className="font-heading text-xl text-foreground">Life story</h2>
              <div className="mt-4 flex flex-col gap-4 text-foreground/90">
                {memorial.biography && <p>{memorial.biography}</p>}
                {memorial.obituary && <p>{memorial.obituary}</p>}
              </div>
            </section>
          )}

          {memorial.family_message && (
            <section className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-heading text-lg text-foreground">
                A message from the family
              </h2>
              <p className="mt-2 text-foreground/90">{memorial.family_message}</p>
            </section>
          )}

          {memorial.quotation && (
            <p className="mt-10 text-center text-muted-foreground italic">
              {memorial.quotation}
            </p>
          )}

          {events.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-xl text-foreground">
                Funeral programme
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <p className="text-xs font-medium tracking-wide text-heritage-gold uppercase">
                      {eventTypeLabels[event.event_type] ?? event.event_type}
                    </p>
                    <h3 className="mt-1 font-heading text-lg text-foreground">
                      {event.title}
                    </h3>
                    <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1.5">
                        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                        {formatDayMonthYear(event.event_date)}
                        {event.start_time && ` · ${event.start_time}`}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="size-4 shrink-0" aria-hidden="true" />
                        {event.venue}, {event.town_city}
                        {event.country ? `, ${event.country}` : ""}
                      </p>
                      {event.dress_code && (
                        <p className="flex items-center gap-1.5">
                          <Clock className="size-4 shrink-0" aria-hidden="true" />
                          Dress code: {event.dress_code}
                        </p>
                      )}
                      {event.directions_url && (
                        <a
                          href={event.directions_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-heritage-gold hover:underline"
                        >
                          <Navigation className="size-4 shrink-0" aria-hidden="true" />
                          Get directions
                        </a>
                      )}
                      {event.additional_instructions && (
                        <p className="mt-1">{event.additional_instructions}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <TributesSection
            memorialId={memorial.id}
            slug={memorial.slug}
            allowTributes={memorial.allow_tributes}
            allowCondolences={memorial.allow_condolences}
            allowContributorPhotos={memorial.allow_contributor_photos}
            requireApproval={memorial.require_approval}
            showContributorNames={memorial.show_contributor_names}
          />

          <div className="mt-16 flex justify-center border-t border-border/60 pt-8">
            <ReportMemorialDialog memorialId={memorial.id} slug={memorial.slug} />
          </div>
        </div>

        <MemorialGiftsSection memorialId={memorial.id} slug={memorial.slug} />
      </div>
    </Container>
  )
}
