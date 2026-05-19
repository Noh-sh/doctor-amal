# План 028: Уточнить общую Telegram-ссылку кнопки "Купить"

## Статус

Завершен.

## Цель

Уточнить в feature specs, что для всех курсов используется одна общая Telegram-ссылка на одного менеджера, а при переходе в Telegram должно передаваться название выбранного курса.

## Подтверждение specs

Основание:

- Подтверждение владельца проекта в текущей задаче.
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/courses-block.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- менеджер один;
- Telegram-ссылка для покупки общая для всех курсов;
- при переходе в Telegram нужно передавать название выбранного курса, чтобы менеджеру было понятно, какой курс интересует пользователя.

Вне specs:

- точная Telegram-ссылка;
- технический способ передачи названия курса;
- правило открытия ссылки в текущей или новой вкладке;
- текст неактивного состояния кнопки без ссылки.

## Что делаем

1. Обновить `spec/feature-specs/course-purchase-link.md`.
2. Обновить `spec/feature-specs/courses-block.md`, чтобы структура курса не требовала отдельную ссылку для каждого курса.
3. Зафиксировать, что точную ссылку и технический формат передачи названия курса нужно подтвердить перед реализацией.

## Что не делаем в этом плане

- Не добавляем точную Telegram-ссылку.
- Не выбираем технический формат deep link.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "общ|один менеджер|название выбранного курса|purchaseTarget|Telegram-ссылка|технический способ|Купить" spec/feature-specs/course-purchase-link.md spec/feature-specs/courses-block.md
git diff --check
```

Ручная проверка:

- Убедиться, что specs больше не требуют отдельную Telegram-ссылку для каждого курса.
- Убедиться, что передача названия курса описана как подтвержденное требование.
- Убедиться, что точная ссылка и технический способ передачи названия не придуманы.

## Критерии готовности

- `course-purchase-link.md` обновлен.
- `courses-block.md` не противоречит общей ссылке на одного менеджера.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "общ|один менеджер|название выбранного курса|purchaseTarget|Telegram-ссылка|технический способ|Купить" spec/feature-specs/course-purchase-link.md spec/feature-specs/courses-block.md
git diff --check
```

Результат:

- зафиксирована одна общая Telegram-ссылка на одного менеджера для всех курсов;
- `purchaseTarget` убран из структуры отдельного курса;
- зафиксирована передача названия выбранного курса в Telegram;
- точная ссылка и технический способ передачи названия курса оставлены на подтверждение перед реализацией;
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/courses-block.md`
- `Work plans/Завершенные/028-utochnit-obshchuyu-telegram-ssylku-kupit.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/course-purchase-link.md spec/feature-specs/courses-block.md "Work plans/Завершенные/028-utochnit-obshchuyu-telegram-ssylku-kupit.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Уточнить Telegram-ссылку кнопки Купить"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
