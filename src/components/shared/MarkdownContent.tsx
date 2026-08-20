import Markdown from "react-markdown"
import type { Components } from "react-markdown"
import { cn } from "@/lib/utils"

const components: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="mt-10 mb-4 font-heading text-3xl leading-tight text-foreground" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="mt-8 mb-3 font-heading text-2xl leading-tight text-foreground" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="mt-6 mb-2 font-heading text-xl leading-snug text-foreground" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="mt-5 mb-2 font-heading text-lg leading-snug text-foreground" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p
      className="my-4 text-base leading-relaxed text-foreground md:text-justify md:hyphens-auto md:[text-align-last:left]"
      {...props}
    />
  ),
  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
  em: ({ node, ...props }) => <em {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-heritage-gold/60 bg-heritage-gold/5 py-1 pl-4 text-muted-foreground"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-foreground" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-foreground" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a
      className="font-medium text-heritage-gold underline underline-offset-4 transition-colors hover:text-heritage-gold/80"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
}

/** Heuristic for whether content was authored with the rich-text editor. */
function looksLikeMarkdown(content: string): boolean {
  return (
    /^(#{1,6}\s|>\s|[-*+]\s|\d+[.)]\s)/m.test(content) ||
    /\*\*|__/.test(content) ||
    /\*[^*\n]+\*/.test(content) ||
    /\[[^\]]+\]\([^)]+\)/.test(content)
  )
}

/**
 * Legacy posts predate the rich-text editor and were written as plain text
 * where every line is its own paragraph. Keep rendering those exactly as
 * before; render everything else as Markdown.
 */
function LegacyContent({ content }: { content: string }) {
  const paragraphs = content.split("\n").filter((line) => line.trim().length > 0)
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="my-4 text-base leading-relaxed text-foreground md:text-justify md:hyphens-auto md:[text-align-last:left]"
        >
          {paragraph}
        </p>
      ))}
    </>
  )
}

/**
 * Renders blog content with on-brand typography. Content authored in the rich
 * editor is parsed as Markdown (safe by default — raw HTML is not rendered);
 * legacy plain-text content keeps its original line-per-paragraph layout.
 */
export function MarkdownContent({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <div className={cn("max-w-none text-foreground", className)}>
      {looksLikeMarkdown(children) ? (
        <Markdown components={components}>{children}</Markdown>
      ) : (
        <LegacyContent content={children} />
      )}
    </div>
  )
}
