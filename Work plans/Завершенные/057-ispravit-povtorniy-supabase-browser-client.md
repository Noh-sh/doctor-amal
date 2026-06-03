# План 057: Исправить повторный Supabase browser client

## Статус

Завершен.

## Цель

Убрать browser warning Supabase Auth о нескольких `GoTrueClient` в одном browser context без изменения пользовательского сценария админки.

## Подтверждение specs

Основание:

- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- `/admin` использует Supabase Auth email/password только для доктора.
- Админка проверяет роль `doctor_admin` перед редактированием контента.
- Технический bugfix разрешен без изменения specs, если он не меняет сценарий, данные, маршруты или бизнес-правила.

Вне specs:

- нет.

## Что делаем

1. Найти места создания browser Supabase client.
2. Сделать создание browser client стабильным и переиспользуемым для одного auth `storageKey`.
3. Проверить сборку и отсутствие лишних мест создания client.

## Что не делаем в этом плане

- Не меняем Supabase Auth, RLS policies, migrations и env-переменные.
- Не добавляем новые роли, маршруты, формы, заявки, оплату или пользовательскую авторизацию.
- Не меняем публичный сценарий `/`.

## Проверка

Команды:

```bash
npm run build
git diff --check
rg -n "createBrowserSupabaseClient|createClient" lib components app
```

Ручная проверка:

- открыть `/admin` в dev-режиме и проверить, что warning о нескольких `GoTrueClient` больше не появляется при обычном открытии страницы.

## Критерии готовности

- Для одного Supabase auth `storageKey` browser code переиспользует один экземпляр Supabase client.
- Сценарий входа и выхода из админки не изменен.
- Проверки выполнены или причина невозможности проверки записана.

## Результат проверки

- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- `rg -n "createBrowserSupabaseClient|createClient" lib components app` подтвердил, что `createClient` вызывается только в `lib/supabase/browserClient.ts`, а `components/admin/AdminAccess.tsx` использует общий helper.
- Свежий dev-сервер был запущен на `http://localhost:3000`; старый браузерный warning в логе пришел от уже открытого browser context после HMR и не является чистой проверкой новой вкладки.

## Измененные файлы

- `lib/supabase/browserClient.ts`
- `Work plans/Завершенные/057-ispravit-povtorniy-supabase-browser-client.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Исправить повторное создание Supabase browser client"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
