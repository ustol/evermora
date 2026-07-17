/**
 * Hand-written to match supabase/migrations/*.sql exactly. Once a real
 * Supabase project is running these migrations, prefer regenerating this
 * file with `supabase gen types typescript` to stay in sync automatically.
 */

export type UserRole = "user" | "admin"
export type AccountStatus = "active" | "suspended" | "deleted"
export type MemorialStatus = "draft" | "published" | "archived"
export type PrivacyStatus = "public" | "private" | "unlisted"
export type FuneralEventType =
  | "wake"
  | "burial"
  | "funeral_service"
  | "thanksgiving_service"
  | "reception"
  | "other"
export type ModerationStatus = "pending" | "approved" | "rejected" | "flagged"
export type ContributionType = "tribute" | "condolence" | "memory"
export type ReportStatus = "open" | "reviewing" | "resolved" | "dismissed"
export type CollaboratorRole = "editor" | "moderator"
export type NotificationType =
  | "new_contribution"
  | "contribution_approved"
  | "contribution_rejected"
  | "new_report"
  | "memorial_published"
export type GiftPurchaseStatus = "pending" | "paid" | "failed"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          clerk_user_id: string
          display_name: string
          email: string | null
          avatar_url: string | null
          phone: string | null
          country: string | null
          role: UserRole
          status: AccountStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          display_name: string
          email?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string | null
          role?: UserRole
          status?: AccountStatus
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      memorials: {
        Row: {
          id: string
          owner_id: string
          slug: string
          first_name: string
          middle_names: string | null
          surname: string
          display_name: string
          gender: string | null
          date_of_birth: string | null
          date_of_death: string
          place_of_birth: string | null
          place_of_death: string | null
          hometown: string | null
          nationality: string | null
          primary_photo_path: string | null
          primary_photo_alt: string | null
          announcement: string | null
          biography: string | null
          obituary: string | null
          family_message: string | null
          quotation: string | null
          religious_affiliation: string | null
          occupation: string | null
          status: MemorialStatus
          privacy: PrivacyStatus
          allow_tributes: boolean
          allow_condolences: boolean
          require_approval: boolean
          allow_contributor_photos: boolean
          show_contributor_names: boolean
          search_indexable: boolean
          is_featured: boolean
          admin_suspended: boolean
          published_at: string | null
          archived_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          slug: string
          first_name: string
          middle_names?: string | null
          surname: string
          display_name: string
          gender?: string | null
          date_of_birth?: string | null
          date_of_death: string
          place_of_birth?: string | null
          place_of_death?: string | null
          hometown?: string | null
          nationality?: string | null
          primary_photo_path?: string | null
          primary_photo_alt?: string | null
          announcement?: string | null
          biography?: string | null
          obituary?: string | null
          family_message?: string | null
          quotation?: string | null
          religious_affiliation?: string | null
          occupation?: string | null
          status?: MemorialStatus
          privacy?: PrivacyStatus
          allow_tributes?: boolean
          allow_condolences?: boolean
          require_approval?: boolean
          allow_contributor_photos?: boolean
          show_contributor_names?: boolean
          search_indexable?: boolean
          is_featured?: boolean
          admin_suspended?: boolean
          published_at?: string | null
          archived_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["memorials"]["Insert"]>
        Relationships: []
      }
      funeral_events: {
        Row: {
          id: string
          memorial_id: string
          title: string
          event_type: FuneralEventType
          event_date: string
          start_time: string | null
          end_time: string | null
          venue: string
          town_city: string
          region: string | null
          country: string
          directions_url: string | null
          dress_code: string | null
          additional_instructions: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          title: string
          event_type: FuneralEventType
          event_date: string
          start_time?: string | null
          end_time?: string | null
          venue: string
          town_city: string
          region?: string | null
          country: string
          directions_url?: string | null
          dress_code?: string | null
          additional_instructions?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["funeral_events"]["Insert"]>
        Relationships: []
      }
      memorial_media: {
        Row: {
          id: string
          memorial_id: string
          uploaded_by: string
          storage_path: string
          caption: string | null
          alt_text: string | null
          sort_order: number
          moderation_status: ModerationStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          uploaded_by: string
          storage_path: string
          caption?: string | null
          alt_text?: string | null
          sort_order?: number
          moderation_status?: ModerationStatus
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["memorial_media"]["Insert"]>
        Relationships: []
      }
      contributions: {
        Row: {
          id: string
          memorial_id: string
          author_id: string | null
          author_name: string | null
          type: ContributionType
          relationship: string | null
          title: string | null
          message: string
          photo_media_id: string | null
          status: ModerationStatus
          reviewed_by: string | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          author_id?: string | null
          author_name?: string | null
          type: ContributionType
          relationship?: string | null
          title?: string | null
          message: string
          photo_media_id?: string | null
          status?: ModerationStatus
          reviewed_by?: string | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["contributions"]["Insert"]>
        Relationships: []
      }
      content_reports: {
        Row: {
          id: string
          memorial_id: string | null
          contribution_id: string | null
          media_id: string | null
          reported_by: string
          reason: string
          status: ReportStatus
          resolved_by: string | null
          resolution_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id?: string | null
          contribution_id?: string | null
          media_id?: string | null
          reported_by: string
          reason: string
          status?: ReportStatus
          resolved_by?: string | null
          resolution_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["content_reports"]["Insert"]>
        Relationships: []
      }
      memorial_collaborators: {
        Row: {
          id: string
          memorial_id: string
          profile_id: string
          role: CollaboratorRole
          invited_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          profile_id: string
          role?: CollaboratorRole
          invited_by?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["memorial_collaborators"]["Insert"]>
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          target_type: string
          target_id: string
          metadata: Record<string, unknown> | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          target_type: string
          target_id: string
          metadata?: Record<string, unknown> | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          type: NotificationType
          title: string
          body: string | null
          link: string | null
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_id: string
          type: NotificationType
          title: string
          body?: string | null
          link?: string | null
          read_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>
        Relationships: []
      }
      app_settings: {
        Row: {
          key: string
          value: Record<string, unknown>
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value: Record<string, unknown>
          updated_at?: string
          updated_by?: string | null
        }
        Update: Partial<Database["public"]["Tables"]["app_settings"]["Insert"]>
        Relationships: []
      }
      gift_catalog: {
        Row: {
          id: string
          name: string
          image_path: string
          price: number
          currency: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          image_path: string
          price: number
          currency?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["gift_catalog"]["Insert"]>
        Relationships: []
      }
      gift_purchases: {
        Row: {
          id: string
          memorial_id: string
          gift_catalog_id: string
          purchaser_profile_id: string | null
          purchaser_display_name: string
          amount: number
          currency: string
          paystack_reference: string
          status: GiftPurchaseStatus
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          gift_catalog_id: string
          purchaser_profile_id?: string | null
          purchaser_display_name: string
          amount?: number
          currency?: string
          paystack_reference: string
          status?: GiftPurchaseStatus
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["gift_purchases"]["Insert"]>
        Relationships: []
      }
      hero_images: {
        Row: {
          id: string
          storage_path: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          storage_path: string
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["hero_images"]["Insert"]>
        Relationships: []
      }
    }
    Views: {
      public_profiles: {
        Row: {
          id: string
          display_name: string
          avatar_url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      moderate_contribution: {
        Args: { p_contribution_id: string; p_status: ModerationStatus }
        Returns: void
      }
      moderate_media: {
        Args: { p_media_id: string; p_status: ModerationStatus }
        Returns: void
      }
      admin_update_profile_role: {
        Args: { p_profile_id: string; p_role: UserRole }
        Returns: void
      }
      admin_update_profile_status: {
        Args: { p_profile_id: string; p_status: AccountStatus }
        Returns: void
      }
      admin_set_memorial_featured: {
        Args: { p_memorial_id: string; p_featured: boolean }
        Returns: void
      }
      admin_suspend_memorial: {
        Args: { p_memorial_id: string; p_suspend: boolean }
        Returns: void
      }
    }
    Enums: {
      user_role: UserRole
      account_status: AccountStatus
      memorial_status: MemorialStatus
      privacy_status: PrivacyStatus
      funeral_event_type: FuneralEventType
      moderation_status: ModerationStatus
      contribution_type: ContributionType
      report_status: ReportStatus
      collaborator_role: CollaboratorRole
      notification_type: NotificationType
      gift_purchase_status: GiftPurchaseStatus
    }
  }
}
