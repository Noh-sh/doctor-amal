# План 020: Feature spec блока "Курсы"

## Статус

Завершен.

## Цель

Создать `spec/feature-specs/courses-block.md` для блока `Курсы` новой Taplink-версии.

## Подтверждение specs

Основание:

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`

Подтверждено:

- Первая версия является одной локальной страницей.
- Кнопка `Курсы` ведет к блоку курсов на этой же странице.
- Блок `Курсы` может показывать названия курсов, краткое описание каждого курса, цену курса и кнопку `Купить`.
- При нажатии на конкретный курс пользователь может увидеть описание курса и цену в рамках этой же страницы.
- Кнопка `Купить` не открывает форму внутри проекта и не запускает онлайн-оплату. Она переводит пользователя в Telegram для связи с менеджером.
- В первой версии нет отдельного каталога курсов, внутренних страниц курса, форм, сбора данных и онлайн-оплаты.

Вне specs:

- Реальные названия курсов, описания, цены, валюта, способ раскрытия курса и Telegram-ссылка к менеджеру пока не подтверждены.
- Детальное поведение кнопки `Купить` будет раскрыто в `course-purchase-link.md`.

## Что делаем

1. Создать `spec/feature-specs/courses-block.md`.
2. Обновить `spec/feature-specs/README.md`, чтобы отметить созданный `courses-block.md`.
3. Обновить карту specs в repo skill.
4. Обновить Roadmap после проверки.

## Что не делаем в этом плане

- Не удаляем старые feature specs.
- Не добавляем реальные курсы, цены и ссылки.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "courses-block|Курсы|Купить|Telegram|цена|описание|онлайн-оплат|форма|данн|отдельн" spec/feature-specs/README.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Ручная проверка:

- Убедиться, что блок `Курсы` не превращается в отдельный каталог или страницу курса.
- Убедиться, что `Купить` ведет в Telegram к менеджеру, но подробности покупки оставлены для `course-purchase-link.md`.
- Убедиться, что реальные курсы и цены не придуманы без подтверждения.

## Критерии готовности

- `spec/feature-specs/courses-block.md` создан.
- README feature specs обновлен.
- Карта specs skill обновлена.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "courses-block|Курсы|Купить|Telegram|цена|описание|онлайн-оплат|форма|данн|отдельн|каталог|корзин|оплатить|выздоров|диагноз" spec/feature-specs/README.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Результат:

- `spec/feature-specs/courses-block.md` создан.
- Блок `Курсы` описан как часть одной локальной страницы, без отдельного каталога и маршрутов.
- Структура курса описана на уровне содержания: название, краткое описание, цена, дополнительное описание, кнопка `Купить`, переход в Telegram.
- Реальные курсы, цены, валюта и Telegram-ссылка не придуманы без подтверждения.
- Онлайн-оплата, формы, сбор данных, корзина и автоматический доступ в закрытый Telegram-канал не добавлены в первую локальную версию.
- README feature specs и карта specs skill обновлены.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/README.md`
- `spec/feature-specs/courses-block.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/020-feature-spec-courses-block.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/README.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/020-feature-spec-courses-block.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature spec блока Курсы"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
