/**
 * View-model for memorial listing cards (directory grid, dashboard list).
 * Intentionally decoupled from the Supabase row type (added in the schema
 * phase) so presentational components don't depend on persistence shape.
 */
export interface MemorialCardData {
  id: string
  slug: string
  displayName: string
  photoUrl?: string | null
  photoAlt?: string | null
  dateOfBirth?: string | null
  dateOfDeath: string
  hometown?: string | null
  shortAnnouncement?: string | null
}
