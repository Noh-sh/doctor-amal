# План 049: Supabase CLI migration для таблиц контента

## Статус

Завершен.

## Цель

Перенести SQL подготовки Supabase из документации в migration-файл, чтобы структуру базы и seed можно было применить через Supabase CLI и хранить в git.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/change-management.md`
- `spec/technical-specs/data-model.md`

Подтверждено:

- Supabase используется только как источник публичного контента страницы;
- таблицы первого этапа: `doctor_profile`, `external_links`, `courses`, `purchase_settings`, `page_settings`;
- RLS включается на всех таблицах;
- public policies дают только чтение;
- заявки, пользователи, auth покупателей, заказы, online payment, медицинские данные, аналитика, админка и MCP не добавляются.

## Что делаем

1. Создать migration `supabase/migrations/20260530000000_create_taplink_content_tables.sql`.
2. Перенести в migration создание таблиц, RLS policies и seed текущего контента.
3. Подготовить команды Supabase CLI:
   - `npx supabase login`;
   - `npx supabase link --project-ref dagykilvpiacfbwpcluv`;
   - `npx supabase db push`.
4. Выполнить проверку.

## Что не делаем

- Не используем service role key в коде.
- Не добавляем заявки, оплату, пользователей, заказы или медицинские данные.
- Не подключаем MCP.
- Не меняем UI.

## Проверка

Команды:

```bash
git diff --check
npm run build
```

Ручная проверка:

- migration не содержит `drop`;
- migration не создает таблицы заявок, оплат, заказов или пользователей;
- RLS включен;
- public policies только `select`;
- seed соответствует текущему контенту.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- `npm run build` выполнен успешно.
- `npx supabase login` выполнен успешно.
- `npx supabase link --project-ref dagykilvpiacfbwpcluv` выполнен успешно.
- `npx supabase db push` выполнен успешно, migration применен к online project.
- `npx supabase migration list` показал совпадение local и remote migration `20260530000000`.
- Ручная проверка выполнена: migration не содержит `drop`.
- Ручная проверка выполнена: migration не создает таблицы заявок, оплат, заказов, пользователей, медицинских данных или аналитики.
- Ручная проверка выполнена: RLS включен на всех таблицах, public policies добавлены только для `select`.
- `supabase/.temp/` добавлен в `.gitignore` и не должен попадать в git.

## Измененные файлы

- `.gitignore`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/README.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `supabase/migrations/20260530000000_create_taplink_content_tables.sql`
- `Work plans/Завершенные/049-supabase-cli-migration.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Git commit и push выполнять только после отдельного подтверждения пользователя.
