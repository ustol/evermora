"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { useMemo } from "react"
import type { Database } from "@/types/supabase"

export function useSupabaseClient(): SupabaseClient<Database> {
  return useMemo(
    () =>
      createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        { auth: { persistSession: false } }
      ),
    []
  )
}
