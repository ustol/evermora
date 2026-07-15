interface StepCardProps {
  step: number
  title: string
  description: string
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex size-9 items-center justify-center rounded-full bg-obsidian font-heading text-sm text-soft-ivory">
        {step}
      </div>
      <h3 className="font-heading text-lg text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
