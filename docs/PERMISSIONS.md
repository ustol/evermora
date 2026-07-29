# Permission matrix

Every row below is enforced by Postgres Row Level Security (and, for a few
actions, a `security definer` RPC that does its own authorization check) —
see [SCHEMA.md](./SCHEMA.md) for the underlying policies. The app's route
guards (`RequireAuth`, `RequireAdmin`) are a UX convenience only; they are
never the actual security boundary.

**Roles**, from least to most privileged. They're cumulative — a memorial
owner is also "any signed-in user", an admin can do everything.

- **Visitor** — not signed in.
- **Signed-in user** — has a `profiles` row, no special relationship to the
  memorial in question.
- **Author** — the signed-in user who created a specific tribute, comment,
  or photo.
- **Owner** — `memorials.owner_id` is this user's profile.
- **Collaborator** — has a `memorial_collaborators` row for this memorial
  (`editor` or `moderator` role — the schema distinguishes them, but
  `can_manage_memorial()` currently treats any collaborator row the same as
  an owner for every check in this table).
- **Admin** — `profiles.role = 'admin'`.

| Action | Visitor | Signed-in user | Author | Owner/Collaborator | Admin |
| --- | :---: | :---: | :---: | :---: | :---: |
| View a public, published memorial | ✅ | ✅ | — | ✅ | ✅ |
| View an unlisted, published memorial (with the link) | ✅ | ✅ | — | ✅ | ✅ |
| View a private or draft memorial | ❌ | ❌ | — | ✅ | ✅ |
| View a memorial an admin has suspended | ❌ | ❌ | — | ❌ ¹ | ✅ |
| Create a memorial | ❌ | ✅ | — | — | ✅ |
| Edit a memorial's details | ❌ | ❌ | — | ✅ | ✅ |
| Publish / change privacy | ❌ | ❌ | — | ✅ | ✅ |
| Delete a memorial | ❌ | ❌ | — | ✅ (owner only, not collaborator) | ✅ |
| Feature a memorial on the homepage | ❌ | ❌ | — | ❌ | ✅ (`admin_set_memorial_featured`) |
| Suspend a memorial | ❌ | ❌ | — | ❌ | ✅ (`admin_suspend_memorial`) |
| Submit a tribute/condolence | ❌ | ✅ ² | — | ✅ | ✅ |
| Edit your own tribute while pending | ❌ | — | ✅ | — | — |
| Delete your own tribute | ❌ | — | ✅ | ✅ | ✅ |
| Approve / reject / flag a tribute | ❌ | ❌ | ❌ | ✅ (`moderate_contribution`) | ✅ |
| Upload a gallery photo | ❌ | ✅ ³ | — | ✅ | ✅ |
| Caption / reorder a gallery photo | ❌ | ❌ | ✅ (own upload) | ✅ | ✅ |
| Approve / reject / flag a gallery photo | ❌ | ❌ | ❌ | ✅ (`moderate_media`) | ✅ |
| Delete a gallery photo | ❌ | ❌ | ✅ (own upload) | ✅ | ✅ |
| Buy a wreath/rose for a memorial | ❌ | ✅ ² | — | ✅ | ✅ |
| Manage the gift catalog (price, image, active) | ❌ | ❌ | — | ❌ | ✅ |
| Report a memorial, tribute, or photo | ❌ | ✅ | — | ✅ | ✅ |
| See reports targeting your own memorial | ❌ | — | — | ✅ | ✅ |
| See every report platform-wide | ❌ | ❌ | — | ❌ | ✅ |
| Resolve / dismiss a report | ❌ | ❌ | — | ✅ (own memorial only) | ✅ (any) |
| Edit your own profile (name, email, phone, country) | ❌ | ✅ | — | — | ✅ |
| Change any user's role or account status | ❌ | ❌ | — | ❌ | ✅ (RPCs) |
| View the audit log | ❌ | ❌ | — | ❌ | ✅ (no UI yet — see ROUTES.md) |

¹ Even the owner can't view a memorial an admin has suspended through the
normal public-view path — `admin_suspended` is checked as part of the same
`published + public/unlisted` clause. The owner can still reach it via the
dashboard's owner-or-collaborator clause, since that check ignores
`admin_suspended` entirely — suspension blocks the *public* page, not the
owner's own management view.

² Gated per-memorial by that memorial's own settings: `allow_tributes` /
`allow_condolences` for tributes, and the memorial must be
`published` + `public`/`unlisted` (not suspended). Gift purchases require
the memorial to allow purchases (see the `enforce_gift_purchase_pricing`
trigger) and likewise be published and public/unlisted.

³ Gated by `allow_contributor_photos` on that memorial, same
published/public-or-unlisted/not-suspended requirement as tributes.

## Two things worth calling out

- **Reports are polymorphic but admin-visible regardless of target.**
  `is_admin()` is a top-level OR in the `content_reports` policies — an
  admin sees and can resolve every report, even one targeting a memorial
  they don't own or manage. A memorial owner only sees reports about *their*
  memorial's content.
- **Column-level grants, not just row-level policies.** Several tables allow
  an `update` at the row level but restrict *which columns* can actually be
  written — e.g. a memorial owner can update their memorial's `slug` and
  `biography` directly, but `is_featured`/`admin_suspended` can only change
  through an admin RPC, even for someone who otherwise has full row-level
  update access. See "The column-level grant pattern" in
  [SCHEMA.md](./SCHEMA.md).
