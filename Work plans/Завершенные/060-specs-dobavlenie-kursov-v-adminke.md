# План 060: Specs добавления курсов в админке

## Статус

Завершен.

## Цель

Подготовить и согласовать требования для добавления новых курсов через админку, прежде чем менять код, RLS policies или Supabase migrations.

## Подтверждение specs

Основание:

- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- текущая админка может редактировать существующие курсы;
- добавление новых курсов через админку не входит в текущую реализацию;
- если позже потребуется добавление новых курсов, нужно отдельно подтвердить `insert` policy и правила обязательных полей;
- изменение требований должно сначала пройти через specs.

Вне specs:

- реализация добавления курса в коде пока вне текущих specs;
- `insert` policy для `courses` пока вне текущих specs;
- правила slug, sort order и обязательных полей для нового курса пока не описаны полностью.

## Что делаем

1. Уточнить product-сценарий добавления нового курса в `/admin`.
2. Зафиксировать, какие поля доктор заполняет при создании курса:
   - название;
   - описание;
   - цена текстом;
   - подтверждение цены;
   - активность курса.
3. Уточнить технические правила:
   - как формируется `slug`;
   - как назначается `sort_order`;
   - какое значение получает `purchase_label`;
   - можно ли создать курс сразу активным;
   - как показывать ошибку при пустых обязательных полях.
4. Уточнить Supabase/RLS изменения:
   - нужна ли `insert` policy для `courses`;
   - какие grants нужны `authenticated`;
   - как не дать `anon` write-доступ.
5. Обновить релевантные specs после подтверждения владельца проекта.
6. Не переходить к коду до принятия specs.

## Что не делаем в этом плане

- Не меняем код админки.
- Не создаем migrations.
- Не меняем Supabase policies.
- Не добавляем удаление курсов.
- Не добавляем drag-and-drop сортировку.
- Не добавляем отдельные страницы курсов, оплату, заявки, покупателей, аналитику, черновики или журнал изменений.

## Проверка

Команды после изменения specs:

```bash
git diff --check
rg -n "insert|добавление новых курсов|sort_order|slug|delete" spec/feature-specs spec/technical-specs
```

Ручная проверка:

- specs не разрешают удаление курсов без отдельного требования;
- specs не добавляют оплату, заявки, покупателей или личный кабинет;
- specs явно отделяют будущую реализацию от текущего шага.

## Критерии готовности

- Требования добавления курса через админку описаны в specs.
- Поля нового курса и технические правила создания понятны.
- Supabase/RLS изменения описаны до кода.
- Следующий план реализации можно создать без серых зон.

## Результат проверки

- `git diff --check` выполнен без ошибок.
- `rg -n "insert|добавление новых курсов|sort_order|slug|delete" spec/feature-specs spec/technical-specs` подтвердил, что specs описывают `insert` для `courses`, правила `slug`, `sort_order`, скрытие через `is_active = false` и отсутствие `delete` на текущем этапе.
- Ручная проверка specs выполнена: новые требования не добавляют оплату, заявки, покупателей, отдельные страницы курсов, журнал изменений, черновики или физическое удаление курсов.

## Измененные файлы

- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/supabase-content-source.md`
- `Work plans/Завершенные/060-specs-dobavlenie-kursov-v-adminke.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/admin-content-editing.md spec/technical-specs/admin-auth-and-access.md spec/technical-specs/supabase-content-source.md "Work plans/Завершенные/060-specs-dobavlenie-kursov-v-adminke.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Уточнить specs добавления курсов в админке"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
