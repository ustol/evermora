interface PagePlaceholderProps {
  title: string
  description?: string
}

/**
 * Temporary placeholder for routes not yet built out. Each route using this
 * gets replaced with real content in its own implementation phase.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-heading text-3xl text-foreground">{title}</h1>
      {description && (
        <p className="mt-3 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
