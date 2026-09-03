import Link from "next/link"
import { Banknote, Gift, Landmark, ReceiptText } from "lucide-react"
import { requireUser } from "@/lib/require-auth"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getOwnerDashboardStats, getOwnerWreathSalesReport } from "@/services/dashboard"
import { formatDayMonthYear } from "@/lib/date"
import { formatMoney } from "@/lib/format-money"
import { Container } from "@/components/layout/Container"
import { ErrorState } from "@/components/layout/ErrorState"
import { PageHeader } from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  await requireUser("/dashboard")
  const current = await getCurrentProfile()
  if (!current) return <Container className="py-16"><ErrorState /></Container>

  let dashboardData: [
    Awaited<ReturnType<typeof getOwnerDashboardStats>>,
    Awaited<ReturnType<typeof getOwnerWreathSalesReport>>,
  ]
  try {
    dashboardData = await Promise.all([
      getOwnerDashboardStats(current.supabase, current.ownerIds),
      getOwnerWreathSalesReport(current.supabase, current.ownerIds),
    ])
  } catch {
    return <Container className="py-16"><ErrorState /></Container>
  }

  const [stats, wreathReport] = dashboardData

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Dashboard"
        description="Track your memorial activity, tributes, and wreath performance in one place."
        actions={
          <Link href="/dashboard/wreath-sales" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            View wreath sales
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Landmark className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">{stats.totalMemorials}</p>
              <CardDescription>Memorials</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Gift className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">{stats.giftsReceived}</p>
              <CardDescription>Paid wreath tributes</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Banknote className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">
                {formatMoney(wreathReport.totalRevenue, wreathReport.currency)}
              </p>
              <CardDescription>Wreath revenue</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <ReceiptText className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">{stats.pendingContributions}</p>
              <CardDescription>Pending contributions</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>Wreath sales snapshot</CardTitle>
              <CardDescription>
                The full purchase log now lives on its own page in your dashboard menu.
              </CardDescription>
            </div>
            <Link href="/dashboard/wreath-sales" className="inline-flex w-fit items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              Open report
            </Link>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Total records</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{wreathReport.totalSales}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Memorials with sales</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">
              {wreathReport.memorials.filter((memorial) => memorial.salesCount > 0).length}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/60 p-4">
            <p className="text-sm text-muted-foreground">Latest sale</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">
              {wreathReport.latestSaleAt ? formatDayMonthYear(wreathReport.latestSaleAt) : "—"}
            </p>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
