import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/forms/TextField"
import { SelectField } from "@/components/forms/SelectField"
import {
  personalDetailsSchema,
  type PersonalDetailsValues,
} from "@/types/memorial-form"
import { calculateAge } from "@/lib/date"

interface PersonalDetailsStepProps {
  defaultValues: Partial<PersonalDetailsValues>
  onSubmit: (values: PersonalDetailsValues) => void
  submitting?: boolean
}

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
]

export function PersonalDetailsStep({
  defaultValues,
  onSubmit,
  submitting,
}: PersonalDetailsStepProps) {
  const form = useForm<PersonalDetailsValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: "",
      middleNames: "",
      surname: "",
      displayName: "",
      gender: "",
      dateOfBirth: "",
      dateOfDeath: "",
      placeOfBirth: "",
      placeOfDeath: "",
      hometown: "",
      nationality: "",
      ...defaultValues,
    },
  })

  const dateOfBirth = form.watch("dateOfBirth")
  const dateOfDeath = form.watch("dateOfDeath")
  const age = calculateAge(dateOfBirth, dateOfDeath)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField control={form.control} name="firstName" label="First name" required />
          <TextField control={form.control} name="middleNames" label="Middle or other names" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField control={form.control} name="surname" label="Surname" required />
          <TextField
            control={form.control}
            name="displayName"
            label="Preferred display name"
            description="Shown as the memorial's title, e.g. “Auntie Ama Serwaa”"
            required
          />
        </div>

        <FieldSeparator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            control={form.control}
            name="gender"
            label="Gender"
            options={genderOptions}
          />
          <div />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="dateOfBirth"
            label="Date of birth"
            type="date"
          />
          <TextField
            control={form.control}
            name="dateOfDeath"
            label="Date of death"
            type="date"
            required
          />
        </div>
        {age !== null && (
          <p className="-mt-2 text-sm text-muted-foreground">Age at passing: {age}</p>
        )}

        <FieldSeparator />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField control={form.control} name="placeOfBirth" label="Place of birth" />
          <TextField control={form.control} name="placeOfDeath" label="Place of death" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField control={form.control} name="hometown" label="Hometown" />
          <TextField control={form.control} name="nationality" label="Nationality" />
        </div>
      </FieldGroup>

      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Continue"}
        </Button>
      </div>
    </form>
  )
}
