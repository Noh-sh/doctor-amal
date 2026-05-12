# План 001: Каркас проекта

## Статус

Завершен.

## Цель

Создать минимальный Next.js + TypeScript каркас первой локальной версии Doctor Amal.

## Подтверждение specs

Основание:

- `spec/technical-specs/architecture.md`
- `spec/technical-specs/routing-and-ui.md`
- `spec/technical-specs/implementation-checklist.md`

Подтверждено:

- приложение должно быть локальным web-приложением на Next.js;
- используется TypeScript и App Router;
- обязательны маршруты главной страницы, страницы о докторе, каталога курсов, страницы курса, формы заявки, списка статей, страницы статьи и 404;
- все пользовательские тексты должны быть на русском языке;
- на первом этапе нельзя добавлять онлайн-оплату, серверную запись данных, авторизацию, диагностику или автоматический доступ в Telegram.

## Что делаем

1. Создать базовую структуру Next.js проекта.
2. Добавить основные папки:
   - `app/`
   - `components/`
   - `data/`
   - `domain/`
   - `lib/`
   - `styles/`
3. Добавить базовые маршруты:
   - `/`
   - `/doctor`
   - `/courses`
   - `/courses/[courseId]`
   - `/request`
   - `/articles`
   - `/articles/[articleId]`
   - `not-found`
4. Добавить общий layout и навигацию:
   - Главная
   - О докторе
   - Курсы
   - Статьи
5. Добавить минимальные русские тексты-заглушки без новых продуктовых обещаний.

## Что не делаем в этом плане

- Не реализуем каталог курсов.
- Не добавляем формы заявок.
- Не добавляем оплату.
- Не добавляем серверный API.
- Не добавляем авторизацию.
- Не добавляем медицинскую диагностику.
- Не меняем `spec/`.

## Проверка

После реализации выполнить:

```bash
npm run dev
```

Открыть вручную:

```text
/
/doctor
/courses
/request
/articles
```

Затем выполнить:

```bash
npm run build
```

## Критерии готовности

- Dev server запускается.
- Основные маршруты открываются.
- Навигация работает.
- Пользовательские тексты на русском языке.
- Временные страницы отличаются по смыслу и структуре: каталог выглядит как будущий каталог, статьи как список материалов, заявка как будущая форма, страница о докторе как информационная страница.
- Нет функций вне `spec/`.
- Production build проходит.

## Результат проверки

Техническая проверка выполнена 2026-05-12.

- `npm install` сначала не прошел в sandbox из-за отсутствия доступа к `registry.npmjs.org`; после разрешения сетевого доступа зависимости установлены.
- `next` обновлен до актуальной версии `16.2.6`, `react` и `react-dom` обновлены до `19.2.6`.
- `npm audit --audit-level=moderate` показывает 2 moderate уязвимости в транзитивной зависимости `postcss`, которая приходит через актуальный `next`. `npm audit fix --force` не применялся, потому что предлагает breaking change с откатом на старый Next.
- `npm run build` выполнен успешно.
- `npm run dev` запущен на `http://localhost:3000`.
- Техническая проверка маршрутов через `curl -I` вне sandbox показала `200 OK` для:
  - `/`
  - `/doctor`
  - `/courses`
  - `/request`
  - `/articles`
  - `/courses/test-course`
  - `/articles/test-article`
- После ручного замечания страницы `/courses` и `/articles` разведены по смыслу и структуре:
  - `/courses` показывает макет будущего каталога с фильтрами, статусом продаж и карточкой курса;
  - `/articles` показывает макет будущего списка материалов с метаданными статьи и переходом к чтению;
  - раздел статей не ведет напрямую к заявке на покупку.
- После этой правки `npm run build` повторно выполнен успешно.

Ручная проверка пользователем выполнена 2026-05-12: основные страницы открываются, навигация работает, разделы `Курсы` и `Статьи` визуально и логически различаются.

## Измененные файлы

- `package.json`
- `package-lock.json`
- `.gitignore`
- `next-env.d.ts`
- `next.config.ts`
- `tsconfig.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/doctor/page.tsx`
- `app/courses/page.tsx`
- `app/courses/[courseId]/page.tsx`
- `app/request/page.tsx`
- `app/articles/page.tsx`
- `app/articles/[articleId]/page.tsx`
- `app/not-found.tsx`
- `styles/globals.css`
- `components/.gitkeep`
- `components/layout/.gitkeep`
- `components/courses/.gitkeep`
- `components/articles/.gitkeep`
- `components/requests/.gitkeep`
- `components/common/.gitkeep`
- `data/.gitkeep`
- `domain/.gitkeep`
- `lib/.gitkeep`
- `lib/repositories/.gitkeep`
- `lib/validation/.gitkeep`
- `lib/messages/.gitkeep`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Создать базовый каркас приложения"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
