import { useQuery } from "@tanstack/react-query"
import { HeartHandshake, UserRound } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { TributeFormDialog } from "@/components/memorial/TributeFormDialog"
import { TributePhoto } from "@/components/memorial/TributePhoto"
import { ReportContributionButton } from "@/components/memorial/ReportContributionButton"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listApprovedContributions } from "@/services/contributions"
import { formatDayMonthYear } from "@/lib/date"

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
  memory: "Memory",
}

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

      <div className="mt-6 flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))
        ) : contributions && contributions.length > 0 ? (
          contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                <Avatar size="lg">
                  {showContributorNames && contribution.authorAvatarUrl && (
                    <AvatarImage
                      src={contribution.authorAvatarUrl}
                      alt=""
                    />
                  )}
                  <AvatarFallback>
                    <UserRound className="size-5" aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">
                      {showContributorNames
                        ? contribution.authorDisplayName
                        : "A well-wisher"}
                    </p>
                    {showContributorNames && contribution.relationship && (
                      <span className="text-sm text-muted-foreground">
                        · {contribution.relationship}
                      </span>
                    )}
                    <Badge variant="secondary">
                      {typeLabels[contribution.type] ?? contribution.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDayMonthYear(contribution.createdAt)}
                  </p>

                  {contribution.title && (
                    <p className="mt-2 font-medium text-foreground">
                      {contribution.title}
                    </p>
                  )}

                  {contribution.photoUrl && <TributePhoto url={contribution.photoUrl} />}

                  <p className="mt-1 whitespace-pre-wrap text-foreground/90">
                    {contribution.message}
                  </p>

                  <div className="mt-3 clear-both">
                    <ReportContributionButton contributionId={contribution.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-10 text-center">
            <HeartHandshake className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              No tributes yet — be the first to share a memory.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
