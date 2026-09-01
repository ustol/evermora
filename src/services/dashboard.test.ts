import { describe, expect, it, vi } from "vitest"
import { getOwnerWreathSalesReport } from "@/services/dashboard"

function createReportClient({
  memorials = [],
  memorialsError = null,
  purchases = [],
  purchasesError = null,
  gifts = [],
  giftsError = null,
}: {
  memorials?: unknown[]
  memorialsError?: Error | null
  purchases?: unknown[]
  purchasesError?: Error | null
  gifts?: unknown[]
  giftsError?: Error | null
} = {}) {
  const memorialOrder = vi.fn(async () => ({ data: memorials, error: memorialsError }))
  const memorialIn = vi.fn(() => ({ order: memorialOrder }))
  const memorialSelect = vi.fn(() => ({ in: memorialIn }))

  const purchaseOrder = vi.fn(async () => ({ data: purchases, error: purchasesError }))
  const purchaseEq = vi.fn(() => ({ order: purchaseOrder }))
  const purchaseIn = vi.fn(() => ({ eq: purchaseEq }))
  const purchaseSelect = vi.fn(() => ({ in: purchaseIn }))

  const giftIn = vi.fn(async () => ({ data: gifts, error: giftsError }))
  const giftSelect = vi.fn(() => ({ in: giftIn }))

  const from = vi.fn((table: string) => {
    if (table === "memorials") return { select: memorialSelect }
    if (table === "gift_purchases") return { select: purchaseSelect }
    if (table === "gift_catalog") return { select: giftSelect }
    throw new Error(`Unexpected table ${table}`)
  })

  return {
    supabase: { from },
    from,
    memorialSelect,
    memorialIn,
    memorialOrder,
    purchaseSelect,
    purchaseIn,
    purchaseEq,
    purchaseOrder,
    giftSelect,
    giftIn,
  }
}

describe("getOwnerWreathSalesReport", () => {
  it("maps paid wreath purchases into owner sales, totals, and per-memorial summaries", async () => {
    const client = createReportClient({
      memorials: [
        { id: "memorial-1", display_name: "Ama Mensah", slug: "ama-mensah" },
        { id: "memorial-2", display_name: "Kojo Mensah", slug: "kojo-mensah" },
      ],
      purchases: [
        {
          id: "purchase-2",
          memorial_id: "memorial-2",
          gift_catalog_id: "gift-rose",
          purchaser_display_name: "Efua",
          amount: "120",
          currency: "GHS",
          paystack_reference: "PSK_latest",
          created_at: "2026-02-10T10:00:00.000Z",
          paid_at: "2026-02-10T10:05:00.000Z",
        },
        {
          id: "purchase-1",
          memorial_id: "memorial-1",
          gift_catalog_id: "gift-wreath",
          purchaser_display_name: "Kofi",
          amount: 80,
          currency: "GHS",
          paystack_reference: "PSK_first",
          created_at: "2026-02-09T09:00:00.000Z",
          paid_at: null,
        },
      ],
      gifts: [
        { id: "gift-rose", name: "Garden roses" },
        { id: "gift-wreath", name: "Classic wreath" },
      ],
    })

    await expect(getOwnerWreathSalesReport(client.supabase as never, ["owner-1", "legacy-owner-1"])).resolves.toEqual({
      sales: [
        {
          id: "purchase-2",
          memorialId: "memorial-2",
          memorialDisplayName: "Kojo Mensah",
          memorialSlug: "kojo-mensah",
          giftName: "Garden roses",
          purchaserDisplayName: "Efua",
          amount: 120,
          currency: "GHS",
          paystackReference: "PSK_latest",
          createdAt: "2026-02-10T10:00:00.000Z",
          paidAt: "2026-02-10T10:05:00.000Z",
        },
        {
          id: "purchase-1",
          memorialId: "memorial-1",
          memorialDisplayName: "Ama Mensah",
          memorialSlug: "ama-mensah",
          giftName: "Classic wreath",
          purchaserDisplayName: "Kofi",
          amount: 80,
          currency: "GHS",
          paystackReference: "PSK_first",
          createdAt: "2026-02-09T09:00:00.000Z",
          paidAt: null,
        },
      ],
      memorials: [
        {
          memorialId: "memorial-1",
          memorialDisplayName: "Ama Mensah",
          memorialSlug: "ama-mensah",
          salesCount: 1,
          revenue: 80,
          currency: "GHS",
          lastSaleAt: "2026-02-09T09:00:00.000Z",
        },
        {
          memorialId: "memorial-2",
          memorialDisplayName: "Kojo Mensah",
          memorialSlug: "kojo-mensah",
          salesCount: 1,
          revenue: 120,
          currency: "GHS",
          lastSaleAt: "2026-02-10T10:05:00.000Z",
        },
      ],
      totalSales: 2,
      totalRevenue: 200,
      currency: "GHS",
      latestSaleAt: "2026-02-10T10:05:00.000Z",
    })

    expect(client.from).toHaveBeenCalledWith("memorials")
    expect(client.memorialSelect).toHaveBeenCalledWith("id, display_name, slug")
    expect(client.memorialIn).toHaveBeenCalledWith("owner_id", ["owner-1", "legacy-owner-1"])
    expect(client.memorialOrder).toHaveBeenCalledWith("created_at", { ascending: false })
    expect(client.purchaseSelect).toHaveBeenCalledWith(
      "id, memorial_id, gift_catalog_id, purchaser_display_name, amount, currency, paystack_reference, created_at, paid_at"
    )
    expect(client.purchaseIn).toHaveBeenCalledWith("memorial_id", ["memorial-1", "memorial-2"])
    expect(client.purchaseEq).toHaveBeenCalledWith("status", "paid")
    expect(client.purchaseOrder).toHaveBeenCalledWith("created_at", { ascending: false })
    expect(client.giftIn).toHaveBeenCalledWith("id", ["gift-rose", "gift-wreath"])
  })

  it("returns an empty report and skips purchase queries when the owner has no memorials", async () => {
    const client = createReportClient()

    await expect(getOwnerWreathSalesReport(client.supabase as never, "owner-without-memorials")).resolves.toEqual({
      sales: [],
      memorials: [],
      totalSales: 0,
      totalRevenue: 0,
      currency: null,
      latestSaleAt: null,
    })

    expect(client.memorialIn).toHaveBeenCalledWith("owner_id", ["owner-without-memorials"])
    expect(client.purchaseSelect).not.toHaveBeenCalled()
    expect(client.giftSelect).not.toHaveBeenCalled()
  })

  it("propagates paid purchase query failures instead of hiding broken reporting data", async () => {
    const client = createReportClient({
      memorials: [{ id: "memorial-1", display_name: "Ama Mensah", slug: "ama-mensah" }],
      purchasesError: new Error("gift purchase policy denied"),
    })

    await expect(getOwnerWreathSalesReport(client.supabase as never, "owner-1")).rejects.toThrow(
      "gift purchase policy denied"
    )
  })
})
