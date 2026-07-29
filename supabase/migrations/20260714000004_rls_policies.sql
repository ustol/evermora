-- Policies are dropped before each create so this file is safe to re-run
-- from any partial state (Postgres has no CREATE POLICY IF NOT EXISTS).

-- =========================================================================
-- profiles
-- =========================================================================
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (clerk_user_id = (auth.jwt()->>'sub') or public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (clerk_user_id = (auth.jwt()->>'sub'));

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (clerk_user_id = (auth.jwt()->>'sub') or public.is_admin())
  with check (clerk_user_id = (auth.jwt()->>'sub') or public.is_admin());

-- role/status changes must go through the admin_* RPCs (see the functions
-- migration), never a direct client-side update — even by an admin's own
-- session, which is still just the `authenticated` Postgres role.
--
-- Column-level REVOKE alone does NOT work here: the default project-wide
-- GRANT ALL ON TABLES already gives `authenticated` a table-level UPDATE
-- privilege, and Postgres authorizes a column write if EITHER the
-- table-level OR the column-level privilege allows it. Revoking only the
-- column leaves the table-level grant standing, so the write still
-- succeeds — verified by a failing test against a real Postgres instance
-- before this comment was written. The only way to actually narrow this is
-- to revoke UPDATE at the table level and re-grant it on just the allowed
-- columns.
revoke update on public.profiles from authenticated;
grant update (display_name, email, avatar_url, phone, country) on public.profiles to authenticated;

-- =========================================================================
-- memorials
-- =========================================================================
alter table public.memorials enable row level security;

drop policy if exists "memorials_select" on public.memorials;
create policy "memorials_select"
  on public.memorials for select
  using (
    (status = 'published' and privacy in ('public', 'unlisted') and not admin_suspended)
    or owner_id = public.current_profile_id()
    or public.is_admin()
    or exists (
      select 1 from public.memorial_collaborators mc
      where mc.memorial_id = memorials.id and mc.profile_id = public.current_profile_id()
    )
  );

drop policy if exists "memorials_insert" on public.memorials;
create policy "memorials_insert"
  on public.memorials for insert
  with check (owner_id = public.current_profile_id());

drop policy if exists "memorials_update" on public.memorials;
create policy "memorials_update"
  on public.memorials for update
  using (public.can_manage_memorial(id))
  with check (public.can_manage_memorial(id));

drop policy if exists "memorials_delete" on public.memorials;
create policy "memorials_delete"
  on public.memorials for delete
  using (owner_id = public.current_profile_id() or public.is_admin());

-- ownership transfer, featuring, and suspension are admin/RPC-only (see the
-- profiles table above for why this must be table-level revoke + re-grant).
revoke update on public.memorials from authenticated;
grant update (
  slug, first_name, middle_names, surname, display_name, gender,
  date_of_birth, date_of_death, place_of_birth, place_of_death, hometown, nationality,
  primary_photo_path, primary_photo_alt,
  announcement, biography, obituary, family_message, quotation, religious_affiliation, occupation,
  status, privacy, allow_tributes, allow_condolences, require_approval,
  allow_contributor_photos, show_contributor_names, search_indexable,
  published_at, archived_at
) on public.memorials to authenticated;

-- =========================================================================
-- funeral_events
-- =========================================================================
alter table public.funeral_events enable row level security;

drop policy if exists "funeral_events_select" on public.funeral_events;
create policy "funeral_events_select"
  on public.funeral_events for select
  using (public.can_view_memorial(memorial_id));

drop policy if exists "funeral_events_insert" on public.funeral_events;
create policy "funeral_events_insert"
  on public.funeral_events for insert
  with check (public.can_manage_memorial(memorial_id));

drop policy if exists "funeral_events_update" on public.funeral_events;
create policy "funeral_events_update"
  on public.funeral_events for update
  using (public.can_manage_memorial(memorial_id))
  with check (public.can_manage_memorial(memorial_id));

drop policy if exists "funeral_events_delete" on public.funeral_events;
create policy "funeral_events_delete"
  on public.funeral_events for delete
  using (public.can_manage_memorial(memorial_id));

-- =========================================================================
-- memorial_media
-- =========================================================================
alter table public.memorial_media enable row level security;

drop policy if exists "memorial_media_select" on public.memorial_media;
create policy "memorial_media_select"
  on public.memorial_media for select
  using (
    public.can_view_memorial(memorial_id)
    and (
      moderation_status = 'approved'
      or public.can_manage_memorial(memorial_id)
      or uploaded_by = public.current_profile_id()
    )
  );

drop policy if exists "memorial_media_insert" on public.memorial_media;
create policy "memorial_media_insert"
  on public.memorial_media for insert
  with check (
    uploaded_by = public.current_profile_id()
    and (
      public.can_manage_memorial(memorial_id)
      or exists (
        select 1 from public.memorials m
        where m.id = memorial_id
          and m.allow_contributor_photos = true
          and m.status = 'published'
          and m.privacy in ('public', 'unlisted')
      )
    )
  );

drop policy if exists "memorial_media_update" on public.memorial_media;
create policy "memorial_media_update"
  on public.memorial_media for update
  using (public.can_manage_memorial(memorial_id) or uploaded_by = public.current_profile_id())
  with check (public.can_manage_memorial(memorial_id) or uploaded_by = public.current_profile_id());

drop policy if exists "memorial_media_delete" on public.memorial_media;
create policy "memorial_media_delete"
  on public.memorial_media for delete
  using (public.can_manage_memorial(memorial_id) or uploaded_by = public.current_profile_id());

-- moderation changes go through moderate_media(), never a direct update
-- (table-level revoke + re-grant — see profiles above for why).
revoke update on public.memorial_media from authenticated;
grant update (caption, alt_text, sort_order) on public.memorial_media to authenticated;

-- =========================================================================
-- contributions
-- =========================================================================
alter table public.contributions enable row level security;

drop policy if exists "contributions_select" on public.contributions;
create policy "contributions_select"
  on public.contributions for select
  using (
    public.can_view_memorial(memorial_id)
    and (
      status = 'approved'
      or author_id = public.current_profile_id()
      or public.can_manage_memorial(memorial_id)
    )
  );

drop policy if exists "contributions_insert" on public.contributions;
create policy "contributions_insert"
  on public.contributions for insert
  with check (
    author_id = public.current_profile_id()
    and exists (
      select 1 from public.memorials m
      where m.id = memorial_id
        and m.status = 'published'
        and m.privacy in ('public', 'unlisted')
        and not m.admin_suspended
        and (
          (type in ('tribute', 'memory') and m.allow_tributes)
          or (type = 'condolence' and m.allow_condolences)
        )
    )
  );

-- authors may fix their own message while it's still pending; they can
-- never approve/reject their own submission (see column revoke below).
drop policy if exists "contributions_update_own_pending" on public.contributions;
create policy "contributions_update_own_pending"
  on public.contributions for update
  using (author_id = public.current_profile_id() and status = 'pending')
  with check (author_id = public.current_profile_id());

drop policy if exists "contributions_delete" on public.contributions;
create policy "contributions_delete"
  on public.contributions for delete
  using (
    author_id = public.current_profile_id()
    or public.can_manage_memorial(memorial_id)
    or public.is_admin()
  );

-- memorial owners moderate via moderate_contribution(), never a direct
-- update — this is what makes "owners can't silently edit a tribute" real
-- (table-level revoke + re-grant — see profiles above for why).
revoke update on public.contributions from authenticated;
grant update (type, relationship, title, message, photo_media_id) on public.contributions to authenticated;

-- =========================================================================
-- content_reports
-- =========================================================================
alter table public.content_reports enable row level security;

drop policy if exists "content_reports_select" on public.content_reports;
create policy "content_reports_select"
  on public.content_reports for select
  using (
    reported_by = public.current_profile_id()
    or public.is_admin()
    or (memorial_id is not null and public.can_manage_memorial(memorial_id))
    or (contribution_id is not null and exists (
      select 1 from public.contributions c
      where c.id = contribution_id and public.can_manage_memorial(c.memorial_id)
    ))
    or (media_id is not null and exists (
      select 1 from public.memorial_media mm
      where mm.id = media_id and public.can_manage_memorial(mm.memorial_id)
    ))
  );

drop policy if exists "content_reports_insert" on public.content_reports;
create policy "content_reports_insert"
  on public.content_reports for insert
  with check (reported_by = public.current_profile_id());

drop policy if exists "content_reports_update" on public.content_reports;
create policy "content_reports_update"
  on public.content_reports for update
  using (
    public.is_admin()
    or (memorial_id is not null and public.can_manage_memorial(memorial_id))
    or (contribution_id is not null and exists (
      select 1 from public.contributions c
      where c.id = contribution_id and public.can_manage_memorial(c.memorial_id)
    ))
    or (media_id is not null and exists (
      select 1 from public.memorial_media mm
      where mm.id = media_id and public.can_manage_memorial(mm.memorial_id)
    ))
  )
  with check (true);

-- resolvers may only change status/resolution fields, never retarget or
-- rewrite what was actually reported (table-level revoke + re-grant — see
-- profiles above for why).
revoke update on public.content_reports from authenticated;
grant update (status, resolved_by, resolution_notes) on public.content_reports to authenticated;

-- reports are an audit-style trail: no delete policy for anyone.

-- =========================================================================
-- memorial_collaborators
-- =========================================================================
alter table public.memorial_collaborators enable row level security;

drop policy if exists "memorial_collaborators_select" on public.memorial_collaborators;
create policy "memorial_collaborators_select"
  on public.memorial_collaborators for select
  using (
    profile_id = public.current_profile_id()
    or public.can_manage_memorial(memorial_id)
  );

drop policy if exists "memorial_collaborators_insert" on public.memorial_collaborators;
create policy "memorial_collaborators_insert"
  on public.memorial_collaborators for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.memorials m
      where m.id = memorial_id and m.owner_id = public.current_profile_id()
    )
  );

drop policy if exists "memorial_collaborators_delete" on public.memorial_collaborators;
create policy "memorial_collaborators_delete"
  on public.memorial_collaborators for delete
  using (
    profile_id = public.current_profile_id()
    or public.is_admin()
    or exists (
      select 1 from public.memorials m
      where m.id = memorial_id and m.owner_id = public.current_profile_id()
    )
  );

-- =========================================================================
-- audit_logs (append-only, admin-readable)
-- =========================================================================
alter table public.audit_logs enable row level security;

drop policy if exists "audit_logs_select_admin" on public.audit_logs;
create policy "audit_logs_select_admin"
  on public.audit_logs for select
  using (public.is_admin());

drop policy if exists "audit_logs_insert_admin" on public.audit_logs;
create policy "audit_logs_insert_admin"
  on public.audit_logs for insert
  with check (public.is_admin());

-- no update/delete policy anywhere on this table — it is immutable.

-- =========================================================================
-- notifications
-- =========================================================================
alter table public.notifications enable row level security;

drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own"
  on public.notifications for select
  using (recipient_id = public.current_profile_id());

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
  on public.notifications for update
  using (recipient_id = public.current_profile_id())
  with check (recipient_id = public.current_profile_id());

drop policy if exists "notifications_delete_own" on public.notifications;
create policy "notifications_delete_own"
  on public.notifications for delete
  using (recipient_id = public.current_profile_id());

-- notifications are created by triggers only (security definer, bypasses
-- RLS) — no client-side insert policy. Recipients may only mark read/unread
-- (table-level revoke + re-grant — see profiles above for why).
revoke update on public.notifications from authenticated;
grant update (read_at) on public.notifications to authenticated;

-- =========================================================================
-- app_settings (admin-only)
-- =========================================================================
alter table public.app_settings enable row level security;

drop policy if exists "app_settings_admin_only" on public.app_settings;
create policy "app_settings_admin_only"
  on public.app_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================================
-- Verification: running this file in the SQL editor shows the final policy
-- list so you can confirm every table is fully covered.
-- =========================================================================
select tablename, policyname, cmd
from pg_policies
where schemaname = 'public'
order by tablename, policyname;
