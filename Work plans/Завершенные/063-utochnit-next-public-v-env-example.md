# План 063: Уточнить `NEXT_PUBLIC` в `.env.example`

## Статус

Завершен.

## Цель

Сделать в `.env.example` явно видимым различие между публичным ключом Supabase и `NEXT_PUBLIC_*` переменными Next.js.

## Подтверждение specs

Основание:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/admin-auth-and-access.md`

Подтверждено:

- проект использует `DOCTOR_SUPABASE_URL`;
- предпочтительный публичный ключ Supabase хранится в `DOCTOR_SUPABASE_PUBLISHABLE_KEY`;
- legacy fallback хранится в `DOCTOR_SUPABASE_ANON_KEY`;
- secret/service role key нельзя добавлять в `NEXT_PUBLIC_*`;
- текущий код не должен использовать `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`.

Вне specs:

- добавление рабочих `NEXT_PUBLIC_*` переменных в шаблон не подтверждено.

## Что делаем

1. Добавить пояснение, что публичный Supabase key не означает env-переменную `NEXT_PUBLIC_*`.
2. Явно разделить public Supabase keys и server-only secret key.
3. Выполнить проверку `.env.example`.

## Что не делаем в этом плане

- Не добавляем `NEXT_PUBLIC_*` как рабочие переменные.
- Не меняем `.env.local`.
- Не меняем код подключения Supabase.

## Проверка

Команды:

```bash
rg -n "NEXT_PUBLIC|public|server-only|DOCTOR_SUPABASE" .env.example
git diff --check
```

## Критерии готовности

- В `.env.example` явно видно, почему `NEXT_PUBLIC_*` не используется.
- В `.env.example` явно видно, какие переменные являются публичными ключами Supabase, а какая server-only.

## Результат проверки

- `rg -n "NEXT_PUBLIC|public|server-only|DOCTOR_SUPABASE" .env.example` выполнен успешно.
- Проверено, что `.env.example` явно объясняет различие между public Supabase key и `NEXT_PUBLIC_*`.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `.env.example`
- `Work plans/Завершенные/063-utochnit-next-public-v-env-example.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .env.example "Work plans/Завершенные/063-utochnit-next-public-v-env-example.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Уточнить NEXT_PUBLIC в env example"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
