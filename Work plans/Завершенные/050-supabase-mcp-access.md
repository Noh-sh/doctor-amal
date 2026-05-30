# План 050: Правила Supabase MCP access

## Статус

Завершен.

## Цель

Зафиксировать правила будущего MCP-доступа Codex к Supabase до фактического подключения MCP.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/change-management.md`
- `spec/technical-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`

Подтверждено:

- MCP не входит в первый Supabase content-source этап;
- MCP может быть рассмотрен позже отдельным планом и отдельными правилами доступа;
- Supabase уже описан как источник публичного контента страницы;
- Supabase CLI migrations используются для воспроизводимой структуры базы и seed-контента.

## Что делаем

1. Создать `spec/technical-specs/supabase-mcp-access.md`.
2. Зафиксировать границы MCP-доступа:
   - MCP сначала используется только для инспекции и проверки;
   - изменения схемы базы выполняются через `supabase/migrations/` и `npx supabase db push`;
   - MCP не добавляет заявки, оплату, auth покупателей, заказы, медицинские данные, аналитику или админку.
3. Добавить новый spec в `spec/technical-specs/README.md`.
4. Добавить новый spec в `.agents/skills/doctor-amal-specs/references/spec-map.md`.
5. Выполнить проверку.

## Что не делаем

- Не подключаем MCP в текущей части работы.
- Не добавляем токены, ключи или секреты в репозиторий.
- Не меняем Supabase schema или seed.
- Не меняем UI и пользовательский сценарий.
- Не добавляем новые таблицы или политики.

## Проверка

Команды:

```bash
git diff --check
```

Ручная проверка:

- новый spec не содержит секретов;
- новый spec не разрешает обход `supabase/migrations/`;
- новый spec не добавляет продуктовые функции первой версии.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- Ручная проверка выполнена: новый spec не содержит секретов.
- Ручная проверка выполнена: новый spec не разрешает обход `supabase/migrations/`.
- Ручная проверка выполнена: новый spec не добавляет продуктовые функции первой версии.

## Измененные файлы

- `spec/technical-specs/supabase-mcp-access.md`
- `spec/technical-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/050-supabase-mcp-access.md`
