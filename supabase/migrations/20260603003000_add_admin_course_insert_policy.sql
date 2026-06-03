grant insert (
  id,
  slug,
  title,
  description,
  price_display_text,
  price_is_confirmed,
  purchase_label,
  is_active,
  sort_order
) on public.courses to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'courses'
      and policyname = 'Doctor admin can insert courses content'
  ) then
    create policy "Doctor admin can insert courses content"
      on public.courses
      for insert
      to authenticated
      with check (public.is_doctor_admin());
  end if;
end $$;
