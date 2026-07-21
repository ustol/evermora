# Akornafa

**Honouring lives. Preserving memories.**

Akornafa is a dignified, mobile-first platform for funeral announcements and
memorial pages. Families can announce a passing, share funeral arrangements,
gather tributes, condolences, and photographs from loved ones near and far,
and let visitors send a virtual wreath or rose — all under the family's
control, with every submission moderated before it appears if they choose.

## Features

- Public landing page, about page, and searchable/filterable memorial
  directory
- Public memorial pages: life story, funeral programme, photo gallery
  (with a full-screen lightbox), tributes & condolences, and wreaths & roses
- Sign-up / sign-in with Google or email + password (Clerk)
- Five-step memorial creation wizard with automatic draft saving
- Private-by-default privacy model (public / unlisted / private), enforced
  end-to-end by Postgres Row Level Security — not just hidden in the UI
- Moderation-first design: contributions and contributor photos can require
  owner approval before they're visible; owners can never silently edit a
  contributor's words
- Content reporting, with a platform-wide admin queue to resolve or dismiss
- Virtual wreaths & roses: visitors buy a named tribute item (Paystack,
  GHS) that's displayed on the memorial; proceeds go to the platform, with
  payment independently verified server-side (never trusted from the
  browser)
- Owner dashboard: memorial list, stats, tribute/photo moderation, gallery
  management
- Platform admin dashboard: stats, user role/status management, memorial
  feature/suspend controls, the reports queue, gift catalog management
- Per-memorial Open Graph link previews (photo thumbnail, name, dates) when
  a memorial link is shared on WhatsApp/Facebook/Twitter/etc., via a small
  Vercel serverless function — the SPA itself has no server rendering, so
  this exists specifically to give social crawlers something to read
- Automated tests: Vitest + React Testing Library for units/components,
  Playwright for end-to-end and automated accessibility (axe-core) scans

See [docs/ROUTES.md](docs/ROUTES.md) for the full route map (including two
known gaps: memorial privacy/publishing settings and a notification inbox
UI aren't built yet, though the database side of both already exists).

## Technology

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Base UI) ·
React Router · TanStack Query · React Hook Form + Zod · Clerk (auth) ·
Supabase (Postgres, Row Level Security, Storage, Edge Functions) ·
Paystack · Vitest + React Testing Library · Playwright + axe-core

There is no traditional backend server. The browser talks to Postgres
directly through Supabase's REST API, authenticated with the signed-in
user's Clerk session token — RLS is the only authorization boundary for
everything except payments. The two payment-related Supabase Edge Functions
and the one Vercel serverless function (`api/memorial-preview.ts`, for link
previews) are the only server-side code in the project.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Clerk + Supabase + Paystack keys
npm run dev
```

Database schema lives in `supabase/migrations/` — apply the files in
filename order via the Supabase SQL editor or `supabase db push`. See
[docs/SCHEMA.md](docs/SCHEMA.md) for a human-readable summary of every
table, enum, RLS policy, and RPC.

### Required services

1. **Clerk** — create an application, enable Google + email/password
   sign-in, and activate the Supabase integration (Clerk Dashboard →
   Integrations → Supabase).
2. **Supabase** — create a project, add Clerk as a third-party auth provider
   (Authentication → Sign In / Providers → Clerk, using the domain from
   step 1), and run the migrations.
3. **Paystack** — only needed for the wreaths & roses feature. Set
   `PAYSTACK_SECRET_KEY` as a secret on both Supabase Edge Functions
   (`verify-gift-purchase` and `paystack-webhook`), deploy the functions,
   and register the webhook URL
   (`https://<project>.supabase.co/functions/v1/paystack-webhook`) in the
   Paystack dashboard. `verify-gift-purchase` needs "Verify JWT" enabled;
   `paystack-webhook` needs it disabled (Paystack doesn't send a Clerk/
   Supabase session — its own HMAC-SHA512 signature check is the real gate).
   Supabase's dashboard has a known bug where that toggle can revert to "on"
   after a redeploy — re-check it if the webhook starts rejecting requests
   with `INVALID_CREDENTIALS`.

Environment variables are documented in [.env.example](.env.example).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | Lint (oxlint) |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |
| `npm run test` | Run unit/component tests (Vitest) |
| `npm run test:watch` | Unit/component tests in watch mode |
| `npm run test:e2e` | Run end-to-end and accessibility tests (Playwright) |

`npm run test:e2e` starts its own dev server automatically. It covers every
page reachable without signing in (see `e2e/`); auth-gated flows (dashboard
content, admin actions, form submissions) aren't covered by automation,
since Clerk's bot protection blocks scripted sign-in — the same reason this
repo has no CI-driven auth smoke test today.

## Project structure

```
src/
  components/       Shared UI: shadcn/ui primitives (components/ui), layout
                     chrome, memorial-specific components, forms
  pages/             Route-level components: public, dashboard/, admin/
  services/          All Supabase reads/writes, grouped by domain
  hooks/             useSupabaseClient, useProfile, useMemorials, ...
  routes/            AppRouter, RequireAuth, RequireAdmin
  lib/               Pure helpers (date formatting, cn, redirect sanitizing)
  types/supabase.ts  Hand-written Database type (not `supabase gen types`)
supabase/
  migrations/        Numbered SQL migrations — the actual schema/RLS/RPCs
  functions/         Deno Edge Functions (Paystack verify + webhook)
api/                 Vercel serverless function (memorial link previews)
e2e/                 Playwright end-to-end + accessibility specs
docs/                SCHEMA.md, ROUTES.md, PERMISSIONS.md
```

## Documentation

- [docs/SCHEMA.md](docs/SCHEMA.md) — every table, enum, RLS policy, and RPC
- [docs/ROUTES.md](docs/ROUTES.md) — the full route map, including known gaps
- [docs/PERMISSIONS.md](docs/PERMISSIONS.md) — who can do what, and why

## Accessibility

Every page reachable without signing in is scanned automatically for
WCAG 2 A/AA violations (`e2e/accessibility.spec.ts`, axe-core). This scan
caught and led to fixing two real issues during development: the brand's
gold and muted-taupe text colors failed contrast against the ivory
background site-wide, and photo gallery thumbnails had no accessible name
for screen readers when a photo had no caption. Auth-gated pages
(dashboard, admin) haven't been scanned this way, for the same sign-in
constraint noted above.

## Licence

Not yet licensed for redistribution. All rights reserved.
