-- =========================================================================
-- Blog: admin-authored posts only, with a cover image and any number of
-- related pictures per post.
-- =========================================================================
do $$ begin
  create type public.blog_post_status as enum ('draft', 'published');
exception when duplicate_object then null;
end $$;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_path text,
  status public.blog_post_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts(status);
create index if not exists blog_posts_published_at_idx on public.blog_posts(published_at desc);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

create table if not exists public.blog_post_images (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  storage_path text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists blog_post_images_post_id_idx on public.blog_post_images(post_id);

-- -------------------------------------------------------------------------
-- RLS: admin-authored, admin-only writes; public reads published posts.
-- -------------------------------------------------------------------------
alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_select" on public.blog_posts;
create policy "blog_posts_select"
  on public.blog_posts for select
  using (status = 'published' or public.is_admin());

drop policy if exists "blog_posts_insert" on public.blog_posts;
create policy "blog_posts_insert"
  on public.blog_posts for insert
  with check (public.is_admin() and author_id = public.current_profile_id());

drop policy if exists "blog_posts_update" on public.blog_posts;
create policy "blog_posts_update"
  on public.blog_posts for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "blog_posts_delete" on public.blog_posts;
create policy "blog_posts_delete"
  on public.blog_posts for delete
  using (public.is_admin());

alter table public.blog_post_images enable row level security;

drop policy if exists "blog_post_images_select" on public.blog_post_images;
create policy "blog_post_images_select"
  on public.blog_post_images for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.blog_posts p
      where p.id = post_id and p.status = 'published'
    )
  );

drop policy if exists "blog_post_images_insert" on public.blog_post_images;
create policy "blog_post_images_insert"
  on public.blog_post_images for insert
  with check (public.is_admin());

drop policy if exists "blog_post_images_update" on public.blog_post_images;
create policy "blog_post_images_update"
  on public.blog_post_images for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "blog_post_images_delete" on public.blog_post_images;
create policy "blog_post_images_delete"
  on public.blog_post_images for delete
  using (public.is_admin());

-- -------------------------------------------------------------------------
-- Storage: public bucket, admin-only writes.
-- Path convention: {post_id}/{filename} (a temp uuid folder is used for the
-- cover image while creating a new post, before it has an id).
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "blog_images_storage_select" on storage.objects;
create policy "blog_images_storage_select"
  on storage.objects for select
  using (bucket_id = 'blog-images');

drop policy if exists "blog_images_storage_insert" on storage.objects;
create policy "blog_images_storage_insert"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "blog_images_storage_update" on storage.objects;
create policy "blog_images_storage_update"
  on storage.objects for update
  using (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "blog_images_storage_delete" on storage.objects;
create policy "blog_images_storage_delete"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and public.is_admin());
