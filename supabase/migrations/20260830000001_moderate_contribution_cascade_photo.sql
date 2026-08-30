-- =========================================================================
-- When a tribute/condolence is moderated, resolve its attached photo the
-- same way. A contribution's photo lives in memorial_media and is gated by
-- its own moderation_status (RLS only serves 'approved' media to visitors).
-- Approving a contribution used to leave the photo 'pending', so an approved
-- tribute silently dropped the image the poster uploaded.
-- =========================================================================
create or replace function public.moderate_contribution(
  p_contribution_id uuid,
  p_status public.moderation_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_memorial_id uuid;
  v_photo_media_id uuid;
begin
  select memorial_id, photo_media_id
    into v_memorial_id, v_photo_media_id
  from public.contributions
  where id = p_contribution_id;

  if v_memorial_id is null then
    raise exception 'Contribution not found';
  end if;

  if not (public.can_manage_memorial(v_memorial_id) or public.is_admin()) then
    raise exception 'Not authorized to moderate this contribution';
  end if;

  if p_status not in ('approved', 'rejected', 'flagged') then
    raise exception 'Invalid moderation status: %', p_status;
  end if;

  update public.contributions
  set status = p_status,
      reviewed_by = public.current_profile_id(),
      reviewed_at = now()
  where id = p_contribution_id;

  if v_photo_media_id is not null then
    update public.memorial_media
       set moderation_status = p_status
     where id = v_photo_media_id;

    insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
    values (
      public.current_profile_id(),
      'media.moderate',
      'memorial_media',
      v_photo_media_id,
      jsonb_build_object('status', p_status, 'via', 'contribution')
    );
  end if;

  insert into public.audit_logs (actor_id, action, target_type, target_id, metadata)
  values (
    public.current_profile_id(),
    'contribution.moderate',
    'contribution',
    p_contribution_id,
    jsonb_build_object('status', p_status)
  );
end;
$$;
