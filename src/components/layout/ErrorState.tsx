import { TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again. If the problem continues, come back later.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-error/20 bg-error/5 px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-error/10 text-error">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </div>
      <h2 className="font-heading text-xl text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  )
}
