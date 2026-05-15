# Хронология проекта

Записи добавляются после завершения каждого проверенного плана.

## Формат записи

Для новой записи использовать шаблон `Roadmap/TEMPLATE.md`.

```md
## YYYY-MM-DD - Название завершенного плана

- План: `Work plans/Завершенные/...`
- Статус: завершено
- Области: `Frontend`, `Дизайн`, `Проверка`
- Specs:
  - `spec/...`
- Сделано:
  - ...
- Проверка:
  - ...
- Измененные файлы:
  - ...
- Git:
  - commit: не выполнен / `hash`
  - push: не выполнен / выполнен
- Следующий шаг:
  - ...
```

## 2026-05-11 - Инициализация процесса работы

- План: без отдельного завершенного плана
- Статус: выполнено
- Области: `Процесс`, `Документация`
- Specs:
  - `AGENTS.md`
  - `spec/technical-specs/architecture.md`
  - `spec/technical-specs/routing-and-ui.md`
  - `spec/technical-specs/implementation-checklist.md`
- Сделано:
  - создана рабочая структура `Work plans/`;
  - добавлены папки `Активные/` и `Завершенные/`;
  - создан первый активный план каркаса проекта;
  - создана папка `Roadmap/` для хронологической истории;
  - в `AGENTS.md` добавлены правила работы с планами.
- Проверка:
  - проверена структура файлов;
  - git-действия не выполнялись.
- Измененные файлы:
  - `AGENTS.md`
  - `Work plans/README.md`
  - `Work plans/Активные/001-karkas-proekta.md`
  - `Roadmap/README.md`
  - `Roadmap/chronology.md`
- Git:
  - commit: не выполнен
  - push: не выполнен
- Следующий шаг:
  - выполнить первый активный план `Work plans/Активные/001-karkas-proekta.md`, проверить результат вручную и через build.

## 2026-05-12 - Каркас проекта

- План: `Work plans/Завершенные/001-karkas-proekta.md`
- Статус: завершено
- Области: `Frontend`, `Дизайн`, `Проверка`, `Документация`
- Specs:
  - `spec/technical-specs/architecture.md`
  - `spec/technical-specs/routing-and-ui.md`
  - `spec/technical-specs/implementation-checklist.md`
- Сделано:
  - создан минимальный Next.js + TypeScript каркас;
  - добавлен App Router с базовыми маршрутами `/`, `/doctor`, `/courses`, `/courses/[courseId]`, `/request`, `/articles`, `/articles/[articleId]`;
  - добавлен общий layout и навигация;
  - добавлена страница 404;
  - добавлены базовые стили;
  - добавлены служебные папки `components/`, `data/`, `domain/`, `lib/`, `styles/`;
  - временные страницы разделены по смыслу и структуре, чтобы `Курсы`, `Статьи`, `Заявка` и `О докторе` не выглядели одинаковыми заглушками;
  - добавлен `.gitignore` для `node_modules/`, `.next/`, env-файлов и логов.
- Проверка:
  - `npm install` выполнен после разрешения сетевого доступа к npm registry;
  - `npm run build` выполнен успешно;
  - dev server запущен на `http://localhost:3000`;
  - техническая проверка маршрутов через `curl -I` показала `200 OK`;
  - ручная проверка пользователем выполнена успешно.
- Измененные файлы:
  - `.gitignore`
  - `package.json`
  - `package-lock.json`
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
  - `Work plans/Завершенные/001-karkas-proekta.md`
- Git:
  - commit: не выполнен
  - push: не выполнен
- Следующий шаг:
  - после локального commit начать следующий план: доменные модели и локальные данные.

## 2026-05-15 - Доменные модели и локальные данные

- План: `Work plans/Завершенные/002-modeli-i-dannye.md`
- Статус: завершено
- Области: `Данные`, `Проверка`, `Документация`
- Specs:
  - `spec/technical-specs/data-model.md`
  - `spec/technical-specs/local-storage.md`
  - `spec/feature-specs/local-data-storage.md`
  - `spec/technical-specs/architecture.md`
  - `spec/feature-specs/course-catalog.md`
  - `spec/feature-specs/articles.md`
  - `spec/technical-specs/implementation-checklist.md`
- Сделано:
  - добавлены доменные модели `Course`, `Article`, `UserRequest`;
  - добавлены правила продаж `canSubmitCoursePurchase`, `canSubmitPrePurchaseConsultation`, `hasAnyOpenSales`;
  - добавлены локальные seed-данные `data/courses.json` и `data/articles.json`;
  - добавлен repository слой для чтения опубликованных курсов и статей;
  - добавлены базовые русские сообщения для статусов, пустых состояний и ошибок;
  - удалены `.gitkeep` из папок, которые теперь содержат реальные файлы.
- Проверка:
  - `npm run build` сначала выявил проблему типизации JSON-импортов;
  - repository слой исправлен через чтение JSON как `unknown` и последующую проверку type guard;
  - после исправления `npm run build` выполнен успешно;
  - проверено, что UI не импортирует JSON напрямую;
  - проверены seed-данные: 3 опубликованных курса, 1 скрытый курс, 2 полноценные опубликованные статьи, 2 скрытые или неполные статьи;
  - ручная проверка пользователем подтверждена.
- Измененные файлы:
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
  - `data/.gitkeep`
  - `domain/.gitkeep`
  - `lib/.gitkeep`
  - `lib/messages/.gitkeep`
  - `lib/repositories/.gitkeep`
- Git:
  - commit: не выполнен
  - push: не выполнен
- Следующий шаг:
  - после локального commit начать следующий план: каталог курсов.

## 2026-05-15 - Каталог курсов

- План: `Work plans/Завершенные/003-katalog-kursov.md`
- Статус: завершено
- Области: `Frontend`, `Дизайн`, `Данные`, `Проверка`, `Документация`
- Specs:
  - `spec/feature-specs/course-catalog.md`
  - `spec/technical-specs/routing-and-ui.md`
  - `spec/technical-specs/data-model.md`
  - `spec/technical-specs/implementation-checklist.md`
- Сделано:
  - страница `/courses` подключена к `getPublishedCourses()`;
  - добавлен компонент карточки курса `CourseCard`;
  - каталог показывает опубликованные курсы из локальных данных;
  - добавлен общий блок состояния продаж над каталогом;
  - карточки показывают категорию, краткое описание, темы и симптомы, стоимость, период продаж, формат доступа и статус продаж;
  - черновые курсы не отображаются;
  - внутренние названия Telegram-каналов не выводятся;
  - в каталоге нет кнопки покупки, только переход “Подробнее”.
- Проверка:
  - `npm run build` выполнен успешно;
  - ручная проверка пользователем подтверждена.
- Измененные файлы:
  - `Work plans/Завершенные/003-katalog-kursov.md`
  - `app/courses/page.tsx`
  - `components/courses/CourseCard.tsx`
  - `components/courses/.gitkeep`
  - `styles/globals.css`
  - `Roadmap/chronology.md`
  - `Roadmap/project-roadmap.md`
- Git:
  - commit: не выполнен
  - push: не выполнен
- Следующий шаг:
  - после локального commit начать следующий план: поиск и фильтры курсов.
