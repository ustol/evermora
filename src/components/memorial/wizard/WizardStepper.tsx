import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  "Personal details",
  "Photograph",
  "Life story",
  "Funeral arrangements",
  "Privacy & publishing",
]

interface WizardStepperProps {
  currentStep: number
}

export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isComplete = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep

        return (
          <li key={label} className="flex items-center sm:flex-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  isComplete
                    ? "bg-heritage-gold text-obsidian"
                    : isCurrent
                      ? "bg-obsidian text-soft-ivory"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? <Check className="size-3.5" /> : stepNumber}
              </span>
              <span
                className={cn(
                  "text-sm",
                  isCurrent
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className="mx-3 hidden h-px flex-1 bg-border sm:block" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
