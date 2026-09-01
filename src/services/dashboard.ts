import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export interface OwnerDashboardStats {
  totalMemorials: number
  draftCount: number
  publishedCount: number
  archivedCount: number
  pendingContributions: number
  giftsReceived: number
  giftsRevenue: number
}

export interface OwnerWreathSale {
  id: string
  memorialId: string
  memorialDisplayName: string
  memorialSlug: string
  giftName: string
  purchaserDisplayName: string
  amount: number
  currency: string
  paystackReference: string
  createdAt: string
  paidAt: string | null
}

export interface MemorialWreathSalesSummary {
  memorialId: string
  memorialDisplayName: string
  memorialSlug: string
  salesCount: number
  revenue: number
  currency: string | null
  lastSaleAt: string | null
}

export interface OwnerWreathSalesReport {
  sales: OwnerWreathSale[]
  memorials: MemorialWreathSalesSummary[]
  totalSales: number
  totalRevenue: number
  currency: string | null
  latestSaleAt: string | null
}

export async function getOwnerDashboardStats(
  supabase: SupabaseClient<Database>,
  ownerIds: string | string[]
): Promise<OwnerDashboardStats> {
  const ids = Array.isArray(ownerIds) ? ownerIds : [ownerIds]
  const { data: memorials, error: memorialsError } = await supabase
    .from("memorials")
    .select("id, status")
    .in("owner_id", ids)

  if (memorialsError) throw memorialsError

  const memorialIds = (memorials ?? []).map((m) => m.id)
  const counts = { draft: 0, published: 0, archived: 0 }
  for (const m of memorials ?? []) {
    counts[m.status as keyof typeof counts] = (counts[m.status as keyof typeof counts] ?? 0) + 1
  }

  let pendingContributions = 0
  let giftsReceived = 0
  let giftsRevenue = 0

  if (memorialIds.length > 0) {
    const [contributionsResult, giftsResult] = await Promise.all([
      supabase
        .from("contributions")
        .select("id", { count: "exact", head: true })
        .in("memorial_id", memorialIds)
        .eq("status", "pending"),
      supabase
        .from("gift_purchases")
        .select("amount")
        .in("memorial_id", memorialIds)
        .eq("status", "paid"),
    ])

    if (contributionsResult.error) throw contributionsResult.error
    if (giftsResult.error) throw giftsResult.error

    pendingContributions = contributionsResult.count ?? 0
    giftsReceived = giftsResult.data?.length ?? 0
    giftsRevenue = (giftsResult.data ?? []).reduce((sum, row) => sum + Number(row.amount), 0)
  }

  return {
    totalMemorials: memorialIds.length,
    draftCount: counts.draft,
    publishedCount: counts.published,
    archivedCount: counts.archived,
    pendingContributions,
    giftsReceived,
    giftsRevenue,
  }
}

export async function getOwnerWreathSalesReport(
  supabase: SupabaseClient<Database>,
  ownerIds: string | string[]
): Promise<OwnerWreathSalesReport> {
  const ids = Array.isArray(ownerIds) ? ownerIds : [ownerIds]
  const { data: memorials, error: memorialsError } = await supabase
    .from("memorials")
    .select("id, display_name, slug")
    .in("owner_id", ids)
    .order("created_at", { ascending: false })

  if (memorialsError) throw memorialsError

  const memorialRows = memorials ?? []
  const memorialIds = memorialRows.map((m) => m.id)
  const memorialById = new Map(
    memorialRows.map((m) => [
      m.id,
      { displayName: m.display_name, slug: m.slug },
    ])
  )

  if (memorialIds.length === 0) {
    return {
      sales: [],
      memorials: [],
      totalSales: 0,
      totalRevenue: 0,
      currency: null,
      latestSaleAt: null,
    }
  }

  const { data: purchases, error: purchasesError } = await supabase
    .from("gift_purchases")
    .select("id, memorial_id, gift_catalog_id, purchaser_display_name, amount, currency, paystack_reference, created_at, paid_at")
    .in("memorial_id", memorialIds)
    .eq("status", "paid")
    .order("created_at", { ascending: false })

  if (purchasesError) throw purchasesError

  const purchaseRows = purchases ?? []
  const giftCatalogIds = [...new Set(purchaseRows.map((purchase) => purchase.gift_catalog_id))]
  const giftNameById = new Map<string, string>()

  if (giftCatalogIds.length > 0) {
    const { data: giftItems, error: giftsError } = await supabase
      .from("gift_catalog")
      .select("id, name")
      .in("id", giftCatalogIds)

    if (giftsError) throw giftsError
    for (const gift of giftItems ?? []) giftNameById.set(gift.id, gift.name)
  }

  const sales = purchaseRows.map((purchase) => {
    const memorial = memorialById.get(purchase.memorial_id)
    return {
      id: purchase.id,
      memorialId: purchase.memorial_id,
      memorialDisplayName: memorial?.displayName ?? "Unknown memorial",
      memorialSlug: memorial?.slug ?? "",
      giftName: giftNameById.get(purchase.gift_catalog_id) ?? "Wreath",
      purchaserDisplayName: purchase.purchaser_display_name,
      amount: Number(purchase.amount),
      currency: purchase.currency,
      paystackReference: purchase.paystack_reference,
      createdAt: purchase.created_at,
      paidAt: purchase.paid_at,
    }
  })

  const memorialSummaries = memorialRows.map((memorial) => {
    const memorialSales = sales.filter((sale) => sale.memorialId === memorial.id)
    const revenue = memorialSales.reduce((sum, sale) => sum + sale.amount, 0)
    return {
      memorialId: memorial.id,
      memorialDisplayName: memorial.display_name,
      memorialSlug: memorial.slug,
      salesCount: memorialSales.length,
      revenue,
      currency: memorialSales[0]?.currency ?? null,
      lastSaleAt: memorialSales[0]?.paidAt ?? memorialSales[0]?.createdAt ?? null,
    }
  })

  return {
    sales,
    memorials: memorialSummaries,
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, sale) => sum + sale.amount, 0),
    currency: sales[0]?.currency ?? null,
    latestSaleAt: sales[0]?.paidAt ?? sales[0]?.createdAt ?? null,
  }
}
