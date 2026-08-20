import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MarkdownContent } from "@/components/shared/MarkdownContent"

describe("MarkdownContent", () => {
  it("renders a plain-text paragraph as a <p> element", () => {
    render(<MarkdownContent>{"A plain paragraph"}</MarkdownContent>)

    const paragraph = screen.getByText("A plain paragraph")
    expect(paragraph.tagName).toBe("P")
  })

  it("renders two paragraphs separated by a blank line", () => {
    render(<MarkdownContent>{"First paragraph\n\nSecond paragraph"}</MarkdownContent>)

    expect(screen.getByText("First paragraph").tagName).toBe("P")
    expect(screen.getByText("Second paragraph").tagName).toBe("P")
  })

  it("renders **bold** text as a <strong> element", () => {
    render(<MarkdownContent>{"This is **bold** text"}</MarkdownContent>)

    const strong = screen.getByText("bold")
    expect(strong.tagName).toBe("STRONG")
  })

  it("renders a > blockquote as a <blockquote> element", () => {
    render(<MarkdownContent>{"> A quoted line"}</MarkdownContent>)

    const text = screen.getByText("A quoted line")
    expect(text.closest("blockquote")).toBeInTheDocument()
  })

  it("does not render raw HTML", () => {
    const { container } = render(
      <MarkdownContent>{"<script>alert('xss')</script>"}</MarkdownContent>
    )

    expect(container.querySelector("script")).not.toBeInTheDocument()
    expect(container.innerHTML).not.toContain("<script>")
  })
})
