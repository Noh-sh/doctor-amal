# План 052: Закрыть старые активные планы

## Статус

Завершен.

## Цель

Исправить процессный хвост: убрать из `Work plans/Активные/` планы Supabase, которые по факту уже завершены последующими этапами `045`-`051`.

## Подтверждение specs

Прочитано:

- `AGENTS.md`
- `spec/technical-specs/change-management.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-mcp-access.md`

Подтверждено:

- все этапы работы должны фиксироваться в `Work plans/`;
- завершенные и проверенные задачи должны храниться в `Work plans/Завершенные/`;
- после завершения плана нужно обновлять `Roadmap/chronology.md` и `Roadmap/project-roadmap.md`;
- Supabase на текущем этапе остается только источником контента страницы;
- MCP используется только для inspection/read workflow и не меняет schema или seed.

Вне specs:

- продуктовый сценарий не меняется;
- UI, маршруты, данные Supabase, migration-файлы и код приложения не меняются;
- git push не выполняется без отдельного подтверждения пользователя.

## Что делаем

1. Перенести `044-plan-supabase-content-source.md` из активных в завершенные.
2. Перенести `044-supabase-action-plan.md` из активных в завершенные как справочный документ.
3. Обновить статусы и результаты проверки в закрываемых документах.
4. Добавить запись в `Roadmap/chronology.md`.
5. Обновить `Roadmap/project-roadmap.md`.
6. Проверить, что в `Work plans/Активные/` не осталось старых завершенных планов.

## Что не делаем

- Не меняем код приложения.
- Не меняем specs.
- Не меняем Supabase schema, RLS policies или seed.
- Не запускаем deploy.
- Не выполняем push на GitHub.

## Проверка

Команды:

```bash
git diff --check
find 'Work plans/Активные' -maxdepth 1 -type f | sort
git status --short --branch
```

Ручная проверка:

- старые планы `044` больше не находятся в `Work plans/Активные/`;
- завершенные планы Supabase `045`-`051` остаются без изменений;
- roadmap отражает закрытие процессного хвоста;
- изменения не добавляют продуктового поведения.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- `find 'Work plans/Активные' -maxdepth 1 -type f | sort` не вернул файлов.
- `git status --short --branch` выполнен.
- Ручная проверка выполнена: планы `044` перенесены в `Work plans/Завершенные/`, активных старых планов не осталось.
- Ручная проверка выполнена: код приложения, specs, Supabase migrations и seed не менялись.

## Измененные файлы

- `Work plans/Завершенные/044-plan-supabase-content-source.md`
- `Work plans/Завершенные/044-supabase-action-plan.md`
- `Work plans/Завершенные/052-zakryt-starye-aktivnye-plany.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Закрыть старые активные планы Supabase"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
