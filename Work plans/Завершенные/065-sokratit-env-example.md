# План 065: Сократить `.env.example`

## Статус

Завершен.

## Цель

Убрать лишние пояснения из `.env.example`, оставив короткий шаблон нужных env-переменных Supabase.

## Подтверждение specs

Основание:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/admin-auth-and-access.md`

Подтверждено:

- env-схема включает `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DOCTOR_SUPABASE_URL` и server-only `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`;
- service role key нельзя добавлять в `NEXT_PUBLIC_*` и frontend/browser client;
- legacy `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY` могут оставаться fallback.

Вне specs:

- нет.

## Что делаем

1. Сократить комментарии в `.env.example`.
2. Оставить все текущие env-переменные без изменения имен.
3. Выполнить проверку.

## Что не делаем в этом плане

- Не меняем код.
- Не меняем `.env.local`.
- Не меняем specs.

## Проверка

Команды:

```bash
rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE" .env.example
git diff --check
```

## Критерии готовности

- `.env.example` короткий и содержит нужные переменные.
- В файле остается предупреждение про service role key.

## Результат проверки

- `rg -n "NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE" .env.example` выполнен успешно.
- Проверено, что все нужные env-переменные остались в `.env.example`.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `.env.example`
- `Work plans/Завершенные/065-sokratit-env-example.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .env.example "Work plans/Завершенные/065-sokratit-env-example.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Сократить env example"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
