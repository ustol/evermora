-- =========================================================================
-- Lets the admin credit a specific writer's name on a blog post, separate
-- from author_id (which is always the signed-in admin who created the
-- row). Free text so it can name a guest writer, not just the admin's own
-- account name.
-- =========================================================================
alter table public.blog_posts add column if not exists author_name text;
