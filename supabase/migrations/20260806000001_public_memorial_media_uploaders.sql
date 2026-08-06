-- Allow public visitor photo submissions to be stored without attributing
-- them to the memorial owner or another signed-in profile.
alter table public.memorial_media alter column uploaded_by drop not null;
