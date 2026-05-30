# План 051: Подключение Supabase MCP для инспекции

## Статус

Завершен.

## Цель

Подключить Supabase MCP к Codex для inspection/read workflow и проверить, что MCP можно использовать только как слой инспекции после specs и CLI migrations.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-mcp-access.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- MCP допускается только после `spec -> supabase/migrations/ -> npx supabase db push`;
- первый MCP-этап ограничен инспекцией и проверкой;
- изменения schema и seed выполняются только через `supabase/migrations/` и Supabase CLI;
- секреты, access token, secret key и service role key нельзя коммитить в git;
- MCP не добавляет заявки, оплату, auth покупателей, заказы, медицинские данные, аналитику или админку.

## Что делаем

1. Подключить Supabase MCP server в Codex с project scope на `dagykilvpiacfbwpcluv`.
2. Использовать hosted Supabase MCP URL с `read_only=true`.
3. Ограничить назначение MCP инспекцией таблиц, migrations и RLS/policies.
4. Выполнить проверку подключения без изменения базы.
5. Зафиксировать результат проверки в этом плане.

## Что не делаем

- Не меняем schema через MCP.
- Не выполняем `apply_migration` через MCP.
- Не меняем seed-контент.
- Не добавляем ключи или токены в репозиторий.
- Не используем service role key.
- Не меняем UI, маршруты или пользовательский сценарий.

## Проверка

Команды:

```bash
codex mcp list
git status --short --branch
```

MCP-проверка после авторизации:

- проверить, что Supabase MCP server виден Codex;
- проверить, что доступ ограничен project `dagykilvpiacfbwpcluv`;
- проверить, что используется read-only URL;
- выполнить только read/inspection запросы.

## Результат проверки

- `codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=dagykilvpiacfbwpcluv&read_only=true&features=database,docs"` выполнен успешно.
- `codex mcp login supabase` выполнен успешно.
- `codex mcp list` показывает server `supabase`, status `enabled`.
- `codex mcp get supabase` показывает URL с `project_ref=dagykilvpiacfbwpcluv`, `read_only=true` и `features=database,docs`.
- Свежий ephemeral Codex-процесс увидел Supabase MCP tools и выполнил read/inspection проверку.
- Через MCP подтверждены таблицы `public.doctor_profile`, `public.external_links`, `public.courses`, `public.purchase_settings`, `public.page_settings`.
- Через MCP подтверждено, что RLS включен на всех пяти таблицах.
- Через MCP подтверждено количество rows: `doctor_profile` — 1, `external_links` — 4, `courses` — 2, `purchase_settings` — 1, `page_settings` — 1.
- Через MCP подтверждена migration `20260530000000_create_taplink_content_tables`.
- Отдельный read-only SQL-запрос к `pg_policies` был отменен на стороне MCP, поэтому имена и выражения policies через MCP не подтверждены.
- Файлы и база через MCP не изменялись.
- Секреты не добавлялись в репозиторий.
- `git status --short --branch` выполнен.

## Измененные файлы

- `Work plans/Завершенные/051-supabase-mcp-setup.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
