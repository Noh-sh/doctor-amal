# План 078: Валидация публичных URL из Supabase

## Статус

Завершен.

## Цель

Исправить partial-data сценарий публичной страницы: невалидные внешние URL и Telegram URL из Supabase не должны становиться активными ссылками в UI.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- внешние URL либо `null`, либо валидные URL ожидаемой платформы;
- Telegram-ссылка менеджера либо `null`, либо валидный Telegram URL;
- внешняя кнопка без URL не активна;
- без подтвержденной Telegram-ссылки кнопка `Купить` не должна быть рабочим переходом;
- URL нельзя придумывать или автоматически исправлять;
- ошибки данных не должны приводить к белому экрану или stack trace.

Вне specs:

- автоматическое исправление URL;
- добавление UTM или аналитики;
- новые внешние платформы;
- отдельные Telegram-ссылки для курсов;
- изменение Supabase schema, RLS или seed-контента.

## Что делаем

1. Добавить проверку URL при маппинге публичных Supabase rows.
2. Невалидные URL внешних кнопок превращать в `null` и неактивное состояние.
3. Невалидный `manager_telegram_url` превращать в `null`.
4. Не менять админку, Supabase migrations и публичный сценарий.

## Проверка

Команды:

```bash
npm run quality
git diff --check
```

Ручная логика:

- валидный `https://...` URL остается активным;
- пустой или невалидный внешний URL становится неактивным;
- невалидный Telegram URL покупки не делает кнопку `Купить` активной;
- публичная страница продолжает собираться без stack trace.

## Критерии готовности

- Невалидные публичные URL не попадают в активные ссылки.
- `npm run quality` проходит.
- `git diff --check` проходит.

## Результат проверки

- В `data/taplink-page-source.ts` добавлена проверка публичных URL.
- Внешние ссылки из Supabase теперь активируются только при валидном `http` или `https` URL.
- Невалидный или пустой внешний URL превращается в `null`, поэтому кнопка остается неактивной.
- `manager_telegram_url` теперь активирует покупку только для валидных URL с host `t.me` или `telegram.me`.
- Автоматическое исправление URL, UTM, новые платформы, migrations и Supabase данные не добавлялись.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `data/taplink-page-source.ts`
- `Work plans/Завершенные/078-validaciya-publichnyh-url-iz-supabase.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
