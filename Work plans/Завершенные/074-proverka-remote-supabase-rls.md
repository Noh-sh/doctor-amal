# План 074: Проверка remote Supabase и RLS

## Статус

Завершен.

## Цель

Проверить, что remote Supabase project, migrations, RLS, grants и секреты соответствуют текущим specs, без изменения базы данных и без добавления нового продуктового поведения.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/supabase-mcp-access.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- Supabase является источником контента текущей страницы `/`;
- `/admin` доступен только активному `doctor_admin`;
- RLS должен быть включен на таблицах контента;
- публичный `anon` не должен иметь write-доступ;
- обычный `authenticated` без `doctor_admin` не должен иметь write-доступ;
- активный `doctor_admin` может выполнять только разрешенные операции;
- `delete` для `courses` на текущем этапе не разрешен;
- service role key не должен использоваться во frontend-коде;
- MCP или CLI можно использовать только для read-only инспекции и проверки.

Вне specs:

- изменения schema, policies, grants или seed-контента через SQL Editor/MCP;
- создание Auth users;
- управление ролями через UI;
- добавление новых таблиц, маршрутов, заявок, оплаты, аналитики или покупателей.

## Что делаем

1. Проверить локальную ветку, рабочее дерево и linked Supabase project без раскрытия секретов.
2. Сверить список локальных migrations.
3. Проверить доступность Supabase CLI и, если возможно, remote migration status.
4. Выполнить read-only проверку кода на отсутствие service role key во frontend/client bundle.
5. Проверить `.gitignore` и отсутствие `.env.local` в git.
6. Если доступен read-only способ remote-инспекции, проверить RLS/policies/grants.
7. Зафиксировать результаты проверки в этом плане.

## Что не делаем

- Не меняем migrations.
- Не выполняем `db push`.
- Не меняем remote database.
- Не создаем и не меняем Auth users.
- Не коммитим секреты.
- Не добавляем новые функции.

## Проверка

Команды:

```bash
git status --short --branch
find supabase/migrations -maxdepth 1 -type f | sort
npx supabase migration list
npm run quality
git diff --check
```

Дополнительные read-only проверки выполняются только если доступны без раскрытия секретов и без write-действий.

## Критерии готовности

- Результат remote migration/RLS проверки зафиксирован.
- Если проверка заблокирована, причина явно описана.
- Подтверждено, что `.env.local` не попадает в git.
- Подтверждено, что service role key не используется во frontend-коде.
- `npm run quality` проходит или причина невозможности указана.
- `git diff --check` проходит.

## Результат проверки

- `git status --short --branch`: ветка `quality/supabase-rls-check`, рабочее дерево до плана было чистым.
- Локально есть 5 migration-файлов:
  - `20260530000000_create_taplink_content_tables.sql`;
  - `20260603000000_create_admin_access_policies.sql`;
  - `20260603001000_restrict_admin_update_grants.sql`;
  - `20260603002000_add_admin_content_select_policies.sql`;
  - `20260603003000_add_admin_course_insert_policy.sql`.
- `npx supabase migration list`: local и remote migrations совпадают по всем 5 версиям.
- `npx supabase db dump --schema public`: не выполнен, потому что Supabase CLI требует Docker daemon для dump, а Docker daemon недоступен.
- `npx supabase db query --linked`: выполнены read-only catalog-запросы к remote project через Management API.
- RLS включен на таблицах:
  - `admin_users`;
  - `courses`;
  - `doctor_profile`;
  - `external_links`;
  - `page_settings`;
  - `purchase_settings`.
- RLS policies соответствуют ожидаемой модели:
  - публичный `anon` читает только опубликованный профиль;
  - публичный `anon` читает только активные курсы;
  - публичный `anon` читает опубликованные `page_settings`;
  - публичный `anon` читает `external_links` и `purchase_settings`;
  - `authenticated` admin policies используют `is_doctor_admin()`;
  - `courses` имеет `insert` только через policy активного `doctor_admin`;
  - `delete` policy для `courses` отсутствует.
- `git ls-files '.env*' 'supabase/.temp/*'`: в git отслеживается только `.env.example`; `.env.local` и `supabase/.temp/` не отслеживаются.
- Поиск `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`, `SERVICE_ROLE`, `service_role`: service role key встречается только в `.env.example` как пустой пример; текущий код его не использует.
- `.env.local` содержит нужные публичные Supabase env-переменные, значения не выводились.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

Найденный дефект:

- `anon` и `authenticated` не имеют `INSERT`, `UPDATE` и `DELETE` privileges на контентных таблицах, но имеют `TRUNCATE` privilege на таблицах `doctor_profile`, `external_links`, `courses`, `purchase_settings`, `page_settings`.
- `TRUNCATE` не покрывается RLS и не соответствует принципу минимальных прав из specs.
- Источник: migration `20260603001000_restrict_admin_update_grants.sql` отзывает `insert`, `update`, `delete`, но не отзывает `truncate`.
- Исправление требует отдельного bugfix-плана и новой migration: отозвать `truncate` у `anon` и `authenticated` на контентных таблицах, затем применить migration через Supabase CLI и повторно проверить grants.

## Измененные файлы

- `Work plans/Активные/074-proverka-remote-supabase-rls.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
