# План 069: Этап 0 - чистая базовая точка

## Статус

Завершен.

## Цель

Зафиксировать понятную базовую точку перед движением к оценке 10/10: проверить изменения specs `067`, мастер-план `068`, отсутствие секретов и готовность отдельной ветки для последующих этапов.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/admin-auth-and-access.md`.

Подтверждено:

- перед следующими этапами нужно зафиксировать чистую базовую точку;
- commit выполняется только после проверки и подтверждения пользователя;
- push выполняется только после отдельного подтверждения пользователя;
- секреты не должны попадать в git;
- `.env.local` не коммитится.

Вне specs:

- нет.

## Что делаем

1. Создать отдельную ветку для этапа качества.
2. Проверить рабочее дерево и список измененных файлов.
3. Проверить diff на технические ошибки.
4. Проверить отсутствие секретов и `.env.local` в git.
5. Выполнить production build.
6. Подготовить список файлов для commit `067` и отдельного commit `068/069`.
7. Запросить подтверждение пользователя перед commit.

## Что не делаем в этом плане

- Не меняем код приложения.
- Не меняем Supabase migrations или remote database.
- Не добавляем тестовую инфраструктуру.
- Не меняем дизайн.
- Не выполняем commit без подтверждения пользователя.
- Не выполняем push без отдельного подтверждения пользователя.

## Проверка

Команды:

```bash
git status --short --branch
git diff --check
git ls-files .env.local
rg -n "SUPABASE_SERVICE_ROLE|service_role|sb_secret|eyJ|NEXT_PUBLIC_SUPABASE|DOCTOR_SUPABASE" . --glob '!node_modules/**' --glob '!.next/**' --glob '!.git/**'
npm run build
```

Ручная проверка:

- изменения `067` и `068/069` разделены по смыслу;
- `.env.local` не отслеживается git;
- в specs, roadmap и work plans не записаны реальные ключи;
- ветка создана от актуального `main`.

## Критерии готовности

- Ветка `quality/to-10-baseline` создана.
- `git diff --check` проходит.
- `npm run build` проходит.
- `.env.local` не отслеживается git.
- В изменениях не найдено реальных Supabase secret keys.
- Пользователю показан понятный следующий git-шаг.

## Результат проверки

- Ветка `quality/to-10-baseline` создана от текущего `main`.
- `git status --short --branch` подтвердил, что изменения `067`, `068` и `069` находятся в рабочем дереве новой ветки.
- `git diff --check` выполнен без ошибок.
- `git ls-files .env.local` не вернул файлов: `.env.local` не отслеживается git.
- `git ls-files | rg '(^|/)\\.env(\\.|$)|env.local'` вернул только `.env.example`.
- Поиск по `SUPABASE_SERVICE_ROLE`, `service_role`, `sb_secret`, `eyJ`, `NEXT_PUBLIC_SUPABASE`, `DOCTOR_SUPABASE` нашел только кодовые обращения к env, specs, roadmap и work plans; реальные ключи в выводе не обнаружены.
- `npm run build` выполнен успешно.
- Следующий шаг требует подтверждения пользователя: выполнить commit с разделением `067` и `068/069`.

## Измененные файлы

- `Work plans/Активные/069-etap-0-chistaya-bazovaya-tochka.md`

## Git после проверки

После успешной проверки запросить подтверждение пользователя на commit.

Рекомендуемое разделение:

```bash
git add .agents/skills/doctor-amal-specs/references/spec-map.md Roadmap/chronology.md Roadmap/project-roadmap.md spec "Work plans/Завершенные/067-aktualizaciya-i-utochnenie-specs.md"
git commit -m "Актуализировать specs под текущую online-версию"

git add "Work plans/Активные/068-master-plan-do-10-iz-10.md" "Work plans/Активные/069-etap-0-chistaya-bazovaya-tochka.md"
git commit -m "Добавить план доведения проекта до 10 из 10"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
