# План 017: Feature specs README и блок "О докторе"

## Статус

Активный.

## Цель

Начать переписывание feature specs под новую Taplink-версию: создать карту актуальных feature specs и первый feature spec для блока `О докторе`.

## Подтверждение specs

Основание:

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- Первая версия является одной локальной страницей.
- На странице есть фото и имя доктора.
- Кнопка `О докторе` ведет к блоку о докторе на этой же странице.
- Блок `О докторе` может содержать информацию об образовании, знаниях, опыте и направлениях работы доктора.
- Блок `О докторе` не должен обещать лечение, выздоровление или гарантированный медицинский результат.
- В feature specs нужно раскрыть блок `О докторе`, блок `Курсы`, кнопку `Купить`, внешние ссылки, медицинские ограничения и будущую онлайн-покупку.

Вне specs:

- Конкретная биография, реальные тексты о докторе, фото и ссылки не подтверждены.
- Код приложения в этом плане не меняется.

## Что делаем

1. Создать `spec/feature-specs/README.md` с новой структурой feature specs.
2. Создать `spec/feature-specs/doctor-block.md`.
3. Явно отметить, что старые feature specs относятся к предыдущей версии и не являются актуальными требованиями новой Taplink-версии до переписывания.
4. Обновить навигационную карту specs для repo skill.
5. Обновить Roadmap после проверки.

## Что не делаем в этом плане

- Не удаляем старые feature specs.
- Не пишем реальные биографические данные за владельца проекта.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "doctor-block|О докторе|предыдущей версии|Taplink|feature specs|лечение|выздоровление|диагност" spec/feature-specs/README.md spec/feature-specs/doctor-block.md
git diff --check
```

Ручная проверка:

- Убедиться, что README задает новую карту feature specs.
- Убедиться, что `doctor-block.md` не добавляет конкретную биографию без подтверждения.
- Убедиться, что медицинские ограничения сохранены.

## Критерии готовности

- `spec/feature-specs/README.md` создан.
- `spec/feature-specs/doctor-block.md` создан.
- Старые feature specs помечены как файлы предыдущей версии до переписывания.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "doctor-block|О докторе|предыдущей версии|Taplink|feature specs|лечение|выздоровление|диагност|персональн|данн" spec/feature-specs/README.md spec/feature-specs/doctor-block.md
rg -n "doctor-block|courses-block|предыдущей версии|Taplink|feature-specs/README|feature-specs-outline|О докторе" .agents/skills/doctor-amal-specs/references/spec-map.md spec/feature-specs/README.md spec/feature-specs/doctor-block.md
git diff --check
```

Результат:

- `spec/feature-specs/README.md` создан и задает новую карту feature specs Taplink-версии.
- `spec/feature-specs/doctor-block.md` создан и описывает блок `О докторе`.
- Старые feature specs помечены как файлы предыдущей версии до переписывания.
- `doctor-block.md` не добавляет конкретную биографию, учебные заведения, фото или реальные пользовательские тексты без подтверждения.
- Медицинские ограничения сохранены: блок не должен обещать лечение, выздоровление, диагностику или персональные рекомендации.
- Навигационная карта skill обновлена под новые feature specs.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/017-feature-specs-readme-i-doctor-block.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/README.md spec/feature-specs/doctor-block.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/017-feature-specs-readme-i-doctor-block.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature specs для блока О докторе"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
