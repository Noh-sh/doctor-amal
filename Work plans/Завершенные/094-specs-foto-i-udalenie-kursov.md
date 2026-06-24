# План 094: Specs загрузки фото и удаления курсов

## Статус

Завершен.

## Цель

Подготовить specs для новой админской возможности: доктор может заменить фото через `/admin` и убрать курс через безопасное удаление/архивирование, без изменения публичного Taplink-сценария.

## Подтверждение specs

Основание:

- `AGENTS.md`;
- `.agents/skills/doctor-amal-specs/SKILL.md`;
- `.agents/skills/doctor-amal-specs/references/spec-map.md`;
- `spec/technical-specs/future-extension-plan.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/data-model.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- в текущей версии загрузка/замена фото через админку и удаление курсов были вне specs;
- владелец проекта подтвердил начало нового этапа;
- перед реализацией нужно обновить feature specs, technical specs и user stories;
- публичный сценарий `/` остается прежним.

Вне specs до обновления:

- фактическая реализация загрузки фото;
- фактическая реализация удаления/архивирования курсов;
- Supabase Storage bucket, Storage policies, новые migrations.

## Что делаем

1. Описать подтвержденный UX загрузки и замены фото доктора через `/admin`.
2. Описать безопасное удаление курса как архивирование/soft delete, а не безвозвратное физическое удаление.
3. Обновить связанные specs и карту specs.
4. Зафиксировать, что реализация кода начнется только после принятия specs.

## Что не делаем в этом плане

- Не меняем код приложения.
- Не создаем Supabase migrations.
- Не меняем remote Supabase.
- Не выполняем commit/push без отдельной просьбы пользователя.

## Проверка

Команды:

```bash
git diff --check
```

Ручная проверка:

- specs не противоречат текущим границам проекта;
- новое поведение явно отделено от будущих неподтвержденных функций;
- физическое удаление данных не появляется без отдельного требования.

## Критерии готовности

- Specs описывают фото через админку.
- Specs описывают безопасное удаление/архивирование курсов.
- Нет противоречий между feature specs, technical specs и future plan.
- Результат проверки записан в план.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- Добавлены feature specs `admin-photo-management.md` и `admin-course-removal.md`.
- Верхние specs больше не говорят, что загрузка фото через админку вне текущей версии.
- Удаление курса описано как safe soft delete через технический признак, например `deleted_at`.
- Физическое удаление row из Supabase через UI и восстановление удаленных курсов через UI оставлены вне текущего этапа.
- Реализация кода, Supabase Storage bucket, policies и migrations оставлены для следующего плана.

## Измененные файлы

- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/admin-content-editing.md`
- `spec/feature-specs/admin-photo-management.md`
- `spec/feature-specs/admin-course-removal.md`
- `spec/user-stories/admin-user-stories.md`
- `spec/technical-specs/README.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/technical-specs/future-extension-plan.md`
- `Work plans/Завершенные/094-specs-foto-i-udalenie-kursov.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec .agents/skills/doctor-amal-specs/references/spec-map.md Roadmap/chronology.md Roadmap/project-roadmap.md "Work plans/Завершенные/094-specs-foto-i-udalenie-kursov.md"
git commit -m "Описать загрузку фото и удаление курсов в specs"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
