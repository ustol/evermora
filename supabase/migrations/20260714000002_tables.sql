-- Shared trigger to keep updated_at current. No table dependency, so it can
-- be created before any table exists.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================================
-- profiles
-- =========================================================================
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  display_name text not null,
  email text,
  avatar_url text,
  phone text,
  country text,
  role public.user_role not null default 'user',
  status public.account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- =========================================================================
-- memorials
-- =========================================================================
create table public.memorials (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique,

  first_name text not null,
  middle_names text,
  surname text not null,
  display_name text not null,
  gender text,
  date_of_birth date,
  date_of_death date not null,
  place_of_birth text,
  place_of_death text,
  hometown text,
  nationality text,

  primary_photo_path text,
  primary_photo_alt text,

  announcement text,
  biography text,
  obituary text,
  family_message text,
  quotation text,
  religious_affiliation text,
  occupation text,

  status public.memorial_status not null default 'draft',
  privacy public.privacy_status not null default 'private',
  allow_tributes boolean not null default true,
  allow_condolences boolean not null default true,
  require_approval boolean not null default true,
  allow_contributor_photos boolean not null default false,
  show_contributor_names boolean not null default true,
  search_indexable boolean not null default true,
  is_featured boolean not null default false,
  admin_suspended boolean not null default false,

  published_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint memorials_dob_before_dod check (date_of_birth is null or date_of_birth <= date_of_death),
  constraint memorials_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index memorials_owner_id_idx on public.memorials(owner_id);
create index memorials_status_privacy_idx on public.memorials(status, privacy);
create index memorials_created_at_idx on public.memorials(created_at desc);
create index memorials_surname_idx on public.memorials(lower(surname));
create index memorials_hometown_idx on public.memorials(lower(hometown));

create trigger set_memorials_updated_at
  before update on public.memorials
  for each row execute function public.set_updated_at();

-- =========================================================================
-- funeral_events
-- =========================================================================
create table public.funeral_events (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references public.memorials(id) on delete cascade,
  title text not null,
  event_type public.funeral_event_type not null,
  event_date date not null,
  start_time time,
  end_time time,
  venue text not null,
  town_city text not null,
  region text,
  country text not null,
  directions_url text,
  dress_code text,
  additional_instructions text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index funeral_events_memorial_id_idx on public.funeral_events(memorial_id);
create index funeral_events_event_date_idx on public.funeral_events(event_date);

create trigger set_funeral_events_updated_at
  before update on public.funeral_events
  for each row execute function public.set_updated_at();

-- =========================================================================
-- memorial_media
-- =========================================================================
create table public.memorial_media (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references public.memorials(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null unique,
  caption text,
  alt_text text,
  sort_order integer not null default 0,
  moderation_status public.moderation_status not null default 'approved',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index memorial_media_memorial_id_idx on public.memorial_media(memorial_id);
create index memorial_media_moderation_status_idx on public.memorial_media(moderation_status);

create trigger set_memorial_media_updated_at
  before update on public.memorial_media
  for each row execute function public.set_updated_at();

-- =========================================================================
-- contributions (tributes, condolences, memories)
-- =========================================================================
create table public.contributions (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references public.memorials(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  type public.contribution_type not null,
  relationship text,
  title text,
  message text not null,
  photo_media_id uuid references public.memorial_media(id) on delete set null,
  status public.moderation_status not null default 'pending',
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contributions_memorial_id_idx on public.contributions(memorial_id);
create index contributions_status_idx on public.contributions(status);
create index contributions_author_id_idx on public.contributions(author_id);

create trigger set_contributions_updated_at
  before update on public.contributions
  for each row execute function public.set_updated_at();

-- =========================================================================
-- content_reports
-- =========================================================================
create table public.content_reports (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid references public.memorials(id) on delete cascade,
  contribution_id uuid references public.contributions(id) on delete cascade,
  media_id uuid references public.memorial_media(id) on delete cascade,
  reported_by uuid not null references public.profiles(id) on delete cascade,
  reason text not null,
  status public.report_status not null default 'open',
  resolved_by uuid references public.profiles(id) on delete set null,
  resolution_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_reports_single_target check (
    (
      (memorial_id is not null)::int
      + (contribution_id is not null)::int
      + (media_id is not null)::int
    ) = 1
  )
);

create index content_reports_status_idx on public.content_reports(status);

create trigger set_content_reports_updated_at
  before update on public.content_reports
  for each row execute function public.set_updated_at();

-- =========================================================================
-- memorial_collaborators
-- =========================================================================
create table public.memorial_collaborators (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references public.memorials(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role public.collaborator_role not null default 'editor',
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (memorial_id, profile_id)
);

create index memorial_collaborators_profile_id_idx on public.memorial_collaborators(profile_id);

-- =========================================================================
-- audit_logs (append-only)
-- =========================================================================
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_target_idx on public.audit_logs(target_type, target_id);
create index audit_logs_created_at_idx on public.audit_logs(created_at desc);

-- =========================================================================
-- notifications
-- =========================================================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_recipient_id_idx on public.notifications(recipient_id, created_at desc);

-- =========================================================================
-- app_settings
-- =========================================================================
create table public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

create trigger set_app_settings_updated_at
  before update on public.app_settings
  for each row execute function public.set_updated_at();
