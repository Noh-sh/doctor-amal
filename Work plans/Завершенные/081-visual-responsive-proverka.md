# План 081: Visual responsive проверка

## Статус

Завершен.

## Цель

Проверить публичную страницу `/` и админку `/admin` на ширинах `360`, `390`, `768`, `1024`, `1440` с фиксацией результата, чтобы закрыть ограничение плана `080`.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `Work plans/Завершенные/080-ui-responsive-accessibility-priemka.md`;
- `Design map/design-rules.md`;
- `spec/technical-specs/implementation-checklist.md`;
- `spec/technical-specs/routing-and-ui.md`;
- `spec/technical-specs/admin-auth-and-access.md`;
- `spec/technical-specs/change-management.md`.

Подтверждено:

- публичная страница и `/admin` должны работать на ширинах `360`, `390`, `768`, `1024`, `1440`;
- не должно быть горизонтального скролла, переполнения и перекрытий;
- интерактивные элементы должны быть доступны с клавиатуры;
- loading, error, empty, disabled и success states должны быть понятными;
- дизайн можно улучшать только в рамках текущих specs и `Design map/design-rules.md`.

Вне specs:

- новые маршруты, формы, заявки, оплата, аналитика;
- новые данные, новые платформы или admin-функции;
- изменение медицинских формулировок или условий покупки.

## Что делаем

1. Запустить локальный dev server.
2. Попробовать временный `npx playwright` для screenshot/responsive проверки без изменения `package.json`.
3. Проверить `/` и `/admin` на ширинах `360`, `390`, `768`, `1024`, `1440`.
4. Зафиксировать отсутствие или наличие горизонтального скролла и явных перекрытий.
5. Если найден bug в рамках specs, исправить минимально.
6. Выполнить `npm run quality` и `git diff --check`.

## Что не делаем

- Не добавляем новую постоянную test dependency без отдельного решения.
- Не меняем продуктовый сценарий.
- Не меняем Supabase, данные, routes или тексты.

## Проверка

Команды:

```bash
npm run dev
npx playwright ...
npm run quality
git diff --check
```

Если `npx playwright` недоступен из-за сети или browser install, это фиксируется как ограничение проверки.

## Критерии готовности

- Результаты проверки по ширинам зафиксированы.
- Найденные UI/accessibility bugs исправлены или явно записаны как ограничение.
- `npm run quality` проходит.
- `git diff --check` проходит.

## Результат проверки

- Локальный dev server запущен через `npm run dev` на `http://localhost:3000`.
- Временный Playwright использован через `npx playwright@latest`; `package.json` и `package-lock.json` не менялись.
- Chromium runtime скачан во внешний пользовательский cache Playwright.
- Сняты screenshots:
  - `/private/tmp/doctor-amal-visual/home-360.png`;
  - `/private/tmp/doctor-amal-visual/home-390.png`;
  - `/private/tmp/doctor-amal-visual/home-768.png`;
  - `/private/tmp/doctor-amal-visual/home-1024.png`;
  - `/private/tmp/doctor-amal-visual/home-1440.png`;
  - `/private/tmp/doctor-amal-visual/admin-360.png`;
  - `/private/tmp/doctor-amal-visual/admin-390.png`;
  - `/private/tmp/doctor-amal-visual/admin-768.png`;
  - `/private/tmp/doctor-amal-visual/admin-1024.png`;
  - `/private/tmp/doctor-amal-visual/admin-1440.png`.
- `/` проверена на ширинах `360`, `390`, `768`, `1024`, `1440`:
  - явных перекрытий не найдено;
  - горизонтальный скролл визуально не обнаружен;
  - кнопки и disabled-состояния читаемы;
  - первый экран и медицинское ограничение отображаются корректно.
- `/admin` проверена на ширинах `360`, `390`, `768`, `1024`, `1440`:
  - screenshots пересняты после появления `.admin-form`;
  - форма входа помещается в mobile и desktop viewport;
  - поля и кнопка читаемы;
  - явных перекрытий не найдено.
- Dev server остановлен после проверки; порт `3000` освобожден.
- UI bugfix в этом плане не потребовался.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `Work plans/Завершенные/081-visual-responsive-proverka.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`
