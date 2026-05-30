# План 045: Specs Supabase как источника контента

## Статус

Завершен.

## Цель

Зафиксировать technical specs для подключения Supabase как online-источника контента Taplink-страницы без изменения публичного пользовательского сценария.

## Подтверждение specs

Прочитано:

- `AGENTS.md`
- `.agents/skills/doctor-amal-specs/SKILL.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/future-extension-plan.md`
- `spec/technical-specs/change-management.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/local-storage.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/future-online-purchase.md`

Подтверждено:

- первая Taplink-версия не меняет публичный сценарий: одна страница `/`, блоки `О докторе` и `Курсы`, внешние кнопки и `Купить` через Telegram менеджера;
- текущие specs разрешают будущую замену локальных данных на CMS/API после отдельного подтверждения;
- пользователь подтвердил следующий этап: Supabase используется как источник контента страницы;
- первый Supabase-этап не включает заявки, auth покупателей, оплату, заказы, медицинские данные, аналитику, MCP или админку приложения.

Вне specs и не реализуется в этом плане:

- код подключения Supabase;
- установка зависимостей;
- создание таблиц в Supabase;
- добавление env-переменных;
- online payment;
- MCP-подключение Codex к Supabase.

## Что делаем

1. Создать `spec/technical-specs/supabase-content-source.md`.
2. Обновить technical specs, чтобы они ссылались на Supabase-этап.
3. Обновить карту specs skill.
4. Обновить roadmap после завершения плана.
5. Выполнить проверку документации.

## Критерии готовности

- Supabase описан как источник контента, а не как новая пользовательская функция.
- Указаны таблицы первого этапа и границы данных.
- Указаны env-переменные и порядок добавления ключей.
- Зафиксировано, что online Supabase Dashboard используется вместо локального Supabase CLI/Docker на первом этапе.
- Зафиксированы RLS, public read, запрет public write и запрет secret/service role key во frontend.
- Отдельно указано, что будущая online payment требует новых specs.

## Проверка

Команды:

```bash
git diff --check
```

Ручная проверка:

- новый spec не добавляет оплату, заявки, auth покупателей, заказы или медицинские данные;
- публичный сценарий Taplink-страницы не меняется;
- technical specs согласованы между собой;
- roadmap и карта specs указывают на новый документ.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- `rg -n "[ \t]+$" ...` по измененным и новым документационным файлам не нашел trailing whitespace.
- Ручная проверка выполнена: новый spec не добавляет оплату, заявки, auth покупателей, заказы, медицинские данные, аналитику, админку приложения или MCP.
- Публичный сценарий Taplink-страницы не меняется: остается одна страница `/`, существующие блоки, внешние ссылки и `Купить` через Telegram менеджера.
- Supabase описан как источник контента и должен отдавать данные через mapper в `TaplinkPageData`.
- Зафиксирован online Supabase Dashboard как основной режим первого этапа без локального Supabase CLI/Docker.
- Зафиксированы правила env-переменных, RLS, public read, запрет public write и запрет secret/service role key во frontend.

## Измененные файлы

- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/README.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/future-extension-plan.md`
- `spec/technical-specs/change-management.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/local-storage.md`
- `Work plans/Завершенные/045-supabase-content-specs.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Git commit и push выполнять только после отдельного подтверждения пользователя.
