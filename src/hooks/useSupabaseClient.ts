"use client"

import { createClient } from "@/lib/supabase-browser"
import type { SupabaseClient } from "@supabase/supabase-js"
import { useMemo } from "react"
import type { Database } from "@/types/supabase"

export function useSupabaseClient(): SupabaseClient<Database> {
  return useMemo(() => createClient(), [])
}
