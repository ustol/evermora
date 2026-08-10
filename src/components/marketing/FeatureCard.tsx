import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  variant?: "default" | "dark"
}

export function FeatureCard({ icon: Icon, title, description, variant = "default" }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-6",
        variant === "dark"
          ? "items-center text-center border-white/10 bg-white/5"
          : "border-border bg-card"
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-heritage-gold/20 text-heritage-gold">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3
        className={cn(
          "mt-4 font-heading text-lg",
          variant === "dark" ? "text-soft-ivory" : "text-foreground"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm",
          variant === "dark" ? "text-soft-ivory/60" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  )
}
