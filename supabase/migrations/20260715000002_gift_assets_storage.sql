-- =========================================================================
-- gift-assets — public bucket of admin-uploaded wreath/rose images.
-- Path convention: {gift_catalog_id}/{filename}. Public read (these are
-- generic decorative catalog images, not tied to any specific memorial's
-- privacy); writes are admin-only.
-- =========================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gift-assets', 'gift-assets', true, 3145728, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "gift_assets_public_read" on storage.objects;
create policy "gift_assets_public_read"
  on storage.objects for select
  using (bucket_id = 'gift-assets');

drop policy if exists "gift_assets_admin_insert" on storage.objects;
create policy "gift_assets_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'gift-assets' and public.is_admin());

drop policy if exists "gift_assets_admin_update" on storage.objects;
create policy "gift_assets_admin_update"
  on storage.objects for update
  using (bucket_id = 'gift-assets' and public.is_admin())
  with check (bucket_id = 'gift-assets' and public.is_admin());

drop policy if exists "gift_assets_admin_delete" on storage.objects;
create policy "gift_assets_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'gift-assets' and public.is_admin());
