# Foundations

## Color tokens

| Token | Use |
| --- | --- |
| `--brand-soft-ivory` | Page background and quiet memorial surfaces |
| `--brand-warm-stone` | Muted panels, secondary surfaces, image borders |
| `--brand-muted-taupe` | Secondary text on light backgrounds |
| `--brand-obsidian` | Primary text, solemn hero backgrounds |
| `--brand-rich-black` | Dark cards and footer/sidebar surfaces |
| `--brand-heritage-gold` | Primary accent, focus rings, selected states |
| `--brand-warm-gold` | Accent on dark backgrounds |
| `--brand-deep-burgundy` | Ritual/floral emphasis and charts, not errors |
| `--semantic-good` | Success and confirmed states |
| `--semantic-warn` | Warning and caution states |
| `--semantic-critical` | Errors, destructive actions, moderation danger |

## Light and dark

Tokens support `:root` and `.dark`. Do not create component-only dark palettes; compose from the same variables so memorial pages, contribution dialogs, and admin surfaces stay consistent.

## Typography scale

- `font-heading`: Literata for names, titles, and editorial headings.
- `font-sans`: Source Sans 3 for body, form controls, navigation, and metadata.
- Long tributes should use relaxed leading (`leading-relaxed`) and readable max-widths.

## Radius and borders

The base radius is `0.82rem`. Prefer `rounded-xl` to `rounded-2xl` for cards and `rounded-lg` for controls. Borders should be hairline (`border-border/60` or `border-border/70`) rather than heavy outlines.
