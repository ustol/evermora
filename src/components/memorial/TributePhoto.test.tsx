import { describe, expect, it } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { TributePhoto } from "@/components/memorial/TributePhoto"

// alt="" (correctly, since this is a decorative image) removes the element
// from the accessibility tree's "img" role, so query the DOM directly
// rather than via getByRole.
function getImg(container: HTMLElement): HTMLImageElement {
  return container.querySelector("img")!
}

function fireLoadWithDimensions(img: HTMLImageElement, width: number, height: number) {
  Object.defineProperty(img, "naturalWidth", { value: width, configurable: true })
  Object.defineProperty(img, "naturalHeight", { value: height, configurable: true })
  fireEvent.load(img)
}

describe("TributePhoto", () => {
  it("renders full-width before the image has loaded", () => {
    const { container } = render(<TributePhoto url="https://example.com/photo.jpg" />)
    const img = getImg(container)
    expect(img.className).toContain("w-full")
    expect(img.className).not.toContain("float-left")
  })

  it("floats and shrinks a portrait image once loaded", () => {
    const { container } = render(<TributePhoto url="https://example.com/photo.jpg" />)
    const img = getImg(container)
    fireLoadWithDimensions(img, 600, 900)
    expect(img.className).toContain("float-left")
    expect(img.className).not.toContain("w-full")
  })

  it("keeps a landscape image full-width once loaded", () => {
    const { container } = render(<TributePhoto url="https://example.com/photo.jpg" />)
    const img = getImg(container)
    fireLoadWithDimensions(img, 900, 600)
    expect(img.className).toContain("w-full")
    expect(img.className).not.toContain("float-left")
  })

  it("treats a square image as landscape (full-width)", () => {
    const { container } = render(<TributePhoto url="https://example.com/photo.jpg" />)
    const img = getImg(container)
    fireLoadWithDimensions(img, 500, 500)
    expect(img.className).toContain("w-full")
    expect(img.className).not.toContain("float-left")
  })
})
