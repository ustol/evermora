-- =========================================================================
-- Removes the vendors feature entirely (reverses
-- 20260718000001_vendors.sql). The frontend routes, pages, nav links,
-- and service code have already been deleted — this drops the
-- corresponding database objects: storage, tables, RPC, and enums.
-- =========================================================================

-- Storage: Supabase blocks direct DELETE on storage.objects/storage.buckets
-- from SQL (storage.protect_delete() trigger — "Use the Storage API
-- instead"). Drop the vendor-assets bucket from the Supabase Dashboard's
-- Storage section by hand; this migration only removes the policies that
-- reference the vendors table (must go before the table itself).
drop policy if exists "vendor_assets_storage_select" on storage.objects;
drop policy if exists "vendor_assets_storage_insert" on storage.objects;
drop policy if exists "vendor_assets_storage_update" on storage.objects;
drop policy if exists "vendor_assets_storage_delete" on storage.objects;

-- Admin RPC.
drop function if exists public.admin_update_vendor_status(uuid, public.vendor_status, text);

-- Tables (their RLS policies are dropped automatically along with them).
drop table if exists public.vendor_listings;
drop table if exists public.vendors;

-- Enums (only usable after both tables above are gone).
drop type if exists public.vendor_status;
drop type if exists public.vendor_category;
