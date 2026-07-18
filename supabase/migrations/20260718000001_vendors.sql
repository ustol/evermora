-- =========================================================================
-- Vendors: independent funeral-service businesses that register, get
-- admin-vetted once, and then freely list products/services (no
-- per-listing moderation, matching how the feature was described).
-- =========================================================================
do $$ begin
  create type public.vendor_status as enum ('pending', 'approved', 'rejected', 'suspended');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.vendor_category as enum (
    'caterers',
    'florists',
    'transport',
    'printing',
    'event_planning',
    'mortuary_services',
    'photography_videography',
    'music_choir',
    'other'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references public.profiles(id) on delete cascade,
  slug text not null unique,
  business_name text not null,
  category public.vendor_category not null,
  description text,
  phone text,
  email text,
  whatsapp text,
  location text,
  logo_path text,
  status public.vendor_status not null default 'pending',
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vendors_status_idx on public.vendors(status);
create index if not exists vendors_category_idx on public.vendors(category);

drop trigger if exists set_vendors_updated_at on public.vendors;
create trigger set_vendors_updated_at
  before update on public.vendors
  for each row execute function public.set_updated_at();

create table if not exists public.vendor_listings (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2),
  currency text not null default 'GHS',
  image_path text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vendor_listings_vendor_id_idx on public.vendor_listings(vendor_id);

drop trigger if exists set_vendor_listings_updated_at on public.vendor_listings;
create trigger set_vendor_listings_updated_at
  before update on public.vendor_listings
  for each row execute function public.set_updated_at();

-- -------------------------------------------------------------------------
-- RLS: vendors
-- -------------------------------------------------------------------------
alter table public.vendors enable row level security;

drop policy if exists "vendors_select" on public.vendors;
create policy "vendors_select"
  on public.vendors for select
  using (
    status = 'approved'
    or owner_id = public.current_profile_id()
    or public.is_admin()
  );

drop policy if exists "vendors_insert" on public.vendors;
create policy "vendors_insert"
  on public.vendors for insert
  with check (owner_id = public.current_profile_id());

drop policy if exists "vendors_update" on public.vendors;
create policy "vendors_update"
  on public.vendors for update
  using (owner_id = public.current_profile_id() or public.is_admin())
  with check (owner_id = public.current_profile_id() or public.is_admin());

drop policy if exists "vendors_delete" on public.vendors;
create policy "vendors_delete"
  on public.vendors for delete
  using (owner_id = public.current_profile_id() or public.is_admin());

-- status/rejection_reason can only change via admin_update_vendor_status.
revoke update on public.vendors from authenticated;
grant update (
  business_name, category, description, phone, email, whatsapp, location, logo_path, slug
) on public.vendors to authenticated;

-- -------------------------------------------------------------------------
-- RLS: vendor_listings
-- -------------------------------------------------------------------------
alter table public.vendor_listings enable row level security;

drop policy if exists "vendor_listings_select" on public.vendor_listings;
create policy "vendor_listings_select"
  on public.vendor_listings for select
  using (
    (
      is_active
      and exists (
        select 1 from public.vendors v
        where v.id = vendor_id and v.status = 'approved'
      )
    )
    or exists (
      select 1 from public.vendors v
      where v.id = vendor_id
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );

drop policy if exists "vendor_listings_insert" on public.vendor_listings;
create policy "vendor_listings_insert"
  on public.vendor_listings for insert
  with check (
    exists (
      select 1 from public.vendors v
      where v.id = vendor_id and v.owner_id = public.current_profile_id()
    )
  );

drop policy if exists "vendor_listings_update" on public.vendor_listings;
create policy "vendor_listings_update"
  on public.vendor_listings for update
  using (
    exists (
      select 1 from public.vendors v
      where v.id = vendor_id
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  )
  with check (
    exists (
      select 1 from public.vendors v
      where v.id = vendor_id
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );

drop policy if exists "vendor_listings_delete" on public.vendor_listings;
create policy "vendor_listings_delete"
  on public.vendor_listings for delete
  using (
    exists (
      select 1 from public.vendors v
      where v.id = vendor_id
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );

-- -------------------------------------------------------------------------
-- Admin RPC: only way to change a vendor's status.
-- -------------------------------------------------------------------------
create or replace function public.admin_update_vendor_status(
  p_vendor_id uuid,
  p_status public.vendor_status,
  p_rejection_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only administrators can change a vendor''s status';
  end if;

  update public.vendors
  set status = p_status,
      rejection_reason = case when p_status = 'rejected' then p_rejection_reason else null end
  where id = p_vendor_id;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (
    public.current_profile_id(),
    'vendor.set_status',
    'vendor',
    p_vendor_id,
    jsonb_build_object('status', p_status)
  );
end;
$$;

revoke execute on function public.admin_update_vendor_status(uuid, public.vendor_status, text) from public;
grant execute on function public.admin_update_vendor_status(uuid, public.vendor_status, text) to authenticated;

-- -------------------------------------------------------------------------
-- Storage: public bucket, vendor-owner (their own folder) or admin writes.
-- Path convention: {vendor_id}/{filename} — mirrors memorial-media.
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vendor-assets', 'vendor-assets', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "vendor_assets_storage_select" on storage.objects;
create policy "vendor_assets_storage_select"
  on storage.objects for select
  using (bucket_id = 'vendor-assets');

drop policy if exists "vendor_assets_storage_insert" on storage.objects;
create policy "vendor_assets_storage_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'vendor-assets'
    and exists (
      select 1 from public.vendors v
      where v.id = ((storage.foldername(name))[1])::uuid
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );

drop policy if exists "vendor_assets_storage_update" on storage.objects;
create policy "vendor_assets_storage_update"
  on storage.objects for update
  using (
    bucket_id = 'vendor-assets'
    and exists (
      select 1 from public.vendors v
      where v.id = ((storage.foldername(name))[1])::uuid
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );

drop policy if exists "vendor_assets_storage_delete" on storage.objects;
create policy "vendor_assets_storage_delete"
  on storage.objects for delete
  using (
    bucket_id = 'vendor-assets'
    and exists (
      select 1 from public.vendors v
      where v.id = ((storage.foldername(name))[1])::uuid
        and (v.owner_id = public.current_profile_id() or public.is_admin())
    )
  );
