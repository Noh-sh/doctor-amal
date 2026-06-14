# План 080: UI, responsive и accessibility-приемка

## Статус

Завершен.

## Цель

Проверить публичную страницу `/` и админку `/admin` на поддерживаемых ширинах, зафиксировать результаты и исправить только подтвержденные UI/accessibility bugs без изменения продуктового сценария.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `Design map/design-rules.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/routing-and-ui.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- публичная страница и `/admin` должны работать на ширинах `360`, `390`, `768`, `1024`, `1440`;
- не должно быть горизонтального скролла, переполнения и перекрытий;
- интерактивные элементы должны быть доступны с клавиатуры;
- disabled-состояния должны отличаться не только цветом;
- loading, error, empty, disabled и success states должны быть понятными;
- дизайн можно улучшать только в рамках текущих specs и `Design map/design-rules.md`.

Вне specs:

- новые маршруты, формы, заявки, оплата, аналитика;
- новые данные, новые платформы или новые admin-функции;
- изменение медицинских формулировок или условий покупки.

## Что делаем

1. Запустить локальную проверку.
2. Проверить `/` и `/admin` на ширинах `360`, `390`, `768`, `1024`, `1440`.
3. Проверить горизонтальный скролл, перекрытия, переносы длинного текста, focus/keyboard states, labels, alt, disabled/success/error states.
4. Если найден bug в рамках specs, исправить минимально.
5. Выполнить quality gate.
6. Записать результаты проверки в этот план и roadmap.

## Проверка

Команды:

```bash
npm run quality
git diff --check
```

Дополнительно:

- локальная visual/responsive проверка `/`;
- локальная visual/responsive проверка `/admin`;
- скриншоты или текстовая фиксация результатов.

## Критерии готовности

- Все проверочные ширины пройдены или найденные отклонения исправлены/зафиксированы.
- Нет горизонтального скролла и перекрытий.
- UI не выходит за текущие specs.
- `npm run quality` проходит.
- `git diff --check` проходит.

## Результат проверки

- Прочитаны требования master plan `068`, `Design map/design-rules.md`, `implementation-checklist.md`, `routing-and-ui.md`, `admin-auth-and-access.md`.
- Проверены публичные компоненты `/`, `/admin` и `styles/globals.css` на явные keyboard/focus/disabled/overflow риски.
- Найден bug: у основных публичных Taplink-кнопок и admin-кнопок не было явного `:focus-visible`, при этом у course summary focus state уже был.
- Исправлено: добавлен `focus-visible` для `.taplink-button`, `.button`, `.admin-button`.
- Продуктовый сценарий, маршруты, тексты, данные, Supabase и business rules не менялись.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

Ограничение проверки:

- Полная автоматизированная screenshot-приемка ширин `360`, `390`, `768`, `1024`, `1440` не выполнена, потому что в проекте нет Playwright/browser tooling.
- Следующий UI-план должен либо добавить согласованный инструмент визуальной проверки, либо выполнить ручную browser-проверку и зафиксировать результаты.

## Измененные файлы

- `styles/globals.css`
- `Work plans/Завершенные/080-ui-responsive-accessibility-priemka.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
