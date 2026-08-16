# Akornafa Design System

Akornafa's design system is adopted in place for the existing Next.js app. It preserves the calm, dignified memorial/funeral-service brand and should be extended without overhauling product UI.

## Source of truth

- Living docs route: `src/app/design-system/page.tsx` served at `/design-system`
- Components directory: `src/components`
- UI primitives: `src/components/ui`
- CSS variable tokens: `src/app/globals.css`
- Token metadata: `src/config/design-system.ts`
- Machine-readable record: `design-system.json`

## Brand read

Trust-first editorial memorial service: warm ceremonial neutrals, obsidian depth, cream/parchment surfaces, measured gold accents, and restrained motion. Interfaces should feel composed and supportive for families under emotional load.

## Foundations

- Body type: Source Sans 3, loaded from `@fontsource/source-sans-3`
- Heading/display type: Chillax, loaded from `public/fonts/chillax/*.woff2`
- Accent: warm gold (`--brand-kente-gold` / `--brand-ceremonial-gold`)
- Neutrals: warm parchment/cocoa ramp; do not replace with default grey/slate tokens
- Semantic states: success, warning, and critical stay separate from gold brand accent
- Dark mode: warm cocoa/obsidian, not pure black

## Extension rules

1. Compose new UI from `src/components/ui` and existing layout components first.
2. Add or update tokens in `src/app/globals.css` before introducing one-off colors.
3. Keep gold sparse: primary orientation, focus, and ceremonial emphasis—not every CTA.
4. Preserve visible labels and helper text for sensitive memorial workflows.
5. Verify `/design-system` after token or primitive changes.
