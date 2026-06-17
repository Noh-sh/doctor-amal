# План 085: Production URL и Vercel-проверка

## Статус

Завершен.

## Цель

Закрыть остаточный блокер после плана `082`: проверить production URL и Vercel-настройки текущей версии Doctor Amal без изменения продуктового поведения и без записи секретов.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `Work plans/Завершенные/082-production-i-ekspluataciya.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`.

Подтверждено:

- production-проверка входит в путь до 10/10;
- нужно проверить production URL `/`, `/admin`, 404, чтение Supabase, вход доктора, сохранение разрешенного контента и обновление публичной страницы после `revalidate: 30`;
- нужно проверить Vercel env scopes для Production и Preview без записи значений env;
- нужно проверить отсутствие секретов в git и frontend usage.

Вне specs:

- новые функции;
- новые integrations, monitoring, analytics;
- изменение Supabase schema/RLS/data;
- запись production URL, ключей, паролей, email, UUID или токенов, если это раскрывает чувствительные данные.

## Что делаем

1. Проверить актуальность ветки и чистоту git.
2. Найти доступную project/deploy информацию без раскрытия секретов.
3. Выполнить локальный quality gate.
4. Проверить tracked env и использование service role key.
5. Если production URL доступен, проверить `/`, `/admin` и 404.
6. Если Vercel CLI/доступ доступен, проверить наличие env names и scopes без вывода значений.
7. Зафиксировать результат: пройдено или блокер с конкретным следующим действием.
8. После проверки обновить `Roadmap/chronology.md` и `Roadmap/project-roadmap.md`.

## Что не делаем

- Не меняем продуктовый код.
- Не меняем specs.
- Не меняем Supabase schema/RLS/data.
- Не выполняем тестовое сохранение в production без отдельного явного подтверждения владельца проекта.
- Не записываем секреты и реальные значения env.

## Проверка

Команды:

```bash
git status --short --branch
npm run quality
git diff --check
git ls-files '.env*' 'supabase/.temp/*'
rg -n "SERVICE_ROLE|service_role|DOCTOR_SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SUPABASE" app components data domain lib .env.example package.json
```

Дополнительно при наличии доступа:

```bash
vercel whoami
vercel env ls
```

Ручная проверка при наличии production URL:

- production `/`;
- production `/admin`;
- production 404;
- чтение Supabase на production;
- вход доктора;
- сохранение разрешенного контента только после отдельного подтверждения владельца;
- обновление публичной страницы после `revalidate: 30`;
- Vercel env scopes для Production и Preview.

## Критерии готовности

- локальные проверки пройдены;
- production/Vercel проверка выполнена или блокер явно описан;
- секреты не раскрыты;
- следующий шаг понятен.

## Результат проверки

### Локальная проверка

- Ветка: `ops/production-url-vercel-check`.
- База ветки: `583eb36 Merge pull request #51 from Noh-sh/chore/codex-environment-supabase-mcp`.
- `git status --short --branch`: в рабочем дереве есть только новый активный план `085`.
- `npm run quality` выполнен успешно:
  - `npm run lint` прошел;
  - `npm run typecheck` прошел;
  - `npm run build` прошел;
  - production build сгенерировал `/`, `/_not-found`, `/admin`;
  - для `/` подтвержден `Revalidate 30s`.
- `git diff --check` выполнен без ошибок.
- `git ls-files '.env*' 'supabase/.temp/*'` показывает только `.env.example`.
- Поиск env/secret usage:
  - `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` встречается только в `.env.example` как пустой пример;
  - код читает `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` и server-side fallback `DOCTOR_SUPABASE_URL`;
  - service role key не используется в `app`, `components`, `data`, `domain`, `lib`.

### Vercel и production URL

- В проекте не найдено `vercel.json`.
- В проекте не найдено локальной `.vercel` привязки.
- `vercel` CLI не установлен в текущем PATH.
- Поиск по project docs, roadmap, work plans и specs не нашел production URL, который можно безопасно использовать для проверки.
- Владелец проекта передал deployment URL `https://doctor-amal-czlvj40l2-ulxas1-2243s-projects.vercel.app`.
- Внешняя проверка URL через `curl` выполнена после разрешения сетевого доступа:
  - `/` возвращает `HTTP 401`;
  - `/admin` возвращает `HTTP 401`;
  - `/proverka-404` возвращает `HTTP 401`;
  - HTML-ответ содержит `Authentication Required` и `Vercel Authentication`.
- Владелец проекта подтвердил production domain `https://doctor-amal.vercel.app` в Vercel Domains.
- Production domain проверен через `curl`:
  - `/` возвращает `HTTP 200`;
  - `/admin` возвращает `HTTP 200`;
  - `/proverka-404` возвращает `HTTP 404`;
  - главная содержит `Dr.Amal`, `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram` и медицинское ограничение;
  - `/admin` содержит admin-страницу без Vercel Authentication;
  - 404 содержит `Страница не найдена`.
- Владелец проекта сообщил, что в Vercel Environment Variables сейчас показано `No Environment Variables added`.
- На production главной внешние кнопки показаны как неактивные с текстом `Ссылка будет добавлена позже`, поэтому чтение актуального Supabase-контента через production env еще не подтверждено.
- Владелец проекта обнаружил второй Vercel project `doctor-amal-j7m5`, подключенный к тому же GitHub repo `Noh-sh/doctor-amal`; env variables находятся именно там.
- Production domain второго project `https://doctor-amal-j7m5.vercel.app` проверен:
  - `/` возвращает `HTTP 200`;
  - `/admin` возвращает `HTTP 200`;
  - `/proverka-404` возвращает `HTTP 404`;
  - главная содержит `Dr.Amal`, `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram` и медицинское ограничение;
  - на главной найдена активная Telegram-ссылка `t.me/ux_bp` и кнопки `Купить`, что подтверждает применение Supabase env на этом Vercel project;
  - `/admin` содержит admin-страницу без Vercel Authentication;
  - 404 содержит `Страница не найдена`.
- Владелец проекта перенес env variables в основной Vercel project `doctor-amal` и выполнил redeploy.
- Основной production domain `https://doctor-amal.vercel.app` повторно проверен 2026-06-17:
  - `/` возвращает `HTTP 200`;
  - `/admin` возвращает `HTTP 200`;
  - `/proverka-404` возвращает `HTTP 404`;
  - главная содержит `Dr.Amal`, `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram` и медицинское ограничение;
  - на главной найдена активная Telegram-ссылка `t.me/ux_bp` и кнопки `Купить`, что подтверждает применение Supabase env на основном project;
  - `/admin` содержит admin-страницу без Vercel Authentication;
  - 404 содержит `Страница не найдена`.

В текущем окружении без ввода credentials невозможно фактически проверить:

- вход доктора;
- сохранение разрешенного контента;
- обновление публичной страницы после `revalidate: 30`;
- Vercel env scopes для Production и Preview в первом project `doctor-amal`.

### Итог

Найдено два Vercel project для одного repo:

- `doctor-amal` с domain `https://doctor-amal.vercel.app`, но без env variables;
- `doctor-amal-j7m5` с domain `https://doctor-amal-j7m5.vercel.app`, где env variables есть и Supabase-контент читается.

Основной project выбран: `doctor-amal` с domain `https://doctor-amal.vercel.app`. Env variables перенесены туда, redeploy выполнен, Supabase-контент на production подтвержден.

Владелец проекта считает, что админка работает корректно, и разрешил commit/push без дополнительной проверки входа после забытого пароля.

Остаточные ручные действия вне этого плана:

1. при необходимости восстановить пароль доктора через Supabase Auth;
2. после входа в `/admin` можно вручную проверить сохранение разрешенного контента и обновление публичной страницы после `revalidate: 30`;
3. после полной уверенности в основном project `doctor-amal` можно удалить или отключить дублирующий Vercel project `doctor-amal-j7m5`.

## Измененные файлы

- `Work plans/Завершенные/085-production-url-i-vercel-proverka.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
