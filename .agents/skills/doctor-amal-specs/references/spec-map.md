# Карта спецификаций Doctor Amal

Эта карта помогает быстро выбрать нужные specs. Она не является источником требований. Источник правды находится в `spec/`.

## Базовый контекст

- `spec/global-spec.md` — обзор проекта, методология, основные компоненты, технические требования, цели и границы ответственности.
- `spec/functional-map.md` — роли, пользовательские пути, точки взаимодействия, основные функции, границы первой локальной версии и будущие направления.
- `spec/feature-specs-outline.md` — материал и структура для feature specs; использовать как вспомогательный контекст, а не как замену готовым feature specs.

## Пользовательские сценарии

- `spec/user-stories/README.md` — назначение user stories, источники, формат и правило использования.
- `spec/user-stories/personas.md` — персоны пользователей и будущего владельца проекта.
- `spec/user-stories/core-user-stories.md` — основные сценарии: знакомство, поиск курса, страница курса, заявка на покупку, консультация по подбору, статьи, закрытые продажи.
- `spec/user-stories/edge-case-stories.md` — исключительные ситуации: пустой поиск, несуществующий курс, черновик курса, ошибки формы, повторная отправка, пустые списки, ожидание медицинской помощи.

## Feature specs

- `spec/feature-specs/course-catalog.md` — каталог курсов, поиск, фильтрация, карточки, статусы, пустые состояния.
- `spec/feature-specs/course-detail-page.md` — страница курса, данные курса, статусы продаж, действия пользователя, похожие курсы, ошибки.
- `spec/feature-specs/requests.md` — заявки на покупку и консультацию по подбору курса, поля, статусы, сохранение, сообщения, ошибки.
- `spec/feature-specs/doctor-profile.md` — страница "О докторе", доверие, роль курсов, переходы, ограничения.
- `spec/feature-specs/articles.md` — статьи и Telegram-материалы, темы, список, отдельная статья, связь с курсами, ограничения.
- `spec/feature-specs/local-data-storage.md` — локальное хранение данных первой версии, временные форматы, ошибки хранения.
- `spec/feature-specs/error-handling.md` — ошибки, подсказки, пустые состояния, статусы продаж, ошибки формы и недоступные сущности.

## Technical specs

- `spec/technical-specs/README.md` — назначение technical specs, источники требований, обязательный стек и ограничения.
- `spec/technical-specs/architecture.md` — тип приложения, структура Next.js, слои, обязательные страницы, бизнес-правила, offline-first, локализация, доступность.
- `spec/technical-specs/routing-and-ui.md` — маршруты, навигация, страницы, состояния интерфейса, правила показа действий, UI-тексты, адаптивность.
- `spec/technical-specs/data-model.md` — модели данных проекта, поля курсов, статей, заявок и связанные типы.
- `spec/technical-specs/local-storage.md` — repository API, загрузка курсов и статей, сохранение заявок в localStorage, поврежденные данные, экспорт.
- `spec/technical-specs/requests-and-validation.md` — типы заявок, инициализация формы, валидация, создание заявки, защита от повторной отправки, сообщения.
- `spec/technical-specs/change-management.md` — порядок изменения проекта, какие specs читать перед изменением, рискованные изменения, regression checklist.
- `spec/technical-specs/implementation-checklist.md` — чеклист реализации и приемочные сценарии.
- `spec/technical-specs/future-extension-plan.md` — план будущего расширения; не использовать для текущей реализации без подтверждения пользователя.

## Как выбирать specs по задаче

- Каталог курсов: `course-catalog.md`, `routing-and-ui.md`, `data-model.md`, `core-user-stories.md`, `edge-case-stories.md`.
- Страница курса: `course-detail-page.md`, `routing-and-ui.md`, `data-model.md`, `core-user-stories.md`, `edge-case-stories.md`.
- Заявки и формы: `requests.md`, `requests-and-validation.md`, `local-storage.md`, `data-model.md`, `error-handling.md`.
- Страница "О докторе": `doctor-profile.md`, `routing-and-ui.md`, `functional-map.md`.
- Статьи и Telegram-материалы: `articles.md`, `routing-and-ui.md`, `data-model.md`, `local-storage.md`.
- Ошибки и пустые состояния: `error-handling.md`, `edge-case-stories.md`, `routing-and-ui.md`.
- Локальное хранение: `local-data-storage.md`, `local-storage.md`, `data-model.md`, `architecture.md`.
- Архитектура и структура приложения: `architecture.md`, `routing-and-ui.md`, `technical-specs/README.md`, `change-management.md`.
- Будущие возможности: `future-extension-plan.md`, но только для планирования, не для реализации текущей версии.

## Роли specs

- `global-spec.md` и `functional-map.md` задают общие границы проекта.
- `user-stories/` описывают цели пользователя и пользовательский путь.
- `feature-specs/` описывают поведение конкретной функции.
- `technical-specs/` описывают техническую реализацию, данные, маршруты, хранение, валидацию и проверки.
- `future-extension-plan.md` описывает будущее направление и не является текущим backlog.

Если specs дополняют друг друга, использовать их вместе. Если specs прямо противоречат друг другу, остановиться, назвать конфликт и запросить решение пользователя.

## Приоритеты при чтении

- Для границ проекта сначала смотреть `global-spec.md` и `functional-map.md`.
- Для цели пользователя сначала смотреть `user-stories/`.
- Для поведения функции сначала смотреть соответствующий файл из `feature-specs/`.
- Для реализации сначала смотреть соответствующий файл из `technical-specs/`.
- Для изменений после паузы или спорных случаев смотреть `spec/technical-specs/change-management.md`.
- Для будущих идей смотреть `future-extension-plan.md`, но не считать его разрешением на текущую реализацию.

## Контроль перед изменениями

Перед любым изменением ответ должен содержать внутреннюю проверку:

- Требование найдено в specs: да или нет.
- Прочитанные specs.
- Подтвержденная часть.
- Неподтвержденная часть, если есть.
- Решение: реализовать, реализовать частично или остановиться.
