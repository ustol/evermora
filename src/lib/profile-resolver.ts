import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

/** Only accept absolute https avatar URLs; otherwise treat as "no avatar". */
function sanitizeAvatarUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}

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
  const displayName = (user.user_metadata?.display_name as string) ?? email ?? "Akornafa user";
  const avatarUrl = sanitizeAvatarUrl(user.user_metadata?.avatar_url);
  const existing = await resolveProfileForUser(supabase, user);

  if (existing) {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        clerk_user_id: user.id,
        email,
        display_name: displayName,
        // Keep the existing avatar when the provider metadata has none, so a
        // manual upload (which also writes avatar_url directly) is not wiped
        // by a later OAuth sync that omits the field.
        ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      })
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      clerk_user_id: user.id,
      email,
      display_name: displayName,
      avatar_url: avatarUrl,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
