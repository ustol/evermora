import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MediaLightbox } from "@/components/memorial/MediaLightbox"
import type { MediaItem } from "@/services/media"

function makePhoto(overrides: Partial<MediaItem> = {}): MediaItem {
  return {
    id: "1",
    storagePath: "path/1.jpg",
    url: "https://example.com/1.jpg",
    caption: null,
    altText: null,
    sortOrder: 0,
    status: "approved",
    uploadedBy: "profile-1",
    createdAt: "2026-01-01T00:00:00Z",
    ...overrides,
  }
}

const photos: MediaItem[] = [
  makePhoto({ id: "1", url: "https://example.com/1.jpg", caption: "First" }),
  makePhoto({ id: "2", url: "https://example.com/2.jpg", caption: "Second" }),
  makePhoto({ id: "3", url: "https://example.com/3.jpg", caption: "Third" }),
]

describe("MediaLightbox", () => {
  it("renders the photo at the given index", () => {
    render(
      <MediaLightbox photos={photos} index={1} onClose={vi.fn()} onNavigate={vi.fn()} />
    )
    expect(screen.getByText("Second")).toBeInTheDocument()
  })

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <MediaLightbox photos={photos} index={0} onClose={onClose} onNavigate={vi.fn()} />
    )
    await user.keyboard("{Escape}")
    expect(onClose).toHaveBeenCalledOnce()
  })

  it("navigates to the next photo on ArrowRight, wrapping at the end", async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()
    render(
      <MediaLightbox photos={photos} index={2} onClose={vi.fn()} onNavigate={onNavigate} />
    )
    await user.keyboard("{ArrowRight}")
    expect(onNavigate).toHaveBeenCalledWith(0)
  })

  it("navigates to the previous photo on ArrowLeft, wrapping at the start", async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()
    render(
      <MediaLightbox photos={photos} index={0} onClose={vi.fn()} onNavigate={onNavigate} />
    )
    await user.keyboard("{ArrowLeft}")
    expect(onNavigate).toHaveBeenCalledWith(2)
  })

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <MediaLightbox photos={photos} index={0} onClose={onClose} onNavigate={vi.fn()} />
    )
    await user.click(screen.getByRole("button", { name: "Close" }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it("hides prev/next arrows when there is only one photo", () => {
    render(
      <MediaLightbox photos={[photos[0]]} index={0} onClose={vi.fn()} onNavigate={vi.fn()} />
    )
    expect(screen.queryByRole("button", { name: "Next photo" })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "Previous photo" })).not.toBeInTheDocument()
  })

  it("renders nothing when the index is out of range", () => {
    const { container } = render(
      <MediaLightbox photos={photos} index={99} onClose={vi.fn()} onNavigate={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })
})
