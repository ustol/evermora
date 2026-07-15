import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  description?: string
  placeholder?: string
  rows?: number
  required?: boolean
}

export function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  rows = 5,
  required,
}: TextareaFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FieldLabel>
          <Textarea
            {...field}
            id={field.name}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ""}
          />
          {description && !fieldState.invalid && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
