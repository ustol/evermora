import { describe, expect, it, vi } from "vitest"
import { syncProfileForUser } from "@/lib/profile-resolver"

function createProfileSupabase(existing: { id: string; clerk_user_id: string; email: string | null; display_name: string }) {
  const update = vi.fn((payload: unknown) => ({
    eq: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({ data: { ...existing, ...(payload as object) }, error: null }),
      })),
    })),
  }))

  const from = vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({ maybeSingle: vi.fn().mockResolvedValue({ data: existing, error: null }) })),
    })),
    update,
  }))

  return { supabase: { from }, update }
}

describe("syncProfileForUser", () => {
  it("preserves an existing profile display name when auth metadata is provider-normalized", async () => {
    const existing = {
      id: "profile-1",
      clerk_user_id: "user-1",
      email: "ama@example.com",
      display_name: "Ama Mensah",
    }
    const { supabase, update } = createProfileSupabase(existing)

    await syncProfileForUser(supabase as never, {
      id: "user-1",
      email: "ama@example.com",
      user_metadata: {
        display_name: "visio cms",
        first_name: "visio",
        last_name: "cms",
        full_name: "visio cms",
        profile_name_source: "provider",
      },
    })

    expect(update).toHaveBeenCalledWith({
      clerk_user_id: "user-1",
      email: "ama@example.com",
      display_name: "Ama Mensah",
    })
  })
})
