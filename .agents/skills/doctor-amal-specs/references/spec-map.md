# Карта спецификаций Doctor Amal

Эта карта помогает быстро выбрать нужные specs. Она не является источником требований. Источник правды находится в `spec/`.

## Базовый контекст

- `spec/global-spec.md` — обзор проекта, методология, основные компоненты, технические требования, цели и границы ответственности.
- `spec/functional-map.md` — роли, пользовательские пути, точки взаимодействия, основные функции, границы первой локальной версии и будущие направления.
- `spec/feature-specs/README.md` — актуальная карта feature specs новой Taplink-версии и статус старых feature specs.
- `spec/feature-specs-outline.md` — старый материал для feature specs предыдущей версии; не использовать как основание для новой Taplink-версии.

## Пользовательские сценарии

- `spec/user-stories/README.md` — назначение user stories, источники, формат и правило использования.
- `spec/user-stories/personas.md` — персоны пользователей и будущего владельца проекта.
- `spec/user-stories/core-user-stories.md` — основные сценарии: знакомство, поиск курса, страница курса, заявка на покупку, консультация по подбору, статьи, закрытые продажи.
- `spec/user-stories/edge-case-stories.md` — исключительные ситуации: пустой поиск, несуществующий курс, черновик курса, ошибки формы, повторная отправка, пустые списки, ожидание медицинской помощи.

## Feature specs новой Taplink-версии

- `spec/feature-specs/README.md` — карта актуальных feature specs новой Taplink-версии.
- `spec/feature-specs/doctor-block.md` — блок `О докторе`, допустимые данные, действия пользователя и медицинские ограничения.
- `spec/feature-specs/courses-block.md` — блок `Курсы`, структура курса, цена, раскрытие курса и ограничения первой версии.

Остальные новые feature specs будут добавляться по очереди:

- `spec/feature-specs/course-purchase-link.md` — кнопка `Купить` и переход в Telegram к менеджеру.
- `spec/feature-specs/external-links.md` — внешние кнопки и поведение ссылок.
- `spec/feature-specs/medical-content-rules.md` — медицинские ограничения пользовательских текстов.
- `spec/feature-specs/future-online-purchase.md` — будущая онлайн-покупка, не входящая в первую локальную версию.

## Старые feature specs предыдущей версии

Эти файлы относятся к предыдущей версии проекта с каталогом, отдельными страницами, заявками, статьями и локальным хранением. До переписывания они не являются актуальными требованиями новой Taplink-версии:

- `spec/feature-specs/course-catalog.md`;
- `spec/feature-specs/course-detail-page.md`;
- `spec/feature-specs/requests.md`;
- `spec/feature-specs/doctor-profile.md`;
- `spec/feature-specs/articles.md`;
- `spec/feature-specs/local-data-storage.md`;
- `spec/feature-specs/error-handling.md`.

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

- Блок "О докторе" новой Taplink-версии: `doctor-block.md`, `functional-map.md`, `global-spec.md`.
- Блок "Курсы" новой Taplink-версии: `courses-block.md`, `functional-map.md`, `README.md`.
- Кнопка `Купить`: `README.md`, `functional-map.md`, затем новый `course-purchase-link.md`, когда он будет создан.
- Внешние кнопки: `README.md`, `functional-map.md`, затем новый `external-links.md`, когда он будет создан.
- Медицинские ограничения текстов: `doctor-block.md`, `functional-map.md`, затем новый `medical-content-rules.md`, когда он будет создан.
- Каталог курсов предыдущей версии: `course-catalog.md`, `routing-and-ui.md`, `data-model.md`, `core-user-stories.md`, `edge-case-stories.md`.
- Страница курса предыдущей версии: `course-detail-page.md`, `routing-and-ui.md`, `data-model.md`, `core-user-stories.md`, `edge-case-stories.md`.
- Заявки и формы предыдущей версии: `requests.md`, `requests-and-validation.md`, `local-storage.md`, `data-model.md`, `error-handling.md`.
- Страница "О докторе" предыдущей версии: `doctor-profile.md`, `routing-and-ui.md`, `functional-map.md`.
- Статьи и Telegram-материалы предыдущей версии: `articles.md`, `routing-and-ui.md`, `data-model.md`, `local-storage.md`.
- Ошибки и пустые состояния предыдущей версии: `error-handling.md`, `edge-case-stories.md`, `routing-and-ui.md`.
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
