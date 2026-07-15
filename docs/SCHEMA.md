# Database schema reference

Source of truth: `supabase/migrations/*.sql`, applied in filename order. This
document is a human-readable summary — when the two disagree, the migrations
are correct and this file needs updating.

Every table has Row Level Security enabled. There is no service-role/trusted
backend for the main app — the browser talks to Postgres directly through
Supabase's REST API, authenticated with the user's Clerk session token
(`auth.jwt()->>'sub'` is the Clerk user id). The two Paystack Edge Functions
are the only server-side code, and they use the Supabase service role key,
which never reaches the browser.

## Enums

| Enum | Values |
| --- | --- |
| `user_role` | `user`, `admin` |
| `account_status` | `active`, `suspended`, `deleted` |
| `memorial_status` | `draft`, `published`, `archived` |
| `privacy_status` | `public`, `unlisted`, `private` |
| `funeral_event_type` | `wake`, `burial`, `funeral_service`, `thanksgiving_service`, `reception`, `other` |
| `moderation_status` | `pending`, `approved`, `rejected`, `flagged` |
| `contribution_type` | `tribute`, `condolence`, `memory` |
| `report_status` | `open`, `reviewing`, `resolved`, `dismissed` |
| `collaborator_role` | `editor`, `moderator` |
| `notification_type` | `new_contribution`, `contribution_approved`, `contribution_rejected`, `new_report` (and any others added since) |
| `gift_purchase_status` | `pending`, `paid`, `failed` |

## Tables

### `profiles`
One row per Clerk user, created lazily on first sign-in (`useProfile`, not an
upsert — see the doc comment in `src/hooks/useProfile.ts` for why). `role`
and `status` can only be changed by the `admin_update_profile_role` /
`admin_update_profile_status` RPCs (column-level grant blocks direct
updates).

### `memorials`
The core entity. Key flags: `status` (draft/published/archived), `privacy`
(public/unlisted/private), `allow_tributes`, `allow_condolences`,
`require_approval` (gates both contribution and contributor-photo
moderation), `allow_contributor_photos`, `show_contributor_names`,
`search_indexable`, `is_featured`, `admin_suspended`. `is_featured` and
`admin_suspended` are admin-RPC-only.

### `funeral_events`
One-to-many with `memorials`. Wake/burial/service/etc. entries shown in the
"Funeral programme" section of a memorial page.

### `memorial_media`
The photo gallery (separate from `memorials.primary_photo_path`, which is
just the single portrait). Each row is one photo: `storage_path` (in the
private `memorial-media` bucket), `caption`, `alt_text`, `sort_order`,
`moderation_status`. A contribution's attached photo (`contributions.photo_media_id`)
is also a `memorial_media` row.

### `contributions`
Tributes, condolences, and memories left by visitors. `type` distinguishes
the three; `status` is `moderation_status`, forced by the
`enforce_contribution_status` trigger based on the memorial's
`require_approval` (owner/collaborator/admin submissions are always
auto-approved). Moderation happens only via the `moderate_contribution` RPC —
direct updates to `status`/`reviewed_by`/`reviewed_at` are blocked by a
column-level grant.

### `content_reports`
Polymorphic abuse reports — exactly one of `memorial_id`, `contribution_id`,
`media_id` is set (enforced by a CHECK constraint). No RPC exists for
resolving a report; it's a direct table update, permitted because the
column grant allows `authenticated` to write `status`, `resolved_by`, and
`resolution_notes`. No delete policy exists at all — reports are an
append-only audit trail.

### `memorial_collaborators`
Grants a profile `editor` or `moderator` access to a memorial beyond the
owner. `can_manage_memorial()` checks this table. No UI currently manages
this table — collaborator invites are schema-ready but not yet built.

### `gift_catalog` / `gift_purchases`
The "wreaths & roses" virtual-gift feature. `gift_catalog` is the
admin-managed price list. `gift_purchases` records a purchase; its
`amount`/`currency`/`status` are force-set server-side by the
`enforce_gift_purchase_pricing` trigger from the catalog's *current* price at
insert time — the client only ever supplies `gift_catalog_id` and a display
name, never a price. Payment is confirmed by the `verify-gift-purchase` and
`paystack-webhook` Edge Functions using the Supabase service role, never by
trusting the client. All proceeds go to the platform (no owner revenue
share).

### `audit_logs`
Append-only (no update/delete policy), admin-select-only. Written by every
moderation/admin RPC (`moderate_contribution`, `moderate_media`,
`admin_update_profile_role`, `admin_update_profile_status`,
`admin_set_memorial_featured`, `admin_suspend_memorial`). Nothing currently
reads this table in the UI — a log viewer would be a natural admin-dashboard
addition.

### `notifications`
Written by the `notify_owner_new_contribution` and
`notify_author_contribution_reviewed` triggers, but **no UI currently reads
this table** — there is no notification bell or inbox yet. The data is being
captured; the read side isn't built.

### `app_settings`
A generic `key`/`value` (jsonb) table for platform-wide settings, reserved
for future use. Nothing reads or writes it today.

## Views

### `public_profiles`
`select id, display_name, avatar_url from profiles`, granted to `anon` and
`authenticated`. Exists so non-admin code can resolve a display name without
needing the full `profiles` row (or admin's `is_admin()` select bypass).

## Storage buckets

| Bucket | Public? | Limit | Path convention |
| --- | --- | --- | --- |
| `avatars` | Yes | 5 MB | `{clerk_user_id}/{filename}` |
| `memorial-media` | No (signed URLs only) | 8 MB | `{memorial_id}/{uploader_profile_id}/{filename}` |
| `gift-assets` | Yes | 3 MB | `{uuid}.{ext}` (admin-only writes) |

`memorial-media` is private because a private/unlisted memorial's photos
must never be guessable by URL — every read goes through
`createSignedUrl(s)` with a short expiry, gated by the same
`can_view_memorial()` check used everywhere else.

## Key Postgres functions

All are `security definer` with a fixed `search_path` so they can't be
tricked by a malicious search path, and all are `revoke`d from `public` then
explicitly `grant`ed to `authenticated`.

- `current_profile_id()` — resolves the caller's `profiles.id` from
  `auth.jwt()->>'sub'`.
- `is_admin()` — true if the caller's profile has `role = 'admin'`.
- `can_view_memorial(id)` / `can_manage_memorial(id)` — the two checks every
  other policy composes from.
- `moderate_contribution(id, status)` / `moderate_media(id, status)` — the
  only way to change a contribution's or photo's moderation status.
- `admin_update_profile_role` / `admin_update_profile_status` /
  `admin_set_memorial_featured` / `admin_suspend_memorial` — the only way to
  change those specific columns; direct updates are blocked at the grant
  level.

## The column-level grant pattern

Several tables look editable via a normal `update` RLS policy but actually
aren't for their most sensitive columns, because the migration does:

```sql
revoke update on public.<table> from authenticated;
grant update (<safe columns only>) on public.<table> to authenticated;
```

This was a deliberately re-learned lesson mid-project: a **table-level**
`grant all` (from earlier scaffolding) silently overrides a **column-level**
`revoke`, so the revoke-then-grant must happen in that order, at the table
level, for every locked-down table (`profiles`, `memorials`,
`memorial_media`, `contributions`, `content_reports`).
