"use client";

import { useRef } from "react"
import {
  Bold,
  Heading2,
  Italic,
  List,
  Pilcrow,
  Quote,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
  id?: string
  "aria-label"?: string
}

interface Tool {
  label: string
  icon: typeof Bold
  hint: string
  action: () => void
}

/**
 * A lightweight rich-text editor: a toolbar of formatting controls over a
 * plain textarea that stores Markdown. Bold/italic wrap the selection, while
 * heading, paragraph, quote, and list apply per-line block formatting. The
 * caret and selection are preserved after every command.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder,
  rows = 16,
  className,
  id,
  ...props
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function commit(next: string, start: number, end: number) {
    onChange(next)
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(start, end)
    })
  }

  /** Wrap the selection (or a placeholder) in a symmetrical marker, e.g. **…**. */
  function wrapInline(marker: string, placeholder: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const hasSelection = start !== end
    const selected = hasSelection ? el.value.slice(start, end) : placeholder
    const next =
      el.value.slice(0, start) + marker + selected + marker + el.value.slice(end)

    const caret = start + marker.length + selected.length
    commit(next, hasSelection ? start + marker.length : caret, hasSelection ? end + marker.length : caret)
  }

  /**
   * Toggle a block prefix across every line touched by the selection.
   * Pass prefix "" to clear any block formatting (back to a plain paragraph).
   */
  function toggleBlock(prefix: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const lineStart = el.value.lastIndexOf("\n", start - 1) + 1
    let lineEnd = el.value.indexOf("\n", end)
    if (lineEnd === -1) lineEnd = el.value.length

    const block = el.value.slice(lineStart, lineEnd)
    const lines = block.split("\n")

    const nextLines = lines.map((line) => {
      if (prefix === "") {
        return line.replace(/^(#{1,6}\s+|>\s+|[-*+]\s+|\d+[.)]\s+)/, "")
      }
      return line.startsWith(prefix) ? line.slice(prefix.length) : prefix + line
    })

    const nextBlock = nextLines.join("\n")
    const next = el.value.slice(0, lineStart) + nextBlock + el.value.slice(lineEnd)
    commit(next, lineStart, lineStart + nextBlock.length)
  }

  const tools: Tool[] = [
    { label: "Bold", icon: Bold, hint: "**bold text**", action: () => wrapInline("**", "bold text") },
    { label: "Italic", icon: Italic, hint: "*italic text*", action: () => wrapInline("*", "italic text") },
    { label: "Heading", icon: Heading2, hint: "## heading", action: () => toggleBlock("## ") },
    { label: "Paragraph", icon: Pilcrow, hint: "plain paragraph", action: () => toggleBlock("") },
    { label: "Quote", icon: Quote, hint: "> quote", action: () => toggleBlock("> ") },
    { label: "Bulleted list", icon: List, hint: "- list item", action: () => toggleBlock("- ") },
  ]

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className
      )}
    >
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex items-center gap-0.5 border-b border-input bg-muted/40 px-1.5 py-1.5"
      >
        {tools.map((tool, index) => (
          <span key={tool.label} className="contents">
            {index === 2 || index === 4 ? (
              <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
            ) : null}
            <button
              type="button"
              title={tool.hint}
              aria-label={tool.label}
              onMouseDown={(e) => {
                e.preventDefault()
                tool.action()
              }}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <tool.icon className="size-4" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>

      <Textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        aria-label={props["aria-label"]}
        className="min-h-40 rounded-none border-0 bg-transparent focus-visible:ring-0"
      />
    </div>
  )
}
