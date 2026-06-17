# План 086: Проверка соответствия планов 070-082

## Статус

Завершен.

## Цель

Проверить, что фактическое состояние проекта соответствует завершенным планам `070-082`, потому что часть работы могла быть отменена до commit во время проблемы с Codex.

## Подтверждение specs

Основание:

- `AGENTS.md`;
- `.agents/skills/doctor-amal-specs/SKILL.md`;
- `.agents/skills/doctor-amal-specs/references/spec-map.md`;
- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`.

Подтверждено:

- можно выполнять технический аудит и сверку завершенных work plans без изменения продуктового поведения;
- нужно проверять соответствие specs, кода, migrations, quality gate, RLS/security, UI/accessibility и production readiness;
- если найдено расхождение между завершенным планом и кодом, нужно зафиксировать findings и не исправлять без отдельного подтверждения или отдельного bugfix-плана.

Вне specs:

- новые функции;
- изменение production-контента;
- изменение Supabase schema/RLS/data;
- удаление Vercel project;
- commit/push без отдельной просьбы пользователя.

## Что делаем

1. Прочитать завершенные планы `070-082`.
2. Извлечь из них ожидаемые изменения и проверки.
3. Сверить с текущими файлами проекта.
4. Выполнить безопасные локальные проверки.
5. При доступности выполнить read-only Supabase/Vercel inspection без секретов.
6. Записать результат по каждому плану: совпадает, частично совпадает или есть расхождение.

## Что не делаем

- Не исправляем найденные расхождения в этом плане.
- Не меняем продуктовый код.
- Не меняем specs.
- Не выполняем write-операции в Supabase.
- Не записываем секреты.

## Проверка

Команды:

```bash
git status --short --branch
npm run quality
git diff --check
git ls-files '.env*' 'supabase/.temp/*'
```

Дополнительные проверки выбираются по findings из планов `070-082`.

## Критерии готовности

- каждый план `070-082` получил статус сверки;
- critical/high расхождения, если есть, явно названы;
- пользователь понимает, что нужно восстановить отдельным bugfix-планом, если что-то действительно откатилось.

## Результат проверки

### Общий результат

Фактическое состояние проекта соответствует завершенным планам `070-082`. Признаков того, что изменения этих планов были отменены до commit и не попали в проект, не найдено.

Critical/high расхождений не найдено.

### Выполненные проверки

- `git status --short --branch`: ветка `ops/production-url-vercel-check...origin/ops/production-url-vercel-check`, до плана рабочее дерево было чистым.
- `npm run quality` выполнен успешно:
  - `npm run lint` прошел;
  - `npm run typecheck` прошел;
  - `npm run build` прошел;
  - production build сгенерировал `/`, `/_not-found`, `/admin`;
  - для `/` подтвержден `Revalidate 30s`.
- `git diff --check` выполнен без ошибок.
- `git ls-files '.env*' 'supabase/.temp/*'` показывает только `.env.example`.
- `npm ls postcss` подтверждает `postcss@8.5.10 overridden`.
- `npm audit --omit=dev --cache /private/tmp/doctor-amal-npm-cache` выполнен успешно после разрешения сетевого доступа: `found 0 vulnerabilities`.
- Поиск по коду подтвердил, что `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` не используется в `app`, `components`, `data`, `domain`, `lib`; встречается только как пустой пример в `.env.example` и в specs.
- Поиск по коду не нашел пользовательский `localStorage`/`sessionStorage`.
- Production domain `https://doctor-amal.vercel.app` проверен:
  - `/` возвращает `HTTP 200`;
  - `/admin` возвращает `HTTP 200`;
  - `/proverka-404` возвращает `HTTP 404`;
  - на главной найдены `Купить`, `t.me`, `ux_bp`, `Dr.Amal`, `О докторе`, `Курсы`, медицинское ограничение.

### Supabase read-only проверка

- Supabase MCP `list_migrations` показывает remote migrations:
  - `20260530000000_create_taplink_content_tables`;
  - `20260603000000_create_admin_access_policies`;
  - `20260603001000_restrict_admin_update_grants`;
  - `20260603002000_add_admin_content_select_policies`;
  - `20260603003000_add_admin_course_insert_policy`;
  - `20260613000000_revoke_content_truncate_grants`.
- Все ожидаемые таблицы `public` имеют RLS enabled:
  - `admin_users`;
  - `courses`;
  - `doctor_profile`;
  - `external_links`;
  - `page_settings`;
  - `purchase_settings`.
- У `anon` и `authenticated` нет `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE` privileges на контентных таблицах.
- Policies соответствуют ожидаемой модели:
  - публичный `SELECT` для опубликованного/активного контента;
  - admin `SELECT`/`UPDATE` для контента через `is_doctor_admin()`;
  - admin `INSERT` только для `courses`;
  - `DELETE` policies не найдено.
- Write-операции через MCP не выполнялись.

### Матрица соответствия планам

| План | Статус сверки | Подтверждение в текущем проекте |
|---|---|---|
| `070` Технический аудит | Совпадает | Маршруты ограничены `app/page.tsx`, `app/admin/page.tsx`, `not-found`, `loading`, `error`; service role key и пользовательский storage в коде не найдены; `npm run quality` проходит. |
| `071` Терминология текущей версии | Совпадает | В актуальном UI/коде не найден возврат к старому продуктовому поведению; specs фиксируют текущую online-версию с Supabase и `/admin`. |
| `072` Quality gate | Совпадает | `package.json` содержит `lint`, `typecheck`, `quality`; `eslint.config.mjs` есть; `.gitignore` содержит `*.tsbuildinfo`; `postcss@8.5.10 overridden`; audit без vulnerabilities. |
| `073` Accessibility feedback админки | Совпадает | `AdminContentEditor` использует `role="alert"` для ошибок и `role="status"` для success feedback. |
| `074` Remote Supabase/RLS audit | Совпадает | Remote migrations совпадают; RLS включен; policies ожидаемые; service role key не используется в frontend-коде. |
| `075` Revoke TRUNCATE grants | Совпадает | Migration `20260613000000_revoke_content_truncate_grants.sql` есть локально и применена remote; у `anon`/`authenticated` нет `TRUNCATE` на контентных таблицах. |
| `076` Защита от параллельного сохранения | Совпадает | `AdminContentEditor` использует `savingKey`, `disabled={Boolean(savingKey)}` и ранний выход submit handlers при активном сохранении. |
| `077` Ошибки входа и сессии админки | Совпадает | `AdminAccess` содержит `try/catch` вокруг `getSession()` и `signInWithPassword()`, `safeSignOut`, понятные русские ошибки без stack trace. |
| `078` Валидация публичных URL из Supabase | Совпадает | `data/taplink-page-source.ts` содержит `toValidHttpUrl`, `toValidTelegramUrl`; Telegram ограничен `t.me` и `telegram.me`; невалидные URL становятся `null`. |
| `079` Полный набор внешних кнопок при partial-data | Совпадает | `mapExternalLinks` строит полный набор из локального fallback и переопределяет только известные платформы. |
| `080` UI responsive/accessibility приемка | Совпадает | `styles/globals.css` содержит `:focus-visible` для `.taplink-button`, `.button`, `.admin-button`; последующая visual-проверка закрыта планом `081`. |
| `081` Visual responsive проверка | Совпадает по артефактам плана | План `081` зафиксировал screenshots через временный Playwright; кодовых изменений не требовалось. Повторно screenshots в этом плане не снимались. |
| `082` Production и эксплуатация | Совпадает, с уточнением из плана `085` | Локальный quality/build проходят; production `/`, `/admin`, 404 проверены; после плана `085` основной Vercel domain читает Supabase env. Вход доктора и тестовое сохранение production-контента остаются ручной проверкой после восстановления пароля. |

### Вывод

Работа из планов `070-082` не выглядит потерянной или откатанной. То, что могло быть отменено до commit во время проблемы с Codex, в текущем состоянии проекта не обнаружено.

Единственное остаточное ограничение относится не к откату кода, а к ручной production-проверке админки: вход доктора и тестовое сохранение не проверены сейчас из-за забытого пароля. Для этого нужен отдельный ручной шаг через Supabase Auth password recovery и согласованное тестовое сохранение.

## Измененные файлы

- `Work plans/Активные/086-proverka-sootvetstviya-planov-070-082.md`
