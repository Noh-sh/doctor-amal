# План 073: Accessibility feedback админки

## Статус

Завершен.

## Цель

Исправить accessibility feedback в админке: ошибки сохранения должны объявляться как alert, а успешные статусы могут оставаться status.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `Work plans/Завершенные/070-tehnicheskiy-audit-tekuschey-versii.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- интерактивные элементы должны быть доступны с клавиатуры и понятны пользователю;
- ошибки админки должны показываться понятным русским текстом;
- bugfix можно делать без изменения specs, если он возвращает код к уже описанному поведению;
- текущая проблема найдена аудитом: error feedback в `AdminContentEditor` использует `role="status"` вместо `role="alert"`.

Вне specs:

- нет.

## Что делаем

1. Разделить aria role для feedback в `AdminContentEditor`:
   - success: `role="status"`;
   - error: `role="alert"`.
2. Не менять тексты, формы, сохранение, RLS или бизнес-логику.
3. Выполнить quality gate.

## Что не делаем в этом плане

- Не меняем дизайн.
- Не меняем Supabase migrations или remote database.
- Не меняем auth flow.
- Не добавляем новые admin-функции.
- Не исправляем MCP/RLS проверку.

## Проверка

Команды:

```bash
npm run quality
git diff --check
```

Ручная проверка:

- success feedback остается обычным статусом;
- error feedback получает `role="alert"`;
- поведение сохранения не меняется.

## Критерии готовности

- Ошибки сохранения в admin editor объявляются через `role="alert"`.
- Успешное сохранение объявляется через `role="status"`.
- `npm run quality` проходит.
- `git diff --check` проходит.

## Результат проверки

- В `AdminContentEditor` feedback теперь использует разные роли:
  - success: `role="status"`;
  - error: `role="alert"`.
- Логика сохранения, тексты, формы, auth flow и Supabase операции не менялись.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `components/admin/AdminContentEditor.tsx`
- `Work plans/Завершенные/073-accessibility-feedback-adminki.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить commit только после подтверждения пользователя.

Push на GitHub выполнять только после отдельного подтверждения пользователя.
