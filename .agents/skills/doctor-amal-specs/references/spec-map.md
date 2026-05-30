# Карта спецификаций Doctor Amal

Эта карта помогает быстро выбрать нужные specs. Она не является источником требований. Источник правды находится в `spec/`.

## Базовый контекст

- `spec/global-spec.md` — обзор проекта, методология, основные компоненты, технические требования, цели и границы ответственности.
- `spec/functional-map.md` — роли, пользовательские пути, точки взаимодействия, основные функции, границы первой локальной версии и будущие направления.
- `spec/feature-specs/README.md` — актуальная карта feature specs новой Taplink-версии и статус старых feature specs.

## Пользовательские сценарии

- `spec/user-stories/README.md` — назначение user stories первой Taplink-версии, источники, формат и правило использования.
- `spec/user-stories/personas.md` — персоны пользователей одной Taplink-страницы и будущего владельца проекта.
- `spec/user-stories/core-user-stories.md` — основные сценарии: первое знакомство, блок `О докторе`, блок `Курсы`, раскрытие курса, кнопка `Купить`, внешние платформы и медицинские ограничения.
- `spec/user-stories/edge-case-stories.md` — исключительные ситуации: неподтвержденные URL, отсутствие Telegram-ссылки менеджера, неподтвержденные курсы и цены, недоступность внешней платформы, ожидание оплаты внутри проекта, ожидание медицинской помощи и старого формата сайта.
- `spec/user-stories/journey-checklist.md` — проверочный список пользовательских путей одной Taplink-страницы.

## Feature specs новой Taplink-версии

- `spec/feature-specs/README.md` — карта актуальных feature specs новой Taplink-версии.
- `spec/feature-specs/doctor-block.md` — блок `О докторе`, допустимые данные, действия пользователя и медицинские ограничения.
- `spec/feature-specs/courses-block.md` — блок `Курсы`, структура курса, цена, раскрытие курса и ограничения первой версии.
- `spec/feature-specs/course-purchase-link.md` — кнопка `Купить`, переход в Telegram к менеджеру, состояние без ссылки и ограничения без оплаты и сбора данных.
- `spec/feature-specs/external-links.md` — внешние кнопки `Telegram`, `WhatsApp`, `YouTube`, `Instagram`, подтвержденные URL и состояние без ссылки.
- `spec/feature-specs/medical-content-rules.md` — медицинские ограничения пользовательских текстов, запрет обещаний результата, диагностики, схем лечения и персональных рекомендаций.
- `spec/feature-specs/future-online-purchase.md` — будущая онлайн-покупка, не входящая в первую локальную версию.

## Technical specs

- `spec/technical-specs/README.md` — назначение technical specs первой Taplink-версии, источники требований, обязательный стек и ограничения.
- `spec/technical-specs/architecture.md` — Next.js + TypeScript архитектура одной Taplink-страницы, слои, данные, Client/Server Components, ограничения.
- `spec/technical-specs/routing-and-ui.md` — единственный публичный маршрут `/`, структура страницы, блоки, кнопки, раскрытие курса, UI-состояния и доступность.
- `spec/technical-specs/data-model.md` — локальные модели `TaplinkPageData`, `DoctorProfile`, `Course`, `ExternalLink`, `PurchaseSettings`.
- `spec/technical-specs/local-storage.md` — допустимые локальные данные проекта и запрет пользовательского `localStorage` в первой версии.
- `spec/technical-specs/requests-and-validation.md` — отсутствие заявок и форм в первой версии, проверка локального контента и ссылок.
- `spec/technical-specs/supabase-content-source.md` — первый Supabase-этап: online-источник контента страницы без изменения публичного сценария, без заявок, оплаты, auth покупателей, заказов, медицинских данных и MCP.
- `spec/technical-specs/supabase-dashboard-setup.md` — инструкция и SQL для online Supabase Dashboard: таблицы контента, RLS policies, seed текущего контента и проверочные запросы.
- `spec/technical-specs/change-management.md` — порядок изменения Taplink-проекта, какие specs читать перед изменением, рискованные изменения и regression checklist.
- `spec/technical-specs/implementation-checklist.md` — чеклист реализации и приемочные сценарии одной Taplink-страницы.
- `spec/technical-specs/future-extension-plan.md` — план будущей онлайн-версии с CMS/админкой и возможной онлайн-покупкой; не использовать для текущей реализации без подтверждения пользователя.

## Как выбирать specs по задаче

- Блок "О докторе" новой Taplink-версии: `doctor-block.md`, `functional-map.md`, `global-spec.md`.
- Блок "Курсы" новой Taplink-версии: `courses-block.md`, `functional-map.md`, `README.md`.
- Кнопка `Купить`: `course-purchase-link.md`, `courses-block.md`, `functional-map.md`, `README.md`.
- Внешние кнопки: `external-links.md`, `functional-map.md`, `README.md`.
- Медицинские ограничения текстов: `medical-content-rules.md`, `doctor-block.md`, `courses-block.md`, `functional-map.md`.
- Будущая онлайн-покупка: `future-online-purchase.md`, `course-purchase-link.md`, `functional-map.md`, `global-spec.md`.
- Архитектура и структура Next.js: `architecture.md`, `routing-and-ui.md`, `data-model.md`, `local-storage.md`, `implementation-checklist.md`.
- Локальные данные проекта: `data-model.md`, `local-storage.md`, `requests-and-validation.md`.
- Supabase как источник контента страницы: `supabase-content-source.md`, `supabase-dashboard-setup.md`, `architecture.md`, `data-model.md`, `requests-and-validation.md`, `future-extension-plan.md`, `course-purchase-link.md`, `future-online-purchase.md`.
- Будущие CMS, админка, онлайн-версия или онлайн-покупка: `future-extension-plan.md`, `future-online-purchase.md`, но только для планирования, не для реализации текущей версии.

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
