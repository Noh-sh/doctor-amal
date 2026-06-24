alter table public.courses
  add column if not exists deleted_at timestamptz;

create index if not exists courses_active_not_deleted_sort_order_idx
  on public.courses (sort_order)
  where deleted_at is null;

grant update (
  photo_src,
  photo_alt
) on public.doctor_profile to authenticated;

grant update (
  deleted_at
) on public.courses to authenticated;

drop policy if exists "Public can read active courses" on public.courses;

create policy "Public can read active courses"
  on public.courses
  for select
  to anon
  using (is_active = true and deleted_at is null);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'doctor-media',
  'doctor-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
) on conflict (id) do update set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Doctor admin can read doctor media objects'
  ) then
    create policy "Doctor admin can read doctor media objects"
      on storage.objects
      for select
      to authenticated
      using (
        bucket_id = 'doctor-media'
        and public.is_doctor_admin()
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Doctor admin can upload doctor media objects'
  ) then
    create policy "Doctor admin can upload doctor media objects"
      on storage.objects
      for insert
      to authenticated
      with check (
        bucket_id = 'doctor-media'
        and public.is_doctor_admin()
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Doctor admin can update doctor media objects'
  ) then
    create policy "Doctor admin can update doctor media objects"
      on storage.objects
      for update
      to authenticated
      using (
        bucket_id = 'doctor-media'
        and public.is_doctor_admin()
      )
      with check (
        bucket_id = 'doctor-media'
        and public.is_doctor_admin()
      );
  end if;
end $$;
