-- =========================================================================
-- Homepage hero slideshow — up to 5 admin-managed images, shown as a
-- rotating background behind the hero section on the public homepage.
-- =========================================================================
create table if not exists public.hero_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists hero_images_sort_order_idx on public.hero_images(sort_order);

alter table public.hero_images enable row level security;

drop policy if exists "hero_images_select" on public.hero_images;
create policy "hero_images_select"
  on public.hero_images for select
  using (true);

drop policy if exists "hero_images_insert" on public.hero_images;
create policy "hero_images_insert"
  on public.hero_images for insert
  with check (public.is_admin());

drop policy if exists "hero_images_update" on public.hero_images;
create policy "hero_images_update"
  on public.hero_images for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "hero_images_delete" on public.hero_images;
create policy "hero_images_delete"
  on public.hero_images for delete
  using (public.is_admin());

grant select on public.hero_images to anon, authenticated;
grant insert, update, delete on public.hero_images to authenticated;

-- Defense in depth: cap at 5 images server-side, not just in the admin UI.
create or replace function public.enforce_hero_image_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.hero_images) >= 5 then
    raise exception 'A maximum of 5 hero images is allowed';
  end if;
  return new;
end;
$$;

drop trigger if exists hero_images_enforce_limit on public.hero_images;
create trigger hero_images_enforce_limit
  before insert on public.hero_images
  for each row execute function public.enforce_hero_image_limit();

-- -------------------------------------------------------------------------
-- Storage: public bucket, admin-only writes (same shape as gift-assets).
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('hero-images', 'hero-images', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "hero_images_storage_select" on storage.objects;
create policy "hero_images_storage_select"
  on storage.objects for select
  using (bucket_id = 'hero-images');

drop policy if exists "hero_images_storage_insert" on storage.objects;
create policy "hero_images_storage_insert"
  on storage.objects for insert
  with check (bucket_id = 'hero-images' and public.is_admin());

drop policy if exists "hero_images_storage_update" on storage.objects;
create policy "hero_images_storage_update"
  on storage.objects for update
  using (bucket_id = 'hero-images' and public.is_admin());

drop policy if exists "hero_images_storage_delete" on storage.objects;
create policy "hero_images_storage_delete"
  on storage.objects for delete
  using (bucket_id = 'hero-images' and public.is_admin());
