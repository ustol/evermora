import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getAppManagedDisplayName, getAuthDisplayName } from "@/lib/auth-metadata";
import type { Database } from "@/types/supabase";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function resolveProfileForUser(
  supabase: SupabaseClient<Database>,
  user: Pick<User, "id" | "email">,
): Promise<ProfileRow | null> {
  const { data: byAuthId, error: byAuthIdError } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (byAuthIdError) throw byAuthIdError;
  if (byAuthId) return byAuthId;

  if (!user.email) return null;

  const { data: byEmail, error: byEmailError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (byEmailError) throw byEmailError;
  return byEmail ?? null;
}

export async function syncProfileForUser(
  supabase: SupabaseClient<Database>,
  user: Pick<User, "id" | "email" | "user_metadata">,
): Promise<ProfileRow | null> {
  const email = user.email ?? null;
  const appManagedDisplayName = getAppManagedDisplayName(user.user_metadata);
  const displayName = getAuthDisplayName(user.user_metadata, email);
  const existing = await resolveProfileForUser(supabase, user);

  if (existing) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ clerk_user_id: user.id, email, display_name: appManagedDisplayName ?? existing.display_name })
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({ clerk_user_id: user.id, email, display_name: displayName })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
