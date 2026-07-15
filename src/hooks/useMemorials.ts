import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useSupabaseClient } from "@/hooks/useSupabaseClient"
import {
  listPublicMemorials,
  listHighlightedMemorials,
  getMemorialBySlug,
  getFuneralEvents,
  getSignedPhotoUrl,
  type MemorialListFilters,
} from "@/services/memorials"

export function usePublicMemorials(filters: MemorialListFilters) {
  const supabase = useSupabaseClient()
  return useQuery({
    queryKey: ["memorials", "public", filters],
    queryFn: () => listPublicMemorials(supabase, filters),
    placeholderData: keepPreviousData,
  })
}

export function useHighlightedMemorials(limit = 3) {
  const supabase = useSupabaseClient()
  return useQuery({
    queryKey: ["memorials", "highlighted", limit],
    queryFn: () => listHighlightedMemorials(supabase, limit),
  })
}

export function useMemorialBySlug(slug: string | undefined) {
  const supabase = useSupabaseClient()
  return useQuery({
    queryKey: ["memorial", slug],
    queryFn: async () => {
      if (!slug) return null
      const memorial = await getMemorialBySlug(supabase, slug)
      if (!memorial) return null

      const [events, photoUrl] = await Promise.all([
        getFuneralEvents(supabase, memorial.id),
        getSignedPhotoUrl(supabase, memorial.primary_photo_path),
      ])

      return { memorial, events, photoUrl }
    },
    enabled: !!slug,
  })
}
