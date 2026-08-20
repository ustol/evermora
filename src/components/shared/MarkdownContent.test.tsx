import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MarkdownContent } from "@/components/shared/MarkdownContent"

describe("MarkdownContent legacy vs markdown detection", () => {
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

  it("renders legacy plain text with single newlines as one paragraph per line", () => {
    render(<MarkdownContent>{"First line\nSecond line\nThird line"}</MarkdownContent>)

    expect(screen.getByText("First line").tagName).toBe("P")
    expect(screen.getByText("Second line").tagName).toBe("P")
    expect(screen.getByText("Third line").tagName).toBe("P")
  })

  it("does not parse prose that contains no markdown markers", () => {
    const { container } = render(
      <MarkdownContent>{"Costs are rising but still manageable."}</MarkdownContent>,
    )

    expect(container.querySelector("strong")).not.toBeInTheDocument()
    expect(container.querySelector("em")).not.toBeInTheDocument()
    expect(container.querySelector("h1")).not.toBeInTheDocument()
    expect(container.querySelector("blockquote")).not.toBeInTheDocument()
  })

  it("renders a # heading as an <h1> element", () => {
    render(<MarkdownContent>{"# A level-one heading"}</MarkdownContent>)

    const heading = screen.getByText("A level-one heading")
    expect(heading.tagName).toBe("H1")
  })

  it("renders a ## heading as an <h2> element", () => {
    render(<MarkdownContent>{"## A level-two heading"}</MarkdownContent>)

    const heading = screen.getByText("A level-two heading")
    expect(heading.tagName).toBe("H2")
  })

  it("renders a ### heading as an <h3> element", () => {
    render(<MarkdownContent>{"### A level-three heading"}</MarkdownContent>)

    const heading = screen.getByText("A level-three heading")
    expect(heading.tagName).toBe("H3")
  })

  it("renders **bold** text as a <strong> element", () => {
    render(<MarkdownContent>{"This is **bold** text"}</MarkdownContent>)

    const strong = screen.getByText("bold")
    expect(strong.tagName).toBe("STRONG")
  })

  it("renders *italic* text as an <em> element", () => {
    render(<MarkdownContent>{"This is *italic* text"}</MarkdownContent>)

    const em = screen.getByText("italic")
    expect(em.tagName).toBe("EM")
  })

  it("renders a > blockquote as a <blockquote> element", () => {
    render(<MarkdownContent>{"> A quoted line"}</MarkdownContent>)

    const text = screen.getByText("A quoted line")
    expect(text.closest("blockquote")).toBeInTheDocument()
  })

  it("renders a - bulleted list as a <ul> with <li> items", () => {
    const { container } = render(<MarkdownContent>{"- First\n- Second"}</MarkdownContent>)

    const items = container.querySelectorAll("ul li")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent("First")
    expect(items[1]).toHaveTextContent("Second")
  })

  it("renders a 1. ordered list as an <ol> with <li> items", () => {
    const { container } = render(<MarkdownContent>{"1. First\n2. Second"}</MarkdownContent>)

    const items = container.querySelectorAll("ol li")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent("First")
    expect(items[1]).toHaveTextContent("Second")
  })

  it("renders a 1) ordered list marker as an <ol>", () => {
    const { container } = render(<MarkdownContent>{"1) Only item"}</MarkdownContent>)

    const items = container.querySelectorAll("ol li")
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveTextContent("Only item")
  })

  it("renders a markdown link as an anchor with the href", () => {
    render(<MarkdownContent>{"Read [the docs](https://example.com/docs)."}</MarkdownContent>)

    const link = screen.getByRole("link", { name: "the docs" })
    expect(link).toHaveAttribute("href", "https://example.com/docs")
  })

  it("does not render raw HTML in legacy content", () => {
    const { container } = render(
      <MarkdownContent>{"<script>alert('xss')</script>"}</MarkdownContent>,
    )

    expect(container.querySelector("script")).not.toBeInTheDocument()
    expect(container.innerHTML).not.toContain("<script>")
  })

  it("does not render raw HTML embedded in markdown content", () => {
    const { container } = render(
      <MarkdownContent>{"**bold** <script>alert('xss')</script>"}</MarkdownContent>,
    )

    expect(container.querySelector("script")).not.toBeInTheDocument()
    expect(container.querySelector("strong")).toHaveTextContent("bold")
  })
})
