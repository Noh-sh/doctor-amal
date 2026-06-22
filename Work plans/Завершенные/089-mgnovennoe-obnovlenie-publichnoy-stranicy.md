# План 089: Мгновенное обновление публичной страницы после сохранения

## Статус

Завершен.

## Цель

Добавить подтвержденное новое поведение: после успешного сохранения контента в `/admin` приложение должно безопасно инициировать server-side сброс кеша публичной страницы `/`, чтобы изменения появлялись сразу или почти сразу, а не только после обычного `revalidate: 30`.

## Подтверждение specs

Основание:

- `AGENTS.md`;
- `.agents/skills/doctor-amal-specs/SKILL.md`;
- `.agents/skills/doctor-amal-specs/references/spec-map.md`;
- `spec/technical-specs/change-management.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/routing-and-ui.md`.

Подтверждено пользователем:

- после сохранения в `/admin` нужно сделать мгновенное или почти мгновенное обновление публичной страницы `/`;
- новое поведение нужно делать отдельной веткой после завершения ветки `spec/admin-publication-cache-rule`;
- сначала обновить specs, затем код.

Вне specs до текущего подтверждения:

- мгновенный сброс кеша после сохранения;
- новый server-side route/action для revalidation.

Что остается вне текущего этапа:

- auth покупателей;
- заявки;
- онлайн-оплата;
- новые роли;
- управление Auth users;
- service role key во frontend;
- изменение RLS/migrations;
- webhook или внешняя интеграция;
- изменение публичного пользовательского маршрута `/`.

## Что делаем

1. Обновить specs для безопасного server-side revalidation после admin-сохранения.
2. Добавить защищенный server route для сброса кеша публичной страницы `/`.
3. После успешного Supabase-сохранения в админке вызвать этот route.
4. Проверять, что вызов доступен только активному `doctor_admin`.
5. Не использовать service role key во frontend.
6. Показать понятный feedback, если данные сохранены, но мгновенный сброс кеша не сработал.
7. Выполнить проверку качества.

## Планируемые файлы

- `Work plans/Активные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/routing-and-ui.md`;
- `components/admin/AdminContentEditor.tsx`;
- `app/admin/revalidate/route.ts`.

## Критерии готовности

- specs описывают мгновенный server-side revalidation как текущее подтвержденное поведение;
- route revalidation принимает только `POST`;
- route проверяет Supabase Auth user и активную роль `doctor_admin`;
- route вызывает `revalidatePath("/")`;
- frontend вызывает revalidation только после успешного Supabase-сохранения;
- при ошибке revalidation сохраненные данные не откатываются, а доктор видит понятный feedback;
- service role key не используется во frontend;
- новые заявки, оплаты, auth покупателей, новые роли и RLS/migrations не добавляются;
- `npm run quality` и `git diff --check` проходят.

## Результат specs-этапа

Выполнено:

- `spec/feature-specs/admin-content-editing.md` обновлен:
  - после успешного сохранения админка должна инициировать безопасный server-side сброс кеша `/`;
  - публичная страница должна обновляться сразу или почти сразу;
  - при ошибке revalidation данные не откатываются, но доктор видит понятный feedback и обычный `revalidate: 30` остается fallback.
- `spec/technical-specs/admin-auth-and-access.md` обновлен:
  - revalidation доступен только пользователю с Supabase Auth session и активной ролью `doctor_admin`;
  - `anon` и обычный `authenticated` пользователь без `doctor_admin` не могут сбрасывать кеш;
  - frontend не использует service role key.
- `spec/technical-specs/architecture.md` обновлен:
  - data layer включает server-side revalidation после admin-сохранения;
  - revalidation выполняется серверным механизмом Next.js, например `revalidatePath("/")`.
- `spec/technical-specs/routing-and-ui.md` обновлен:
  - добавлен служебный route/action `/admin/revalidate`;
  - описан success/warning feedback для revalidation.

Проверка specs:

```bash
rg -n "revalidation|revalidatePath|/admin/revalidate|doctor_admin|service role|revalidate: 30|сразу или почти сразу" spec/feature-specs/admin-content-editing.md spec/technical-specs/admin-auth-and-access.md spec/technical-specs/architecture.md spec/technical-specs/routing-and-ui.md "Work plans/Завершенные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md"
git diff --check
```

Статус:

- specs обновлены до реализации кода;
- продуктовый код еще не менялся на момент записи этого блока.

## Результат реализации

Выполнено:

- Добавлен server route `POST /admin/revalidate`:
  - читает bearer token из `Authorization`;
  - проверяет Supabase Auth user;
  - проверяет активную роль `doctor_admin` через `admin_users`;
  - вызывает `revalidatePath("/")`;
  - не меняет Supabase data;
  - не использует service role key во frontend.
- `AdminContentEditor` обновлен:
  - после успешной записи в Supabase вызывает `/admin/revalidate`;
  - при успешном revalidation показывает success feedback `Публичная страница обновлена.`;
  - при ошибке revalidation не откатывает сохранение и показывает понятный feedback, что публичная страница может обновиться примерно в течение 30 секунд.
- Новые заявки, оплата, auth покупателей, новые роли, RLS/migrations, webhook и внешние интеграции не добавлялись.

Проверка:

```bash
rg -n "revalidation|revalidatePath|/admin/revalidate|doctor_admin|service role|revalidate: 30|сразу или почти сразу" app components spec "Work plans/Завершенные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md"
git diff --check
npm run quality
```

Результат:

- `rg` подтвердил наличие specs и кода для `/admin/revalidate`, `revalidatePath("/")`, `doctor_admin` и fallback `revalidate: 30`;
- `git diff --check` выполнен без ошибок;
- `npm run quality` выполнен успешно:
  - `npm run lint` прошел;
  - `npm run typecheck` прошел;
  - `npm run build` прошел;
  - production build показывает `ƒ /admin/revalidate`.

## Измененные файлы

- `Work plans/Активные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md`
- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/routing-and-ui.md`
- `components/admin/AdminContentEditor.tsx`
- `app/admin/revalidate/route.ts`

## Git

- commit: не выполнен
- push: не выполнен
