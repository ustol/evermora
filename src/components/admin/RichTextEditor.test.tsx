import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { RichTextEditor } from "@/components/admin/RichTextEditor"

function renderEditor(value: string) {
  const onChange = vi.fn()
  render(<RichTextEditor value={value} onChange={onChange} aria-label="Body" />)
  const textarea = screen.getByRole("textbox", { name: "Body" }) as HTMLTextAreaElement
  return { textarea, onChange }
}

function select(textarea: HTMLTextAreaElement, start: number, end: number) {
  textarea.setSelectionRange(start, end)
}

function clickTool(name: string) {
  fireEvent.mouseDown(screen.getByRole("button", { name }))
}

describe("RichTextEditor", () => {
  beforeEach(() => {
    // jsdom does not implement requestAnimationFrame; the editor uses it only
    // to restore caret/selection after a command, which we don't assert here.
    vi.stubGlobal("requestAnimationFrame", () => 0)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("wraps the selected text in ** bold markers", () => {
    const { textarea, onChange } = renderEditor("Hello world")
    select(textarea, 0, 5)

    clickTool("Bold")

    expect(onChange).toHaveBeenCalledWith("**Hello** world")
  })

  it("inserts a bold placeholder when nothing is selected", () => {
    const { textarea, onChange } = renderEditor("")
    select(textarea, 0, 0)

    clickTool("Bold")

    expect(onChange).toHaveBeenCalledWith("**bold text**")
  })

  it("wraps the selected text in * italic markers", () => {
    const { textarea, onChange } = renderEditor("Hello world")
    select(textarea, 0, 5)

    clickTool("Italic")

    expect(onChange).toHaveBeenCalledWith("*Hello* world")
  })

  it("adds a ## heading prefix to the current line", () => {
    const { textarea, onChange } = renderEditor("Heading line")
    select(textarea, 3, 7)

    clickTool("Heading")

    expect(onChange).toHaveBeenCalledWith("## Heading line")
  })

  it("removes the ## heading prefix when it is already present", () => {
    const { textarea, onChange } = renderEditor("## Heading line")
    select(textarea, 2, 5)

    clickTool("Heading")

    expect(onChange).toHaveBeenCalledWith("Heading line")
  })

  it("applies the heading prefix to every line touched by the selection", () => {
    const { textarea, onChange } = renderEditor("one\ntwo\nthree")
    select(textarea, 0, 7)

    clickTool("Heading")

    expect(onChange).toHaveBeenCalledWith("## one\n## two\nthree")
  })

  it("adds a > quote prefix to the current line", () => {
    const { textarea, onChange } = renderEditor("Quote me")
    select(textarea, 0, 3)

    clickTool("Quote")

    expect(onChange).toHaveBeenCalledWith("> Quote me")
  })

  it("removes the > quote prefix when it is already present", () => {
    const { textarea, onChange } = renderEditor("> Quote me")
    select(textarea, 1, 4)

    clickTool("Quote")

    expect(onChange).toHaveBeenCalledWith("Quote me")
  })

  it("adds a - list prefix to the current line", () => {
    const { textarea, onChange } = renderEditor("Buy milk")
    select(textarea, 0, 3)

    clickTool("Bulleted list")

    expect(onChange).toHaveBeenCalledWith("- Buy milk")
  })

  it("removes the - list prefix when it is already present", () => {
    const { textarea, onChange } = renderEditor("- Buy milk")
    select(textarea, 0, 2)

    clickTool("Bulleted list")

    expect(onChange).toHaveBeenCalledWith("Buy milk")
  })

  it("clears a heading back to a plain paragraph", () => {
    const { textarea, onChange } = renderEditor("### Deep heading")
    select(textarea, 1, 4)

    clickTool("Paragraph")

    expect(onChange).toHaveBeenCalledWith("Deep heading")
  })

  it("clears a quote back to a plain paragraph", () => {
    const { textarea, onChange } = renderEditor("> A quote")
    select(textarea, 1, 3)

    clickTool("Paragraph")

    expect(onChange).toHaveBeenCalledWith("A quote")
  })

  it("leaves a plain paragraph unchanged", () => {
    const { textarea, onChange } = renderEditor("Just a paragraph")
    select(textarea, 0, 4)

    clickTool("Paragraph")

    expect(onChange).toHaveBeenCalledWith("Just a paragraph")
  })
})
