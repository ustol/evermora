import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface TextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  description?: string
  placeholder?: string
  type?: "text" | "email" | "tel" | "url" | "date" | "time" | "password"
  autoComplete?: string
  required?: boolean
}

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: TextFieldProps<TFieldValues>) {
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
          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
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
