# 096 - Remote migration фото и soft delete

## Статус

Завершен.

## Цель

Применить уже подготовленную migration `20260624000000_add_doctor_media_and_course_soft_delete.sql` к remote Supabase project и проверить, что новая часть админки может работать с production-схемой.

## Границы

Входит:

- применение migration к remote Supabase project `dagykilvpiacfbwpcluv`;
- read-only проверка списка migrations;
- read-only проверка `courses.deleted_at`;
- read-only проверка bucket `doctor-media`;
- read-only проверка Storage policies и публичной policy курсов;
- ручная локальная проверка `/admin` владельцем проекта после применения migration.

Не входит:

- commit;
- push;
- merge;
- deploy;
- изменение UI, бизнес-правил или specs;
- физическое удаление курсов;
- восстановление удаленных курсов через UI.

## Прочитанные specs

- `spec/feature-specs/admin-photo-management.md`
- `spec/feature-specs/admin-course-removal.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/implementation-checklist.md`
- `Work plans/Завершенные/095-realizaciya-foto-i-udaleniya-kursov.md`

## План работ

- [x] Проверить, что local migration есть.
- [x] Выполнить `npm run quality` перед remote-действием.
- [x] Проверить remote migration list до применения.
- [x] Применить migration к remote Supabase через `npx supabase db push`.
- [x] Проверить, что local и remote migrations совпадают.
- [x] Проверить `courses.deleted_at`, bucket `doctor-media`, Storage policies и public course policy.
- [x] Зафиксировать ручную проверку владельца проекта.

## Проверка

- `npm run quality` выполнен успешно: `lint`, `typecheck`, `next build`.
- `npx supabase migration list` до применения показал, что `20260624000000` есть local и отсутствует remote.
- `npx supabase db push` успешно применил `20260624000000_add_doctor_media_and_course_soft_delete.sql`.
- `npx supabase migration list` после применения показал `20260624000000` и local, и remote.
- MCP SQL проверил, что `public.courses.deleted_at` существует как `timestamp with time zone`.
- MCP SQL проверил bucket `doctor-media`:
  - `public = true`;
  - `file_size_limit = 5242880`;
  - `allowed_mime_types = image/jpeg, image/png, image/webp`.
- MCP SQL проверил Storage policies для `doctor-media`: `SELECT`, `INSERT`, `UPDATE` для `authenticated`.
- MCP SQL проверил public policy `Public can read active courses`: `is_active = true AND deleted_at IS NULL`.
- Владелец проекта локально проверил `/admin` после migration и сообщил, что изменения работают.

## Результат

Remote Supabase project готов к работе новой админки с загрузкой фото и безопасным удалением курсов через `deleted_at`.

## Git

- commit: не выполнен;
- push: не выполнен.
