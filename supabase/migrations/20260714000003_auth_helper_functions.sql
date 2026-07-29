-- Resolve the calling Clerk user's profile id. security definer + a fixed
-- search_path lets this run inside RLS policies without recursing back
-- through profiles' own RLS (it bypasses it, as the function owner).
create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.profiles where clerk_user_id = (auth.jwt()->>'sub')
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where clerk_user_id = (auth.jwt()->>'sub') and role = 'admin'
  )
$$;

-- Whether the caller may read a memorial: published+public/unlisted (and not
-- admin-suspended), or they own/collaborate/administer it.
create or replace function public.can_view_memorial(p_memorial_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memorials m
    where m.id = p_memorial_id
      and (
        (m.status = 'published' and m.privacy in ('public', 'unlisted') and not m.admin_suspended)
        or m.owner_id = public.current_profile_id()
        or public.is_admin()
        or exists (
          select 1 from public.memorial_collaborators mc
          where mc.memorial_id = m.id and mc.profile_id = public.current_profile_id()
        )
      )
  )
$$;

-- Whether the caller may manage (edit/moderate) a memorial: owner, an
-- editor-role collaborator, or an admin.
create or replace function public.can_manage_memorial(p_memorial_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memorials m
    where m.id = p_memorial_id
      and (
        m.owner_id = public.current_profile_id()
        or public.is_admin()
        or exists (
          select 1 from public.memorial_collaborators mc
          where mc.memorial_id = m.id
            and mc.profile_id = public.current_profile_id()
            and mc.role = 'editor'
        )
      )
  )
$$;
