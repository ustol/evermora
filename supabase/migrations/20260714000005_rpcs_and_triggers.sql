-- =========================================================================
-- Contribution moderation status is always server-decided, never
-- client-supplied — new submissions start 'pending' unless the memorial
-- owner has turned moderation off for that memorial.
-- =========================================================================
create or replace function public.enforce_contribution_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_requires_approval boolean;
begin
  select require_approval into v_requires_approval
  from public.memorials where id = new.memorial_id;

  new.status := case when coalesce(v_requires_approval, true) then 'pending' else 'approved' end;
  new.reviewed_by := null;
  new.reviewed_at := null;
  return new;
end;
$$;

create trigger contributions_enforce_status
  before insert on public.contributions
  for each row execute function public.enforce_contribution_status();

-- Same idea for contributor-uploaded media; owner/collaborator/admin
-- uploads are trusted as-is.
create or replace function public.enforce_media_moderation_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_requires_approval boolean;
begin
  if public.can_manage_memorial(new.memorial_id) then
    return new;
  end if;

  select require_approval into v_requires_approval
  from public.memorials where id = new.memorial_id;

  new.moderation_status := case when coalesce(v_requires_approval, true) then 'pending' else 'approved' end;
  return new;
end;
$$;

create trigger memorial_media_enforce_moderation
  before insert on public.memorial_media
  for each row execute function public.enforce_media_moderation_status();

-- =========================================================================
-- Moderation RPCs — the only way to change a contribution's/media's status.
-- =========================================================================
create or replace function public.moderate_contribution(
  p_contribution_id uuid,
  p_status public.moderation_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_memorial_id uuid;
begin
  select memorial_id into v_memorial_id from public.contributions where id = p_contribution_id;

  if v_memorial_id is null then
    raise exception 'Contribution not found';
  end if;

  if not (public.can_manage_memorial(v_memorial_id) or public.is_admin()) then
    raise exception 'Not authorized to moderate this contribution';
  end if;

  if p_status not in ('approved', 'rejected', 'flagged') then
    raise exception 'Invalid moderation status: %', p_status;
  end if;

  update public.contributions
  set status = p_status,
      reviewed_by = public.current_profile_id(),
      reviewed_at = now()
  where id = p_contribution_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (
    public.current_profile_id(),
    'contribution.moderate',
    'contribution',
    p_contribution_id,
    jsonb_build_object('status', p_status)
  );
end;
$$;

create or replace function public.moderate_media(
  p_media_id uuid,
  p_status public.moderation_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_memorial_id uuid;
begin
  select memorial_id into v_memorial_id from public.memorial_media where id = p_media_id;

  if v_memorial_id is null then
    raise exception 'Media not found';
  end if;

  if not (public.can_manage_memorial(v_memorial_id) or public.is_admin()) then
    raise exception 'Not authorized to moderate this media';
  end if;

  update public.memorial_media set moderation_status = p_status where id = p_media_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (
    public.current_profile_id(),
    'media.moderate',
    'memorial_media',
    p_media_id,
    jsonb_build_object('status', p_status)
  );
end;
$$;

-- =========================================================================
-- Admin-only RPCs.
-- =========================================================================
create or replace function public.admin_update_profile_role(
  p_profile_id uuid,
  p_role public.user_role
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only administrators can change a user role';
  end if;

  update public.profiles set role = p_role where id = p_profile_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (public.current_profile_id(), 'profile.set_role', 'profile', p_profile_id, jsonb_build_object('role', p_role));
end;
$$;

create or replace function public.admin_update_profile_status(
  p_profile_id uuid,
  p_status public.account_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only administrators can change account status';
  end if;

  update public.profiles set status = p_status where id = p_profile_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (public.current_profile_id(), 'profile.set_status', 'profile', p_profile_id, jsonb_build_object('status', p_status));
end;
$$;

create or replace function public.admin_set_memorial_featured(
  p_memorial_id uuid,
  p_featured boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only administrators can feature a memorial';
  end if;

  update public.memorials set is_featured = p_featured where id = p_memorial_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (public.current_profile_id(), 'memorial.set_featured', 'memorial', p_memorial_id, jsonb_build_object('featured', p_featured));
end;
$$;

create or replace function public.admin_suspend_memorial(
  p_memorial_id uuid,
  p_suspend boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only administrators can suspend a memorial';
  end if;

  update public.memorials set admin_suspended = p_suspend where id = p_memorial_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (public.current_profile_id(), 'memorial.suspend', 'memorial', p_memorial_id, jsonb_build_object('suspended', p_suspend));
end;
$$;

-- Restrict execution explicitly (defense in depth — Postgres grants EXECUTE
-- to PUBLIC by default; each function also re-checks the caller itself).
revoke execute on function public.moderate_contribution(uuid, public.moderation_status) from public;
revoke execute on function public.moderate_media(uuid, public.moderation_status) from public;
revoke execute on function public.admin_update_profile_role(uuid, public.user_role) from public;
revoke execute on function public.admin_update_profile_status(uuid, public.account_status) from public;
revoke execute on function public.admin_set_memorial_featured(uuid, boolean) from public;
revoke execute on function public.admin_suspend_memorial(uuid, boolean) from public;

grant execute on function public.moderate_contribution(uuid, public.moderation_status) to authenticated;
grant execute on function public.moderate_media(uuid, public.moderation_status) to authenticated;
grant execute on function public.admin_update_profile_role(uuid, public.user_role) to authenticated;
grant execute on function public.admin_update_profile_status(uuid, public.account_status) to authenticated;
grant execute on function public.admin_set_memorial_featured(uuid, boolean) to authenticated;
grant execute on function public.admin_suspend_memorial(uuid, boolean) to authenticated;

-- =========================================================================
-- Notification triggers.
-- =========================================================================
create or replace function public.notify_owner_new_contribution()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_owner_id uuid;
  v_memorial_name text;
begin
  select owner_id, display_name into v_owner_id, v_memorial_name
  from public.memorials where id = new.memorial_id;

  if v_owner_id is not null and v_owner_id <> new.author_id then
    insert into public.notifications (recipient_id, type, title, body, link)
    values (
      v_owner_id,
      'new_contribution',
      'New ' || new.type || ' submitted',
      'A new ' || new.type || ' was submitted for ' || coalesce(v_memorial_name, 'a memorial') || ' and is awaiting your review.',
      '/dashboard/memorials/' || new.memorial_id || '/content'
    );
  end if;

  return new;
end;
$$;

create trigger contributions_notify_owner
  after insert on public.contributions
  for each row execute function public.notify_owner_new_contribution();

create or replace function public.notify_author_contribution_reviewed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
begin
  if new.status = 'approved' and old.status is distinct from 'approved' then
    select slug into v_slug from public.memorials where id = new.memorial_id;

    insert into public.notifications (recipient_id, type, title, body, link)
    values (
      new.author_id,
      'contribution_approved',
      'Your ' || new.type || ' was approved',
      'Your submission is now visible on the memorial page.',
      case when v_slug is not null then '/memorials/' || v_slug else null end
    );
  elsif new.status = 'rejected' and old.status is distinct from 'rejected' then
    insert into public.notifications (recipient_id, type, title, body, link)
    values (
      new.author_id,
      'contribution_rejected',
      'Your ' || new.type || ' was not approved',
      'The memorial owner did not approve this submission.',
      null
    );
  end if;

  return new;
end;
$$;

create trigger contributions_notify_author
  after update on public.contributions
  for each row execute function public.notify_author_contribution_reviewed();
