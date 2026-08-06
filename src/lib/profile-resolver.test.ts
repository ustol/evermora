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
    })
    expect(profile).toMatchObject({ id: user.id, clerk_user_id: user.id })
  })
})
