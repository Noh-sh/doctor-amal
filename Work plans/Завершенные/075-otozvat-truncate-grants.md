# План 075: Отозвать лишний TRUNCATE privilege

## Статус

Завершен.

## Цель

Исправить найденный в плане `074` дефект grants: отозвать `TRUNCATE` у ролей `anon` и `authenticated` на контентных таблицах Supabase, чтобы права соответствовали принципу минимальных привилегий из specs.

## Подтверждение specs

Основание:

- `Work plans/Завершенные/074-proverka-remote-supabase-rls.md`;
- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/supabase-mcp-access.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- публичный `anon` не должен иметь write-доступ к таблицам контента;
- обычный `authenticated` без `doctor_admin` не должен иметь write-доступ;
- `delete` для `courses` отсутствует, а курс скрывается через `is_active = false`;
- все изменения grants/schema должны идти через migration;
- bugfix можно делать без изменения specs, если он возвращает реализацию к уже описанному поведению.

Вне specs:

- новые таблицы, поля, routes, Auth users, роли, UI и продуктовые сценарии;
- изменение seed-контента;
- выдача новых прав или добавление новых policies.

## Что делаем

1. Добавить migration, которая отзывает `TRUNCATE` у `anon` и `authenticated` на контентных таблицах.
2. Применить migration через `npx supabase db push`.
3. Проверить `npx supabase migration list`.
4. Повторно проверить `has_table_privilege(..., 'TRUNCATE')` через `npx supabase db query --linked`.
5. Выполнить `npm run quality` и `git diff --check`.
6. Зафиксировать результат в плане и roadmap.

## Что не делаем

- Не меняем RLS policies.
- Не меняем grants для разрешенных `SELECT`, `UPDATE` и `INSERT`.
- Не меняем данные.
- Не создаем Auth users.
- Не используем service role key в коде.

## Проверка

Команды:

```bash
npx supabase db push
npx supabase migration list
npx supabase db query --linked "..."
npm run quality
git diff --check
```

## Критерии готовности

- Remote migration применена.
- `TRUNCATE` у `anon` и `authenticated` на контентных таблицах возвращает `false`.
- Остальные подтвержденные RLS/policies не менялись.
- `npm run quality` проходит.
- `git diff --check` проходит.

## Результат проверки

- Добавлена migration `20260613000000_revoke_content_truncate_grants.sql`.
- `npx supabase db push` выполнен успешно; migration применена к remote project.
- `npx supabase migration list` подтверждает совпадение local и remote migrations, включая `20260613000000`.
- `npx supabase db query --linked` подтвердил:
  - `anon` имеет `TRUNCATE = false` на `doctor_profile`, `external_links`, `courses`, `purchase_settings`, `page_settings`;
  - `authenticated` имеет `TRUNCATE = false` на `doctor_profile`, `external_links`, `courses`, `purchase_settings`, `page_settings`;
  - публичный `SELECT` сохранился там, где он нужен для публичной страницы;
  - `INSERT`, `UPDATE`, `DELETE` для `anon` остаются `false`;
  - `DELETE` для `authenticated` остается `false`.
- RLS policies, данные, Auth users и UI не менялись.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `supabase/migrations/20260613000000_revoke_content_truncate_grants.sql`
- `Work plans/Завершенные/075-otozvat-truncate-grants.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
