-- Safe, non-sensitive subset of profiles (no email/phone) for displaying
-- contributor/owner names publicly. Owned by the migration role, so it runs
-- with that role's privileges and is not subject to profiles' own RLS —
-- intentional: it exposes every row, but only these three harmless columns.
create view public.public_profiles as
select id, display_name, avatar_url
from public.profiles;

grant select on public.public_profiles to anon, authenticated;
