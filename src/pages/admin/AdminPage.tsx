import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { Users, HeartHandshake, Flag, Flower2 } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { getPlatformStats } from "@/services/admin"

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-heading text-3xl text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

const quickLinks = [
  { to: "/admin/users", label: "Manage users", icon: Users },
  { to: "/admin/memorials", label: "Manage memorials", icon: HeartHandshake },
  { to: "/admin/reports", label: "Review reports", icon: Flag },
  { to: "/admin/gifts", label: "Wreaths & roses catalog", icon: Flower2 },
]

export default function AdminPage() {
  const supabase = useSupabaseClient()

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-platform-stats"],
    queryFn: () => getPlatformStats(supabase),
  })

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Platform administration"
        description="An overview of Akornafa across every memorial and account."
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Total users" value={stats?.totalUsers ?? 0} />
          <StatTile label="Suspended users" value={stats?.suspendedUsers ?? 0} />
          <StatTile label="Total memorials" value={stats?.totalMemorials ?? 0} />
          <StatTile label="Published" value={stats?.publishedMemorials ?? 0} />
          <StatTile label="Drafts" value={stats?.draftMemorials ?? 0} />
          <StatTile label="Suspended memorials" value={stats?.suspendedMemorials ?? 0} />
          <StatTile label="Open reports" value={stats?.openReports ?? 0} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {quickLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-heritage-gold/50"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <span className="font-medium text-foreground">{label}</span>
          </Link>
        ))}
      </div>
    </Container>
  )
}
