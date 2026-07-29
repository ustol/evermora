-- =========================================================================
-- Virtual wreaths & roses (Paystack-backed gifting).
-- =========================================================================
create type public.gift_purchase_status as enum ('pending', 'paid', 'failed');

-- =========================================================================
-- gift_catalog — admin-managed price list of purchasable virtual items.
-- =========================================================================
create table public.gift_catalog (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_path text not null,
  price numeric(10, 2) not null check (price > 0),
  currency text not null default 'GHS',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index gift_catalog_is_active_idx on public.gift_catalog(is_active);

create trigger set_gift_catalog_updated_at
  before update on public.gift_catalog
  for each row execute function public.set_updated_at();

alter table public.gift_catalog enable row level security;

drop policy if exists "gift_catalog_select" on public.gift_catalog;
create policy "gift_catalog_select"
  on public.gift_catalog for select
  using (is_active or public.is_admin());

drop policy if exists "gift_catalog_insert_admin" on public.gift_catalog;
create policy "gift_catalog_insert_admin"
  on public.gift_catalog for insert
  with check (public.is_admin());

drop policy if exists "gift_catalog_update_admin" on public.gift_catalog;
create policy "gift_catalog_update_admin"
  on public.gift_catalog for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "gift_catalog_delete_admin" on public.gift_catalog;
create policy "gift_catalog_delete_admin"
  on public.gift_catalog for delete
  using (public.is_admin());

-- =========================================================================
-- gift_purchases — one row per wreath/rose bought for a memorial.
-- =========================================================================
create table public.gift_purchases (
  id uuid primary key default gen_random_uuid(),
  memorial_id uuid not null references public.memorials(id) on delete cascade,
  gift_catalog_id uuid not null references public.gift_catalog(id) on delete restrict,
  purchaser_profile_id uuid not null references public.profiles(id) on delete restrict,
  purchaser_display_name text not null check (char_length(trim(purchaser_display_name)) > 0),
  amount numeric(10, 2) not null,
  currency text not null,
  paystack_reference text not null unique,
  status public.gift_purchase_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index gift_purchases_memorial_id_idx on public.gift_purchases(memorial_id, status);
create index gift_purchases_purchaser_id_idx on public.gift_purchases(purchaser_profile_id);

create trigger set_gift_purchases_updated_at
  before update on public.gift_purchases
  for each row execute function public.set_updated_at();

-- Server-decided pricing: the client never gets to say how much a gift
-- costs. Mirrors enforce_contribution_status — same rationale, this time
-- for money instead of moderation state.
create or replace function public.enforce_gift_purchase_pricing()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_price numeric(10, 2);
  v_currency text;
  v_is_active boolean;
  v_memorial_purchasable boolean;
begin
  select price, currency, is_active
  into v_price, v_currency, v_is_active
  from public.gift_catalog
  where id = new.gift_catalog_id;

  if v_price is null then
    raise exception 'Gift item not found';
  end if;

  if not v_is_active then
    raise exception 'This gift item is no longer available';
  end if;

  select exists (
    select 1 from public.memorials m
    where m.id = new.memorial_id
      and m.status = 'published'
      and m.privacy in ('public', 'unlisted')
      and not m.admin_suspended
  ) into v_memorial_purchasable;

  if not v_memorial_purchasable then
    raise exception 'This memorial is not open to receiving gifts';
  end if;

  new.amount := v_price;
  new.currency := v_currency;
  new.status := 'pending';
  new.paid_at := null;
  return new;
end;
$$;

create trigger gift_purchases_enforce_pricing
  before insert on public.gift_purchases
  for each row execute function public.enforce_gift_purchase_pricing();

alter table public.gift_purchases enable row level security;

drop policy if exists "gift_purchases_select" on public.gift_purchases;
create policy "gift_purchases_select"
  on public.gift_purchases for select
  using (
    (status = 'paid' and public.can_view_memorial(memorial_id))
    or purchaser_profile_id = public.current_profile_id()
    or public.can_manage_memorial(memorial_id)
    or public.is_admin()
  );

drop policy if exists "gift_purchases_insert" on public.gift_purchases;
create policy "gift_purchases_insert"
  on public.gift_purchases for insert
  with check (purchaser_profile_id = public.current_profile_id());

-- No update/delete policy for `authenticated` at all — status can only
-- move to paid/failed via the verify-gift-purchase / paystack-webhook Edge
-- Functions, which use the service_role key and therefore bypass RLS
-- entirely. This table has zero direct client write access after insert.
