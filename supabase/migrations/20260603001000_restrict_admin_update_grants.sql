revoke insert, update, delete on public.doctor_profile from anon, authenticated;
revoke insert, update, delete on public.external_links from anon, authenticated;
revoke insert, update, delete on public.courses from anon, authenticated;
revoke insert, update, delete on public.purchase_settings from anon, authenticated;
revoke insert, update, delete on public.page_settings from anon, authenticated;
revoke insert, update, delete on public.admin_users from anon, authenticated;

revoke all on public.admin_users from anon;
revoke all on public.admin_users from authenticated;
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
