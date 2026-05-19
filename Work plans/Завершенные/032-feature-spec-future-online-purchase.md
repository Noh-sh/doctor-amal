# План 032: Feature spec будущей онлайн-покупки

## Статус

Завершен.

## Цель

Создать `spec/feature-specs/future-online-purchase.md` как отдельный feature spec будущей онлайн-покупки, которая не входит в первую локальную версию Doctor Amal.

Документ должен зафиксировать границу: первая локальная версия остается Taplink-страницей с переходом в Telegram к менеджеру, а онлайн-покупка внутри проекта возможна только в будущем после отдельного подтверждения, обновления specs и отдельной реализации.

## Подтверждение specs

Основание:

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- первая локальная версия не включает оформление покупки внутри проекта;
- первая локальная версия не включает онлайн-оплату;
- первая локальная версия не собирает и не хранит данные пользователя;
- кнопка `Купить` в первой версии ведет в Telegram для связи с менеджером;
- будущая онлайн-покупка может появиться только при необходимости и после отдельного подтверждения владельца проекта;
- будущая онлайн-покупка не является обязательной функцией будущей онлайн-версии.

Вне specs:

- конкретный платежный провайдер;
- поля формы покупки;
- серверный API;
- база данных покупок;
- личный кабинет;
- автоматическая выдача доступа;
- юридические тексты оплаты и возвратов.

## Что делаем

1. Создать `spec/feature-specs/future-online-purchase.md`.
2. Зафиксировать, что онлайн-покупка не входит в первую локальную версию.
3. Описать возможный будущий сценарий только как направление развития.
4. Зафиксировать, что перед реализацией будущей онлайн-покупки нужны отдельные specs.
5. Обновить `spec/feature-specs/README.md` и skill spec-map.

## Что не делаем в этом плане

- Не добавляем онлайн-покупку в текущую версию.
- Не выбираем платежного провайдера.
- Не описываем финальную форму покупки.
- Не добавляем серверную часть, базу данных или личный кабинет.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "future-online-purchase|будущ|онлайн-покуп|онлайн-оплат|первая локальная|не входит|данн|платеж|доступ|Telegram|подтвержд" spec/feature-specs/README.md spec/feature-specs/future-online-purchase.md spec/feature-specs/course-purchase-link.md spec/functional-map.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Ручная проверка:

- Убедиться, что future spec не переносит онлайн-покупку в первую локальную версию.
- Убедиться, что future spec не придумывает платежного провайдера, поля формы или API.
- Убедиться, что текущая кнопка `Купить` остается переходом в Telegram к менеджеру.

## Критерии готовности

- `future-online-purchase.md` создан.
- `README.md` и `spec-map.md` обновлены.
- Граница между первой локальной версией и будущей онлайн-покупкой не размыта.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "future-online-purchase|будущ|онлайн-покуп|онлайн-оплат|первая локальная|не входит|данн|платеж|доступ|Telegram|подтвержд" spec/feature-specs/README.md spec/feature-specs/future-online-purchase.md spec/feature-specs/course-purchase-link.md spec/functional-map.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Результат:

- `future-online-purchase.md` создан и связан с картой feature specs;
- зафиксировано, что онлайн-покупка не входит в первую локальную версию;
- зафиксировано, что текущая кнопка `Купить` остается переходом в Telegram к менеджеру;
- зафиксировано, что будущая онлайн-покупка не является обязательной функцией будущей онлайн-версии;
- платежный провайдер, поля формы, API, база данных, личный кабинет и автоматическая выдача доступа не придуманы;
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/future-online-purchase.md`
- `spec/feature-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/032-feature-spec-future-online-purchase.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/future-online-purchase.md spec/feature-specs/README.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/032-feature-spec-future-online-purchase.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature spec будущей онлайн-покупки"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
