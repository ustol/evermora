# Field, input, textarea, select

Sources: `src/components/ui/field.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `label.tsx`

## Purpose

Forms support emotionally sensitive memorial workflows and admin moderation. They must be legible under stress.

## Rules

- Never rely on placeholder-only labels.
- Use helper text for consequences, visibility, and privacy decisions.
- Use `border-input`, `bg-background`, and tokenized focus rings.
- Validation state must use semantic tokens (`--success`, `--warning`, `--critical`) rather than brand gold.
- Preserve sufficient target size for touch and keyboard workflows.
