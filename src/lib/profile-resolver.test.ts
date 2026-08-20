import { describe, expect, it, vi } from "vitest"
import { syncProfileForUser } from "@/lib/profile-resolver"

function maybeSingleResult(data: unknown) {
  return {
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        maybeSingle: vi.fn().mockResolvedValue({ data, error: null }),
      })),
    })),
  }
}

describe("syncProfileForUser", () => {
  it("creates new profiles with the Supabase auth id as the profile id", async () => {
    const insert = vi.fn((row) => ({
      select: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({
          data: row,
          error: null,
        }),
      })),
    }))
    const supabase = {
      from: vi
        .fn()
        .mockReturnValueOnce(maybeSingleResult(null))
        .mockReturnValueOnce(maybeSingleResult(null))
        .mockReturnValueOnce({ insert }),
    }
    const user = {
      id: "auth-user-123",
      email: "admin@example.com",
      user_metadata: { display_name: "Admin User" },
    }

    const profile = await syncProfileForUser(supabase as never, user)

    expect(supabase.from).toHaveBeenCalledWith("profiles")
    expect(insert).toHaveBeenCalledWith({
      id: user.id,
      clerk_user_id: user.id,
      email: user.email,
      display_name: "Admin User",
      avatar_url: null,
    })
    expect(profile).toMatchObject({ id: user.id, clerk_user_id: user.id, avatar_url: null })
  })

  it("copies a safe provider avatar URL to newly created profiles", async () => {
    const insert = vi.fn((row) => ({
      select: vi.fn(() => ({
        single: vi.fn().mockResolvedValue({
          data: row,
          error: null,
        }),
      })),
    }))
    const supabase = {
      from: vi
        .fn()
        .mockReturnValueOnce(maybeSingleResult(null))
        .mockReturnValueOnce(maybeSingleResult(null))
        .mockReturnValueOnce({ insert }),
    }
    const user = {
      id: "auth-user-with-avatar",
      email: "avatar@example.com",
      user_metadata: {
        display_name: "Avatar User",
        avatar_url: "https://cdn.example.com/avatar.png",
      },
    }

    await syncProfileForUser(supabase as never, user)

    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        id: user.id,
        display_name: "Avatar User",
        avatar_url: "https://cdn.example.com/avatar.png",
      }),
    )
  })
})
