import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, MessageSquareText, Trash2, UserRound, X, Flag } from "lucide-react"
import { toast } from "sonner"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import {
  listContributionsForModeration,
  moderateContribution,
  deleteContribution,
  type ContributionWithAuthor,
} from "@/services/contributions"
import { getMemorialById } from "@/services/memorials"
import { formatDayMonthYear } from "@/lib/date"

const typeLabels: Record<string, string> = {
  tribute: "Tribute",
  condolence: "Condolence",
  memory: "Memory",
}

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  flagged: "bg-heritage-gold/10 text-heritage-gold",
}

const tabs = ["pending", "approved", "rejected", "flagged"] as const
type StatusTab = (typeof tabs)[number]

const tabLabels: Record<StatusTab, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  flagged: "Flagged",
}

interface ContributionRowProps {
  contribution: ContributionWithAuthor
  memorialId: string
}

function ContributionRow({ contribution, memorialId }: ContributionRowProps) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["moderation-contributions", memorialId],
    })

  const moderateMutation = useMutation({
    mutationFn: (status: "approved" | "rejected" | "flagged") =>
      moderateContribution(supabase, contribution.id, status),
    onSuccess: (_data, status) => {
      toast.success(`Message ${status}.`)
      invalidate()
    },
    onError: () => toast.error("Couldn't update this message. Please try again."),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteContribution(supabase, contribution.id),
    onSuccess: () => {
      toast.success("Message deleted.")
      invalidate()
    },
    onError: () => toast.error("Couldn't delete this message. Please try again."),
  })

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <Avatar size="lg">
          {contribution.authorAvatarUrl && (
            <AvatarImage src={contribution.authorAvatarUrl} alt="" />
          )}
          <AvatarFallback>
            <UserRound className="size-5" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-foreground">
              {contribution.authorDisplayName}
            </p>
            {contribution.relationship && (
              <span className="text-sm text-muted-foreground">
                · {contribution.relationship}
              </span>
            )}
            <Badge variant="secondary">
              {typeLabels[contribution.type] ?? contribution.type}
            </Badge>
            <Badge className={statusStyles[contribution.status]}>
              {contribution.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDayMonthYear(contribution.createdAt)}
          </p>

          {contribution.title && (
            <p className="mt-2 font-medium text-foreground">{contribution.title}</p>
          )}
          <p className="mt-1 whitespace-pre-wrap text-foreground/90">
            {contribution.message}
          </p>

          {contribution.photoUrl && (
            <img
              src={contribution.photoUrl}
              alt=""
              className="mt-3 max-h-48 rounded-lg object-cover"
            />
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {contribution.status !== "approved" && (
              <Button
                size="sm"
                onClick={() => moderateMutation.mutate("approved")}
                disabled={moderateMutation.isPending}
              >
                <Check className="size-4" aria-hidden="true" />
                Approve
              </Button>
            )}
            {contribution.status !== "rejected" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => moderateMutation.mutate("rejected")}
                disabled={moderateMutation.isPending}
              >
                <X className="size-4" aria-hidden="true" />
                Reject
              </Button>
            )}
            {contribution.status !== "flagged" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => moderateMutation.mutate("flagged")}
                disabled={moderateMutation.isPending}
              >
                <Flag className="size-4" aria-hidden="true" />
                Flag
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive/80"
                  />
                }
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove this message from the memorial.
                    This can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate()}
                  >
                    {deleteMutation.isPending ? "Deleting…" : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MemorialContentPage() {
  const { id } = useParams<{ id: string }>()
  const supabase = useSupabaseClient()
  const [tab, setTab] = useState<StatusTab>("pending")

  const { data: memorial } = useQuery({
    queryKey: ["memorial-by-id", id],
    queryFn: () => getMemorialById(supabase, id!),
    enabled: !!id,
  })

  const {
    data: contributions,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["moderation-contributions", id],
    queryFn: () => listContributionsForModeration(supabase, id!),
    enabled: !!id,
  })

  const counts = useMemo(() => {
    const result: Record<StatusTab, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
      flagged: 0,
    }
    for (const c of contributions ?? []) {
      if (c.status in result) result[c.status as StatusTab]++
    }
    return result
  }, [contributions])

  const filtered = (contributions ?? []).filter((c) => c.status === tab)

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Moderate tributes & condolences"
        description={
          memorial ? `Messages left on ${memorial.display_name}'s memorial.` : undefined
        }
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as StatusTab)}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {tabLabels[t]}
              {counts[t] > 0 && ` (${counts[t]})`}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map((contribution) => (
            <ContributionRow
              key={contribution.id}
              contribution={contribution}
              memorialId={id!}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquareText}
          title={`No ${tabLabels[tab].toLowerCase()} messages`}
          description="Nothing to show here right now."
        />
      )}
    </Container>
  )
}
