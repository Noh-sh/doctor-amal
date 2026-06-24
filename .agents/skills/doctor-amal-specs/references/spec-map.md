# Карта спецификаций Doctor Amal

Эта карта помогает быстро выбрать нужные specs. Она не является источником требований. Источник правды находится в `spec/`.

## Базовый контекст

- `spec/global-spec.md` — обзор проекта, методология, основные компоненты, технические требования, цели и границы ответственности.
- `spec/functional-map.md` — роли, пользовательские пути, точки взаимодействия, основные функции, границы текущей online-версии и будущие направления.
- `spec/feature-specs/README.md` — актуальная карта feature specs новой Taplink-версии и статус старых feature specs.

## Пользовательские сценарии

- `spec/user-stories/README.md` — назначение user stories текущей Taplink-версии, источники, формат и правило использования.
- `spec/user-stories/personas.md` — персоны пользователей одной Taplink-страницы и доктора как редактора контента.
- `spec/user-stories/core-user-stories.md` — основные сценарии: первое знакомство, блок `О докторе`, блок `Курсы`, раскрытие курса, кнопка `Купить`, внешние платформы и медицинские ограничения.
- `spec/user-stories/edge-case-stories.md` — исключительные ситуации: неподтвержденные URL, отсутствие Telegram-ссылки менеджера, неподтвержденные курсы и цены, недоступность внешней платформы, ожидание оплаты внутри проекта, ожидание медицинской помощи и старого формата сайта.
- `spec/user-stories/journey-checklist.md` — проверочный список пользовательских путей одной Taplink-страницы.
- `spec/user-stories/admin-user-stories.md` — текущие user stories доктора как редактора контента через админку, без auth покупателей, оплаты, заявок и медицинских данных.

## Feature specs новой Taplink-версии

- `spec/feature-specs/README.md` — карта актуальных feature specs новой Taplink-версии.
- `spec/feature-specs/doctor-block.md` — блок `О докторе`, допустимые данные, действия пользователя и медицинские ограничения.
- `spec/feature-specs/courses-block.md` — блок `Курсы`, структура курса, цена, раскрытие курса и ограничения текущей версии.
- `spec/feature-specs/course-purchase-link.md` — кнопка `Купить`, переход в Telegram к менеджеру, состояние без ссылки и ограничения без оплаты и сбора данных.
- `spec/feature-specs/external-links.md` — внешние кнопки `Telegram`, `WhatsApp`, `YouTube`, `Instagram`, подтвержденные URL и состояние без ссылки.
- `spec/feature-specs/medical-content-rules.md` — медицинские ограничения пользовательских текстов, запрет обещаний результата, диагностики, схем лечения и персональных рекомендаций.
- `spec/feature-specs/future-online-purchase.md` — будущая онлайн-покупка, не входящая в текущую версию.
- `spec/feature-specs/admin-content-editing.md` — текущая админка для редактирования контента доктором: профиль, курсы, цены, ссылки и Telegram менеджера.
- `spec/feature-specs/admin-photo-management.md` — загрузка и замена фото доктора через админку.
- `spec/feature-specs/admin-course-removal.md` — безопасное удаление курсов через админку без физического удаления row.

## Technical specs

- `spec/technical-specs/README.md` — назначение technical specs текущей Taplink-версии, источники требований, обязательный стек и ограничения.
- `spec/technical-specs/architecture.md` — Next.js + TypeScript архитектура публичной страницы и защищенной админки, слои, данные, Client/Server Components и ограничения.
- `spec/technical-specs/routing-and-ui.md` — публичный маршрут `/`, защищенный маршрут `/admin`, структура страницы, блоки, кнопки, раскрытие курса, UI-состояния и доступность.
- `spec/technical-specs/data-model.md` — Supabase-модели и локальный fallback для `TaplinkPageData`, `DoctorProfile`, `Course`, `ExternalLink`, `PurchaseSettings`.
- `spec/technical-specs/local-storage.md` — локальный fallback и запрет пользовательского `localStorage` в текущей версии.
- `spec/technical-specs/requests-and-validation.md` — отсутствие публичных заявок и форм, а также валидация контента в админке.
- `spec/technical-specs/supabase-content-source.md` — текущий online-источник контента страницы без заявок, оплаты, auth покупателей, заказов и медицинских данных.
- `spec/technical-specs/supabase-dashboard-setup.md` — инструкция и SQL для online Supabase Dashboard: таблицы контента, RLS policies, seed текущего контента и проверочные запросы.
- `spec/technical-specs/supabase-mcp-access.md` — правила текущего read-only MCP-доступа к Supabase: инспекция и проверка без обхода specs и CLI migrations.
- `spec/technical-specs/admin-auth-and-access.md` — текущая админка: Supabase Auth email/password, доступ только для доктора и RLS write policies для контентных таблиц.
- `supabase/migrations/` — Supabase CLI migrations для воспроизводимого создания таблиц, RLS policies и seed-контента.
- `spec/technical-specs/change-management.md` — порядок изменения Taplink-проекта, какие specs читать перед изменением, рискованные изменения и regression checklist.
- `spec/technical-specs/implementation-checklist.md` — чеклист реализации и приемочные сценарии публичной страницы и админки.
- `spec/technical-specs/future-extension-plan.md` — план будущих функций сверх текущих Supabase и админки; не использовать для текущей реализации без подтверждения пользователя.

## Как выбирать specs по задаче

- Блок "О докторе" новой Taplink-версии: `doctor-block.md`, `functional-map.md`, `global-spec.md`.
- Блок "Курсы" новой Taplink-версии: `courses-block.md`, `functional-map.md`, `README.md`.
- Кнопка `Купить`: `course-purchase-link.md`, `courses-block.md`, `functional-map.md`, `README.md`.
- Внешние кнопки: `external-links.md`, `functional-map.md`, `README.md`.
- Медицинские ограничения текстов: `medical-content-rules.md`, `doctor-block.md`, `courses-block.md`, `functional-map.md`.
- Будущая онлайн-покупка: `future-online-purchase.md`, `course-purchase-link.md`, `functional-map.md`, `global-spec.md`.
- Архитектура и структура Next.js: `architecture.md`, `routing-and-ui.md`, `data-model.md`, `local-storage.md`, `implementation-checklist.md`.
- Данные проекта и локальный fallback: `data-model.md`, `local-storage.md`, `requests-and-validation.md`.
- Supabase как источник контента страницы: `supabase-content-source.md`, `supabase-dashboard-setup.md`, `architecture.md`, `data-model.md`, `requests-and-validation.md`, `future-extension-plan.md`, `course-purchase-link.md`, `future-online-purchase.md`.
- Supabase MCP access: `supabase-mcp-access.md`, `supabase-content-source.md`, `supabase-dashboard-setup.md`, `change-management.md`.
- Админка и Auth для редактирования контента: `admin-content-editing.md`, `admin-user-stories.md`, `admin-auth-and-access.md`, `change-management.md`, `supabase-content-source.md`.
- Загрузка фото через админку: `admin-photo-management.md`, `admin-content-editing.md`, `admin-auth-and-access.md`, `supabase-content-source.md`.
- Безопасное удаление курсов через админку: `admin-course-removal.md`, `admin-content-editing.md`, `admin-auth-and-access.md`, `supabase-content-source.md`.
- Будущие расширения админки, новые роли, физическое удаление курсов, восстановление удаленных курсов через UI или онлайн-покупка: `future-extension-plan.md`, `future-online-purchase.md`, но только для планирования, не для реализации текущей версии.

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
