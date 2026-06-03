create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_role_check check (role in ('doctor_admin'))
);

alter table public.admin_users enable row level security;

create or replace function public.is_doctor_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and role = 'doctor_admin'
      and is_active = true
  );
$$;

revoke all on function public.is_doctor_admin() from public;
grant execute on function public.is_doctor_admin() to authenticated;

grant select on public.admin_users to authenticated;

grant update (
  display_name,
  short_intro,
  education,
  experience,
  professional_directions,
  health_topics,
  help_formats
) on public.doctor_profile to authenticated;

grant update (
  url,
  is_enabled,
  inactive_text
) on public.external_links to authenticated;

grant update (
  title,
  description,
  price_display_text,
  price_is_confirmed,
  is_active
) on public.courses to authenticated;

grant update (
  manager_telegram_url,
  inactive_text
) on public.purchase_settings to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_users'
      and policyname = 'Doctor admin can read own admin access'
  ) then
    create policy "Doctor admin can read own admin access"
      on public.admin_users
      for select
      to authenticated
      using (
        user_id = auth.uid()
        and role = 'doctor_admin'
        and is_active = true
      );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'doctor_profile'
      and policyname = 'Doctor admin can update doctor profile content'
  ) then
    create policy "Doctor admin can update doctor profile content"
      on public.doctor_profile
      for update
      to authenticated
      using (public.is_doctor_admin())
      with check (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'external_links'
      and policyname = 'Doctor admin can update external links content'
  ) then
    create policy "Doctor admin can update external links content"
      on public.external_links
      for update
      to authenticated
      using (public.is_doctor_admin())
      with check (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'courses'
      and policyname = 'Doctor admin can update courses content'
  ) then
    create policy "Doctor admin can update courses content"
      on public.courses
      for update
      to authenticated
      using (public.is_doctor_admin())
      with check (public.is_doctor_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'purchase_settings'
      and policyname = 'Doctor admin can update purchase settings content'
  ) then
    create policy "Doctor admin can update purchase settings content"
      on public.purchase_settings
      for update
      to authenticated
      using (public.is_doctor_admin())
      with check (public.is_doctor_admin());
  end if;
end $$;
