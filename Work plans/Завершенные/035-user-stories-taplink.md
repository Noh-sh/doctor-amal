# План 035: User stories для Taplink-версии

## Статус

Завершен.

## Цель

Переписать `spec/user-stories/` под актуальную первую локальную версию Doctor Amal: одну Taplink-страницу с блоками `О докторе`, `Курсы`, внешними кнопками и переходом `Купить` в Telegram к менеджеру.

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
- `spec/technical-specs/change-management.md`

Подтверждено:

- Первая локальная версия является одной web-страницей в формате Taplink.
- В первой версии есть блоки `О докторе` и `Курсы`, кнопки внешних платформ и кнопка `Купить` с переходом в Telegram к менеджеру.
- В первую версию не входят внутренние маршруты, каталог, поиск, фильтры, статьи, формы заявок, онлайн-оплата, сервер, база данных и сбор персональных данных.

Вне specs:

- Нового пользовательского поведения нет.

## Что делаем

1. Переписать `spec/user-stories/README.md` под новую роль user stories.
2. Обновить персоны под Taplink-страницу.
3. Переписать основные user stories под подтвержденные сценарии первой версии.
4. Переписать edge cases под состояния без ссылок, без курсов, ожидания покупки и медицинской помощи.
5. Обновить journey checklist под одну страницу.
6. Выполнить проверку и обновить roadmap после завершения плана.

## Что не делаем в этом плане

- Не меняем `global-spec.md`, `functional-map.md` и feature specs.
- Не выбираем финальный способ раскрытия курса.
- Не подтверждаем точные URL внешних платформ.
- Не подтверждаем финальные тексты, список курсов, цены и Telegram-ссылку менеджера.
- Не меняем код.
- Не делаем commit, push или merge.

## Проверка

Команды:

```bash
rg -n "каталог|поиск|фильтр|заявк|стать|localStorage|/courses|/request|оплата картой|закрыт" spec/user-stories
git diff --check
git status --short --branch
```

Ручная проверка:

- Сверить user stories с `global-spec.md`, `functional-map.md` и актуальными feature specs.
- Проверить, что user stories не добавляют новое поведение сверх specs.

## Критерии готовности

- `spec/user-stories/` не описывает старую версию с каталогом, заявками, статьями, поиском, фильтрами и внутренними маршрутами.
- Основные сценарии соответствуют одной Taplink-странице.
- Исключительные ситуации соответствуют подтвержденным ограничениям первой версии.
- Journey checklist пригоден для ручной проверки будущей Taplink-реализации.

## Результат проверки

Выполнены команды:

```bash
rg -n "Открывает каталог|страница курса|страница статьи|форма заявки|заявка сохраняется|поиск работает|фильтр|localStorage|salesStatus|courseId|articleId|/courses|/request|/articles" spec/user-stories .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
git diff --stat
git status --short --branch
```

Результат:

- User stories переписаны под одну Taplink-страницу.
- Старые сценарии каталога, поиска, фильтров, статей, заявок, внутренних маршрутов, `localStorage`, `salesStatus`, `courseId` и `articleId` не используются как текущие пользовательские сценарии.
- Упоминания старой функциональности в `spec/user-stories/` остались только как запреты или проверки отсутствия поведения, которое не входит в первую локальную версию.
- Финальный короткий текст медицинского ограничения подтвержден и зафиксирован: `Информация на странице носит ознакомительный характер.`
- `functional-map.md` приведен к текущей логике блока `Курсы`: цена видна в свернутом курсе, а после раскрытия показываются описание и кнопка `Купить` без дублирования цены.
- `git diff --check` выполнен без ошибок.
- Код не менялся.

## Измененные файлы

- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/functional-map.md`
- `spec/feature-specs/medical-content-rules.md`
- `spec/user-stories/README.md`
- `spec/user-stories/personas.md`
- `spec/user-stories/core-user-stories.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/user-stories/journey-checklist.md`
- `Work plans/Завершенные/035-user-stories-taplink.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

Commit, push и merge выполнить позже только после отдельного подтверждения пользователя.
