import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export const MAX_HERO_IMAGES = 5

export interface HeroImage {
  id: string
  url: string
  sortOrder: number
}

function heroImageUrl(supabase: SupabaseClient<Database>, storagePath: string): string {
  return supabase.storage.from("hero-images").getPublicUrl(storagePath).data.publicUrl
}

export async function listHeroImages(
  supabase: SupabaseClient<Database>
): Promise<HeroImage[]> {
  const { data, error } = await supabase
    .from("hero_images")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => ({
    id: row.id,
    url: heroImageUrl(supabase, row.storage_path),
    sortOrder: row.sort_order,
  }))
}

export async function uploadHeroImage(
  supabase: SupabaseClient<Database>,
  file: File
): Promise<void> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("hero-images")
    .upload(path, file)
  if (uploadError) throw uploadError

  const { count, error: countError } = await supabase
    .from("hero_images")
    .select("id", { count: "exact", head: true })
  if (countError) throw countError

  const { error } = await supabase.from("hero_images").insert({
    storage_path: path,
    sort_order: count ?? 0,
  })
  if (error) throw error
}

export async function deleteHeroImage(supabase: SupabaseClient<Database>, id: string) {
  const { error } = await supabase.from("hero_images").delete().eq("id", id)
  if (error) throw error
}

export async function updateHeroImageSortOrder(
  supabase: SupabaseClient<Database>,
  id: string,
  sortOrder: number
) {
  const { error } = await supabase
    .from("hero_images")
    .update({ sort_order: sortOrder })
    .eq("id", id)
  if (error) throw error
}
