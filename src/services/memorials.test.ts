import { describe, expect, it, vi } from "vitest"
import { deleteMemorial } from "@/services/memorials"

function createDeleteClient(result: { data: unknown[] | null; error: Error | null }) {
  const select = vi.fn(async () => result)
  const eq = vi.fn(() => ({ select }))
  const deleteFn = vi.fn(() => ({ eq }))
  const from = vi.fn(() => ({ delete: deleteFn }))

  return {
    supabase: { from },
    from,
    deleteFn,
    eq,
    select,
  }
}

describe("deleteMemorial", () => {
  it("deletes by id and resolves only when Supabase returns a deleted row", async () => {
    const client = createDeleteClient({ data: [{ id: "memorial-1" }], error: null })

    await expect(deleteMemorial(client.supabase as never, "memorial-1")).resolves.toBeUndefined()

    expect(client.from).toHaveBeenCalledWith("memorials")
    expect(client.deleteFn).toHaveBeenCalled()
    expect(client.eq).toHaveBeenCalledWith("id", "memorial-1")
    expect(client.select).toHaveBeenCalledWith("id")
  })

  it("throws when the delete matched no rows so callers do not report a false success", async () => {
    const client = createDeleteClient({ data: [], error: null })

    await expect(deleteMemorial(client.supabase as never, "missing-id")).rejects.toThrow(
      "Memorial was not deleted"
    )
  })

  it("propagates Supabase delete errors", async () => {
    const client = createDeleteClient({ data: null, error: new Error("permission denied") })

    await expect(deleteMemorial(client.supabase as never, "memorial-1")).rejects.toThrow(
      "permission denied"
    )
  })
})
