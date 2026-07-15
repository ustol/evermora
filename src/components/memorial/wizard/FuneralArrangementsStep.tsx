import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { EmptyState } from "@/components/layout/EmptyState"
import { TextField } from "@/components/forms/TextField"
import { TextareaField } from "@/components/forms/TextareaField"
import { SelectField } from "@/components/forms/SelectField"
import {
  funeralArrangementsSchema,
  eventTypeOptions,
  type FuneralArrangementsValues,
  type FuneralEventValues,
} from "@/types/memorial-form"

interface FuneralArrangementsStepProps {
  defaultValues: FuneralEventValues[]
  onSubmit: (values: FuneralArrangementsValues) => void
  onBack: () => void
  submitting?: boolean
}

const blankEvent: FuneralEventValues = {
  title: "",
  eventType: "funeral_service",
  eventDate: "",
  startTime: "",
  endTime: "",
  venue: "",
  townCity: "",
  region: "",
  country: "",
  directionsUrl: "",
  dressCode: "",
  additionalInstructions: "",
}

export function FuneralArrangementsStep({
  defaultValues,
  onSubmit,
  onBack,
  submitting,
}: FuneralArrangementsStepProps) {
  const form = useForm<FuneralArrangementsValues>({
    resolver: zodResolver(funeralArrangementsSchema),
    defaultValues: { events: defaultValues },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "events",
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields.length === 0 ? (
        <EmptyState
          title="No funeral events yet"
          description="Add a wake, burial, funeral service, or any other event families should know about."
          action={
            <Button type="button" onClick={() => append(blankEvent)}>
              <Plus className="size-4" aria-hidden="true" />
              Add an event
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-heading text-lg text-foreground">
                  Event {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Remove
                </Button>
              </div>

              <FieldGroup className="mt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    control={form.control}
                    name={`events.${index}.title`}
                    label="Event title"
                    placeholder="e.g. Burial service"
                    required
                  />
                  <SelectField
                    control={form.control}
                    name={`events.${index}.eventType`}
                    label="Event type"
                    options={eventTypeOptions}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TextField
                    control={form.control}
                    name={`events.${index}.eventDate`}
                    label="Date"
                    type="date"
                    required
                  />
                  <TextField
                    control={form.control}
                    name={`events.${index}.startTime`}
                    label="Start time"
                    type="time"
                  />
                  <TextField
                    control={form.control}
                    name={`events.${index}.endTime`}
                    label="End time"
                    type="time"
                  />
                </div>

                <FieldSeparator />

                <TextField
                  control={form.control}
                  name={`events.${index}.venue`}
                  label="Venue"
                  required
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TextField
                    control={form.control}
                    name={`events.${index}.townCity`}
                    label="Town or city"
                    required
                  />
                  <TextField
                    control={form.control}
                    name={`events.${index}.region`}
                    label="Region or state"
                  />
                  <TextField
                    control={form.control}
                    name={`events.${index}.country`}
                    label="Country"
                    required
                  />
                </div>
                <TextField
                  control={form.control}
                  name={`events.${index}.directionsUrl`}
                  label="Directions or map link"
                  placeholder="https://maps.google.com/…"
                />

                <FieldSeparator />

                <TextField
                  control={form.control}
                  name={`events.${index}.dressCode`}
                  label="Dress code"
                />
                <TextareaField
                  control={form.control}
                  name={`events.${index}.additionalInstructions`}
                  label="Additional instructions"
                  rows={3}
                />
              </FieldGroup>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append(blankEvent)}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add another event
          </Button>
        </div>
      )}

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
