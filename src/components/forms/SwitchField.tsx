import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Field, FieldContent, FieldTitle, FieldDescription } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

interface SwitchFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  description?: string
}

export function SwitchField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
}: SwitchFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="justify-between rounded-lg border border-border p-4">
          <FieldContent>
            <FieldTitle>{label}</FieldTitle>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
          <Switch
            id={field.name}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
          />
        </Field>
      )}
    />
  )
}
