import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

vi.mock("@/lib/auth-profile", () => ({
  getCurrentProfile: vi.fn(),
}))

vi.mock("@/services/memorials", () => ({
  getMemorialById: vi.fn(),
  deleteMemorial: vi.fn(),
}))

import { revalidatePath } from "next/cache"
import { getCurrentProfile } from "@/lib/auth-profile"
import { deleteMemorial, getMemorialById } from "@/services/memorials"
import { DELETE } from "./route"

const mockedGetCurrentProfile = vi.mocked(getCurrentProfile)
const mockedGetMemorialById = vi.mocked(getMemorialById)
const mockedDeleteMemorial = vi.mocked(deleteMemorial)
const mockedRevalidatePath = vi.mocked(revalidatePath)

const context = (id = "memorial-1") => ({ params: Promise.resolve({ id }) })

describe("DELETE /api/dashboard/memorials/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns 401 when the user is not authenticated", async () => {
    mockedGetCurrentProfile.mockResolvedValue(null)

    const response = await DELETE(new Request("http://localhost/api/dashboard/memorials/memorial-1"), context())

    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: "Unauthorized" })
    expect(mockedDeleteMemorial).not.toHaveBeenCalled()
    expect(mockedRevalidatePath).not.toHaveBeenCalled()
  })

  it("deletes an owned memorial and revalidates public and dashboard paths", async () => {
    const supabase = { from: vi.fn() }
    mockedGetCurrentProfile.mockResolvedValue({
      supabase,
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)
    mockedGetMemorialById.mockResolvedValue({
      id: "memorial-1",
      owner_id: "owner-1",
      slug: "ada-lovelace",
    } as never)
    mockedDeleteMemorial.mockResolvedValue(undefined)

    const response = await DELETE(new Request("http://localhost/api/dashboard/memorials/memorial-1"), context())

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(mockedDeleteMemorial).toHaveBeenCalledWith(supabase, "memorial-1")
    expect(mockedRevalidatePath).toHaveBeenCalledTimes(4)
    expect(mockedRevalidatePath).toHaveBeenNthCalledWith(1, "/")
    expect(mockedRevalidatePath).toHaveBeenNthCalledWith(2, "/memorials")
    expect(mockedRevalidatePath).toHaveBeenNthCalledWith(3, "/memorials/ada-lovelace")
    expect(mockedRevalidatePath).toHaveBeenNthCalledWith(4, "/dashboard/memorials")
  })

  it("does not revalidate or report success when the actual delete fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)
    mockedGetMemorialById.mockResolvedValue({
      id: "memorial-1",
      owner_id: "owner-1",
      slug: "ada-lovelace",
    } as never)
    mockedDeleteMemorial.mockRejectedValue(new Error("Memorial was not deleted"))

    try {
      const response = await DELETE(new Request("http://localhost/api/dashboard/memorials/memorial-1"), context())

      expect(response.status).toBe(500)
      expect(await response.json()).toEqual({ error: "Failed to delete memorial" })
      expect(mockedRevalidatePath).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })

  it("returns 404 without deleting when the memorial is missing or not owned", async () => {
    mockedGetCurrentProfile.mockResolvedValue({
      supabase: {},
      profile: { id: "profile-1" },
      ownerIds: ["owner-1"],
    } as never)
    mockedGetMemorialById.mockResolvedValue({
      id: "memorial-1",
      owner_id: "owner-2",
      slug: "not-owned",
    } as never)

    const response = await DELETE(new Request("http://localhost/api/dashboard/memorials/memorial-1"), context())

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ error: "Not found" })
    expect(mockedDeleteMemorial).not.toHaveBeenCalled()
    expect(mockedRevalidatePath).not.toHaveBeenCalled()
  })
})
