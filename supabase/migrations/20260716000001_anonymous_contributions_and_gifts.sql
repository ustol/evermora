-- =========================================================================
-- Allow fully anonymous (no Clerk sign-in) tributes/condolences and
-- wreath/rose purchases. Sign-in is still required to create/manage a
-- memorial, moderate content, and everything else — this migration only
-- widens the two visitor-contribution insert paths.
--
-- An anonymous caller uses only the anon/publishable key, so
-- current_profile_id() (which reads auth.jwt()->>'sub') returns null for
-- them. author_id / purchaser_profile_id become nullable, backed by a
-- plain text name column, and RLS/grants are widened to the `anon` role.
-- =========================================================================

-- -------------------------------------------------------------------------
-- contributions: author_id becomes optional, backed by author_name.
-- -------------------------------------------------------------------------
alter table public.contributions alter column author_id drop not null;
alter table public.contributions add column author_name text;

alter table public.contributions drop constraint if exists contributions_author_identity_check;
alter table public.contributions add constraint contributions_author_identity_check
  check (
    author_id is not null
    or (author_name is not null and char_length(trim(author_name)) > 0)
  );

drop policy if exists "contributions_insert" on public.contributions;
create policy "contributions_insert"
  on public.contributions for insert
  with check (
    (
      author_id = public.current_profile_id()
      or (author_id is null and author_name is not null and char_length(trim(author_name)) > 0)
    )
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

grant insert on public.contributions to anon;

-- notify_owner_new_contribution: an anonymous author (author_id is null)
-- can never equal the owner, so still notify the owner in that case —
-- only skip notifying when the owner submitted about their own memorial.
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

  if v_owner_id is not null and (new.author_id is null or v_owner_id <> new.author_id) then
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

-- notify_author_contribution_reviewed: notifications.recipient_id is NOT
-- NULL, so an anonymous contribution (author_id null) being moderated must
-- skip the notification insert entirely rather than violate the constraint
-- and roll back the moderation update.
create or replace function public.notify_author_contribution_reviewed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text;
begin
  if new.author_id is null then
    return new;
  end if;

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

-- -------------------------------------------------------------------------
-- gift_purchases: purchaser_profile_id becomes optional. No new column
-- needed — purchaser_display_name already exists and is already the name
-- shown on the memorial page regardless of who bought the gift.
-- -------------------------------------------------------------------------
alter table public.gift_purchases alter column purchaser_profile_id drop not null;

drop policy if exists "gift_purchases_insert" on public.gift_purchases;
create policy "gift_purchases_insert"
  on public.gift_purchases for insert
  with check (
    purchaser_profile_id = public.current_profile_id()
    or purchaser_profile_id is null
  );

grant insert on public.gift_purchases to anon;
