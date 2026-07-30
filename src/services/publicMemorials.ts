import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type MemorialRow = Database["public"]["Tables"]["memorials"]["Row"]
type MemorialWithPhoto = MemorialRow & { photoUrl: string | null }
export type HighlightedMemorial = MemorialWithPhoto & { giftCount: number }

/**
 * Memorial media is private, so public marketing pages use the Next proxy.
 */
function attachPublicPhotoUrls(
  memorials: MemorialRow[]
): MemorialWithPhoto[] {
  return memorials.map((m) => ({
    ...m,
    photoUrl: m.primary_photo_path
      ? `/api/media?bucket=memorial-media&path=${encodeURIComponent(m.primary_photo_path)}`
      : null,
  }))
}

/**
 * Count paid gifts per memorial.
 */
async function attachGiftCounts(
  supabase: SupabaseClient<Database>,
  memorials: MemorialWithPhoto[]
): Promise<HighlightedMemorial[]> {
  const ids = memorials.map((m) => m.id)
  const counts = new Map<string, number>()

  if (ids.length > 0) {
    const { data } = await supabase
      .from("gift_purchases")
      .select("memorial_id")
      .in("memorial_id", ids)
      .eq("status", "paid")
    for (const row of data ?? []) {
      counts.set(row.memorial_id, (counts.get(row.memorial_id) ?? 0) + 1)
    }
  }

  return memorials.map((m) => ({ ...m, giftCount: counts.get(m.id) ?? 0 }))
}

/**
 * Public version — uses anon client and direct storage URLs for photos.
 * Safe to call from the marketing home page without an auth session.
 */
export async function listPublicHighlightedMemorials(
  supabase: SupabaseClient<Database>,
  limit = 3
): Promise<HighlightedMemorial[]> {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("status", "published")
    .eq("privacy", "public")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  const withPhotos = attachPublicPhotoUrls(data ?? [])
  return attachGiftCounts(supabase, withPhotos)
}
