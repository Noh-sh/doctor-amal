# План 037: Закрыть серые зоны перед реализацией Taplink-страницы

## Статус

Завершено.

## Цель

Зафиксировать в specs согласованные решения по серым зонам перед реализацией первой Taplink-страницы Doctor Amal.

## Контекст

После общего аудита specs критических противоречий не найдено, но перед кодом нужно закрыть несколько решений:

- временный placeholder для фото доктора;
- мягкая формулировка будущего онлайн-формата и CMS/админки;
- accordion как способ раскрытия курса;
- 404 для неизвестных внутренних URL;
- кнопка `Купить` как простая Telegram-ссылка менеджера без автоматической передачи названия курса;
- финальные тексты неактивных кнопок.

## Затрагиваемые specs

- `spec/functional-map.md`
- `spec/feature-specs/doctor-block.md`
- `spec/feature-specs/courses-block.md`
- `spec/feature-specs/course-purchase-link.md`
- `spec/feature-specs/external-links.md`
- `spec/user-stories/core-user-stories.md`
- `spec/user-stories/edge-case-stories.md`
- `spec/user-stories/journey-checklist.md`
- `spec/technical-specs/routing-and-ui.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/requests-and-validation.md`
- `spec/technical-specs/implementation-checklist.md`
- `spec/technical-specs/future-extension-plan.md`
- `spec/technical-specs/change-management.md`

## Шаги

1. Обновить specs согласованными решениями. — выполнено.
2. Проверить, что не осталось старых формулировок про обязательную передачу названия курса в Telegram. — выполнено.
3. Проверить, что accordion и 404 закреплены однозначно. — выполнено.
4. Выполнить `git diff --check`. — выполнено.
5. Перенести план в завершенные и обновить roadmap. — выполнено.

## Проверка

- Выполнен поиск по старым серым зонам: автоматическая передача названия курса, варианты раскрытия курса, redirect для неизвестных URL, обязательный будущий онлайн-формат.
- Подтверждено, что accordion и 404 закреплены однозначно.
- Подтверждено, что первая версия не передает название курса автоматически в Telegram.
- `git diff --check` выполнен без ошибок.
