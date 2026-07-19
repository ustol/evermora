import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HeartHandshake } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { TributeFormDialog } from "@/components/memorial/TributeFormDialog"
import { TributeCard } from "@/components/memorial/TributeCard"
import { TributeDetailDialog } from "@/components/memorial/TributeDetailDialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listApprovedContributions, type ContributionWithAuthor } from "@/services/contributions"

interface TributesSectionProps {
  memorialId: string
  slug: string
  allowTributes: boolean
  allowCondolences: boolean
  allowContributorPhotos: boolean
  requireApproval: boolean
  showContributorNames: boolean
}

export function TributesSection({
  memorialId,
  slug,
  allowTributes,
  allowCondolences,
  allowContributorPhotos,
  requireApproval,
  showContributorNames,
}: TributesSectionProps) {
  const supabase = useSupabaseClient()
  const [selected, setSelected] = useState<ContributionWithAuthor | null>(null)

  const { data: contributions, isLoading } = useQuery({
    queryKey: ["memorial-contributions", memorialId],
    queryFn: () => listApprovedContributions(supabase, memorialId),
  })

  const canContribute = allowTributes || allowCondolences

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-xl text-foreground">
          Tributes & Condolences
          {contributions && contributions.length > 0 && (
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({contributions.length})
            </span>
          )}
        </h2>
        {canContribute && (
          <TributeFormDialog
            memorialId={memorialId}
            slug={slug}
            allowTributes={allowTributes}
            allowCondolences={allowCondolences}
            allowPhotos={allowContributorPhotos}
            requireApproval={requireApproval}
          />
        )}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : contributions && contributions.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {contributions.map((contribution) => (
              <TributeCard
                key={contribution.id}
                contribution={contribution}
                showContributorNames={showContributorNames}
                onOpen={() => setSelected(contribution)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-10 text-center">
            <HeartHandshake className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              No tributes yet — be the first to share a memory.
            </p>
          </div>
        )}
      </div>

      <TributeDetailDialog
        contribution={selected}
        showContributorNames={showContributorNames}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
