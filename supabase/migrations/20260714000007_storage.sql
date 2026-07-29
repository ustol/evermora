-- =========================================================================
-- Buckets. MIME allow-list and size caps are enforced by Storage itself,
-- not just client-side validation.
-- =========================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Private: memorial photos are only ever served via short-lived signed
-- URLs, so a private/unlisted memorial's images are never guessable.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('memorial-media', 'memorial-media', false, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- =========================================================================
-- avatars — path convention: {clerk_user_id}/{filename}
--
-- Policies are dropped first so this file is safe to re-run from any
-- partial state (Postgres has no CREATE POLICY IF NOT EXISTS).
-- =========================================================================
drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "avatars_owner_insert" on storage.objects;
create policy "avatars_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (auth.jwt()->>'sub')
  );

-- =========================================================================
-- memorial-media — path convention: {memorial_id}/{uploader_profile_id}/{filename}
-- Access mirrors the parent memorial's visibility via can_view_memorial /
-- can_manage_memorial, so a private/unlisted memorial's media is never
-- reachable without permission on the memorial itself.
-- =========================================================================
drop policy if exists "memorial_media_storage_select" on storage.objects;
create policy "memorial_media_storage_select"
  on storage.objects for select
  using (
    bucket_id = 'memorial-media'
    and public.can_view_memorial(((storage.foldername(name))[1])::uuid)
  );

drop policy if exists "memorial_media_storage_insert" on storage.objects;
create policy "memorial_media_storage_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'memorial-media'
    and (storage.foldername(name))[2] = (public.current_profile_id())::text
    and (
      public.can_manage_memorial(((storage.foldername(name))[1])::uuid)
      or exists (
        select 1 from public.memorials m
        where m.id = ((storage.foldername(name))[1])::uuid
          and m.allow_contributor_photos = true
          and m.status = 'published'
          and m.privacy in ('public', 'unlisted')
      )
    )
  );

drop policy if exists "memorial_media_storage_update" on storage.objects;
create policy "memorial_media_storage_update"
  on storage.objects for update
  using (
    bucket_id = 'memorial-media'
    and public.can_manage_memorial(((storage.foldername(name))[1])::uuid)
  )
  with check (
    bucket_id = 'memorial-media'
    and public.can_manage_memorial(((storage.foldername(name))[1])::uuid)
  );

drop policy if exists "memorial_media_storage_delete" on storage.objects;
create policy "memorial_media_storage_delete"
  on storage.objects for delete
  using (
    bucket_id = 'memorial-media'
    and (
      public.can_manage_memorial(((storage.foldername(name))[1])::uuid)
      or (storage.foldername(name))[2] = (public.current_profile_id())::text
    )
  );
