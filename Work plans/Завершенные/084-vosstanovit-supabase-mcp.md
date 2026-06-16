# План 084: Восстановить Supabase MCP

## Статус

Завершен.

## Цель

Заново подключить Supabase MCP к Codex для read-only инспекции проекта Doctor Amal после ручного отключения MCP.

## Подтверждение specs

Основание:

- `spec/technical-specs/supabase-mcp-access.md`
- `Work plans/Завершенные/051-supabase-mcp-setup.md`
- `Work plans/Завершенные/083-dopolnitelnaya-proverka-codex-okruzheniya.md`

Подтверждено:

- MCP разрешен только для inspection/read workflow;
- Supabase project: `dagykilvpiacfbwpcluv`;
- MCP должен использовать hosted URL с `read_only=true`;
- изменения schema, seed, RLS и данных через MCP не выполняются;
- токены, ключи и секреты не записываются в git, specs, roadmap или work plans.

Вне specs:

- глобальная авторизация Codex/Supabase в пользовательском окружении.

## Что делаем

1. Проверить текущий `codex mcp list`.
2. Добавить MCP server `supabase` с read-only URL.
3. Выполнить `codex mcp login supabase`.
4. Проверить `codex mcp list` и `codex mcp get supabase`.
5. Не выполнять write-операции через MCP.
6. Записать результат проверки.

## Что не делаем

- Не меняем продуктовый код.
- Не меняем specs.
- Не меняем Supabase schema/RLS/data через MCP.
- Не записываем токены и секреты в проект.
- Не выполняем git commit/push.

## Проверка

Команды:

```bash
codex mcp list
codex mcp get supabase
git status --short --branch
git diff --check
```

## Критерии готовности

- `codex mcp list` показывает `supabase`;
- `codex mcp get supabase` показывает project `dagykilvpiacfbwpcluv` и `read_only=true`;
- секреты не попали в git;
- пользователь понимает, что при истечении авторизации нужно повторить `codex mcp login supabase`.

## Результат проверки

### Выполнено

- До подключения `codex mcp list` показывал отсутствие настроенных MCP servers.
- Выполнено подключение:

```bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=dagykilvpiacfbwpcluv&read_only=true&features=database,docs"
```

- Выполнена авторизация:

```bash
codex mcp login supabase
```

- Авторизация завершилась сообщением `Successfully logged in to MCP server 'supabase'`.

### Проверка

- `codex mcp list` показывает server `supabase`:
  - URL: `https://mcp.supabase.com/mcp?project_ref=dagykilvpiacfbwpcluv&read_only=true&features=database,docs`;
  - status: `enabled`.
- `codex mcp get supabase` показывает:
  - `enabled: true`;
  - `transport: streamable_http`;
  - `project_ref=dagykilvpiacfbwpcluv`;
  - `read_only=true`;
  - `features=database,docs`;
  - `bearer_token_env_var: -`;
  - `http_headers: -`;
  - `env_http_headers: -`.
- `git diff --check` выполнен без ошибок.
- Токены, ключи и секреты не записывались в project files.

### Наблюдение

Команды `codex mcp list` и `codex mcp get supabase` продолжают показывать предупреждение:

```text
WARNING: proceeding, even though we could not create PATH aliases: Operation not permitted (os error 1)
```

Это предупреждение не помешало подключению и авторизации MCP. Оно похоже на ограничение текущей sandbox/сессии Codex, а не на проблему проекта Doctor Amal.

### Вывод

Supabase MCP восстановлен в глобальной Codex-конфигурации. Для текущей задачи MCP настроен правильно: project ограничен `dagykilvpiacfbwpcluv`, URL read-only, features ограничены `database,docs`.

Если авторизация Supabase MCP снова истечет или будет сброшена, нужно повторить:

```bash
codex mcp login supabase
```

## Измененные файлы

- `Work plans/Завершенные/084-vosstanovit-supabase-mcp.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add 'Work plans/Завершенные/084-vosstanovit-supabase-mcp.md' Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Восстановить Supabase MCP"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
