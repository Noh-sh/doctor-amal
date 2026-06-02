# План 048: Проектные env-названия Supabase

## Статус

Завершен.

## Цель

Переименовать Supabase env-переменные в проектные имена `DOCTOR_SUPABASE_*` и добавить понятное описание в `.env.example`.

## Подтверждение specs

Прочитано:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/change-management.md`
- `data/taplink-page-source.ts`
- `.env.example`

Подтверждено:

- Supabase используется только как источник публичного контента страницы;
- чтение выполняется серверной страницей Next.js, поэтому `NEXT_PUBLIC_*` не обязателен для текущего кода;
- service role key нельзя использовать во frontend и нельзя добавлять в `NEXT_PUBLIC_*`;
- service role key может быть описан только как server-side переменная для будущих server-only задач, но текущий код его не использует.

## Что делаем

1. Обновить specs под `DOCTOR_SUPABASE_URL` и `DOCTOR_SUPABASE_PUBLISHABLE_KEY`.
2. Обновить `.env.local`.
3. Обновить `.env.example` с пояснениями.
4. Обновить код чтения env-переменных.
5. Выполнить проверку.

## Что не делаем

- Не добавляем реальный service role key.
- Не используем service role key в коде.
- Не добавляем запись в Supabase из приложения.
- Не добавляем заявки, оплату, пользователей, заказы, MCP или админку.

## Проверка

Команды:

```bash
npm run build
git diff --check
```

Ручная проверка:

- `.env.local` игнорируется git;
- `.env.example` не содержит реальных ключей;
- service role key не используется в коде.

## Результат проверки

- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- `git check-ignore -v .env.local` подтвердил, что `.env.local` игнорируется через `.gitignore`.
- `.env.example` не содержит реальных ключей.
- Код читает `DOCTOR_SUPABASE_URL`, `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и optional `DOCTOR_SUPABASE_ANON_KEY`.
- `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` описан только в `.env.example`; текущий код его не использует.

## Измененные файлы

- `.env.example`
- `.env.local`
- `data/taplink-page-source.ts`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `Work plans/Завершенные/044-supabase-action-plan.md`
- `Work plans/Завершенные/047-supabase-env-and-safe-data-source.md`
- `Work plans/Завершенные/048-project-env-names-for-supabase.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Git commit и push выполнять только после отдельного подтверждения пользователя.
