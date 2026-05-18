# План 013: Порядок кнопок в functional map

## Статус

Завершен.

## Цель

Зафиксировать порядок кнопок первой версии так, чтобы `Курсы` шли сразу после `О докторе`.

## Подтверждение specs

Основание:

- Подтверждение владельца проекта в текущей задаче.
- `spec/functional-map.md`

Подтверждено:

- В первой версии кнопка `Курсы` должна идти после кнопки `О докторе`.

Вне specs:

- Новые кнопки, ссылки и поведение не добавляются.

## Что делаем

1. Обновить порядок кнопок в `spec/functional-map.md`.
2. Обновить порядок описания поведения кнопок в `spec/functional-map.md`.
3. Обновить актуальное резюме в `Roadmap/project-roadmap.md`.

## Что не делаем в этом плане

- Не меняем код приложения.
- Не добавляем новые кнопки.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "О докторе|Курсы|Telegram|WhatsApp|YouTube|Instagram" spec/functional-map.md Roadmap/project-roadmap.md
git diff --check
```

Ручная проверка:

- Убедиться, что порядок кнопок: `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`.

## Критерии готовности

- В `functional-map.md` кнопка `Курсы` идет сразу после `О докторе`.
- В актуальном Roadmap отражен тот же порядок.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n '1\. `О докторе`|2\. `Курсы`|3\. `Telegram`|4\. `WhatsApp`|5\. `YouTube`|6\. `Instagram`|### О докторе|### Курсы|### Telegram|### WhatsApp|### YouTube|### Instagram|кнопки `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`' spec/functional-map.md Roadmap/project-roadmap.md
git diff --check
```

Результат:

- В списке кнопок первой версии порядок зафиксирован как `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`.
- В разделе поведения кнопок `Курсы` идет сразу после `О докторе`.
- В актуальном резюме Roadmap отражен тот же порядок.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/functional-map.md`
- `Roadmap/project-roadmap.md`
- `Work plans/Завершенные/013-poryadok-knopok-v-functional-map.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/functional-map.md "Work plans/Завершенные/013-poryadok-knopok-v-functional-map.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Уточнить порядок кнопок в functional map"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
