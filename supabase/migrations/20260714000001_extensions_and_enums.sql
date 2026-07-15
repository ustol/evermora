-- Extensions
create extension if not exists pgcrypto with schema public;

-- Enums
create type public.user_role as enum ('user', 'admin');
create type public.account_status as enum ('active', 'suspended', 'deleted');
create type public.memorial_status as enum ('draft', 'published', 'archived');
create type public.privacy_status as enum ('public', 'private', 'unlisted');
create type public.funeral_event_type as enum (
  'wake',
  'burial',
  'funeral_service',
  'thanksgiving_service',
  'reception',
  'other'
);
create type public.moderation_status as enum ('pending', 'approved', 'rejected', 'flagged');
create type public.contribution_type as enum ('tribute', 'condolence', 'memory');
create type public.report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
create type public.collaborator_role as enum ('editor', 'moderator');
create type public.notification_type as enum (
  'new_contribution',
  'contribution_approved',
  'contribution_rejected',
  'new_report',
  'memorial_published'
);
