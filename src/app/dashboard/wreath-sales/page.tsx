import Link from "next/link"
import { redirect } from "next/navigation"
import { Banknote, ExternalLink, Gift, Landmark, ReceiptText } from "lucide-react"
import { getCurrentProfile } from "@/lib/auth-profile"
import { formatDayMonthYear } from "@/lib/date"
import { formatMoney } from "@/lib/format-money"
import { getOwnerWreathSalesReport } from "@/services/dashboard"
import { Container } from "@/components/layout/Container"
import { EmptyState } from "@/components/layout/EmptyState"
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

export default async function DashboardWreathSalesPage() {
  const current = await getCurrentProfile()
  if (!current) redirect("/sign-in?redirect_url=/dashboard/wreath-sales")

  let wreathReport: Awaited<ReturnType<typeof getOwnerWreathSalesReport>>
  try {
    wreathReport = await getOwnerWreathSalesReport(current.supabase, current.ownerIds)
  } catch {
    return <Container className="py-16"><ErrorState /></Container>
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Wreath sales"
        description="Review every paid wreath purchase made on the memorials you own. Records are scoped to your memorials only."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ReceiptText className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">{wreathReport.totalSales}</p>
              <CardDescription>Paid wreath sales</CardDescription>
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
              <CardDescription>Total wreath revenue</CardDescription>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Landmark className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-3xl font-semibold tabular-nums">{wreathReport.memorials.length}</p>
              <CardDescription>Owned memorials tracked</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      <section aria-labelledby="by-memorial-title" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border/70 pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle id="by-memorial-title">Sales by memorial</CardTitle>
                <CardDescription>Revenue and purchase count for each memorial you manage.</CardDescription>
              </div>
              <Badge variant="secondary" className="w-fit">
                {wreathReport.memorials.filter((memorial) => memorial.salesCount > 0).length} active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {wreathReport.memorials.length > 0 ? wreathReport.memorials.map((memorial) => (
              <div key={memorial.memorialId} className="rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {memorial.memorialSlug ? (
                      <Link
                        href={`/memorials/${memorial.memorialSlug}`}
                        className="inline-flex items-center gap-1 font-medium leading-snug underline-offset-4 hover:underline"
                      >
                        {memorial.memorialDisplayName}
                        <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
                      </Link>
                    ) : (
                      <p className="font-medium leading-snug">{memorial.memorialDisplayName}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {memorial.lastSaleAt ? `Last sale ${formatDayMonthYear(memorial.lastSaleAt)}` : "No paid wreath sales yet"}
                    </p>
                  </div>
                  <Badge variant={memorial.salesCount > 0 ? "default" : "outline"}>
                    {memorial.salesCount} {memorial.salesCount === 1 ? "sale" : "sales"}
                  </Badge>
                </div>
                <p className="mt-4 text-2xl font-semibold tabular-nums">
                  {formatMoney(memorial.revenue, memorial.currency ?? wreathReport.currency)}
                </p>
              </div>
            )) : (
              <div className="sm:col-span-2">
                <EmptyState title="No memorials yet" description="Create a memorial to start tracking wreath sales." />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border/70 pb-4">
            <CardTitle>Latest activity</CardTitle>
            <CardDescription>The most recent paid wreath transaction.</CardDescription>
          </CardHeader>
          <CardContent>
            {wreathReport.latestSaleAt ? (
              <div className="flex flex-col gap-3 rounded-xl bg-muted/40 p-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Gift className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium">Last wreath sale</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDayMonthYear(wreathReport.latestSaleAt)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Wreath sales activity will appear as visitors purchase paid tributes.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>Purchase records</CardTitle>
              <CardDescription>Complete paid purchase log across your owned memorials.</CardDescription>
            </div>
            <Badge variant="secondary" className="w-fit">
              {wreathReport.totalSales} {wreathReport.totalSales === 1 ? "record" : "records"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {wreathReport.sales.length > 0 ? (
            <div className="overflow-x-auto">
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
                  {wreathReport.sales.map((sale) => (
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
                      <TableCell className="hidden max-w-[160px] truncate pr-4 font-mono text-xs text-muted-foreground lg:table-cell">
                        {sale.paystackReference}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
    </Container>
  )
}
