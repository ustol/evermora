import { requireUser } from "@/lib/require-auth"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getOwnerDashboardStats } from "@/services/dashboard"
import { Container } from "@/components/layout/Container"
import { ErrorState } from "@/components/layout/ErrorState"

export default async function DashboardPage() {
  await requireUser("/dashboard")
  const current = await getCurrentProfile()
  if (!current) return <Container className="py-16"><ErrorState /></Container>

  let stats: Awaited<ReturnType<typeof getOwnerDashboardStats>>
  try {
    stats = await getOwnerDashboardStats(current.supabase, current.ownerIds)
  } catch {
    return <Container className="py-16"><ErrorState /></Container>
  }

  return (
    <Container className="py-12">
      <h1 className="font-heading text-2xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Welcome to your dashboard.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-3xl font-semibold">{stats.totalMemorials}</p>
          <p className="text-sm text-muted-foreground">Memorials</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-3xl font-semibold">{stats.giftsReceived}</p>
          <p className="text-sm text-muted-foreground">Tributes received</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-3xl font-semibold">{stats.pendingContributions}</p>
          <p className="text-sm text-muted-foreground">Pending contributions</p>
        </div>
      </div>
    </Container>
  )
}
