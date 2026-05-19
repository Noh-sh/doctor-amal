# План 033: Удалить старые feature specs предыдущей версии

## Статус

Завершен.

## Цель

Удалить старые feature specs и старый outline предыдущей структуры после создания полного набора feature specs новой Taplink-версии.

## Подтверждение specs

Основание:

- подтверждение владельца проекта в текущей задаче;
- `spec/feature-specs/README.md`;
- `spec/functional-map.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- все feature specs из текущего списка новой Taplink-версии созданы;
- старые feature specs относятся к предыдущей версии с каталогом, отдельными страницами, заявками, статьями и локальным хранением;
- старые feature specs не являются актуальными требованиями новой Taplink-версии.

Вне specs:

- удаление technical specs предыдущей версии;
- удаление user stories предыдущей версии;
- изменение кода приложения.

## Что делаем

1. Удалить старые feature specs предыдущей версии.
2. Удалить старый `spec/feature-specs-outline.md`.
3. Обновить `spec/feature-specs/README.md`.
4. Обновить skill spec-map.
5. Обновить технические навигационные specs, чтобы они не ссылались на удаленные feature specs как на актуальные источники.
6. Обновить roadmap после проверки.

## Что не делаем в этом плане

- Не удаляем technical specs.
- Не удаляем user stories.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "course-catalog|course-detail-page|requests\\.md|doctor-profile|articles\\.md|local-data-storage|error-handling|Старые feature specs|feature-specs-outline" spec .agents Roadmap/project-roadmap.md
git diff --check
```

Ручная проверка:

- Убедиться, что удалены только старые feature specs и старый outline.
- Убедиться, что актуальные feature specs новой Taplink-версии остались.
- Убедиться, что текущие карты specs больше не направляют к удаленным feature specs.

## Критерии готовности

- Старые feature specs и старый outline удалены.
- `README.md`, spec-map и technical navigation не содержат актуальных ссылок на удаленные feature specs.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "course-catalog|course-detail-page|requests\\.md|doctor-profile|articles\\.md|local-data-storage|error-handling|Старые feature specs|feature-specs-outline" spec .agents Roadmap/project-roadmap.md
git diff --check
```

Результат:

- старые feature specs удалены;
- `spec/feature-specs-outline.md` удален;
- актуальные feature specs новой Taplink-версии остались в `spec/feature-specs/`;
- текущие карты specs больше не направляют к удаленным feature specs;
- `rg` не нашел совпадений по удаленным старым feature specs в актуальных specs, `.agents` и `Roadmap/project-roadmap.md`;
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/course-catalog.md`
- `spec/feature-specs/course-detail-page.md`
- `spec/feature-specs/requests.md`
- `spec/feature-specs/doctor-profile.md`
- `spec/feature-specs/articles.md`
- `spec/feature-specs/local-data-storage.md`
- `spec/feature-specs/error-handling.md`
- `spec/feature-specs-outline.md`
- `spec/feature-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/README.md`
- `spec/technical-specs/change-management.md`
- `Work plans/Завершенные/033-udalit-starye-feature-specs.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs spec/feature-specs-outline.md spec/technical-specs/README.md spec/technical-specs/change-management.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/033-udalit-starye-feature-specs.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Удалить старые feature specs"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
