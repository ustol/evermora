"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { listAllGiftPurchases, type AdminGiftPurchase } from "@/services/admin"
import { formatDayMonthYear } from "@/lib/date"
import { ExternalLink } from "lucide-react"

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={statusVariant[status] ?? "outline"} className="text-[11px]">
      {status}
    </Badge>
  )
}

export default function AdminGiftPurchasesPage() {
  const supabase = useSupabaseClient()
  const [purchases, setPurchases] = useState<AdminGiftPurchase[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listAllGiftPurchases(supabase)
      .then(setPurchases)
      .finally(() => setLoading(false))
  }, [supabase])

  return (
    <Container className="flex flex-col gap-8 py-12">
      <PageHeader
        title="Gift purchases"
        description="All virtual wreath and rose transactions across every memorial."
      />
      {loading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : !purchases?.length ? (
        <p className="text-sm text-muted-foreground">No purchases yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gift</TableHead>
                <TableHead>Memorial</TableHead>
                <TableHead>Purchaser</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden lg:table-cell">Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.giftName}</TableCell>
                  <TableCell>
                    <Link
                      href={`/memorials/${p.memorialSlug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-foreground underline underline-offset-2 hover:text-foreground/80"
                    >
                      {p.memorialDisplayName}
                      <ExternalLink className="size-3 shrink-0" />
                    </Link>
                  </TableCell>
                  <TableCell>{p.purchaserDisplayName}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {p.currency} {p.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDayMonthYear(p.createdAt)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-mono text-xs text-muted-foreground max-w-[120px] truncate">
                    {p.paystackReference}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Container>
  )
}
