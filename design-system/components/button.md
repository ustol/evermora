# Button

Source: `src/components/ui/button.tsx`

## Purpose

Buttons are calm, explicit action triggers for memorial, contribution, and admin workflows. Use short verbs and avoid stacking competing primary actions.

## Variants

- `default`: primary action. Charcoal in light mode; high-contrast gold/ink pairing in dark mode via tokens.
- `secondary`: lower-emphasis save or neutral workflow action.
- `outline`: navigation, preview, export, share, or secondary dashboard actions.
- `ghost`: dismissive or low-emphasis actions.
- `destructive`: irreversible removal or rejection actions; backed by `--critical`, not gold.

## Guidance

- One primary action per card or toolbar.
- Use `focus-visible:ring-ring` behavior inherited from the primitive.
- Prefer specific labels: “Approve tribute”, “Export report”, “Preview memorial”.
