import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { HeartHandshake, Star, ShieldOff, ShieldCheck } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import {
  listAllMemorials,
  setMemorialFeatured,
  setMemorialSuspended,
  type AdminMemorial,
} from "@/services/admin"
import { formatDayMonthYear } from "@/lib/date"

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-success/10 text-success",
  archived: "bg-muted-taupe/10 text-muted-taupe",
}

function MemorialRow({ memorial }: { memorial: AdminMemorial }) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-memorials"] })

  const featuredMutation = useMutation({
    mutationFn: (featured: boolean) =>
      setMemorialFeatured(supabase, memorial.id, featured),
    onSuccess: () => {
      toast.success(memorial.isFeatured ? "Removed from featured." : "Featured.")
      invalidate()
    },
    onError: () => toast.error("Couldn't update featured status."),
  })

  const suspendMutation = useMutation({
    mutationFn: (suspend: boolean) => setMemorialSuspended(supabase, memorial.id, suspend),
    onSuccess: () => {
      toast.success(memorial.adminSuspended ? "Memorial reinstated." : "Memorial suspended.")
      invalidate()
    },
    onError: () => toast.error("Couldn't update suspension status."),
  })

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/memorials/${memorial.slug}`}
            className="font-medium text-foreground hover:text-heritage-gold"
          >
            {memorial.displayName}
          </Link>
          <Badge className={statusStyles[memorial.status]}>{memorial.status}</Badge>
          <Badge variant="outline">{memorial.privacy}</Badge>
          {memorial.isFeatured && <Badge variant="secondary">Featured</Badge>}
          {memorial.adminSuspended && (
            <Badge className="bg-destructive/10 text-destructive">Suspended</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Owned by {memorial.ownerDisplayName} · Created{" "}
          {formatDayMonthYear(memorial.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => featuredMutation.mutate(!memorial.isFeatured)}
          disabled={featuredMutation.isPending}
        >
          <Star className="size-4" aria-hidden="true" />
          {memorial.isFeatured ? "Unfeature" : "Feature"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className={
            memorial.adminSuspended ? "" : "text-destructive hover:text-destructive/80"
          }
          onClick={() => suspendMutation.mutate(!memorial.adminSuspended)}
          disabled={suspendMutation.isPending}
        >
          {memorial.adminSuspended ? (
            <>
              <ShieldCheck className="size-4" aria-hidden="true" />
              Reinstate
            </>
          ) : (
            <>
              <ShieldOff className="size-4" aria-hidden="true" />
              Suspend
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default function AdminMemorialsPage() {
  const supabase = useSupabaseClient()

  const {
    data: memorials,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-memorials"],
    queryFn: () => listAllMemorials(supabase),
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Memorials"
        description="Every memorial on Akornafa, regardless of owner or privacy setting."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : memorials && memorials.length > 0 ? (
        <div className="flex flex-col gap-4">
          {memorials.map((memorial) => (
            <MemorialRow key={memorial.id} memorial={memorial} />
          ))}
        </div>
      ) : (
        <EmptyState icon={HeartHandshake} title="No memorials yet" />
      )}
    </Container>
  )
}
