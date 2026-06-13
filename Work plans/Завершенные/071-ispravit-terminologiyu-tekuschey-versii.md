# План 071: Исправить терминологию текущей версии

## Статус

Завершен.

## Цель

Убрать остаточные формулировки старого локального этапа из UI и актуальных specs/user stories без изменения поведения проекта.

## Подтверждение specs

Основание:

- `Work plans/Завершенные/070-tehnicheskiy-audit-tekuschey-versii.md`;
- `spec/global-spec.md`;
- `spec/functional-map.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- текущая версия является online Taplink-страницей с Supabase и `/admin`;
- исправление устаревшей терминологии без изменения смысла допустимо без новых продуктовых specs;
- публичный сценарий, маршруты, данные, права доступа и бизнес-правила не меняются.

Вне specs:

- нет.

## Что делаем

1. Заменить `первая версия` в UI на актуальную или нейтральную формулировку.
2. Заменить `локальная страница` в актуальных specs/user stories на `страница`, `публичная страница` или `online-страница` по контексту.
3. Проверить, что не изменились сценарии, маршруты, данные, валидация или бизнес-правила.
4. Выполнить проверки.

## Что не делаем в этом плане

- Не меняем кодовую логику.
- Не меняем дизайн.
- Не меняем Supabase migrations или remote database.
- Не добавляем функции.
- Не исправляем lint script, accessibility feedback или MCP auth.

## Проверка

Команды:

```bash
rg -n "первая версия|первой версии|локальная страница|локальную страницу|локальной страницы|одну локальную|локальную web" app components data lib spec/global-spec.md spec/functional-map.md spec/feature-specs spec/user-stories spec/technical-specs --glob '!**/future-*'
npm run build
git diff --check
```

Ручная проверка:

- терминология соответствует текущей online-версии;
- будущие specs не превращены в текущие требования;
- поведение приложения не изменено.

## Критерии готовности

- В UI нет `первая версия`.
- В актуальных specs/user stories нет устаревшего смысла `локальная страница`.
- Сборка проходит.
- `git diff --check` проходит.

## Результат проверки

- В UI заменены остаточные формулировки `первая версия` на `текущая версия`.
- В актуальных specs/user stories заменены формулировки `локальная страница` на `публичная страница` или `публичная online-страница` по контексту.
- Поведение приложения, маршруты, данные, валидация и бизнес-правила не менялись.
- Поиск по старым формулировкам в актуальных файлах не нашел совпадений.
- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `app/not-found.tsx`
- `components/taplink/TaplinkPage.tsx`
- `spec/functional-map.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/external-links.md`
- `spec/feature-specs/medical-content-rules.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/user-stories/core-user-stories.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/user-stories/personas.md`
- `Work plans/Завершенные/071-ispravit-terminologiyu-tekuschey-versii.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить commit только после подтверждения пользователя.

Push на GitHub выполнять только после отдельного подтверждения пользователя.
