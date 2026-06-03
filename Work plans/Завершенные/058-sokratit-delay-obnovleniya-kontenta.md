# План 058: Сократить delay обновления контента

## Статус

Завершен.

## Цель

Сократить задержку появления изменений с админки на публичной странице без реализации мгновенного сброса кеша.

## Подтверждение specs

Основание:

- `spec/technical-specs/admin-auth-and-access.md`

Подтверждено:

- изменения из админки публикуются сразу после сохранения;
- публичная страница может обновиться не мгновенно из-за кеша чтения Supabase;
- мгновенное обновление после сохранения требует отдельного технического описания.

Вне specs:

- нет.

## Что делаем

1. Сократить `revalidate` чтения Supabase с 300 до 30 секунд.
2. Проверить сборку и формат diff.

## Что не делаем в этом плане

- Не добавляем мгновенный revalidate после сохранения.
- Не добавляем route/action для сброса кеша.
- Не меняем Supabase Auth, RLS, migrations, env-переменные или публичный сценарий.

## Проверка

Команды:

```bash
npm run build
git diff --check
```

Ручная проверка:

- изменить описание курса в `/admin`;
- обновить публичную страницу `/`;
- убедиться, что изменение появляется в течение примерно 30 секунд.

## Критерии готовности

- Supabase content source использует `revalidate: 30`.
- Сборка проходит без ошибок.
- Изменение не добавляет мгновенный сброс кеша и не меняет бизнес-сценарии.

## Результат проверки

- `npm run build` выполнен успешно.
- В build output публичный route `/` показывает `Revalidate 30s`.
- `git diff --check` выполнен без ошибок.
- `rg -n "revalidate: (300|30)|force-dynamic|no-store" data app lib` подтвердил `revalidate: 30` в `data/taplink-page-source.ts`.

## Измененные файлы

- `data/taplink-page-source.ts`
- `Work plans/Завершенные/058-sokratit-delay-obnovleniya-kontenta.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add data/taplink-page-source.ts "Work plans/Завершенные/058-sokratit-delay-obnovleniya-kontenta.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Сократить задержку обновления контента"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
