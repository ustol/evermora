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

export async function getOwnerDashboardStats(
  supabase: SupabaseClient<Database>,
  ownerId: string
): Promise<OwnerDashboardStats> {
  const { data: memorials, error: memorialsError } = await supabase
    .from("memorials")
    .select("id, status")
    .eq("owner_id", ownerId)

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
