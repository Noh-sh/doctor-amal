# План 066: Правильная Supabase env-схема

## Статус

Завершен.

## Цель

Привести Supabase env-схему к чистому правилу Next.js + Supabase: public env через `NEXT_PUBLIC_SUPABASE_*`, service role только server-only, без legacy fallback в шаблоне и коде.

## Подтверждение specs

Основание:

- пользователь подтвердил, что хочет правильную схему по правилам;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/supabase-dashboard-setup.md`;
- `spec/technical-specs/admin-auth-and-access.md`.

Подтверждено:

- использовать `NEXT_PUBLIC_SUPABASE_URL`;
- использовать `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`;
- использовать `DOCTOR_SUPABASE_URL` как server-side/project URL;
- использовать `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` только как server-only secret;
- не использовать service role key во frontend/browser client;
- убрать legacy fallback из `.env.example` и текущего кода.

Вне specs:

- нет после подтверждения пользователя.

## Что делаем

1. Обновить specs: убрать legacy fallback из текущей env-схемы.
2. Сократить `.env.example` до четырех переменных.
3. Обновить код чтения Supabase env без legacy key fallback.
4. Выполнить проверку.
5. Закрыть план и обновить roadmap.

## Что не делаем в этом плане

- Не меняем `.env.local`.
- Не добавляем использование service role key в код.
- Не меняем RLS, migrations или таблицы.
- Не меняем пользовательские сценарии.

## Проверка

Команды:

```bash
rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE|DOCTOR_SUPABASE_ANON_KEY|DOCTOR_SUPABASE_PUBLISHABLE_KEY|process\\.env" .env.example app data lib spec/technical-specs
npm run build
git diff --check
```

## Критерии готовности

- `.env.example` содержит только новую чистую схему.
- Код не читает `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY`.
- `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` не используется кодом.
- Сборка проходит.

## Результат проверки

- `rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE|DOCTOR_SUPABASE_ANON_KEY|DOCTOR_SUPABASE_PUBLISHABLE_KEY|process\\.env" .env.example app data lib spec/technical-specs` выполнен успешно.
- Поиск подтвердил, что `.env.example` содержит чистую схему без `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY`.
- Поиск подтвердил, что код не читает `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY`.
- Поиск подтвердил, что `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` не используется кодом.
- `npm run build` выполнен успешно.
- `git diff --check` будет выполнен после переноса плана в `Work plans/Завершенные/`.

## Измененные файлы

- `.env.example`
- `app/admin/page.tsx`
- `data/taplink-page-source.ts`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `Work plans/Завершенные/066-pravilnaya-supabase-env-schema.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .env.example app/admin/page.tsx data/taplink-page-source.ts spec/technical-specs/supabase-content-source.md spec/technical-specs/supabase-dashboard-setup.md "Work plans/Завершенные/066-pravilnaya-supabase-env-schema.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Привести Supabase env к правильной схеме"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
