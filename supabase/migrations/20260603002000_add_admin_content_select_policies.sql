grant select on public.doctor_profile to authenticated;
grant select on public.external_links to authenticated;
grant select on public.courses to authenticated;
grant select on public.purchase_settings to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'doctor_profile'
      and policyname = 'Doctor admin can read doctor profile content'
  ) then
    create policy "Doctor admin can read doctor profile content"
      on public.doctor_profile
      for select
      to authenticated
      using (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'external_links'
      and policyname = 'Doctor admin can read external links content'
  ) then
    create policy "Doctor admin can read external links content"
      on public.external_links
      for select
      to authenticated
      using (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'courses'
      and policyname = 'Doctor admin can read courses content'
  ) then
    create policy "Doctor admin can read courses content"
      on public.courses
      for select
      to authenticated
      using (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'purchase_settings'
      and policyname = 'Doctor admin can read purchase settings content'
  ) then
    create policy "Doctor admin can read purchase settings content"
      on public.purchase_settings
      for select
      to authenticated
      using (public.is_doctor_admin());
  end if;
end $$;
