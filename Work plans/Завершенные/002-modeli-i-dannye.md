# План 002: Доменные модели и локальные данные

## Статус

Завершен.

## Цель

Добавить доменные TypeScript-модели, локальные JSON-данные курсов и статей, а также repository слой для чтения опубликованных курсов и статей.

## Подтверждение specs

Основание:

- `spec/technical-specs/data-model.md`
- `spec/technical-specs/local-storage.md`
- `spec/feature-specs/local-data-storage.md`
- `spec/technical-specs/architecture.md`
- `spec/feature-specs/course-catalog.md`
- `spec/feature-specs/articles.md`
- `spec/technical-specs/implementation-checklist.md`

Подтверждено:

- первая версия хранит seed-данные курсов и статей в локальных JSON-файлах;
- заявки в первой версии должны сохраняться через browser `localStorage`, но форма и сохранение заявок реализуются отдельным этапом;
- UI не должен напрямую читать JSON или `localStorage`, а должен использовать repository/service layer;
- нужны модели `Course`, `Article`, `UserRequest`;
- курсы и статьи должны иметь стабильные строковые `id`;
- черновики и архивные записи должны быть скрыты от пользователя;
- статьи без полного текста не должны открываться как полноценный материал;
- пользователь не должен видеть внутренние идентификаторы и служебные поля.

Вне specs:

- нет.

## Что делаем

1. Добавить доменные типы:
   - `domain/course.ts`
   - `domain/article.ts`
   - `domain/request.ts`
2. Добавить бизнес-правила продаж:
   - `domain/sales.ts`
3. Добавить локальные seed-данные:
   - `data/courses.json`
   - `data/articles.json`
4. Добавить repository слой:
   - `lib/repositories/courseRepository.ts`
   - `lib/repositories/articleRepository.ts`
5. Добавить базовые сообщения:
   - `lib/messages/ru.ts`
6. Проверить, что TypeScript и production build проходят.

## Что не делаем в этом плане

- Не реализуем полноценный каталог курсов.
- Не реализуем поиск и фильтры.
- Не реализуем страницу курса с реальными данными.
- Не реализуем список статей и страницу статьи с реальными данными.
- Не реализуем форму заявки.
- Не реализуем сохранение заявок в `localStorage`.
- Не добавляем серверный API.
- Не добавляем админку.
- Не меняем `spec/`.

## Проверка

Команды:

```bash
npm run build
```

Ручная проверка:

- приложение собирается без ошибок TypeScript;
- JSON-данные соответствуют доменным типам;
- repository функции скрывают неопубликованные и критически неполные данные;
- в коде нет прямого чтения JSON из UI-компонентов.

## Критерии готовности

- Есть модели `Course`, `Article`, `UserRequest`.
- Есть `data/courses.json` и `data/articles.json`.
- Есть `getPublishedCourses()` и `getCourseById()`.
- Есть `getPublishedArticles()` и `getArticleById()`.
- Черновики и архивные записи фильтруются.
- Статьи без полного текста фильтруются.
- Build проходит.

## Результат проверки

Техническая проверка выполнена 2026-05-15.

- `npm run build` сначала выявил проблему типизации JSON-импортов: TypeScript воспринимал поля JSON слишком широко.
- Repository слой исправлен: JSON сначала приводится к `unknown`, затем проходит через type guard.
- После исправления `npm run build` выполнен успешно.
- Проверено, что UI-слой не импортирует `data/courses.json` и `data/articles.json` напрямую.
- Проверено наличие ключевых функций:
  - `getPublishedCourses()`
  - `getCourseById()`
  - `getPublishedArticles()`
  - `getArticleById()`
  - `canSubmitCoursePurchase()`
- Проверены seed-данные:
  - всего курсов: 4;
  - опубликованных курсов: 3;
  - скрытых курсов: 1;
  - всего статей: 4;
  - полноценных опубликованных статей: 2;
  - скрытых или неполных статей: 2.

Ручная проверка пользователем подтверждена 2026-05-15. На этом этапе визуальные страницы не менялись, потому что подключение данных к UI запланировано следующими этапами.

## Измененные файлы

- `Work plans/Завершенные/002-modeli-i-dannye.md`
- `data/courses.json`
- `data/articles.json`
- `domain/course.ts`
- `domain/article.ts`
- `domain/request.ts`
- `domain/sales.ts`
- `lib/messages/ru.ts`
- `lib/repositories/courseRepository.ts`
- `lib/repositories/articleRepository.ts`
- удалены служебные `.gitkeep` из заполненных папок:
  - `data/.gitkeep`
  - `domain/.gitkeep`
  - `lib/.gitkeep`
  - `lib/messages/.gitkeep`
  - `lib/repositories/.gitkeep`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Добавить доменные модели и локальные данные"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
