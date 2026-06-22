# План 088: Обновить авторизацию Supabase MCP

## Статус

Завершен.

## Цель

Убрать повторяющееся сообщение Codex `MCP startup incomplete (failed: supabase)` через повторную OAuth-авторизацию уже подключенного read-only Supabase MCP server.

## Подтверждение specs

Прочитано:

- `AGENTS.md`
- `.agents/skills/doctor-amal-specs/SKILL.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/supabase-mcp-access.md`
- `Work plans/Завершенные/051-supabase-mcp-setup.md`
- `Work plans/Завершенные/084-vosstanovit-supabase-mcp.md`

Подтверждено:

- Supabase MCP разрешен только для inspection/read workflow;
- Supabase project остается `dagykilvpiacfbwpcluv`;
- MCP URL должен оставаться read-only с `read_only=true`;
- изменения schema, seed, RLS и данных через MCP не выполняются;
- токены, ключи и секреты нельзя записывать в проектные файлы.

Вне specs:

- глобальная OAuth-авторизация Codex/Supabase в пользовательском окружении.

## Что сделано

1. Проверена текущая конфигурация `codex mcp list` и `codex mcp get supabase`.
2. По логам Codex подтверждена причина startup warning:
   - `AuthorizationRequired`;
   - `Token refresh not possible, re-authorization required`;
   - `OAuth token refresh failed`.
3. Выполнена повторная авторизация:

```bash
codex mcp login supabase
```

4. Авторизация завершилась успешно.

## Что не делалось

- Не менялся продуктовый код.
- Не менялись specs.
- Не менялись Supabase schema, RLS, seed или данные.
- Не записывались токены, ключи или секреты в репозиторий.
- Не выполнялись git commit и push.

## Проверка

Команды:

```bash
codex mcp list
codex mcp get supabase
git status --short --branch
git diff --check
```

## Результат проверки

- До авторизации `codex mcp list` показывал server `supabase` в статусе `enabled`, но логи Codex фиксировали ошибку OAuth refresh.
- Первая попытка `codex mcp login supabase` внутри sandbox завершилась `Operation not permitted`.
- Повторная попытка с разрешением на выполнение вне sandbox завершилась сообщением `Successfully logged in to MCP server 'supabase'`.
- `codex mcp list` после авторизации показывает `supabase` со статусом `enabled`.
- `codex mcp get supabase` подтверждает URL с `project_ref=dagykilvpiacfbwpcluv`, `read_only=true` и `features=database,docs`.
- Текущая API-сессия Codex может потребовать перезапуска, чтобы заново поднять MCP tools при старте.
- Секреты не добавлялись в проектные файлы.

## Проверка после перезапуска

После перезапуска Codex API-сессии выполнена read-only MCP-проверка:

```text
mcp__supabase.list_tables({ "schemas": ["public"], "verbose": false })
```

Результат:

- Supabase MCP tools доступны в новой сессии.
- MCP вернул таблицы `public.doctor_profile`, `public.external_links`, `public.courses`, `public.purchase_settings`, `public.page_settings`, `public.admin_users`.
- Для всех возвращенных таблиц `rls_enabled: true`.
- Write-операции, изменения schema, seed, RLS, Auth users и данных не выполнялись.
- Секреты, токены и ключи в проектные файлы не записывались.

## Повторная проверка после настройки токена

После ручного обновления MCP-конфигурации через редактор и перезапуска Codex выполнены проверки:

```bash
codex mcp list
codex mcp get supabase
```

Результат:

- `codex mcp list` показывает server `supabase` в статусе `enabled`.
- `codex mcp get supabase` показывает `transport: streamable_http`.
- URL остается ограничен project `dagykilvpiacfbwpcluv`.
- В URL сохранены параметры `read_only=true` и `features=database,docs`.
- Токен не выводился и не записывался в файлы проекта.

Дополнительно выполнена read-only MCP-проверка:

```text
mcp__supabase.list_tables({ "schemas": ["public"], "verbose": true })
```

Результат:

- Supabase MCP tools доступны и отвечают в текущей сессии.
- MCP вернул структуру таблиц `public.doctor_profile`, `public.external_links`, `public.courses`, `public.purchase_settings`, `public.page_settings`, `public.admin_users`.
- Для всех возвращенных таблиц `rls_enabled: true`.
- Подтвержден foreign key `public.admin_users.user_id -> auth.users.id`.
- Write-операции, изменения schema, seed, RLS, Auth users и данных не выполнялись.
- Секреты, токены и ключи в specs, work plans, roadmap и код не записывались.

## Измененные файлы

- `Work plans/Завершенные/088-obnovit-avtorizaciyu-supabase-mcp.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После проверки можно подготовить commit вручную:

```bash
git status
git add 'Work plans/Завершенные/088-obnovit-avtorizaciyu-supabase-mcp.md' Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Обновить авторизацию Supabase MCP"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
