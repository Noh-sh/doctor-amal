# План 046: Подготовка online Supabase Dashboard

## Статус

Завершен.

## Цель

Подготовить инструкцию и SQL для создания таблиц, RLS policies и начальных записей контента в online Supabase Dashboard.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-content-source.md`
- `Work plans/Активные/044-supabase-action-plan.md`
- `data/taplink-page.ts`
- `domain/taplink.ts`
- `spec/feature-specs/medical-content-rules.md`

Подтверждено:

- Supabase на первом этапе используется только как online-источник контента страницы;
- таблицы первого этапа: `doctor_profile`, `external_links`, `courses`, `purchase_settings`, `page_settings`;
- RLS должен быть включен на всех таблицах;
- публичный доступ разрешен только на чтение опубликованного или активного контента;
- public write, заявки, auth покупателей, заказы, online payment, медицинские данные, аналитика, админка приложения и MCP не входят в этот этап.

## Что делаем

1. Создать инструкцию `spec/technical-specs/supabase-dashboard-setup.md`.
2. Добавить SQL для таблиц первого этапа.
3. Добавить SQL для RLS policies.
4. Добавить seed текущего подтвержденного контента из `data/taplink-page.ts`.
5. Обновить карту technical specs и roadmap.
6. Выполнить документационную проверку.

## Что не делаем

- Не подключаем Supabase к коду.
- Не устанавливаем `@supabase/supabase-js`.
- Не создаем `.env.local`.
- Не выполняем SQL через CLI.
- Не создаем проект Supabase вместо владельца проекта.
- Не добавляем заявки, оплату, заказы, пользователей или медицинские данные.

## Проверка

Команды:

```bash
git diff --check
```

Ручная проверка:

- SQL не содержит `drop`;
- SQL не создает таблицы заявок, оплат, заказов или пользователей;
- RLS включен;
- public policies дают только чтение;
- seed соответствует текущим подтвержденным данным проекта.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- `rg -n "[ \t]+$" ...` по измененным документационным файлам не нашел trailing whitespace.
- Ручная проверка выполнена: SQL не содержит `drop`.
- Ручная проверка выполнена: SQL не создает таблицы заявок, оплат, заказов, пользователей, медицинских данных или аналитики.
- Ручная проверка выполнена: RLS включен на всех таблицах.
- Ручная проверка выполнена: public policies добавлены только для `select`.
- Seed соответствует текущим подтвержденным данным из `data/taplink-page.ts`.

## Измененные файлы

- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/README.md`
- `Work plans/Завершенные/046-supabase-dashboard-setup.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Git commit и push выполнять только после отдельного подтверждения пользователя.
