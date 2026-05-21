# План 036: Technical specs для Taplink-версии

## Статус

Завершен.

## Цель

Переписать technical specs под актуальную первую локальную версию Doctor Amal: Next.js + TypeScript, одна Taplink-страница, внутренние блоки `О докторе` и `Курсы`, внешние кнопки, кнопка `Купить` с переходом в Telegram к менеджеру, без внутренних маршрутов, заявок, статей, `localStorage`, сервера, базы данных, админки и онлайн-оплаты.

## Подтверждение specs

Основание:

- `AGENTS.md`
- `.agents/skills/doctor-amal-specs/SKILL.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`
- `spec/feature-specs/courses-block.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/external-links.md`
- `spec/feature-specs/medical-content-rules.md`
- `spec/feature-specs/future-online-purchase.md`
- `spec/user-stories/README.md`
- `spec/user-stories/core-user-stories.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/user-stories/journey-checklist.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- Первая версия является одной локальной web-страницей в формате Taplink.
- Реализация должна быть на Next.js + TypeScript.
- В первую версию не входят отдельные внутренние маршруты, каталог, статьи, формы заявок, `localStorage` обращений, сервер, база данных, админка, авторизация, онлайн-оплата и сбор персональных данных.

Вне specs:

- Нового пользовательского поведения нет.

## Что делаем

1. Переписать technical specs под текущую Taplink-версию.
2. Оставить Next.js + TypeScript и App Router как техническую основу.
3. Заменить старые модели курсов, статей и заявок на модели Taplink-страницы.
4. Убрать текущие требования к заявкам, статьям, поиску, фильтрам, `localStorage` и внутренним маршрутам первой версии.
5. Обновить future extension plan под будущую онлайн-версию с CMS/админкой как отдельный этап.
6. Обновить карту specs, roadmap и план.

## Что не делаем в этом плане

- Не выбираем CMS или админку для второй версии.
- Не добавляем онлайн-оплату.
- Не добавляем код.
- Не делаем commit, push или merge.

## Проверка

Команды:

```bash
rg -n "каталог|стать|заявк|localStorage|salesStatus|courseId|articleId|/courses|/request|/articles|форма покупки|форма заявки|поиск|фильтр" spec/technical-specs .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
git status --short --branch
```

Ручная проверка:

- Сверить technical specs с `global-spec.md`, `functional-map.md`, feature specs и user stories.
- Проверить, что technical specs не добавляют новое поведение сверх первой Taplink-версии.

## Критерии готовности

- Technical specs описывают одну Next.js Taplink-страницу.
- Старые требования к каталогу, заявкам, статьям, поиску, фильтрам, `localStorage` и внутренним маршрутам не являются требованиями первой версии.
- Future extension plan отделяет будущую онлайн-версию от текущей первой версии.
- Проверка выполнена и записана в план.

## Результат проверки

Выполнены команды:

```bash
rg -n "каталог|стать|заявк|localStorage|salesStatus|courseId|articleId|/courses|/request|/articles|форма покупки|форма заявки|поиск|фильтр" spec/technical-specs .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
git status --short --branch
```

Результат:

- Technical specs переписаны под одну Next.js Taplink-страницу.
- Старые темы каталога, статей, заявок, `localStorage`, поиска, фильтров и внутренних маршрутов остались только как запреты, отсутствующие модели или будущие возможности, но не как требования первой версии.
- `future-extension-plan.md` отделяет будущую онлайн-версию с CMS/админкой от текущей первой версии.
- `git diff --check` выполнен без ошибок.
- Код не менялся.

## Измененные файлы

- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/README.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/routing-and-ui.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/local-storage.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/technical-specs/future-extension-plan.md`
- `spec/technical-specs/change-management.md`
- `Work plans/Завершенные/036-technical-specs-taplink.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Commit, push и merge выполнить позже только после отдельного подтверждения пользователя.
