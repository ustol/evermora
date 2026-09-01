# Akornafa / Evermora Design System

The design system is adopted in place for this Next.js app. It preserves the calm, dignified memorial/funeral-service brand and normalizes it for trust-first memorial/admin analytics with polished Linear/Vercel-like dashboard surfaces.

## Source of truth

- Living docs route: `src/app/design-system/page.tsx` served at `/design-system`
- Components directory: `src/components`
- UI primitives: `src/components/ui`
- CSS variable tokens: `design-system/tokens.css`, imported by `src/app/globals.css`
- Token metadata: `src/config/design-system.ts`
- Machine-readable record: `design-system/design-system.json`
- Component docs: `design-system/components/*`

## Brand read

Trust-first memorial operations: warm ceremonial neutrals, obsidian/cocoa depth, cream/parchment surfaces, restrained gold accents, precise dashboard hierarchy, and semantic status cues. Admin analytics should feel calm and reliable rather than generic or colorful.

## Foundations

- Body type: Source Sans 3, loaded from `@fontsource/source-sans-3`
- Heading/display type: Chillax, loaded from local `/public/fonts/chillax` files
- Accent: warm gold (`--brand-kente-gold` / `--brand-ceremonial-gold`)
- Neutrals: warm parchment/cocoa ramp; do not replace with default grey/slate tokens
- Semantic states: success, warning, and critical stay separate from gold brand accent
- Dark mode: warm cocoa/obsidian, not pure black

## Extension rules

1. Compose new UI from `src/components/ui` and existing layout components first.
2. Add or update tokens in `design-system/tokens.css` before introducing one-off colors.
3. Keep gold sparse: primary orientation, focus, and ceremonial emphasis—not every CTA.
4. Preserve visible labels and helper text for sensitive memorial workflows.
5. Dashboard panels should use quiet cards, hairline borders, readable status labels, and restrained chart colors.
6. Verify `/design-system` after token or primitive changes.
