# Route map

Source of truth: `src/routes/AppRouter.tsx`. Guards are client-side UX only
— the real enforcement is always Postgres RLS (see
[PERMISSIONS.md](./PERMISSIONS.md)).

## Public (`RootLayout` — marketing header/footer)

| Route | Page | Notes |
| --- | --- | --- |
| `/` | `HomePage` | Hero, "how it works", recently published memorials |
| `/about` | `AboutPage` | |
| `/memorials` | `MemorialsDirectoryPage` | Searchable/filterable list of public, published memorials |
| `/memorials/:slug` | `MemorialPage` | Life story, funeral programme, photo gallery, tributes & condolences, wreaths & roses |
| `/privacy` | `PrivacyPage` | |
| `/terms` | `TermsPage` | |
| `*` | `NotFoundPage` | Catch-all 404 |

## Auth (`AuthLayout`)

| Route | Page |
| --- | --- |
| `/sign-in/*` | `SignInPage` (Clerk) |
| `/sign-up/*` | `SignUpPage` (Clerk) |

## Dashboard (`RequireAuth` → `DashboardLayout`)

Requires sign-in; a signed-out visitor is redirected to
`/sign-in?redirect_url=<path>` and bounced back after signing in.

| Route | Page | Notes |
| --- | --- | --- |
| `/dashboard` | `DashboardPage` | Stat tiles, recent memorials |
| `/dashboard/memorials` | `DashboardMemorialsPage` | All memorials the signed-in user owns, 3-column grid |
| `/dashboard/memorials/new` | `MemorialWizardPage` | 5-step creation wizard |
| `/dashboard/memorials/:id/edit` | `MemorialEditPage` | Same wizard, editing an existing draft/published memorial |
| `/dashboard/memorials/:id/content` | `MemorialContentPage` | Moderate tributes/condolences (pending/approved/rejected/flagged) |
| `/dashboard/memorials/:id/gallery` | `MemorialGalleryPage` | Upload, caption, reorder, moderate gallery photos |
| `/dashboard/memorials/:id/settings` | `MemorialSettingsPage` | **Not yet built** — placeholder stub |
| `/dashboard/profile` | `DashboardProfilePage` | Clerk's `<UserProfile>` component |

RLS, not the router, is what actually stops one owner from moderating
another owner's memorial — visiting someone else's `:id` just returns empty
data.

## Admin (`RequireAuth` → `RequireAdmin` → `AdminLayout`)

Requires `profiles.role = 'admin'`; a non-admin (signed in or not) is
redirected — signed-out visitors go to `/sign-in`, signed-in non-admins go to
`/dashboard`.

| Route | Page | Notes |
| --- | --- | --- |
| `/admin` | `AdminPage` | Platform-wide stats + quick links |
| `/admin/users` | `AdminUsersPage` | Every account; role/status changes via admin RPCs |
| `/admin/memorials` | `AdminMemorialsPage` | Every memorial regardless of owner/privacy; feature/suspend toggles |
| `/admin/reports` | `AdminReportsPage` | Content reports queue (open/reviewing/resolved/dismissed), resolve or dismiss |
| `/admin/gifts` | `AdminGiftCatalogPage` | Manage the wreaths & roses catalog (name, price, image, active toggle) |

## Non-SPA routes (Vercel-level, not React Router)

| Route | Handler | Purpose |
| --- | --- | --- |
| `/api/memorial-preview` | `api/memorial-preview.ts` (Vercel serverless function) | Serves `og:image`/`og:title`/`og:description` tags for social/messaging link-preview crawlers hitting `/memorials/:slug`, since the SPA can't otherwise give crawlers a per-memorial thumbnail. Routed to by `vercel.json`'s user-agent-matched rewrite; real browsers never see it. |

## Known gaps

- `/dashboard/memorials/:id/settings` is a placeholder — privacy/publishing
  settings currently have to be changed through the edit wizard instead.
- There's no notification inbox UI, even though the database already writes
  `notifications` rows for new contributions and moderation decisions (see
  [SCHEMA.md](./SCHEMA.md)).
- There's no UI for inviting a `memorial_collaborators` editor/moderator,
  even though the schema and RLS fully support it.
