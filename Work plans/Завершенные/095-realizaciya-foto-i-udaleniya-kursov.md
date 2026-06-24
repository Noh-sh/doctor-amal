# 095 - Реализация фото и удаления курсов

## Статус

Завершен.

## Цель

Реализовать подтвержденные specs для:

- загрузки и замены фото доктора через админку и Supabase Storage;
- безопасного удаления курса через soft delete `deleted_at`.

## Границы

Входит:

- migration для `courses.deleted_at`, bucket `doctor-media`, Storage policies и точечных grants;
- загрузка JPEG, PNG, WebP до 5 MB через `/admin`;
- обновление `doctor_profile.photo_src` и `doctor_profile.photo_alt` после успешной загрузки;
- скрытие курса из публичной страницы и основного списка админки через `deleted_at`;
- проверка качества после изменений.

Не входит:

- физическое удаление row из `courses`;
- корзина, восстановление через UI и массовое удаление;
- service role key во frontend;
- изменение медицинских текстов и условий покупки.

## Прочитанные specs

- `spec/feature-specs/admin-photo-management.md`
- `spec/feature-specs/admin-course-removal.md`
- `spec/feature-specs/admin-content-editing.md`
- `spec/technical-specs/admin-auth-and-access.md`
- `spec/technical-specs/data-model.md`
- `spec/technical-specs/supabase-content-source.md`
- `spec/user-stories/admin-user-stories.md`
- `spec/technical-specs/change-management.md`

## План работ

- [x] Добавить migration Supabase для Storage bucket, policies, grants и `deleted_at`.
- [x] Обновить Supabase data layer для загрузки фото и soft delete курса.
- [x] Обновить публичное чтение курсов, чтобы скрывать `deleted_at`.
- [x] Обновить UI админки для выбора фото и удаления курса.
- [x] Запустить проверки и записать результат.

## Проверка

- `git diff --check` выполнен без ошибок.
- `npm run quality` выполнен успешно: `lint`, `typecheck`, `next build`.

## Результат

- Добавлена migration `20260624000000_add_doctor_media_and_course_soft_delete.sql`.
- Добавлен Storage bucket `doctor-media` с public-доступом на чтение, лимитом 5 MB и разрешенными MIME `image/jpeg`, `image/png`, `image/webp`.
- Добавлены Storage policies для чтения/загрузки/обновления объектов только активным `doctor_admin`.
- Добавлено поле `courses.deleted_at` и публичная policy, скрывающая soft-deleted курсы.
- Админка получила выбор фото, загрузку в Supabase Storage и обновление `doctor_profile.photo_src/photo_alt`.
- Админка получила кнопку безопасного удаления курса через `deleted_at`.
- Публичное чтение курсов фильтрует `deleted_at is null`.

## Ограничение

Remote Supabase migration этим локальным шагом не применялась. Для работы на production нужно отдельно выполнить применение migration к связанному Supabase project и затем проверить `/admin`.
