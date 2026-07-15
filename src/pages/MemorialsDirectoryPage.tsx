import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { MemorialCard } from "@/components/memorial/MemorialCard"
import { MemorialCardSkeleton } from "@/components/memorial/MemorialCardSkeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { usePublicMemorials } from "@/hooks/useMemorials"
import type { MemorialListFilters } from "@/services/memorials"

const PAGE_SIZE = 12

export default function MemorialsDirectoryPage() {
  const [formState, setFormState] = useState({
    search: "",
    hometown: "",
    yearOfDeath: "",
  })
  const [filters, setFilters] = useState<MemorialListFilters>({
    page: 1,
    pageSize: PAGE_SIZE,
  })

  const { data, isLoading, isError, refetch } = usePublicMemorials(filters)
  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFilters({
      page: 1,
      pageSize: PAGE_SIZE,
      search: formState.search.trim() || undefined,
      hometown: formState.hometown.trim() || undefined,
      yearOfDeath: formState.yearOfDeath
        ? Number(formState.yearOfDeath)
        : undefined,
    })
  }

  function goToPage(page: number) {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Find a memorial"
        description="Search for a published memorial by name, hometown, or year of passing."
      />

      <form
        onSubmit={handleSearchSubmit}
        className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4"
      >
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="search">Name</FieldLabel>
          <Input
            id="search"
            placeholder="e.g. Ama Serwaa"
            value={formState.search}
            onChange={(e) =>
              setFormState((s) => ({ ...s, search: e.target.value }))
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="hometown">Hometown</FieldLabel>
          <Input
            id="hometown"
            placeholder="e.g. Kumasi"
            value={formState.hometown}
            onChange={(e) =>
              setFormState((s) => ({ ...s, hometown: e.target.value }))
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="year">Year of passing</FieldLabel>
          <Input
            id="year"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 2026"
            value={formState.yearOfDeath}
            onChange={(e) =>
              setFormState((s) => ({ ...s, yearOfDeath: e.target.value }))
            }
          />
        </Field>
        <div className="sm:col-span-4">
          <Button type="submit">
            <Search className="size-4" aria-hidden="true" />
            Search
          </Button>
        </div>
      </form>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MemorialCardSkeleton key={i} />
          ))}
        </div>
      ) : data && data.memorials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.memorials.map((memorial) => (
              <MemorialCard
                key={memorial.id}
                memorial={{
                  id: memorial.id,
                  slug: memorial.slug,
                  displayName: memorial.display_name,
                  photoUrl: memorial.photoUrl,
                  photoAlt: memorial.primary_photo_alt,
                  dateOfBirth: memorial.date_of_birth,
                  dateOfDeath: memorial.date_of_death,
                  hometown: memorial.hometown,
                  shortAnnouncement: memorial.announcement,
                }}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                disabled={(filters.page ?? 1) <= 1}
                onClick={() => goToPage((filters.page ?? 1) - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {filters.page ?? 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={(filters.page ?? 1) >= totalPages}
                onClick={() => goToPage((filters.page ?? 1) + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Search}
          title="No memorials found"
          description="Try a different name, hometown, or year — or check back later as more memorials are published."
        />
      )}
    </Container>
  )
}
