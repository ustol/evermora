import Link from "next/link"
import { Banknote, Gift, Landmark, ReceiptText } from "lucide-react"
import { requireUser } from "@/lib/require-auth"
import { getCurrentProfile } from "@/lib/auth-profile"
import { getOwnerDashboardStats, getOwnerWreathSalesReport } from "@/services/dashboard"
import { formatDayMonthYear } from "@/lib/date"
import { Container } from "@/components/layout/Container"
import { ErrorState } from "@/components/layout/ErrorState"
import { PageHeader } from "@/components/layout/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function formatMoney(amount: number, currency: string | null) {
  if (!currency) return amount.toLocaleString()

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toLocaleString()}`
  }
}

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
  const recentSales = wreathReport.sales.slice(0, 8)

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Dashboard"
        description="Track your memorial activity, tributes, and wreath purchases in one place."
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

      <section aria-labelledby="wreath-sales-title" className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="min-w-0">
          <CardHeader className="border-b border-border/70 pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle id="wreath-sales-title" className="text-xl">Wreath sales report</CardTitle>
                <CardDescription>
                  Paid wreath purchases made on memorials you manage.
                </CardDescription>
              </div>
              <Badge variant="secondary" className="w-fit">
                {wreathReport.totalSales} {wreathReport.totalSales === 1 ? "sale" : "sales"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentSales.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Memorial</TableHead>
                    <TableHead>Wreath</TableHead>
                    <TableHead>Purchaser</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Paid</TableHead>
                    <TableHead className="hidden lg:table-cell pr-4">Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="pl-4 font-medium">
                        {sale.memorialSlug ? (
                          <Link
                            href={`/memorials/${sale.memorialSlug}`}
                            className="underline-offset-4 hover:underline"
                          >
                            {sale.memorialDisplayName}
                          </Link>
                        ) : sale.memorialDisplayName}
                      </TableCell>
                      <TableCell>{sale.giftName}</TableCell>
                      <TableCell>{sale.purchaserDisplayName}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatMoney(sale.amount, sale.currency)}
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        {formatDayMonthYear(sale.paidAt ?? sale.createdAt)}
                      </TableCell>
                      <TableCell className="hidden max-w-[140px] truncate pr-4 font-mono text-xs text-muted-foreground lg:table-cell">
                        {sale.paystackReference}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Gift className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium">No wreath purchases yet</p>
                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    When visitors buy wreaths for your memorials, each paid purchase will appear here.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>By memorial</CardTitle>
            <CardDescription>Revenue and purchase count per memorial.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {wreathReport.memorials.length > 0 ? wreathReport.memorials.map((memorial) => (
              <div key={memorial.memorialId} className="rounded-xl border border-border/70 bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium leading-snug">{memorial.memorialDisplayName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {memorial.lastSaleAt ? `Last sale ${formatDayMonthYear(memorial.lastSaleAt)}` : "No paid wreath sales yet"}
                    </p>
                  </div>
                  <Badge variant={memorial.salesCount > 0 ? "default" : "outline"}>
                    {memorial.salesCount}
                  </Badge>
                </div>
                <p className="mt-4 text-2xl font-semibold tabular-nums">
                  {formatMoney(memorial.revenue, memorial.currency ?? wreathReport.currency)}
                </p>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground">Create a memorial to start tracking wreath sales.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </Container>
  )
}
