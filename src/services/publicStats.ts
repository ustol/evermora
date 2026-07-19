import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export interface PublicStats {
  tributeCount: number
  blogPostCount: number
  giftCount: number
}

/**
 * Platform-wide numbers for the homepage "by the numbers" section. Uses
 * the caller's own client (anon for a signed-out visitor), so each count
 * is naturally scoped by RLS to what's actually publicly visible —
 * approved tributes/condolences, published posts, and paid gifts on
 * public memorials — never private or unpublished content.
 */
export async function getPublicStats(
  supabase: SupabaseClient<Database>
): Promise<PublicStats> {
  const [tributes, posts, gifts] = await Promise.all([
    supabase
      .from("contributions")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("gift_purchases")
      .select("id", { count: "exact", head: true })
      .eq("status", "paid"),
  ])

  for (const result of [tributes, posts, gifts]) {
    if (result.error) throw result.error
  }

  return {
    tributeCount: tributes.count ?? 0,
    blogPostCount: posts.count ?? 0,
    giftCount: gifts.count ?? 0,
  }
}
