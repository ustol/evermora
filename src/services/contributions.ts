import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type ContributionType = Database["public"]["Enums"]["contribution_type"]
type ModerationStatus = Database["public"]["Enums"]["moderation_status"]

export interface ContributionWithAuthor {
  id: string
  type: ContributionType
  relationship: string | null
  title: string | null
  message: string
  status: ModerationStatus
  createdAt: string
  authorDisplayName: string
  authorAvatarUrl: string | null
  photoUrl: string | null
}

const CONTRIBUTION_SELECT =
  "id, type, relationship, title, message, status, created_at, author:profiles(display_name, avatar_url), photo:memorial_media(storage_path)"

type ContributionRow = {
  id: string
  type: ContributionType
  relationship: string | null
  title: string | null
  message: string
  status: ModerationStatus
  created_at: string
  author: unknown
  photo: unknown
}

async function mapContribution(
  supabase: SupabaseClient<Database>,
  row: ContributionRow
): Promise<ContributionWithAuthor> {
  const author = row.author as { display_name: string; avatar_url: string | null } | null
  const photo = row.photo as { storage_path: string } | null

  let photoUrl: string | null = null
  if (photo?.storage_path) {
    const { data } = await supabase.storage
      .from("memorial-media")
      .createSignedUrl(photo.storage_path, 3600)
    photoUrl = data?.signedUrl ?? null
  }

  return {
    id: row.id,
    type: row.type,
    relationship: row.relationship,
    title: row.title,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    authorDisplayName: author?.display_name ?? "A well-wisher",
    authorAvatarUrl: author?.avatar_url ?? null,
    photoUrl,
  }
}

/** The public tribute wall on a memorial page — approved contributions only. */
export async function listApprovedContributions(
  supabase: SupabaseClient<Database>,
  memorialId: string
): Promise<ContributionWithAuthor[]> {
  const { data, error } = await supabase
    .from("contributions")
    .select(CONTRIBUTION_SELECT)
    .eq("memorial_id", memorialId)
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) throw error
  return Promise.all((data ?? []).map((row) => mapContribution(supabase, row as ContributionRow)))
}

/** The owner/admin moderation queue — every status. */
export async function listContributionsForModeration(
  supabase: SupabaseClient<Database>,
  memorialId: string
): Promise<ContributionWithAuthor[]> {
  const { data, error } = await supabase
    .from("contributions")
    .select(CONTRIBUTION_SELECT)
    .eq("memorial_id", memorialId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return Promise.all((data ?? []).map((row) => mapContribution(supabase, row as ContributionRow)))
}

export async function createContribution(
  supabase: SupabaseClient<Database>,
  params: {
    memorialId: string
    authorId: string
    type: ContributionType
    relationship?: string
    title?: string
    message: string
    photoMediaId?: string
  }
) {
  const { error } = await supabase.from("contributions").insert({
    memorial_id: params.memorialId,
    author_id: params.authorId,
    type: params.type,
    relationship: params.relationship || null,
    title: params.title || null,
    message: params.message,
    photo_media_id: params.photoMediaId || null,
  })
  if (error) throw error
}

/** Uploads a tribute photo as a memorial_media row and returns its id. */
export async function uploadContributionPhoto(
  supabase: SupabaseClient<Database>,
  params: { memorialId: string; uploaderProfileId: string; file: File }
): Promise<string> {
  const extension = params.file.name.split(".").pop() ?? "jpg"
  const path = `${params.memorialId}/${params.uploaderProfileId}/${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("memorial-media")
    .upload(path, params.file)
  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from("memorial_media")
    .insert({
      memorial_id: params.memorialId,
      uploaded_by: params.uploaderProfileId,
      storage_path: path,
    })
    .select("id")
    .single()
  if (error) throw error
  return data.id
}

export async function moderateContribution(
  supabase: SupabaseClient<Database>,
  contributionId: string,
  status: "approved" | "rejected" | "flagged"
) {
  const { error } = await supabase.rpc("moderate_contribution", {
    p_contribution_id: contributionId,
    p_status: status,
  })
  if (error) throw error
}

export async function deleteContribution(
  supabase: SupabaseClient<Database>,
  contributionId: string
) {
  const { error } = await supabase.from("contributions").delete().eq("id", contributionId)
  if (error) throw error
}
