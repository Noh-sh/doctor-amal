# План 029: Feature spec внешних ссылок

## Статус

Завершен.

## Цель

Создать `spec/feature-specs/external-links.md` для внешних кнопок первой локальной версии Doctor Amal.

Документ должен уточнить подтвержденные внешние платформы, состояние кнопок без URL, границы ответственности проекта после перехода и вопросы, которые нужно подтвердить перед реализацией.

## Подтверждение specs

Основание:

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- первая локальная версия является одной локальной web-страницей в формате Taplink;
- в первой версии есть кнопки `Telegram`, `WhatsApp`, `YouTube`, `Instagram`;
- внешние кнопки ведут на подтвержденные внешние платформы;
- конкретные URL должны быть добавлены в specs перед реализацией;
- без подтвержденной ссылки внешнюю кнопку можно показывать только как неактивную кнопку или будущий раздел;
- проект не отвечает за содержание, доступность и правила работы внешних платформ после перехода.

Вне specs:

- точные URL внешних платформ;
- финальные тексты неактивных состояний;
- правило открытия ссылки в текущей или новой вкладке;
- аналитика переходов;
- автоматическая проверка доступности внешних платформ.

## Что делаем

1. Создать `spec/feature-specs/external-links.md`.
2. Описать кнопки `Telegram`, `WhatsApp`, `YouTube`, `Instagram`.
3. Описать активное и неактивное состояние внешних ссылок.
4. Зафиксировать, что точные URL и правило открытия ссылок должны быть подтверждены перед реализацией.
5. Обновить `spec/feature-specs/README.md` и skill spec-map.

## Что не делаем в этом плане

- Не добавляем точные URL.
- Не добавляем аналитику переходов.
- Не добавляем проверку доступности платформ.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "external-links|Telegram|WhatsApp|YouTube|Instagram|внешн|URL|неактивн|новой вкладке|аналитик|доступност" spec/feature-specs/README.md spec/feature-specs/external-links.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Ручная проверка:

- Убедиться, что spec не придумывает точные URL.
- Убедиться, что внешние кнопки без URL не описаны как рабочие ссылки.
- Убедиться, что spec не добавляет аналитику, серверную проверку доступности или сбор данных.

## Критерии готовности

- `external-links.md` создан.
- `README.md` и `spec-map.md` обновлены.
- Поведение внешних ссылок не противоречит `functional-map.md`.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "external-links|Telegram|WhatsApp|YouTube|Instagram|внешн|URL|неактивн|новой вкладке|аналитик|доступност" spec/feature-specs/README.md spec/feature-specs/external-links.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Результат:

- `external-links.md` создан и связан с картой feature specs;
- зафиксированы внешние кнопки `Telegram`, `WhatsApp`, `YouTube`, `Instagram`;
- зафиксировано, что рабочая внешняя ссылка возможна только после подтверждения точного URL;
- зафиксировано, что внешние кнопки не являются аналитикой, интеграцией, авторизацией, оплатой, формой или сбором данных;
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/external-links.md`
- `spec/feature-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/029-feature-spec-external-links.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/external-links.md spec/feature-specs/README.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/029-feature-spec-external-links.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature spec внешних ссылок"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
