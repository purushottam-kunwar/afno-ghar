-- Afno Ghar admin v3 — image uploads.
-- Run this once in the Supabase SQL Editor (after schema.sql and schema-v2.sql).
--
-- Creates a public storage bucket for site images:
--   anyone can view images, only a signed-in admin can upload/replace/delete.
--
-- If the "create policy" statements fail with a permissions error, create the
-- bucket and policies from the dashboard instead:
--   Storage → New bucket → name "site-images", Public bucket ON
--   Storage → Policies → New policy → allow INSERT/UPDATE/DELETE to
--   authenticated users on bucket site-images.

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "public read site-images" on storage.objects
  for select using (bucket_id = 'site-images');

create policy "admin insert site-images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images');

create policy "admin update site-images" on storage.objects
  for update to authenticated using (bucket_id = 'site-images');

create policy "admin delete site-images" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images');
