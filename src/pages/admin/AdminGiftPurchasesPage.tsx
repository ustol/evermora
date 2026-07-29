import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Flower2, RefreshCw } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { EmptyState } from "@/components/layout/EmptyState"
import { ErrorState } from "@/components/layout/ErrorState"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import { listAllGiftPurchases, type AdminGiftPurchase } from "@/services/admin"
import { verifyGiftPurchase } from "@/services/gifts"
import { formatDayMonthYear } from "@/lib/date"

const tabs = ["all", "pending", "paid", "failed"] as const
type StatusTab = (typeof tabs)[number]

const tabLabels: Record<StatusTab, string> = {
  all: "All",
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
}

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  paid: "bg-success/10 text-success",
  failed: "bg-destructive/10 text-destructive",
}

function PurchaseRow({ purchase }: { purchase: AdminGiftPurchase }) {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const retryMutation = useMutation({
    mutationFn: () => verifyGiftPurchase(supabase, purchase.id),
    onSuccess: (result) => {
      if (result.ok) {
        toast.success("Verified — marked as paid.")
        queryClient.invalidateQueries({ queryKey: ["admin-gift-purchases"] })
      } else {
        toast.error("Paystack still doesn't confirm this as paid.")
      }
    },
    onError: () => toast.error("Couldn't re-verify this purchase. Please try again."),
  })

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-foreground">
            {purchase.giftName} · {purchase.currency} {purchase.amount.toFixed(2)}
          </span>
          <Badge className={statusStyles[purchase.status]}>{purchase.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {purchase.purchaserDisplayName} sent this on{" "}
          <Link
            to={`/memorials/${purchase.memorialSlug}`}
            className="text-foreground hover:text-heritage-gold"
          >
            {purchase.memorialDisplayName}
          </Link>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDayMonthYear(purchase.createdAt)}
          {purchase.paidAt && ` · Paid ${formatDayMonthYear(purchase.paidAt)}`}
          {" · Ref: "}
          <span className="font-mono">{purchase.paystackReference}</span>
        </p>
      </div>

      {purchase.status !== "paid" && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => retryMutation.mutate()}
          disabled={retryMutation.isPending}
          className="shrink-0"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {retryMutation.isPending ? "Checking…" : "Retry verification"}
        </Button>
      )}
    </div>
  )
}

export default function AdminGiftPurchasesPage() {
  const supabase = useSupabaseClient()
  const [tab, setTab] = useState<StatusTab>("all")

  const {
    data: purchases,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-gift-purchases"],
    queryFn: () => listAllGiftPurchases(supabase),
  })

  const counts = {
    all: purchases?.length ?? 0,
    pending: purchases?.filter((p) => p.status === "pending").length ?? 0,
    paid: purchases?.filter((p) => p.status === "paid").length ?? 0,
    failed: purchases?.filter((p) => p.status === "failed").length ?? 0,
  }

  const filtered =
    tab === "all" ? (purchases ?? []) : (purchases ?? []).filter((p) => p.status === tab)

  return (
    <Container className="flex flex-col gap-8 py-10">
      <PageHeader
        title="Wreath & rose purchases"
        description="Every gift purchase across every memorial, with Paystack verification status."
      />

      <Tabs value={tab} onValueChange={(v) => setTab(v as StatusTab)}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {tabLabels[t]} ({counts[t]})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map((purchase) => (
            <PurchaseRow key={purchase.id} purchase={purchase} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Flower2}
          title={`No ${tab === "all" ? "" : tabLabels[tab].toLowerCase() + " "}purchases yet`}
        />
      )}
    </Container>
  )
}
