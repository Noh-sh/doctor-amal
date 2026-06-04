# План 062: Расписать `.env.example`

## Статус

Завершен.

## Цель

Сделать `.env.example` понятным шаблоном для локальной настройки Supabase-переменных проекта Doctor Amal без добавления новых env-переменных и без раскрытия секретов.

## Подтверждение specs

Основание:

- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-dashboard-setup.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- для публичного чтения нужны `DOCTOR_SUPABASE_URL` и `DOCTOR_SUPABASE_PUBLISHABLE_KEY`;
- legacy `DOCTOR_SUPABASE_ANON_KEY` допустим, если dashboard показывает legacy anon key;
- `.env.local` создается локально и не коммитится;
- secret/service role key не нужен текущему коду;
- service role key нельзя добавлять в `NEXT_PUBLIC_*`, отправлять в чат, коммитить или использовать во frontend-коде;
- текущий код не должен использовать `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`.

Вне specs:

- нет.

## Что делаем

1. Проверить фактические env-переменные в коде.
2. Расширить `.env.example` пояснениями по каждой разрешенной переменной.
3. Выполнить проверку, достаточную для документационного изменения.
4. Записать результат проверки в план.
5. После завершения перенести план в `Work plans/Завершенные/` и обновить `Roadmap/`.

## Что не делаем в этом плане

- Не добавляем новые env-переменные.
- Не меняем `.env.local`.
- Не добавляем реальные ключи, URL или токены.
- Не меняем код подключения Supabase.

## Проверка

Команды:

```bash
rg -n "DOCTOR_SUPABASE_|NEXT_PUBLIC_|SERVICE_ROLE|process\\.env" .env.example data app lib spec/technical-specs
npm run build
```

Ручная проверка:

- `.env.example` не содержит реальных секретов;
- список env-переменных соответствует specs и коду.

## Критерии готовности

- `.env.example` подробно описывает все разрешенные env-переменные текущего проекта.
- В шаблоне нет неподтвержденных переменных.
- Проверка выполнена и записана в план.

## Результат проверки

- `rg -n "DOCTOR_SUPABASE_|NEXT_PUBLIC_|SERVICE_ROLE|process\\.env" .env.example data app lib spec/technical-specs` выполнен успешно.
- Поиск подтвердил, что текущий код использует `DOCTOR_SUPABASE_URL`, `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и fallback `DOCTOR_SUPABASE_ANON_KEY`.
- Поиск подтвердил, что `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` текущим кодом не используется.
- `.env.example` не содержит реальных секретов.
- `npm run build` выполнен успешно.

## Измененные файлы

- `.env.example`
- `Work plans/Завершенные/062-raspisat-env-example.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .env.example "Work plans/Завершенные/062-raspisat-env-example.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Расписать пример env-переменных Supabase"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
