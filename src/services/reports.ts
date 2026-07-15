import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

export async function reportMemorial(
  supabase: SupabaseClient<Database>,
  params: { memorialId: string; reportedBy: string; reason: string }
) {
  const { error } = await supabase.from("content_reports").insert({
    memorial_id: params.memorialId,
    reported_by: params.reportedBy,
    reason: params.reason,
  })
  if (error) throw error
}
