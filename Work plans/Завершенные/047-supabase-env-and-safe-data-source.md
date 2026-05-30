# План 047: Env и безопасный источник данных Supabase

## Статус

Завершен.

## Цель

Добавить локальные env-переменные Supabase и подготовить код к чтению контента из Supabase без поломки сайта, если таблицы еще не созданы.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/local-storage.md`
- `spec/technical-specs/change-management.md`
- `data/taplink-page.ts`
- `domain/taplink.ts`

Подтверждено:

- Supabase используется только как источник публичного контента страницы;
- UI должен получать `TaplinkPageData`;
- если Supabase недоступен или таблицы еще не созданы, допустим fallback на подтвержденные локальные данные;
- secret/service role key не используется;
- пользовательские данные, заявки, оплата, заказы, auth покупателей, аналитика, админка и MCP не добавляются.

## Что делаем

1. Добавить `.env.local` с `DOCTOR_SUPABASE_URL` и `DOCTOR_SUPABASE_PUBLISHABLE_KEY`.
2. Добавить `.env.example` без реальных ключей.
3. Добавить data-provider, который пробует получить данные из Supabase.
4. Добавить mapper из Supabase rows в `TaplinkPageData`.
5. Оставить fallback на `taplinkPageData`.
6. Подключить `app/page.tsx` к новому data-provider.
7. Выполнить проверку.

## Что не делаем

- Не создаем таблицы в Supabase.
- Не выполняем SQL.
- Не устанавливаем зависимости.
- Не добавляем auth, заявки, оплату, заказы, MCP или админку.
- Не используем secret/service role key.

## Проверка

Команды:

```bash
npm run build
git diff --check
```

Ручная проверка:

- `.env.local` не должен попасть в git;
- build должен проходить даже до создания таблиц Supabase;
- UI продолжает получать `TaplinkPageData`;
- нет сбора пользовательских данных.

## Результат проверки

- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- `git check-ignore -v .env.local` подтвердил, что `.env.local` игнорируется через `.gitignore`.
- Проверено, что в коде нет `service_role`, `sb_secret` и `Authorization: Bearer` с publishable key.
- Build прошел до создания таблиц Supabase, значит fallback на локальные данные работает.
- UI продолжает получать `TaplinkPageData`.

## Измененные файлы

- `.env.example`
- `.env.local`
- `app/page.tsx`
- `data/taplink-page-source.ts`
- `Work plans/Завершенные/047-supabase-env-and-safe-data-source.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Git commit и push выполнять только после отдельного подтверждения пользователя.
