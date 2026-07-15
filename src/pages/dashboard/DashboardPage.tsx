import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Plus, HeartHandshake } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { buttonVariants } from "@/components/ui/button"
import { OwnerMemorialCard } from "@/components/memorial/OwnerMemorialCard"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { useProfile } from "@/hooks/useProfile"
import { listMemorialsOwnedBy } from "@/services/memorials"
import { getOwnerDashboardStats } from "@/services/dashboard"
import { cn } from "@/lib/utils"

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-heading text-3xl text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default function DashboardPage() {
  const supabase = useSupabaseClient()
  const { data: profile } = useProfile()

  const { data: memorials, isLoading: memorialsLoading } = useQuery({
    queryKey: ["owner-memorials", profile?.id],
    queryFn: () => listMemorialsOwnedBy(supabase, profile!.id),
    enabled: !!profile,
  })

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["owner-dashboard-stats", profile?.id],
    queryFn: () => getOwnerDashboardStats(supabase, profile!.id),
    enabled: !!profile,
  })

  const firstName = profile?.display_name?.split(" ")[0]
  const hasMemorials = !!memorials && memorials.length > 0

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title={firstName ? `Welcome, ${firstName}` : "Welcome"}
        description="Here's an overview of your memorials."
        actions={
          <Link to="/dashboard/memorials/new" className={cn(buttonVariants())}>
            <Plus className="size-4" aria-hidden="true" />
            Create a memorial
          </Link>
        }
      />

      {statsLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Total memorials" value={stats?.totalMemorials ?? 0} />
          <StatTile label="Published" value={stats?.publishedCount ?? 0} />
          <StatTile label="Drafts" value={stats?.draftCount ?? 0} />
          <StatTile
            label="Awaiting your review"
            value={stats?.pendingContributions ?? 0}
          />
        </div>
      )}

      {!statsLoading && stats && stats.giftsReceived > 0 && (
        <div className="rounded-2xl border border-heritage-gold/30 bg-heritage-gold/5 p-5">
          <p className="text-sm text-muted-foreground">Wreaths & roses received</p>
          <p className="mt-1 font-heading text-2xl text-foreground">
            {stats.giftsReceived} gift{stats.giftsReceived === 1 ? "" : "s"} · GHS{" "}
            {stats.giftsRevenue.toFixed(2)}
          </p>
        </div>
      )}

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-foreground">Recent memorials</h2>
          {hasMemorials && (
            <Link
              to="/dashboard/memorials"
              className="text-sm font-medium text-heritage-gold hover:underline"
            >
              View all
            </Link>
          )}
        </div>

        {memorialsLoading ? (
          <Skeleton className="h-32 w-full rounded-2xl" />
        ) : hasMemorials ? (
          <div className="flex flex-col gap-4">
            {memorials.slice(0, 3).map((memorial) => (
              <OwnerMemorialCard key={memorial.id} memorial={memorial} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={HeartHandshake}
            title="Create your first memorial"
            description="Announce a funeral, share the arrangements, and gather tributes from family and friends."
            action={
              <Link
                to="/dashboard/memorials/new"
                className={cn(buttonVariants())}
              >
                <Plus className="size-4" aria-hidden="true" />
                Create a memorial
              </Link>
            }
          />
        )}
      </section>
    </Container>
  )
}
