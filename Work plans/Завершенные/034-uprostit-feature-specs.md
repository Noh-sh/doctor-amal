# План 034: Упростить feature specs

## Статус

Завершен.

## Цель

Убрать лишние повторы из feature specs и удалить из `doctor-block.md` связь с будущей онлайн-покупкой, которая не относится к блоку `О докторе`.

## Подтверждение specs

Основание:

- `AGENTS.md`
- `.agents/skills/doctor-amal-specs/SKILL.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- Feature specs должны раскрывать требования `global-spec.md` и `functional-map.md`, не добавляя новые функции.
- Пользователь подтвердил чистку повторов и удаление лишней связи онлайн-покупки из `doctor-block.md`.

Вне specs:

- Нового пользовательского поведения нет.

## Что делаем

1. Уточнить в `feature-specs/README.md`, что общие запреты не нужно механически повторять в каждом feature spec.
2. Упростить `doctor-block.md`: оставить ограничения блока, но убрать лишнюю будущую онлайн-покупку.
3. Проверить diff и статус git.

## Что не делаем в этом плане

- Не меняем бизнес-правила первой версии.
- Не добавляем новые функции.
- Не меняем код.

## Проверка

Команды:

```bash
git diff -- spec/feature-specs/README.md spec/feature-specs/doctor-block.md
git status --short --branch
```

Ручная проверка:

- Проверить, что смысл ограничений первой версии сохранен.

## Критерии готовности

- `doctor-block.md` больше не связывает блок `О докторе` с будущей онлайн-покупкой.
- В feature specs зафиксирован принцип меньшего дублирования общих запретов.
- Проверка выполнена и записана в план.

## Результат проверки

Выполнены команды:

```bash
git diff -- spec/feature-specs/README.md spec/feature-specs/doctor-block.md
git status --short --branch
```

Результат:

- `spec/feature-specs/README.md` фиксирует, что общие ограничения первой локальной версии не нужно механически повторять в каждом feature spec.
- `spec/feature-specs/doctor-block.md` больше не связывает блок `О докторе` с будущей онлайн-покупкой.
- Ограничения первой версии сохранены через ссылку на `global-spec.md`, `functional-map.md` и `medical-content-rules.md`.
- Код не менялся.

## Измененные файлы

- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`
- `Work plans/Завершенные/034-uprostit-feature-specs.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Упростить feature specs"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
