# План 061: Реализация добавления курсов в админке

## Статус

Завершен.

## Цель

Реализовать добавление нового курса через `/admin` по утвержденным specs: доктор заполняет название, описание, цену, подтверждение цены и активность, а приложение создает технические поля и сохраняет курс в Supabase.

## Подтверждение specs

Основание:

- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- доктор может добавить новый курс через админку;
- новый курс использует общую Telegram-ссылку менеджера и `purchase_label = Купить`;
- обязательные поля: название, описание, цена текстом;
- дополнительные поля: подтверждена ли цена, показывать ли курс;
- `id`, `slug`, `purchase_label`, `sort_order` формируются приложением;
- `sort_order` ставится после последнего существующего курса;
- для Supabase нужна отдельная `insert` policy для `courses`, доступная только активному `doctor_admin`;
- `anon` не получает write-доступ;
- `delete` для курсов не добавляется;
- скрытие курса выполняется через `is_active = false`.

Вне specs:

- нет.

## Что делаем

1. Создать migration для `insert` policy на `public.courses`:
   - grant `insert` для `authenticated`;
   - policy разрешает `insert` только `public.is_doctor_admin()`;
   - `delete` не добавляется.
2. Обновить admin data layer:
   - добавить тип создания курса;
   - сформировать `id` и `slug`;
   - рассчитать следующий `sort_order`;
   - вставить `purchase_label = Купить`.
3. Обновить UI `/admin`:
   - добавить форму `Новый курс`;
   - поля: название, описание, цена, цена подтверждена, показывать курс;
   - кнопка `Добавить курс`;
   - feedback `Сохранено` / понятная ошибка.
4. После добавления перезагрузить список курсов в админке.
5. Проверить, что активный новый курс появляется на публичной странице после обновления кеша.
6. Проверить, что неактивный новый курс остается в админке и не появляется на публичной странице.

## Что не делаем в этом плане

- Не добавляем физическое удаление курсов.
- Не добавляем drag-and-drop сортировку.
- Не добавляем отдельные страницы курсов.
- Не добавляем отдельные Telegram-ссылки курсов.
- Не добавляем заявки, оплату, покупателей, аналитику, черновики, предпросмотр или журнал изменений.
- Не меняем `page_settings.medical_notice`.

## Проверка

Команды:

```bash
npm run build
git diff --check
rg -n "insert|delete|createCourse|sort_order|purchase_label|slug" components lib supabase/migrations spec
```

Supabase/remote проверка после migration:

```bash
npx supabase db push
npx supabase migration list
```

Ручная проверка:

- доктор входит в `/admin`;
- доктор создает активный курс;
- активный курс появляется в списке админки;
- активный курс появляется на публичной странице после обновления кеша;
- доктор создает неактивный курс;
- неактивный курс есть в админке, но не показывается на публичной странице;
- скрытый курс не оставляет пустое место;
- физического удаления курса в UI нет.

## Критерии готовности

- Новый курс можно создать из `/admin`.
- `insert` работает только для активного `doctor_admin`.
- `anon` не получает write-доступ.
- Публичная страница не меняет сценарий и не показывает неактивные курсы.
- Проверки выполнены или причина невозможности проверки записана.

## Результат проверки

- `npm run build` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- Поиск по `insert`, `delete`, `createCourse`, `sort_order`, `purchase_label`, `slug` подтвердил:
  - добавлена migration `insert` policy для `courses`;
  - `delete` для `courses` не добавлен;
  - `createCourse` формирует технические поля и вставляет `purchase_label = Купить`;
  - UI вызывает создание нового курса.
- `npx supabase db push` применил migration `20260603003000_add_admin_course_insert_policy.sql` к remote Supabase.
- `npx supabase migration list` подтвердил совпадение local и remote migrations до `20260603003000`.
- Dev-сервер запущен на `http://localhost:3000`.
- HTTP-проверка dev-сервера показала `GET /admin 200` и `GET / 200`.
- Свежий `.next/dev/logs/next-development.log` не содержит warning `Multiple GoTrueClient instances`.
- Ручная проверка через `/admin` выполнена владельцем проекта: форма добавления курса работает.
- Подтверждено, что скрытие курса работает через checkbox `Показывать курс на публичной странице`: выключенная галочка соответствует `is_active = false`, курс остается в админке и не должен показываться на публичной странице.

## Измененные файлы

- `components/admin/AdminContentEditor.tsx`
- `lib/supabase/adminContent.ts`
- `supabase/migrations/20260603003000_add_admin_course_insert_policy.sql`
- `Work plans/Завершенные/061-realizaciya-dobavleniya-kursov-v-adminke.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add components/admin/AdminContentEditor.tsx lib/supabase/adminContent.ts supabase/migrations "Work plans/Завершенные/061-realizaciya-dobavleniya-kursov-v-adminke.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить создание курсов в админке"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
