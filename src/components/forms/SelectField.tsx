import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectFieldOption {
  value: string
  label: string
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  options: SelectFieldOption[]
  placeholder?: string
  description?: string
  required?: boolean
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  description,
  required,
}: SelectFieldProps<TFieldValues>) {
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
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            items={options}
          >
            <SelectTrigger id={field.name} className="w-full" aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && !fieldState.invalid && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
