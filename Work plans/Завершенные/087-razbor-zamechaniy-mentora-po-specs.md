# План 087: Разбор замечаний ментора по specs

## Статус

Завершен.

## Цель

Сверить замечания ментора с текущими specs после последних изменений, отделить уже закрытые пункты от оставшихся gaps и начать первый подтвержденный gap: легкое восстановление пароля администратора из `/admin`.

## Подтверждение specs

Основание:

- `AGENTS.md`;
- `.agents/skills/doctor-amal-specs/SKILL.md`;
- `.agents/skills/doctor-amal-specs/references/spec-map.md`;
- `spec/global-spec.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/supabase-content-source.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/feature-specs/medical-content-rules.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- замечания ментора относятся к актуальности specs и могут быть разобраны без изменения продуктового кода;
- specs должны описывать текущую online-версию с Supabase и `/admin`;
- владелец проекта подтвердил новый сценарий: доктор должен иметь простой способ восстановить пароль из `/admin`, без доступа к Supabase Dashboard;
- допустимо уточнять specs, если уточнение описывает уже существующее поведение и не добавляет новую функцию.

Вне specs:

- изменение Supabase Auth settings;
- изменение production-контента;
- изменение RLS/migrations;
- удаление дублирующего Vercel project.

## Что делаем

1. Сопоставить каждое замечание ментора с текущими specs.
2. Разделить пункты на `сделано`, `частично сделано`, `не сделано`.
3. Для незакрытых пунктов составить порядок доработки.
4. Обновить specs для подтвержденного сценария восстановления пароля.
5. Только после specs перейти к реализации UI восстановления пароля отдельной частью работы.

## Что не делаем

- Не меняем продуктовый код до обновления specs.
- Не добавляем восстановление пароля в код до фиксации требований.
- Не меняем секреты, env, Supabase или Vercel.
- Не выполняем commit/push без отдельной просьбы.

## Результат первичной сверки

### 1. `global-spec.md` устарел

Статус: уже сделано.

Текущий `spec/global-spec.md` уже описывает:

- текущую online web-страницу в формате Taplink;
- online Next.js-приложение;
- Supabase как хранилище публичного контента;
- публичный маршрут `/`;
- защищенную админку `/admin`;
- редактирование контента активным `doctor_admin`;
- отсутствие auth покупателей, личного кабинета, сбора данных публичного пользователя и онлайн-оплаты;
- старые функции вроде каталога, заявок, оплаты, загрузки фото и управления Auth users как то, что не входит в текущую версию.

Вывод: критичное замечание ментора уже закрыто поздними изменениями.

### 2. Восстановление пароля admin

Статус: подтверждено как новое требование, specs нужно обновить до реализации.

Найдено:

- `admin-auth-and-access.md` описывает вход email/password и запрет хранить пароль в таблицах приложения;
- планы `085/086` фиксируют, что пароль забыт и восстановление нужно делать через Supabase Auth;
- отдельного spec-раздела с безопасным порядком восстановления доступа сейчас нет.

Нужно доработать specs:

- описать UI `Забыли пароль?` на `/admin`;
- описать, что доктор вводит email и получает письмо восстановления через Supabase Auth;
- описать отдельный экран/состояние для ввода нового пароля после перехода по recovery link;
- описать нейтральный feedback, который не раскрывает, существует ли email;
- указать, что восстановление доступно только для Auth user доктора и не создает регистрацию покупателей;
- запретить записывать пароль, recovery-ссылки, email/UUID и токены в git/specs/work plans/roadmap;
- описать, что доктор видит в приложении при неверном пароле.

### 3. Если Supabase недоступен

Статус: частично сделано.

Найдено:

- `supabase-content-source.md` описывает fallback на подтвержденные локальные данные и запрет stack trace;
- `local-storage.md` и `architecture.md` фиксируют локальный fallback;
- код действительно использует `taplinkPageData`, если Supabase env отсутствует или запросы не сработали;
- specs не дают достаточно явного пользовательского описания: cache, сообщение об ошибке, частичная работа сайта, поведение `/admin`.

Нужно доработать specs:

- публичная `/` при недоступном Supabase показывает локальный подтвержденный fallback без технической ошибки;
- отдельное сообщение об ошибке посетителю не показывается, если fallback доступен;
- при partial-data недостающие внешние кнопки остаются видимыми и неактивными;
- `/admin` при недоступном Supabase/Auth показывает понятное русское сообщение и не показывает формы редактирования.

### 4. Проверка медицинского контента через admin

Статус: частично сделано.

Найдено:

- `medical-content-rules.md` содержит правила медицинских текстов;
- `admin-auth-and-access.md` говорит, что описание курса не должно явно нарушать medical content rules;
- `admin-content-editing.md` запрещает редактировать медицинское предупреждение через админку;
- не описано, кто отвечает за проверку текста при редактировании через `/admin`, является ли это ручной ответственностью доктора и нужен ли checklist.

Нужно доработать specs:

- указать, что медицинская проверка admin-контента является ручной ответственностью доктора/владельца проекта;
- добавить короткий checklist перед сохранением медицински значимого текста;
- зафиксировать, что текущая админка не выполняет автоматическую медицинскую модерацию;
- указать, что публикация после сохранения возможна только для текста, который доктор считает проверенным по `medical-content-rules.md`.

### 5. Когда изменения появляются на сайте

Статус: в основном сделано, но нужно унифицировать формулировки.

Найдено:

- `admin-auth-and-access.md` уже говорит: `revalidate: 30`, изменения могут появиться примерно через 30 секунд;
- roadmap и планы `058/059/085/086` также фиксируют примерно 30 секунд;
- `admin-content-editing.md` все еще использует более общую формулировку `после обновления данных и кеша`.

Нужно доработать specs:

- заменить общие формулировки в `admin-content-editing.md` на понятное правило: после сохранения данные публикуются сразу в Supabase, а публичная страница может обновиться примерно в течение 30 секунд;
- уточнить, что мгновенный сброс кеша после сохранения не входит в текущую версию.

## Предлагаемый порядок доработки

1. Закрыть password recovery spec-gap в `admin-auth-and-access.md`, `admin-content-editing.md` и `routing-and-ui.md`.
2. Уточнить fallback/error behavior при недоступном Supabase в `supabase-content-source.md`, `architecture.md` и admin specs.
3. Уточнить manual medical content review для admin-редактирования в `medical-content-rules.md` и `admin-content-editing.md`.
4. Унифицировать правило публикации и кеша в `admin-content-editing.md`.
5. Выполнить `rg`-проверку формулировок и `git diff --check`.

## Текущий этап

Этап 1: specs для восстановления пароля.

Планируемые файлы:

- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/routing-and-ui.md`.

Критерии готовности этапа:

- specs описывают простой recovery-flow без доступа доктора к Supabase Dashboard;
- specs не добавляют регистрацию, auth покупателей, новые роли или управление Auth users через UI;
- specs фиксируют безопасный нейтральный feedback;
- `git diff --check` проходит.

## Результат этапа 1

Выполнено:

- `spec/technical-specs/admin-auth-and-access.md` обновлен:
  - восстановление пароля доктора включено в границу текущей админки;
  - описан flow `Забыли пароль?` через Supabase Auth email;
  - зафиксирован нейтральный feedback без раскрытия существования email;
  - запрещено записывать recovery token, recovery URL, email доктора, UUID Auth user и секреты в git/specs/work plans/roadmap;
  - добавлены проверки password recovery.
- `spec/feature-specs/admin-content-editing.md` обновлен:
  - описан пользовательский сценарий восстановления пароля со страницы `/admin`;
  - уточнено, что это не добавляет регистрацию, покупателей, личный кабинет или новые роли;
  - правило публикации унифицировано: Supabase сохраняет сразу, публичная страница обновляется примерно в течение 30 секунд.
- `spec/technical-specs/routing-and-ui.md` обновлен:
  - добавлен служебный route `/admin/reset-password`;
  - описаны UI-состояния `Забыли пароль?`, отправка recovery email и экран задания нового пароля;
  - запрещен вывод stack trace, recovery token, email и служебных деталей.

Проверка:

```bash
rg -n "Забыли пароль|восстановлен|reset-password|recovery|Если email зарегистрирован|30 секунд|revalidate: 30|Auth users|личный кабинет" spec/technical-specs/admin-auth-and-access.md spec/feature-specs/admin-content-editing.md spec/technical-specs/routing-and-ui.md "Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md"
git diff --check
```

Результат:

- нужные формулировки найдены в specs;
- `git diff --check` выполнен без ошибок;
- продуктовый код пока не менялся.

Следующий этап:

- реализовать UI восстановления пароля в `/admin` и route `/admin/reset-password` по обновленным specs.

## Результат этапа 2

Выполнено:

- В `/admin` добавлено состояние восстановления пароля:
  - кнопка `Забыли пароль?`;
  - форма email;
  - отправка recovery email через `supabase.auth.resetPasswordForEmail`;
  - redirect на `/admin/reset-password`;
  - нейтральный success feedback `Если email зарегистрирован, ссылка для восстановления отправлена.`;
  - ошибки показываются без технических деталей.
- Добавлен route `/admin/reset-password`.
- Добавлен компонент `AdminPasswordReset`:
  - принимает recovery session из URL hash или `code`;
  - задает новую сессию Supabase Auth;
  - проверяет новый пароль и подтверждение;
  - сохраняет новый пароль через `supabase.auth.updateUser`;
  - после успешной смены пароля выполняет sign out и предлагает вернуться ко входу.
- Добавлен стиль `.admin-link-button` и focus-visible для recovery-действия.

Проверка:

```bash
npm run quality
git diff --check
rg -n "Забыли пароль|resetPasswordForEmail|updateUser|reset-password|Если email зарегистрирован|recovery|admin-link-button" app components styles spec "Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md"
```

Результат:

- `npm run quality` выполнен успешно;
- production build сгенерировал `/`, `/_not-found`, `/admin`, `/admin/reset-password`;
- `git diff --check` выполнен без ошибок;
- service role key не добавлялся и не используется.

Ограничение:

- реальная отправка recovery email и переход по письму должны быть проверены на production после merge и корректной настройки Supabase Auth redirect URLs.

## Измененные файлы

- `Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/routing-and-ui.md`
- `components/admin/AdminAccess.tsx`
- `components/admin/AdminPasswordReset.tsx`
- `app/admin/reset-password/page.tsx`
- `styles/globals.css`

## Текущий этап после восстановления пароля

Этап 3: уточнить specs для поведения при недоступном Supabase/Auth.

Планируемые файлы:

- `spec/technical-specs/supabase-content-source.md`;
- `spec/technical-specs/architecture.md`;
- `spec/technical-specs/local-storage.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/routing-and-ui.md`.

Критерии готовности этапа:

- specs явно описывают, что публичная `/` при недоступном Supabase показывает подтвержденный локальный fallback без технической ошибки для посетителя;
- specs явно описывают, что при partial-data внешние кнопки текущей версии остаются видимыми, а недостающие или невалидные URL делают их неактивными;
- specs явно описывают, что `/admin` при недоступном Supabase/Auth показывает понятное русское сообщение и не показывает формы редактирования;
- уточнения не добавляют новые маршруты, заявки, auth покупателей, оплату, новые роли или изменения RLS/migrations;
- `git diff --check` проходит.

## Результат этапа 3

Выполнено:

- `spec/technical-specs/supabase-content-source.md` обновлен:
  - публичная `/` при недоступном Supabase, отсутствии env или обязательных rows использует подтвержденный локальный fallback;
  - посетителю не показываются технические ошибки Supabase, stack trace, env-ключи, policies или служебные детали;
  - partial-data приводится к безопасной модели: внешние кнопки текущей версии остаются видимыми, недостающие или невалидные URL делают их неактивными;
  - добавлены ручные проверки fallback и partial-data.
- `spec/technical-specs/architecture.md` обновлен:
  - data layer обязан быть устойчивым к ожидаемым сбоям Supabase на публичной странице;
  - админка не подменяет Supabase локальным fallback при записи;
  - недоступность Supabase/Auth не открывает формы редактирования.
- `spec/technical-specs/local-storage.md` обновлен:
  - локальный fallback закреплен только за публичной страницей `/`;
  - fallback не хранит пользовательские данные и не используется для admin-сохранений.
- `spec/feature-specs/admin-content-editing.md` обновлен:
  - при недоступном Supabase/Auth доктор видит понятный feedback;
  - формы редактирования не показываются до успешной проверки сессии и роли `doctor_admin`.
- `spec/technical-specs/admin-auth-and-access.md` обновлен:
  - защищенный маршрут не показывает редактор при недоступной проверке Auth или `admin_users`;
  - неуспешное сохранение не считается публикацией.
- `spec/technical-specs/routing-and-ui.md` обновлен:
  - добавлены UI-состояния для публичного fallback, partial-data и admin-недоступности.

Проверка:

```bash
rg -n "Supabase недоступ|Supabase/Auth недоступ|локальный fallback|partial-data|формы редактирования|stack trace|doctor_admin|Ссылка будет добавлена позже|Покупка временно недоступна" spec/technical-specs/supabase-content-source.md spec/technical-specs/architecture.md spec/technical-specs/local-storage.md spec/feature-specs/admin-content-editing.md spec/technical-specs/admin-auth-and-access.md spec/technical-specs/routing-and-ui.md "Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md"
git diff --check
```

Результат:

- нужные формулировки найдены в specs;
- `git diff --check` выполнен без ошибок;
- продуктовый код, migrations, Supabase data, RLS и env не менялись.

Следующий этап:

- уточнить manual medical content review для admin-редактирования в `medical-content-rules.md` и `admin-content-editing.md`.

## Текущий этап после Supabase unavailable

Этап 4: уточнить manual medical content review для admin-редактирования.

Планируемые файлы:

- `spec/feature-specs/medical-content-rules.md`;
- `spec/feature-specs/admin-content-editing.md`;
- `Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md`.

Критерии готовности этапа:

- specs явно описывают, что медицинская проверка admin-контента является ручной ответственностью доктора/владельца проекта;
- specs содержат короткий checklist перед сохранением медицински значимого текста;
- specs фиксируют, что текущая админка не выполняет автоматическую медицинскую модерацию;
- specs фиксируют, что сохранение через `/admin` означает, что доктор считает текст проверенным по `medical-content-rules.md`;
- уточнения не добавляют новые поля, маршруты, внешние сервисы, автоматическую модерацию, медицинские консультации или RLS/migrations;
- `git diff --check` проходит.

## Результат этапа 4

Выполнено:

- `spec/feature-specs/medical-content-rules.md` обновлен:
  - добавлен раздел `Проверка текстов через админку`;
  - зафиксировано, что медицинская проверка текстов из `/admin` является ручной ответственностью доктора и владельца проекта;
  - добавлен checklist запретов перед сохранением медицински значимого текста;
  - указано, что текущая админка не выполняет автоматическую медицинскую модерацию и не принимает медицинские решения за доктора.
- `spec/feature-specs/admin-content-editing.md` обновлен:
  - перед сохранением медицински значимого текста доктор вручную сверяет формулировку с `medical-content-rules.md`;
  - сохранение такого текста означает, что доктор считает его допустимым для публичной Taplink-страницы;
  - автоматическая медицинская модерация и внешняя медицинская проверка текстов явно не входят в текущую версию.

Проверка:

```bash
rg -n "Проверка текстов через админку|ручн|автоматическ.*медицинск|medical-content-rules|медицински значим|Сохранение текста|внешняя медицинская проверка" spec/feature-specs/medical-content-rules.md spec/feature-specs/admin-content-editing.md "Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md"
git diff --check
```

Результат:

- нужные формулировки найдены в specs;
- `git diff --check` выполнен без ошибок;
- продуктовый код, migrations, Supabase data, RLS и env не менялись.

Следующий этап:

- унифицировать правило публикации и кеша в `admin-content-editing.md`, если после текущих правок еще остаются общие формулировки.

## Текущий этап после manual medical content review

Этап 5: унифицировать правило публикации и кеша.

Планируемые файлы:

- `spec/feature-specs/admin-content-editing.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md`.

Критерии готовности этапа:

- `admin-content-editing.md` не использует общие формулировки вроде `после обновления данных и кеша` как основное правило публикации;
- specs явно говорят: после успешного сохранения данные сразу записываются и считаются опубликованными в Supabase;
- specs явно говорят: публичная страница может показать изменения примерно в течение 30 секунд из-за `revalidate: 30`;
- specs явно говорят: мгновенный сброс кеша после сохранения не входит в текущую версию;
- уточнения не добавляют новые routes, API, server actions, webhook, on-demand revalidation или изменение `revalidate`;
- `git diff --check` проходит.

## Результат этапа 5

Выполнено:

- `spec/feature-specs/admin-content-editing.md` обновлен:
  - активный новый курс сохраняется в Supabase сразу после `Сохранить`;
  - публичная страница может показать новый курс и другие изменения примерно в течение 30 секунд из-за `revalidate: 30`;
  - раздел `Публикация изменений` больше не использует общую формулировку `после обновления данных и кеша` как правило публикации;
  - отдельно сохранено ограничение: текущая версия не выполняет мгновенный сброс кеша после сохранения.
- `spec/technical-specs/admin-auth-and-access.md` обновлен:
  - правило появления нового активного курса приведено к той же формулировке: Supabase сразу, публичная страница примерно через 30 секунд из-за `revalidate: 30`.

Проверка:

```bash
rg -n "после обновления данных и кеша|после сохранения и обновления кеша|обновления кеша|мгновенный сброс кеша|30 секунд|revalidate: 30|публикац" spec/feature-specs/admin-content-editing.md spec/technical-specs/admin-auth-and-access.md "Work plans/Активные/087-razbor-zamechaniy-mentora-po-specs.md"
git diff --check
```

Результат:

- старые общие формулировки в актуальных specs заменены;
- нужные формулировки про `revalidate: 30` найдены;
- `git diff --check` выполнен без ошибок;
- продуктовый код, routes, API, migrations, Supabase data, RLS и env не менялись.

Следующий этап:

- выполнить итоговую проверку плана `087`, убедиться, что все gaps закрыты или явно отмечены, и подготовить перенос плана в завершенные после проверки.

## Итоговая проверка и закрытие плана

Итог по замечаниям:

1. `global-spec.md` устарел — закрыто поздними изменениями specs до начала этапов `087`.
2. Восстановление пароля admin — закрыто:
   - specs обновлены;
   - UI `Забыли пароль?` и route `/admin/reset-password` реализованы;
   - `npm run quality` прошел.
3. Если Supabase недоступен — закрыто:
   - specs явно описывают публичный fallback без технической ошибки;
   - partial-data внешних кнопок описан;
   - `/admin` при недоступном Supabase/Auth не показывает формы редактирования.
4. Проверка медицинского контента через admin — закрыто:
   - ручная ответственность доктора/владельца проекта зафиксирована;
   - checklist добавлен;
   - автоматическая медицинская модерация явно не входит в текущую версию.
5. Когда изменения появляются на сайте — закрыто:
   - правило публикации и кеша унифицировано;
   - дополнительно подтверждено и реализовано отдельным планом `089` мгновенное или почти мгновенное обновление `/` через защищенный `POST /admin/revalidate`;
   - обычный `revalidate: 30` остается fallback при ошибке revalidation.

Итоговая проверка:

```bash
rg -n "Забыли пароль|reset-password|Supabase недоступ|partial-data|Проверка текстов через админку|revalidatePath|/admin/revalidate|после обновления данных и кеша|мгновенный сброс кеша|doctor_admin" spec app components "Work plans/Завершенные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md"
npm run quality
git diff --check
```

Результат:

- подтверждающие формулировки найдены в specs и коде;
- `npm run quality` повторно выполнен успешно при закрытии плана `087`;
- `git diff --check` выполнен без ошибок;
- production build подтверждает route `ƒ /admin/revalidate`;
- открытых gaps из первичной сверки не осталось.

## Измененные файлы в рамках закрытия плана

- `Work plans/Завершенные/087-razbor-zamechaniy-mentora-po-specs.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git

- commit: не выполнен
- push: не выполнен
