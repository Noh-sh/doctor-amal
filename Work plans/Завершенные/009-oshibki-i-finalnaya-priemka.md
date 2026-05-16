# План 009: Ошибки и финальная приемка

## Статус

Завершен.

## Цель

Проверить и довести первую локальную версию Doctor-Amal до финального состояния по ошибкам, пустым состояниям, недоступным действиям и regression checklist, чтобы основные пользовательские сценарии работали без технических ошибок и не выходили за границы specs.

## Подтверждение specs

Основание:

- `spec/feature-specs/error-handling.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/technical-specs/routing-and-ui.md`
- `spec/technical-specs/local-storage.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- ошибки и подсказки должны быть короткими, понятными, без технических деталей и обвинения пользователя;
- 404-страница должна предлагать вернуться на главную или в ближайший раздел;
- несуществующий курс должен вести пользователя обратно в каталог;
- черновой курс не должен раскрывать содержимое;
- несуществующая или недоступная статья должна вести пользователя к списку статей;
- пустые списки курсов и статей должны показывать понятное состояние;
- при закрытых или будущих продажах заявки не должны предлагаться;
- форма заявки должна показывать ошибки рядом с полями и не очищаться при ошибке;
- ошибка сохранения заявки не должна показывать ложный успех;
- поврежденные данные заявок в `localStorage` не должны автоматически перезаписываться;
- финальная проверка должна пройти по regression checklist из `implementation-checklist.md` и `change-management.md`.

Вне specs:

- нет.

## Что делаем

1. Проверить текущие страницы и компоненты ошибок:
   - `app/not-found.tsx`;
   - состояния курса и статьи “не найдено”;
   - пустые состояния каталога и статей;
   - форму заявки и сообщения ошибок.
2. Исправить найденные несоответствия specs минимально:
   - пользовательские сообщения без технических деталей;
   - безопасные переходы к ближайшим разделам;
   - отсутствие заявок при закрытых продажах;
   - отсутствие служебных полей в UI.
3. Добавить или уточнить технические guard-состояния, если они нужны для уже описанного поведения.
4. Выполнить build и regression-проверку маршрутов.
5. Записать результат проверки в план.
6. Перенести план в `Work plans/Завершенные/`.
7. Обновить `Roadmap/chronology.md` и `Roadmap/project-roadmap.md`.

## Что не делаем в этом плане

- Не добавляем новые маршруты.
- Не добавляем новые типы заявок.
- Не меняем модели данных.
- Не добавляем онлайн-оплату, авторизацию, админку, серверный API или аналитику.
- Не добавляем медицинскую диагностику, назначение лечения или экстренную связь.
- Не меняем бизнес-правила продаж.
- Не переносим будущие возможности из `future-extension-plan.md`.

## Проверка

Команды:

```bash
npm run build
```

Ручная и HTTP-проверка:

- `/`;
- `/doctor`;
- `/courses`;
- `/courses/skin-health-basics`;
- `/courses/nutrition-energy-support`;
- `/courses/hormone-balance-intro`;
- `/courses/unknown-course`;
- `/courses/internal-draft-course`;
- `/request?type=course_purchase&courseId=skin-health-basics`;
- `/request?type=course_purchase&courseId=nutrition-energy-support`;
- `/request?type=pre_purchase_consultation`;
- `/request?type=bad`;
- `/articles`;
- `/articles/skin-and-lifestyle`;
- `/articles/draft-short-note`;
- `/articles/incomplete-published-note`;
- `/articles/unknown-article`;
- несуществующий маршрут для 404.

## Критерии готовности

- `npm run build` проходит успешно.
- Основные маршруты открываются без технических ошибок.
- Недоступные курсы и статьи не раскрывают черновой или неполный контент.
- При закрытых продажах заявки не предлагаются.
- Форма заявки сохраняет текущие ограничения и понятные ошибки.
- Пользователь не видит stack trace, служебные поля, платежные поля, диагнозы или обещания результата.
- Roadmap и хронология обновлены.

## Результат проверки

- `npm run build` выполнен успешно;
- локальный dev server уже работал на `http://localhost:3000`;
- HTTP-проверка показала `200 OK` для `/`, `/doctor`, `/courses`, `/articles`;
- HTTP-проверка показала `200 OK` для `/courses/skin-health-basics`, `/courses/nutrition-energy-support`, `/courses/hormone-balance-intro`;
- HTTP-проверка показала безопасное состояние `200 OK` без раскрытия содержимого для `/courses/unknown-course` и `/courses/internal-draft-course`;
- HTTP-проверка показала `200 OK` для `/request?type=course_purchase&courseId=skin-health-basics`, `/request?type=course_purchase&courseId=nutrition-energy-support`, `/request?type=pre_purchase_consultation`, `/request?type=bad`;
- HTTP-проверка показала `200 OK` для `/articles/skin-and-lifestyle`;
- HTTP-проверка показала безопасное состояние `200 OK` без раскрытия содержимого для `/articles/draft-short-note`, `/articles/incomplete-published-note`, `/articles/unknown-article`;
- HTTP-проверка показала `404 Not Found` для `/not-existing-page`;
- `git diff --check` выполнен успешно.

## Измененные файлы

- `Work plans/Завершенные/009-oshibki-i-finalnaya-priemka.md`
- `app/error.tsx`
- `app/loading.tsx`
- `app/not-found.tsx`
- `components/requests/RequestForm.tsx`
- `styles/globals.css`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add .
git commit -m "Завершить ошибки и финальную приемку"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
