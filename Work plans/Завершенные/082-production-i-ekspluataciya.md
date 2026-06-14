# План 082: Production и эксплуатация

## Статус

Завершен.

## Цель

Подготовить текущую подтвержденную версию Doctor Amal к предсказуемому production deploy и эксплуатации: проверить production build, production URL, env scopes, deploy checklist, rollback и восстановление admin-доступа.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/supabase-mcp-access.md`.

Подтверждено:

- production readiness входит в обязательный путь до 10/10;
- нужно проверить production build из чистого состояния;
- нужно проверить production URL: `/`, `/admin`, 404, чтение Supabase, вход доктора, сохранение разрешенного контента, обновление публичной страницы после `revalidate: 30`;
- нужно проверить Vercel env scopes для Production и Preview без записи секретов;
- нужно описать deploy checklist, rollback и восстановление admin-доступа;
- нужно проверить отсутствие секретов в logs, browser bundle и репозитории.

Вне specs:

- внешняя error-monitoring интеграция;
- uptime monitoring;
- аналитика;
- онлайн-оплата;
- заявки, покупатели, личный кабинет;
- новые admin-функции или управление Auth users через UI.

## Что делаем

1. Проверить текущее состояние git и убедиться, что `main` актуален.
2. Выполнить production build и текущий quality gate.
3. Проверить отсутствие секретов в git-tracked файлах и frontend env usage.
4. Проверить production URL вручную или зафиксировать, если URL/доступ недоступен в текущем окружении.
5. Проверить Vercel env scopes вручную или зафиксировать блокер, не записывая значения секретов.
6. Описать deploy checklist.
7. Описать rollback к последнему рабочему deploy.
8. Описать восстановление admin-доступа без добавления UI управления пользователями.
9. Записать результаты проверки в этот план и обновить Roadmap.

## Что не делаем

- Не добавляем новые функции.
- Не меняем Supabase schema/RLS без отдельного migration-плана.
- Не коммитим `.env.local` или секреты.
- Не записываем значения production env в docs, specs, roadmap или work plans.
- Не подключаем monitoring/analytics без отдельного подтверждения specs.

## Проверка

Команды:

```bash
git status --short --branch
npm run quality
git diff --check
git ls-files '.env*' 'supabase/.temp/*'
rg -n "SERVICE_ROLE|service_role|DOCTOR_SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SUPABASE" app components data domain lib .env.example package.json
```

Ручная проверка:

- production URL `/`;
- production URL `/admin`;
- production 404;
- чтение Supabase на production;
- вход доктора;
- сохранение разрешенного контента;
- обновление публичной страницы после `revalidate: 30`;
- Vercel env scopes для Production и Preview.

## Критерии готовности

- Production build и quality gate проходят.
- Production-проверка выполнена или блокеры явно описаны.
- Deploy checklist понятен владельцу проекта.
- Rollback описан.
- Восстановление admin-доступа описано без новых UI-функций.
- Секреты не попадают в git, frontend bundle или документацию.

## Результат проверки

### Локальная проверка

- Ветка: `quality/production-readiness`.
- База ветки: `46e7bcd Merge pull request #49 from Noh-sh/quality/visual-responsive-check`.
- `git status --short --branch`: до изменений был только новый активный план `082`.
- `npm run quality` выполнен успешно:
  - `npm run lint` прошел;
  - `npm run typecheck` прошел;
  - `npm run build` прошел;
  - production build сгенерировал `/`, `/_not-found`, `/admin`.
- `git diff --check` выполнен без ошибок.
- `git ls-files '.env*' 'supabase/.temp/*'`: в git отслеживается только `.env.example`.
- Поиск env/secret usage:
  - `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` встречается только в `.env.example` как пустой пример;
  - текущий код использует `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` и server-side fallback `DOCTOR_SUPABASE_URL`;
  - service role key не используется в `app`, `components`, `data`, `domain`, `lib`.
- В репозитории не найдено `vercel.json` или локальной `.vercel` конфигурации.

### Production URL и Vercel

В текущем локальном окружении production URL и Vercel project не доступны, поэтому следующие пункты требуют ручной проверки владельцем проекта в Vercel/GitHub после merge:

- production URL `/`;
- production URL `/admin`;
- production 404;
- чтение Supabase на production;
- вход доктора;
- сохранение разрешенного контента;
- обновление публичной страницы после `revalidate: 30`;
- Vercel env scopes для Production и Preview.

Значения секретов и env-переменных нельзя записывать в этот план, roadmap, specs или commit messages.

### Deploy checklist

1. Убедиться, что `main` содержит последний проверенный PR.
2. Убедиться, что GitHub/Vercel deploy завершился без ошибок.
3. В Vercel проверить, что для Production и Preview заданы нужные env-переменные без раскрытия значений:
   - `NEXT_PUBLIC_SUPABASE_URL`;
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`;
   - `DOCTOR_SUPABASE_URL`, если используется как server-side/project env;
   - `DOCTOR_SUPABASE_SERVICE_ROLE_KEY` может храниться только как server-only secret и не должен использоваться frontend-кодом.
4. Открыть production `/`:
   - страница загружается;
   - видны имя, фото/placeholder, кнопки `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`;
   - нет форм, оплаты, заявок и сбора пользовательских данных.
5. Открыть production `/admin`:
   - без сессии видна форма входа;
   - технические stack trace не отображаются.
6. Проверить production 404 на неизвестном URL.
7. Войти доктором через email/password.
8. Проверить, что активный `doctor_admin` видит формы редактирования.
9. Выполнить безопасное тестовое сохранение разрешенного поля только при согласовании владельца проекта.
10. Подождать не менее 30 секунд и проверить, что публичная страница обновилась после `revalidate: 30`.
11. Проверить Vercel deployment logs на отсутствие раскрытых секретов.
12. После проверки не оставлять тестовые изменения контента, если они не должны остаться в production.

### Rollback

1. В Vercel открыть список Deployments.
2. Найти последний рабочий production deployment до проблемного deploy.
3. Выполнить Promote/Redeploy последнего рабочего deployment через интерфейс Vercel.
4. Проверить `/`, `/admin` и 404 после rollback.
5. Если проблема связана с Supabase migration, не исправлять remote database вручную через SQL Editor без migration-плана.
6. Для database rollback сначала определить правильное состояние по specs и migrations, затем создать отдельный work plan и migration.

### Восстановление admin-доступа

Текущая версия не добавляет управление Auth users через UI.

Безопасный порядок восстановления доступа:

1. Проверить, что Auth user доктора существует в Supabase Auth.
2. Проверить, что `admin_users.user_id` соответствует UUID Auth user доктора.
3. Проверить, что `admin_users.role = 'doctor_admin'`.
4. Проверить, что `admin_users.is_active = true`.
5. Если доступ нужно временно отключить, изменить только `is_active = false`.
6. Если нужно восстановить доступ, вернуть `is_active = true` для подтвержденного Auth user.
7. Не создавать новых ролей, не добавлять покупателей и не менять RLS policies без отдельного spec и migration.
8. Не записывать email, UUID, токены, пароли или ключи в git, specs, roadmap или work plans.

### Остаточный блокер

- Production URL и Vercel env scopes должны быть проверены владельцем проекта или агентом при наличии доступа к production/Vercel.
- Без этого пункт production-проверки считается документированным, но не полностью пройденным.

## Измененные файлы

- `Work plans/Завершенные/082-production-i-ekspluataciya.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
