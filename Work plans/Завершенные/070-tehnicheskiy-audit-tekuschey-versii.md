# План 070: Технический аудит текущей версии

## Статус

Завершен.

## Цель

Провести полный технический аудит текущей online-версии Doctor Amal перед изменениями кода: сверить приложение со specs, найти реальные дефекты и риски, классифицировать их по severity и подготовить отдельные планы исправлений только для подтвержденных проблем.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/global-spec.md`;
- `spec/functional-map.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/routing-and-ui.md`;
- `spec/technical-specs/data-model.md`;
- `spec/technical-specs/local-storage.md`;
- `spec/technical-specs/requests-and-validation.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/feature-specs/medical-content-rules.md`.

Подтверждено:

- аудит текущей версии входит в этап 1 мастер-плана `068`;
- публичный маршрут текущей версии — `/`;
- защищенный маршрут админки — `/admin`;
- Supabase является основным источником контента с локальным fallback;
- публичная страница не собирает данные пользователя;
- админка доступна только активному `doctor_admin`;
- bugs можно фиксировать отдельными планами, если они возвращают код к описанному в specs поведению.

Вне specs:

- новых функций нет.

## Что делаем

1. Сверить код с `implementation-checklist.md`.
2. Проверить структуру маршрутов `/`, `/admin`, 404, loading и error.
3. Проверить data layer, Supabase mapping и локальный fallback.
4. Проверить компоненты публичной Taplink-страницы.
5. Проверить компоненты админки, Auth flow и разрешенные операции.
6. Проверить отсутствие старых маршрутов, форм, заявок, оплаты, пользовательского `localStorage` и сбора данных.
7. Проверить медицинские тексты и пользовательские ожидания.
8. Проверить scripts, зависимости и доступные проверки.
9. Выполнить `npm run build` и `git diff --check`.
10. Составить findings по severity: `critical`, `high`, `medium`, `low`.
11. Для подтвержденных проблем подготовить список отдельных bugfix-планов.

## Что не делаем в этом плане

- Не меняем код приложения.
- Не меняем specs продукта.
- Не меняем Supabase migrations или remote database.
- Не добавляем тестовую инфраструктуру.
- Не меняем дизайн.
- Не выполняем commit без подтверждения пользователя.
- Не выполняем push без отдельного подтверждения пользователя.

## Проверка

Команды:

```bash
npm run build
git diff --check
rg -n "localStorage|sessionStorage|fetch\\(|/courses|/articles|/request|payment|checkout|diagnos|диагноз|оплата|заявка" app components data lib spec
```

Ручная проверка:

- каждый finding привязан к файлу и строке;
- не смешивать баги с будущими функциями;
- не считать отсутствие неподтвержденной функции дефектом;
- если проблема требует нового поведения, вынести ее как вопрос, а не как bugfix.

## Критерии готовности

- Код сверено с актуальными specs и checklist.
- Найденные риски классифицированы по severity.
- Нет неизвестных critical/high дефектов без решения.
- Для каждого подтвержденного bugfix есть рекомендация отдельного плана.
- Проверки `npm run build` и `git diff --check` выполнены.
- Результат записан в этот план.

## Результат проверки

- Код сверено с актуальными specs и `implementation-checklist.md`.
- В `app/` найдены только текущие маршруты и служебные состояния: `/`, `/admin`, `not-found`, `loading`, `error`.
- В коде приложения не найден пользовательский `localStorage` или `sessionStorage`.
- В коде приложения не найдено использование `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`, `service_role`, `sb_secret` или похожих secret keys.
- Внешние ссылки и `Купить` открываются с `target="_blank"` и `rel="noreferrer"`.
- Публичная страница использует Supabase с `revalidate: 30` и локальный fallback.
- Админка проверяет Supabase Auth session и активную роль `doctor_admin` перед показом редактора.
- Admin editor не содержит загрузку фото, физическое удаление курсов, управление Auth users, оплату, заявки или покупателей.
- `npm run build` выполнен успешно.
- `npx tsc --noEmit` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- `npm run lint` не выполнен из-за нерабочего script `next lint`.
- Supabase MCP-проверка remote schema/RLS не выполнена: MCP вернул `OAuth authorization required`.

## Findings

### Critical

Нет.

### High

Нет.

### Medium

1. Нерабочий lint script.
   - Файл: `package.json`
   - Команда: `npm run lint`
   - Фактический результат: `next lint` завершается ошибкой `Invalid project directory provided, no such directory: .../doctor-amal/lint`.
   - Риск: нет обязательной lint-проверки перед deploy, quality gate неполный.
   - Рекомендация: отдельный план для настройки актуального lint/typecheck quality gate под текущий Next.js.

2. TypeScript check создает неигнорируемый служебный файл.
   - Файлы:
     - `tsconfig.json`
     - `.gitignore`
   - Фактический результат: `npx tsc --noEmit` прошел успешно, но создал untracked `tsconfig.tsbuildinfo`.
   - Риск: служебный файл легко случайно добавить в commit.
   - Рекомендация: включить это в план настройки quality gate: либо игнорировать `*.tsbuildinfo`, либо изменить настройки typecheck.

3. Remote Supabase/RLS не удалось проверить через MCP.
   - Spec: `spec/technical-specs/supabase-mcp-access.md`
   - Фактический результат: MCP вернул `OAuth authorization required`.
   - Риск: локальные migrations выглядят корректно, но remote schema/RLS в этом аудите не подтверждены.
   - Рекомендация: отдельный этап безопасности из мастер-плана `068`: восстановить MCP auth или проверить RLS другим разрешенным read-only способом.

### Low

1. Устаревшая формулировка `первая версия` осталась в UI.
   - Файлы:
     - `app/not-found.tsx:9`
     - `components/taplink/TaplinkPage.tsx:42`
   - Риск: не ломает сценарий, но противоречит обновленным specs и может быть видимо пользователю на 404 или assistive technologies.
   - Рекомендация: отдельный мелкий bugfix-план заменить на `текущая версия` или нейтральную формулировку.

2. В актуальных specs/user stories остались формулировки `локальная страница`.
   - Примеры:
     - `spec/functional-map.md:145`
     - `spec/functional-map.md:226`
     - `spec/user-stories/core-user-stories.md:11`
     - `spec/feature-specs/external-links.md:5`
   - Риск: документация частично смешивает старую локальную терминологию с текущей online-версией.
   - Рекомендация: отдельный documentation bugfix-план без изменения поведения.

3. Ошибки сохранения в админке выводятся через `role="status"`, а не `role="alert"`.
   - Файл: `components/admin/AdminContentEditor.tsx:322`
   - Риск: для screen reader ошибка сохранения может быть объявлена как обычный статус, а не как срочное сообщение.
   - Рекомендация: отдельный accessibility bugfix-план.

### Open Questions

1. Нужна ли автоматическая проверка формата URL для Telegram-ссылки и внешних ссылок сверх HTML `type="url"` и RLS/check constraints.
   - Текущий код проверяет обязательность URL для активной ссылки, но не ограничивает платформу на уровне UI.
   - Если требуется строгая platform validation, это нужно уточнить в specs перед кодом.

## Рекомендуемые следующие планы

1. `071-ispravit-teksty-versii-i-lokalnuyu-terminologiyu.md` — убрать `первая версия` из UI и `локальная страница` из актуальных specs/user stories без изменения смысла.
2. `072-nastroit-quality-gate-lint-typecheck.md` — заменить нерабочий `next lint`, добавить явный `typecheck`, обработать `tsconfig.tsbuildinfo` и единый quality-check script.
3. `073-accessibility-feedback-adminki.md` — исправить role для error feedback в админке.
4. `074-proverka-supabase-rls-i-mcp-auth.md` — восстановить read-only MCP/SQL-проверку remote Supabase и подтвердить RLS.

## Измененные файлы

- `Work plans/Активные/070-tehnicheskiy-audit-tekuschey-versii.md`

## Git после проверки

После успешной проверки подготовить commit только после подтверждения пользователя.

Push на GitHub выполнять только после отдельного подтверждения пользователя.
