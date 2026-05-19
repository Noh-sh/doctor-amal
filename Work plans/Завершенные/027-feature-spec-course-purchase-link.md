# План 027: Feature spec кнопки "Купить"

## Статус

Завершен.

## Цель

Создать отдельный feature spec для кнопки `Купить` в блоке `Курсы`.

Документ должен уточнить, что в первой локальной версии кнопка не оформляет покупку внутри проекта, не запускает оплату и не собирает данные пользователя, а переводит пользователя в Telegram для связи с менеджером.

## Подтверждение specs

Основание:

- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/courses-block.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- первая версия является локальной одностраничной страницей;
- блок `Курсы` находится на этой же странице;
- кнопка `Купить` показывается внутри раскрытого курса;
- кнопка `Купить` ведет в Telegram для связи с менеджером;
- покупка внутри проекта, форма, онлайн-оплата и сбор данных не входят в первую локальную версию.

Вне specs:

- точная Telegram-ссылка для покупки;
- финальный текст неактивного состояния;
- правило открытия ссылки в текущей или новой вкладке;
- любые формы, платежи и автоматический доступ в закрытый Telegram-канал.

## Что делаем

1. Создать `spec/feature-specs/course-purchase-link.md`.
2. Описать поведение кнопки `Купить`.
3. Зафиксировать активное и неактивное состояние кнопки.
4. Зафиксировать запреты первой локальной версии.
5. Обновить карту feature specs и skill spec-map.

## Что не делаем в этом плане

- Не добавляем Telegram-ссылку.
- Не добавляем форму заявки.
- Не добавляем онлайн-оплату.
- Не добавляем сбор данных.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "course-purchase-link|Купить|Telegram|менеджер|неактивн|Ссылка будет добавлена позже|Покупка временно недоступна|форма|онлайн-оплат|данн|закрытый Telegram" spec/feature-specs/README.md spec/feature-specs/course-purchase-link.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Ручная проверка:

- Убедиться, что кнопка `Купить` не описана как покупка внутри проекта.
- Убедиться, что без Telegram-ссылки кнопка не выглядит как рабочая ссылка.
- Убедиться, что формы, оплата и сбор данных остаются за пределами первой локальной версии.

## Критерии готовности

- `course-purchase-link.md` создан.
- `README.md` и `spec-map.md` обновлены.
- Поведение кнопки `Купить` не противоречит `functional-map.md` и `courses-block.md`.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "course-purchase-link|Купить|Telegram|менеджер|неактивн|Ссылка будет добавлена позже|Покупка временно недоступна|форма|онлайн-оплат|данн|закрытый Telegram" spec/feature-specs/README.md spec/feature-specs/course-purchase-link.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Результат:

- `course-purchase-link.md` создан и связан с `courses-block.md`.
- Зафиксировано, что `Купить` ведет в Telegram к менеджеру.
- Зафиксировано, что `Купить` не оформляет покупку внутри проекта, не запускает оплату, не открывает форму и не собирает данные.
- Зафиксировано неактивное состояние кнопки без Telegram-ссылки.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/027-feature-spec-course-purchase-link.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/course-purchase-link.md spec/feature-specs/README.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/027-feature-spec-course-purchase-link.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature spec кнопки Купить"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
