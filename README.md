# Evermora

**Honouring lives. Preserving memories.**

Evermora is a dignified, mobile-first platform for funeral announcements and memorial pages. Families can announce a passing, share funeral arrangements, and gather tributes, condolences, and photographs from loved ones near and far — all under the family's control.

> 🚧 **Status: in active development.** Core features are being built in phases; this README will be expanded with full setup, deployment, and architecture documentation as the project stabilises.

## Features (built so far)

- Public landing page, about page, and searchable memorial directory
- Public memorial pages with funeral programme, life story, and share/report actions
- Sign-up / sign-in with Google or email + password (Clerk)
- Five-step memorial creation wizard with automatic draft saving
- Private-by-default privacy model (public / unlisted / private) enforced by database Row Level Security
- Photograph upload to private storage, served via short-lived signed URLs
- Moderation-first design: contributions require owner approval; owners can never silently edit a contributor's words

## Technology

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Base UI) · React Router · TanStack Query · React Hook Form + Zod · Clerk (authentication) · Supabase (PostgreSQL, RLS, Storage)

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Clerk + Supabase keys
npm run dev
```

Database schema lives in `supabase/migrations/` — apply the files in filename order via the Supabase SQL editor or `supabase db push`.

### Required services

1. **Clerk** — create an application, enable Google + email/password sign-in, and activate the Supabase integration (Clerk Dashboard → Integrations → Supabase).
2. **Supabase** — create a project, add Clerk as a third-party auth provider (Authentication → Sign In / Providers → Clerk, using the domain from step 1), and run the migrations.

Environment variables are documented in [.env.example](.env.example).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | Lint (oxlint) |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |

## Licence

Not yet licensed for redistribution. All rights reserved.
