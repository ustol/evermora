import { describe, expect, it, vi } from "vitest"
import { listContributionsForModeration, moderateContribution } from "@/services/contributions"

const contributionRow = {
  id: "contribution-1",
  type: "tribute",
  relationship: "Friend",
  title: "A bright light",
  message: "We will remember your kindness.",
  status: "pending",
  created_at: "2026-01-02T03:04:05.000Z",
  author_name: "The Mensah Family",
  photo_media_id: "media-1",
  author: { display_name: "Profile Name", avatar_url: "https://example.test/avatar.jpg" },
  photo: { storage_path: "memorial-1/uploads/photo.jpg" },
}

function createListClient(result: { data: unknown[] | null; error: Error | null }) {
  const order = vi.fn(async () => result)
  const eq = vi.fn(() => ({ order }))
  const select = vi.fn(() => ({ eq }))
  const from = vi.fn(() => ({ select }))
  const createSignedUrl = vi.fn(async () => ({ data: { signedUrl: "https://signed.example.test/photo.jpg" }, error: null }))
  const storageFrom = vi.fn(() => ({ createSignedUrl }))

  return {
    supabase: { from, storage: { from: storageFrom } },
    from,
    select,
    eq,
    order,
    storageFrom,
    createSignedUrl,
  }
}

function createRpcClient(results: Record<string, { error: Error | null }> = {}) {
  const rpc = vi.fn(async (name: string) => results[name] ?? { error: null })

  return {
    supabase: { rpc },
    rpc,
  }
}

describe("listContributionsForModeration", () => {
  it("selects photo media ids and maps pending tribute photos for owner moderation", async () => {
    const client = createListClient({ data: [contributionRow], error: null })

    await expect(listContributionsForModeration(client.supabase as never, "memorial-1")).resolves.toEqual([
      {
        id: "contribution-1",
        type: "tribute",
        relationship: "Friend",
        title: "A bright light",
        message: "We will remember your kindness.",
        status: "pending",
        createdAt: "2026-01-02T03:04:05.000Z",
        authorDisplayName: "The Mensah Family",
        authorAvatarUrl: "https://example.test/avatar.jpg",
        photoUrl: "https://signed.example.test/photo.jpg",
        photoMediaId: "media-1",
      },
    ])

    expect(client.from).toHaveBeenCalledWith("contributions")
    expect(client.select).toHaveBeenCalledWith(expect.stringContaining("photo_media_id"))
    expect(client.select).toHaveBeenCalledWith(expect.stringContaining("photo:memorial_media(storage_path)"))
    expect(client.eq).toHaveBeenCalledWith("memorial_id", "memorial-1")
    expect(client.order).toHaveBeenCalledWith("created_at", { ascending: false })
    expect(client.storageFrom).toHaveBeenCalledWith("memorial-media")
    expect(client.createSignedUrl).toHaveBeenCalledWith("memorial-1/uploads/photo.jpg", 3600)
  })

  it("propagates Supabase listing errors instead of hiding missing photo joins", async () => {
    const client = createListClient({ data: null, error: new Error("ambiguous photo relation") })

    await expect(listContributionsForModeration(client.supabase as never, "memorial-1")).rejects.toThrow(
      "ambiguous photo relation"
    )
  })
})

describe("moderateContribution", () => {
  it("moderates the contribution and attached tribute photo together", async () => {
    const client = createRpcClient()

    await expect(
      moderateContribution(client.supabase as never, "contribution-1", "approved", "media-1")
    ).resolves.toBeUndefined()

    expect(client.rpc).toHaveBeenNthCalledWith(1, "moderate_contribution", {
      p_contribution_id: "contribution-1",
      p_status: "approved",
    })
    expect(client.rpc).toHaveBeenNthCalledWith(2, "moderate_media", {
      p_media_id: "media-1",
      p_status: "approved",
    })
  })

  it("does not call media moderation when a contribution has no attached photo", async () => {
    const client = createRpcClient()

    await expect(moderateContribution(client.supabase as never, "contribution-1", "rejected", null)).resolves.toBeUndefined()

    expect(client.rpc).toHaveBeenCalledTimes(1)
    expect(client.rpc).toHaveBeenCalledWith("moderate_contribution", {
      p_contribution_id: "contribution-1",
      p_status: "rejected",
    })
  })

  it("reports a real failure if the attached photo cannot be moderated", async () => {
    const client = createRpcClient({ moderate_media: { error: new Error("media moderation denied") } })

    await expect(moderateContribution(client.supabase as never, "contribution-1", "approved", "media-1")).rejects.toThrow(
      "media moderation denied"
    )
  })
})
