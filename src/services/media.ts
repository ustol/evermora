import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type ModerationStatus = Database["public"]["Enums"]["moderation_status"]

export interface MediaItem {
  id: string
  storagePath: string
  url: string
  caption: string | null
  altText: string | null
  sortOrder: number
  status: ModerationStatus
  uploadedBy: string
  createdAt: string
}

type MediaRow = Database["public"]["Tables"]["memorial_media"]["Row"]

async function attachUrls(
  supabase: SupabaseClient<Database>,
  rows: MediaRow[]
): Promise<MediaItem[]> {
  const paths = rows.map((r) => r.storage_path)
  const urlByPath = new Map<string, string>()

  if (paths.length > 0) {
    const { data } = await supabase.storage
      .from("memorial-media")
      .createSignedUrls(paths, 3600)
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) urlByPath.set(entry.path, entry.signedUrl)
    }
  }

  return rows.map((r) => ({
    id: r.id,
    storagePath: r.storage_path,
    url: urlByPath.get(r.storage_path) ?? "",
    caption: r.caption,
    altText: r.alt_text,
    sortOrder: r.sort_order,
    status: r.moderation_status,
    uploadedBy: r.uploaded_by,
    createdAt: r.created_at,
  }))
}

/** The public gallery on a memorial page — approved photos only. */
export async function listApprovedMedia(
  supabase: SupabaseClient<Database>,
  memorialId: string
): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("memorial_media")
    .select("*")
    .eq("memorial_id", memorialId)
    .eq("moderation_status", "approved")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) throw error
  return attachUrls(supabase, data ?? [])
}

/** The owner/admin gallery manager — every status. */
export async function listMediaForModeration(
  supabase: SupabaseClient<Database>,
  memorialId: string
): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("memorial_media")
    .select("*")
    .eq("memorial_id", memorialId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) throw error
  return attachUrls(supabase, data ?? [])
}

export async function uploadMediaPhoto(
  supabase: SupabaseClient<Database>,
  params: {
    memorialId: string
    uploaderProfileId: string
    file: File
    caption?: string
    altText?: string
    sortOrder?: number
  }
): Promise<void> {
  const extension = params.file.name.split(".").pop() ?? "jpg"
  const path = `${params.memorialId}/${params.uploaderProfileId}/${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("memorial-media")
    .upload(path, params.file)
  if (uploadError) throw uploadError

  const { error } = await supabase.from("memorial_media").insert({
    memorial_id: params.memorialId,
    uploaded_by: params.uploaderProfileId,
    storage_path: path,
    caption: params.caption || null,
    alt_text: params.altText || null,
    sort_order: params.sortOrder ?? 0,
  })
  if (error) throw error
}

export async function updateMediaDetails(
  supabase: SupabaseClient<Database>,
  id: string,
  params: { caption?: string | null; altText?: string | null }
) {
  const { error } = await supabase
    .from("memorial_media")
    .update({ caption: params.caption ?? null, alt_text: params.altText ?? null })
    .eq("id", id)
  if (error) throw error
}

export async function updateMediaSortOrder(
  supabase: SupabaseClient<Database>,
  id: string,
  sortOrder: number
) {
  const { error } = await supabase
    .from("memorial_media")
    .update({ sort_order: sortOrder })
    .eq("id", id)
  if (error) throw error
}

export async function moderateMedia(
  supabase: SupabaseClient<Database>,
  id: string,
  status: "approved" | "rejected" | "flagged"
) {
  const { error } = await supabase.rpc("moderate_media", {
    p_media_id: id,
    p_status: status,
  })
  if (error) throw error
}

export async function deleteMedia(supabase: SupabaseClient<Database>, id: string) {
  const { error } = await supabase.from("memorial_media").delete().eq("id", id)
  if (error) throw error
}
