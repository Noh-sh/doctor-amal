# План 064: `NEXT_PUBLIC` env для Supabase

## Статус

Завершен.

## Цель

Перевести шаблон env и код подключения Supabase на понятную схему с `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DOCTOR_SUPABASE_URL` и `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`, не ломая текущую структуру проекта и сохраняя обратную совместимость.

## Подтверждение specs

Основание:

- пользователь подтвердил новое требование после предупреждения, что текущие specs не содержали `NEXT_PUBLIC_SUPABASE_*`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/supabase-dashboard-setup.md`;
- `spec/technical-specs/admin-auth-and-access.md`.

Подтверждено:

- нужно добавить `NEXT_PUBLIC_SUPABASE_URL`;
- нужно добавить `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`;
- нужно сохранить `DOCTOR_SUPABASE_URL`;
- нужно сохранить `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` только как server-only secret;
- структура проекта не должна ломаться.

Вне specs:

- нет после подтверждения пользователя.

## Что делаем

1. Обновить specs под новую env-схему.
2. Обновить `.env.example`.
3. Обновить чтение env в публичном data source и `/admin`.
4. Оставить fallback на старые `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY`.
5. Выполнить проверку.
6. Закрыть план и обновить roadmap.

## Что не делаем в этом плане

- Не добавляем использование service role key в код.
- Не меняем `.env.local`.
- Не меняем RLS, migrations или структуру таблиц.
- Не меняем пользовательские сценарии `/` и `/admin`.

## Проверка

Команды:

```bash
rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE|process\\.env" .env.example app data lib spec/technical-specs
npm run build
git diff --check
```

## Критерии готовности

- `.env.example` содержит новую схему env.
- Код использует `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` как приоритетные значения.
- Старые `DOCTOR_SUPABASE_*` ключи остаются fallback и не ломают существующую локальную настройку.
- Service role key не используется кодом.

## Результат проверки

- `rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE|process\\.env" .env.example app data lib spec/technical-specs` выполнен успешно.
- Поиск подтвердил, что `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` добавлены в `.env.example`, specs и код.
- Поиск подтвердил, что `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` не используется кодом.
- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `.env.example`
- `app/admin/page.tsx`
- `data/taplink-page-source.ts`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `Work plans/Завершенные/064-next-public-supabase-env.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .env.example app/admin/page.tsx data/taplink-page-source.ts spec/technical-specs/supabase-content-source.md spec/technical-specs/supabase-dashboard-setup.md spec/technical-specs/admin-auth-and-access.md "Work plans/Завершенные/064-next-public-supabase-env.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить NEXT_PUBLIC env для Supabase"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
