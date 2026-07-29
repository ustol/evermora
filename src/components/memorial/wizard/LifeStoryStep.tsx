import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/forms/TextField"
import { TextareaField } from "@/components/forms/TextareaField"
import { lifeStorySchema, type LifeStoryValues } from "@/types/memorial-form"

interface LifeStoryStepProps {
  defaultValues: Partial<LifeStoryValues>
  onSubmit: (values: LifeStoryValues) => void
  onBack: () => void
  submitting?: boolean
}

export function LifeStoryStep({
  defaultValues,
  onSubmit,
  onBack,
  submitting,
}: LifeStoryStepProps) {
  const form = useForm<LifeStoryValues>({
    resolver: zodResolver(lifeStorySchema),
    defaultValues: {
      announcement: "",
      biography: "",
      obituary: "",
      familyMessage: "",
      quotation: "",
      religiousAffiliation: "",
      occupation: "",
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <TextareaField
          control={form.control}
          name="announcement"
          label="Short announcement"
          description="A brief message announcing the passing, shown prominently on the memorial page."
          rows={3}
        />

        <FieldSeparator />

        <TextareaField
          control={form.control}
          name="biography"
          label="Biography"
          description="The story of their life."
          rows={6}
        />
        <TextareaField
          control={form.control}
          name="obituary"
          label="Obituary"
          rows={6}
        />
        <TextareaField
          control={form.control}
          name="familyMessage"
          label="A message from the family"
          rows={4}
        />
        <TextareaField
          control={form.control}
          name="quotation"
          label="A meaningful quotation, scripture, or personal saying"
          rows={2}
        />

        <FieldSeparator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="religiousAffiliation"
            label="Religious affiliation"
          />
          <TextField
            control={form.control}
            name="occupation"
            label="Occupation or profession"
          />
        </div>
      </FieldGroup>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Continue"}
        </Button>
      </div>
    </form>
  )
}
