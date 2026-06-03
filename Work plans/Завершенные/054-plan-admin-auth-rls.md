# План 054: Supabase Auth и RLS для админки

## Статус

Завершен.

## Цель

Подготовить и реализовать безопасный первый технический слой админки: Supabase Auth для входа доктора, таблицу доступа `admin_users` и RLS write policies, которые разрешают редактировать контент только доктору.

Этот план не реализует UI `/admin` и формы редактирования. Он готовит основу безопасности перед интерфейсом.

## Подтверждение specs

Прочитано:

- `spec/feature-specs/admin-content-editing.md`
- `spec/user-stories/admin-user-stories.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/supabase-mcp-access.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- контент на первом admin/Auth этапе редактирует только доктор;
- вход для доктора — Supabase Auth email/password;
- роль `doctor_admin` должна проверяться отдельно, не только фактом входа;
- для контроля доступа нужна таблица `admin_users`;
- RLS на таблицах контента должен оставаться включенным;
- публичные `select` policies сохраняются;
- `anon` не получает write-доступ;
- обычный `authenticated` без права администратора не получает write-доступ;
- минимально допустимые операции для `doctor_admin`: `update` для `doctor_profile`, `external_links`, `courses`, `purchase_settings`;
- `page_settings.medical_notice` на первом этапе не редактируется через админку;
- изменения schema должны идти через `supabase/migrations/` и Supabase CLI, затем проверяться через MCP/CLI.

Вне specs:

- UI `/admin` не реализуется в этом плане;
- форма входа не реализуется в этом плане;
- формы редактирования контента не реализуются в этом плане;
- роль менеджера не добавляется;
- `insert` и `delete` для курсов не добавляются без отдельного подтверждения;
- редактирование фото через загрузку файла не добавляется;
- заявки, покупатели, личный кабинет, онлайн-оплата, заказы, медицинские анкеты, аналитика, журнал изменений и черновики не добавляются.

## Что делаем

1. Создать migration для таблицы `admin_users`.
2. Добавить helper-функцию или безопасное SQL-условие для проверки активного `doctor_admin`.
3. Добавить RLS policies для `admin_users`.
4. Добавить RLS write policies `update` для:
   - `doctor_profile`;
   - `external_links`;
   - `courses`;
   - `purchase_settings`.
5. Не добавлять write policy для `page_settings`.
6. Применить migration через Supabase CLI.
7. Проверить migration list local/remote.
8. Проверить через MCP/CLI:
   - таблица `admin_users` существует;
   - RLS включен;
   - write policies есть только на разрешенных таблицах;
   - `anon` не имеет write-доступа;
   - `page_settings` не имеет admin write policy.
9. Настроить Supabase Auth email/password в Dashboard, если это еще не настроено.
10. Создать пользователя доктора безопасным способом.
11. Добавить `user_id` доктора в `admin_users` с ролью `doctor_admin`.
12. Зафиксировать проверки в плане.

## Что не делаем в этом плане

- Не создаем маршрут `/admin`.
- Не создаем login UI.
- Не создаем формы редактирования.
- Не меняем публичную страницу `/`.
- Не меняем структуру публичного пользовательского сценария.
- Не добавляем покупателей или регистрацию пользователей.
- Не добавляем заявки, оплату, заказы или медицинские данные.
- Не используем service role key во frontend.
- Не коммитим секреты, пароли, access tokens или service role key.
- Не меняем контентные seed-данные без отдельной необходимости.

## Предлагаемая структура migration

Предварительно:

```sql
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_role_check check (role in ('doctor_admin'))
);
```

Нужно включить RLS:

```sql
alter table public.admin_users enable row level security;
```

Для проверки роли можно использовать SQL-функцию, если это будет безопаснее и чище для policies. Если функция используется, она должна быть описана в migration и не должна обходить RLS шире нужного.

## Предлагаемые policies

Идея policies:

- `doctor_admin` может читать свою запись в `admin_users`;
- только активный `doctor_admin` может обновлять разрешенные контентные таблицы;
- `anon` не получает `insert`, `update` или `delete`;
- любой `authenticated` без записи в `admin_users` не получает write-доступ.

Точные SQL policies нужно написать в migration и проверить через MCP/CLI до перехода к UI.

## Проверка

Команды:

```bash
git diff --check
npx supabase migration list
npm run build
```

После применения migration:

```bash
npx supabase db push
npx supabase migration list
```

MCP/CLI-проверка:

- проверить таблицу `admin_users`;
- проверить RLS status;
- проверить policies;
- проверить отсутствие write policy для `page_settings`;
- проверить, что migration применен к remote project.

Ручная проверка:

- migration не содержит `drop`;
- migration не создает покупателей, заявки, оплаты, заказы, медицинские анкеты или аналитику;
- секреты и пароли не добавлены в git;
- публичный сценарий `/` не изменен.

## Критерии готовности

- Migration создана в `supabase/migrations/`.
- Migration применена к online Supabase project через CLI.
- `admin_users` создана и защищена RLS.
- Write policies добавлены только для разрешенных таблиц.
- Пользователь доктора создан безопасно и связан с `admin_users`.
- Проверки CLI/MCP выполнены.
- Код публичной страницы не изменен.
- Результат проверки записан в план.

## Результат проверки

- Создана migration `supabase/migrations/20260603000000_create_admin_access_policies.sql`.
- Создана таблица `public.admin_users` с ролью `doctor_admin` и включенным RLS.
- Создана функция `public.is_doctor_admin()` для проверки активного доктора-администратора.
- Добавлены RLS policies:
  - `Doctor admin can read own admin access` для `admin_users`;
  - `Doctor admin can update doctor profile content` для `doctor_profile`;
  - `Doctor admin can update external links content` для `external_links`;
  - `Doctor admin can update courses content` для `courses`;
  - `Doctor admin can update purchase settings content` для `purchase_settings`.
- Write policy для `page_settings` не добавлялась.
- После проверки grants создана корректирующая migration `supabase/migrations/20260603001000_restrict_admin_update_grants.sql`.
- Корректирующая migration убрала `insert`, `update`, `delete` grants у `anon` и `authenticated`, затем выдала `authenticated` update только на разрешенные колонки.
- `npx supabase db push` применил обе новые migrations к online Supabase project.
- `npx supabase migration list` подтвердил совпадение local и remote migrations:
  - `20260530000000`;
  - `20260603000000`;
  - `20260603001000`.
- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- MCP подтвердил таблицу `public.admin_users`, RLS status и policies.
- MCP подтвердил grants:
  - `anon` не может обновлять проверенные колонки;
  - `authenticated` может обновлять только разрешенные контентные колонки;
  - `authenticated` не может обновлять технические поля `id`, `slug`, `platform`, `photo_src`;
  - `authenticated` не может обновлять `page_settings.medical_notice`.
- Ручная проверка выполнена: migrations не содержат `drop`, не создают покупателей, заявки, оплаты, заказы, медицинские анкеты или аналитику.

Открытый шаг:

- Supabase Auth user доктора создан владельцем проекта через Supabase Dashboard.
- В `admin_users` добавлена активная запись с ролью `doctor_admin`.
- MCP подтвердил `active_doctor_admins = 1`.
- Пароль доктора не записывался в specs, work plans, roadmap, git или чат.

## Измененные файлы

- `Work plans/Активные/054-plan-admin-auth-rls.md`
- `Work plans/Завершенные/054-plan-admin-auth-rls.md`
- `supabase/migrations/20260603000000_create_admin_access_policies.sql`
- `supabase/migrations/20260603001000_restrict_admin_update_grants.sql`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Добавить Supabase Auth доступ для админки"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
