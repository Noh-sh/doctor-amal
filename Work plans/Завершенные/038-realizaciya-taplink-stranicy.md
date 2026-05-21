# План 038: Реализация Taplink-страницы

## Статус

Завершено.

## Цель

Привести код приложения Doctor Amal к первой Taplink-версии по актуальным specs.

## Подтвержденные границы

- Один публичный пользовательский маршрут `/`.
- Неизвестные внутренние URL показывают понятную 404-страницу.
- Первая версия не содержит каталог курсов, статьи, заявки, формы, поиск, фильтры, оплату, серверный API, базу данных, админку, авторизацию, аналитику и сбор пользовательских данных.
- Страница содержит первый блок, кнопки первой версии, блок `О докторе`, блок `Курсы`, внешние кнопки и кнопку `Купить`.
- Если фото доктора не предоставлено, используется согласованный временный placeholder.
- Курсы раскрываются через accordion на этой же странице.
- В свернутом курсе видны название и цена.
- После раскрытия курса видны описание и `Купить`; цена не дублируется.
- `Купить` ведет на общую Telegram-ссылку менеджера без автоматической передачи названия курса.
- Внешняя кнопка без URL показывает `Ссылка будет добавлена позже`.
- `Купить` без Telegram-ссылки показывает `Покупка временно недоступна`.

## Specs для сверки

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/doctor-block.md`
- `spec/feature-specs/courses-block.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/external-links.md`
- `spec/feature-specs/medical-content-rules.md`
- `spec/user-stories/core-user-stories.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/user-stories/journey-checklist.md`
- `spec/technical-specs/architecture.md`
- `spec/technical-specs/routing-and-ui.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/local-storage.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/technical-specs/change-management.md`

## Этапы

1. Сверить текущую структуру кода со specs. — выполнено.
2. Удалить или отключить старые пользовательские маршруты и сценарии первой версии. — выполнено.
3. Обновить модели и локальные данные под `TaplinkPageData`. — выполнено.
4. Реализовать главную Taplink-страницу `/`. — выполнено.
5. Реализовать блок `О докторе`. — выполнено.
6. Реализовать блок `Курсы` с accordion. — выполнено.
7. Реализовать внешние кнопки и кнопку `Купить` с неактивными состояниями. — выполнено.
8. Проверить адаптивность, доступность и отсутствие переполнения текста. — выполнено на уровне CSS и build; ручная визуальная проверка остается доступна через dev server.
9. Выполнить техническую проверку. — выполнено.
10. Обновить план, chronology и roadmap после завершения. — выполнено.

## Проверка

- `rg` по коду не нашел старые активные сценарии заявок, статей, `localStorage`, форм, продаж, старых маршрутов и старых моделей.
- `npm run build` выполнен успешно.
- Next.js build показал только маршруты `/` и `/_not-found`.
- Dev server запущен на `http://localhost:3000`.
- HTTP-проверка:
  - `/` отвечает `200 OK`;
  - `/courses` отвечает `404 Not Found`;
  - `/request` отвечает `404 Not Found`;
  - `/articles` отвечает `404 Not Found`.
- `git diff --check` выполнен без ошибок.
