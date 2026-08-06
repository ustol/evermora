# Akornafa / Evermora Design System Guide

## Design read

Public memorial contribution UI for bereaved visitors and friends. The product language is calm, respectful, editorial, and service-oriented: people may be grieving, contributing a condolence, finding funeral details, or preserving family memory. The system keeps the existing Akornafa warm heritage brand but makes the foundations explicit so future pages do not drift into generic SaaS UI.

## Personality

- **Dignified:** quiet surfaces, measured type, little visual noise.
- **Warm heritage:** gold is a cultural accent, not a loud conversion color.
- **Helpful service:** plain labels, clear helper text, generous hit targets.
- **Editorial memory:** names, dates, stories, and tributes deserve typographic care.

## Foundations

- Source tokens live in [`tokens.css`](./tokens.css).
- App CSS imports tokens from `src/app/globals.css`; generated/shadcn CSS paths also import them from `src/index.css`.
- Components live in `src/components/ui` and compose from CSS variables/Tailwind utilities.
- The living guide is served at `/design-system`.

## Typography

- **Display / heading:** Literata. Use for memorial names, page titles, section headings, and meaningful editorial moments.
- **Body / UI:** Source Sans 3. Use for forms, contribution flows, navigation, helper text, and long reading.
- Avoid hiding labels inside placeholders. Visitors may be distressed and should never need to infer what a field means.

## Color

The neutral ramp is warm, not grey: soft ivory, warm stone, taupe, clay, rich black, obsidian. The single primary accent is heritage/kente gold. Good/warn/critical are separate semantic colors and should not be replaced with the gold accent.

## Component rules

1. One primary action per section or card.
2. Use bordered, calm preview surfaces for contribution steps and memorial summaries.
3. Use dark panels sparingly for solemn hero areas or high-emphasis memorial moments.
4. Keep motion subtle: hover lift, photo scale, and loader transitions only; respect reduced motion.
5. Every interactive element needs visible focus using `--ring`.

## Content rules

- Say **memorial**, **tribute**, **condolence**, **contribution**, and **lay a wreath/rose**.
- Avoid urgency or sales language such as “convert”, “claim”, “limited time”, or “boost”.
- Use sentence case for CTAs: “Create a memorial”, “Leave a tribute”, “Find a memorial”.
