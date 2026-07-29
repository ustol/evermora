import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import { slugify } from "@/lib/slug"
import type {
  PersonalDetailsValues,
  LifeStoryValues,
  FuneralEventValues,
  PrivacySettingsValues,
} from "@/types/memorial-form"

type Memorial = Database["public"]["Tables"]["memorials"]["Row"]
type MemorialUpdate = Database["public"]["Tables"]["memorials"]["Update"]

export async function createMemorialDraft(
  supabase: SupabaseClient<Database>,
  ownerId: string,
  values: PersonalDetailsValues,
  slug: string
): Promise<Memorial> {
  const { data, error } = await supabase
    .from("memorials")
    .insert({
      owner_id: ownerId,
      slug,
      status: "draft",
      privacy: "private",
      ...personalDetailsToPatch(values),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getMemorialById(
  supabase: SupabaseClient<Database>,
  id: string
) {
  const { data, error } = await supabase
    .from("memorials")
    .select("*")
    .eq("id", id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function updateMemorial(
  supabase: SupabaseClient<Database>,
  id: string,
  patch: MemorialUpdate
): Promise<Memorial> {
  const { data, error } = await supabase
    .from("memorials")
    .update(patch)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export function personalDetailsToPatch(values: PersonalDetailsValues) {
  return {
    first_name: values.firstName,
    middle_names: values.middleNames || null,
    surname: values.surname,
    display_name: values.displayName,
    gender: values.gender || null,
    date_of_birth: values.dateOfBirth || null,
    date_of_death: values.dateOfDeath,
    place_of_birth: values.placeOfBirth || null,
    place_of_death: values.placeOfDeath || null,
    hometown: values.hometown || null,
    nationality: values.nationality || null,
  } satisfies MemorialUpdate
}

export function lifeStoryToPatch(values: LifeStoryValues): MemorialUpdate {
  return {
    announcement: values.announcement || null,
    biography: values.biography || null,
    obituary: values.obituary || null,
    family_message: values.familyMessage || null,
    quotation: values.quotation || null,
    religious_affiliation: values.religiousAffiliation || null,
    occupation: values.occupation || null,
  }
}

export function privacySettingsToPatch(
  values: PrivacySettingsValues
): MemorialUpdate {
  return {
    slug: values.slug,
    privacy: values.privacy,
    allow_tributes: values.allowTributes,
    allow_condolences: values.allowCondolences,
    require_approval: values.requireApproval,
    allow_contributor_photos: values.allowContributorPhotos,
    show_contributor_names: values.showContributorNames,
    search_indexable: values.searchIndexable,
  }
}

export async function publishMemorial(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<Memorial> {
  const { data, error } = await supabase
    .from("memorials")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

/** Replaces all funeral events for a memorial with the given list. */
export async function replaceFuneralEvents(
  supabase: SupabaseClient<Database>,
  memorialId: string,
  events: FuneralEventValues[]
) {
  const { error: deleteError } = await supabase
    .from("funeral_events")
    .delete()
    .eq("memorial_id", memorialId)
  if (deleteError) throw deleteError

  if (events.length === 0) return []

  const { data, error } = await supabase
    .from("funeral_events")
    .insert(
      events.map((event, index) => ({
        memorial_id: memorialId,
        title: event.title,
        event_type: event.eventType,
        event_date: event.eventDate,
        start_time: event.startTime || null,
        end_time: event.endTime || null,
        venue: event.venue,
        town_city: event.townCity,
        region: event.region || null,
        country: event.country,
        directions_url: event.directionsUrl || null,
        dress_code: event.dressCode || null,
        additional_instructions: event.additionalInstructions || null,
        sort_order: index,
      }))
    )
    .select()
  if (error) throw error
  return data
}

export async function isSlugAvailable(
  supabase: SupabaseClient<Database>,
  slug: string,
  excludeId?: string
): Promise<boolean> {
  let query = supabase.from("memorials").select("id").eq("slug", slug)
  if (excludeId) query = query.neq("id", excludeId)
  const { data, error } = await query.maybeSingle()
  if (error) throw error
  return !data
}

export async function generateUniqueSlug(
  supabase: SupabaseClient<Database>,
  displayName: string
): Promise<string> {
  const root = slugify(displayName) || "memorial"
  let candidate = root
  let suffix = 2
  while (!(await isSlugAvailable(supabase, candidate))) {
    candidate = `${root}-${suffix}`
    suffix += 1
  }
  return candidate
}

export async function uploadPrimaryPhoto(
  supabase: SupabaseClient<Database>,
  memorialId: string,
  uploaderProfileId: string,
  file: File
): Promise<string> {
  const extension = file.name.split(".").pop() ?? "jpg"
  const path = `${memorialId}/${uploaderProfileId}/portrait-${Date.now()}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from("memorial-media")
    .upload(path, file, { upsert: false })
  if (uploadError) throw uploadError

  return path
}
