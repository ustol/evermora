# Akornafa / Evermora Design System Guide

## Design read

Calm trust-first memorial/admin analytics for operators and families. The system preserves the dignified memorial brand already in the app and normalizes it into polished Linear/Vercel-like dashboard surfaces: warm paper panels, cocoa ink, restrained gold, precise hierarchy, visible focus, and semantic status cues that never feel loud.

## Source of truth

- Live route: `/design-system`
- Route file: `src/app/design-system/page.tsx`
- Component root: `src/components`
- UI primitives: `src/components/ui`
- Global import: `src/app/globals.css`
- Tokens: `design-system/tokens.css`
- Metadata: `design-system/design-system.json` and `src/config/design-system.ts`
- Component docs: `design-system/components/*`

## Foundations

### Color

The palette is taken from the subject: memorial paper, candlelight brass, Ghanaian funeral-cloth warmth, clay earth, and deep ceremonial ink.

- Accent: `--brand-kente-gold` / `--accent`; use sparingly for orientation, focus, and ceremonial emphasis.
- Neutrals: ivory/parchment/clay/cocoa ramp; do not swap to default grey/slate.
- Semantic states: `--success`, `--warning`, and `--critical` remain separate from gold.
- Dark mode: warm cocoa/obsidian, not pure black.

### Typography

- Display/heading: Chillax via local `/public/fonts/chillax` files.
- Body/UI: Source Sans 3 via `@fontsource/source-sans-3`.
- Use display type for memorial names, page titles, and dashboard section headings. Keep tables, form labels, captions, and analytics values in Source Sans 3 unless a page title needs ceremonial emphasis.

### Surfaces

- Dashboard cards use `bg-card`, `border-border/70`, soft radii, and subtle shadows only when hierarchy requires it.
- Hairline borders are preferred to heavy fills.
- Keep horizontal overflow out of documentation and future dashboards.
- Always preserve light/dark parity when adding a token or variant.

## Usage rules

1. Compose from `src/components/ui` before adding new primitives.
2. Add or adjust CSS variables in `design-system/tokens.css` before using one-off colors.
3. Use one primary action per composition; supporting actions should use outline, secondary, or ghost.
4. Admin analytics may use chart tokens, but operational status must use semantic tokens.
5. Forms for sensitive memorial workflows must have visible labels, helper text where needed, and clear focus rings.
6. Verify `/design-system` after changes to tokens, primitives, or dashboard patterns.
