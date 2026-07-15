import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type MemorialRow = Database["public"]["Tables"]["memorials"]["Row"]
export type MemorialWithPhoto = MemorialRow & { photoUrl: string | null }

export interface MemorialListFilters {
  search?: string
  hometown?: string
  yearOfDeath?: number
  page?: number
  pageSize?: number
}

/**
 * memorial-media is a private bucket, so list views need signed URLs too —
 * one batched signing call for the whole page of results.
 */
async function attachSignedPhotoUrls(
  supabase: SupabaseClient<Database>,
  memorials: MemorialRow[],
  expiresIn = 3600
): Promise<MemorialWithPhoto[]> {
  const paths = memorials
    .map((m) => m.primary_photo_path)
    .filter((p): p is string => !!p)

  const urlByPath = new Map<string, string>()
  if (paths.length > 0) {
    const { data } = await supabase.storage
      .from("memorial-media")
      .createSignedUrls(paths, expiresIn)
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) {
        urlByPath.set(entry.path, entry.signedUrl)
      }
    }
  }

  return memorials.map((m) => ({
    ...m,
    photoUrl: m.primary_photo_path
      ? (urlByPath.get(m.primary_photo_path) ?? null)
      : null,
  }))
}

export async function listPublicMemorials(
  supabase: SupabaseClient<Database>,
  filters: MemorialListFilters = {}
) {
  const { search, hometown, yearOfDeath, page = 1, pageSize = 12 } = filters
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from("memorials")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .eq("privacy", "public")
    .eq("search_indexable", true)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (search) {
    query = query.ilike("display_name", `%${search}%`)
  }
  if (hometown) {
    query = query.ilike("hometown", `%${hometown}%`)
  }
  if (yearOfDeath) {
    query = query
      .gte("date_of_death", `${yearOfDeath}-01-01`)
      .lte("date_of_death", `${yearOfDeath}-12-31`)
  }

  const { data, error, count } = await query
  if (error) throw error
  return {
    memorials: await attachSignedPhotoUrls(supabase, data ?? []),
    total: count ?? 0,
  }
}

/**
 * Homepage highlights: admin-featured memorials first, then the most
 * recently published, public ones. Unlisted/private never appear here.
 */
export async function listHighlightedMemorials(
  supabase: SupabaseClient<Database>,
  limit = 3
) {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("status", "published")
    .eq("privacy", "public")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return attachSignedPhotoUrls(supabase, data ?? [])
}

export async function getMemorialBySlug(
  supabase: SupabaseClient<Database>,
  slug: string
) {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getFuneralEvents(
  supabase: SupabaseClient<Database>,
  memorialId: string
) {
  const { data, error } = await supabase
    .from("funeral_events")
    .select("*")
    .eq("memorial_id", memorialId)
    .order("event_date", { ascending: true })
    .order("sort_order", { ascending: true })

  if (error) throw error
  return data ?? []
}

/** memorial-media is a private bucket — always served via short-lived signed URLs. */
export async function getSignedPhotoUrl(
  supabase: SupabaseClient<Database>,
  path: string | null,
  expiresIn = 3600
) {
  if (!path) return null
  const { data, error } = await supabase.storage
    .from("memorial-media")
    .createSignedUrl(path, expiresIn)

  if (error) return null
  return data.signedUrl
}
