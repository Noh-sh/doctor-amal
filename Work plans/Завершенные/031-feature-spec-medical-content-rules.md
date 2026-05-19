# План 031: Feature spec медицинских ограничений текстов

## Статус

Завершен.

## Цель

Создать `spec/feature-specs/medical-content-rules.md` для медицинских ограничений пользовательских текстов первой локальной версии Doctor Amal.

Документ должен собрать общие правила для текстов блока `О докторе`, блока `Курсы`, короткого медицинского ограничения и навигационных подписей.

## Подтверждение specs

Основание:

- `spec/global-spec.md`
- `spec/functional-map.md`
- `spec/feature-specs/README.md`
- `spec/feature-specs/doctor-block.md`
- `spec/feature-specs/courses-block.md`
- `spec/technical-specs/change-management.md`

Подтверждено:

- проект не обещает выздоровление и не заменяет очную консультацию врача;
- проект не ставит диагнозы;
- информация, ссылки и материалы имеют образовательный, ознакомительный или навигационный характер;
- в первой версии не должно быть медицинских статей, схем лечения, диагностики, советов по симптомам и персональных медицинских рекомендаций;
- блок `О докторе` и публичное описание курсов должны избегать обещаний результата, схем лечения и инструкций по приему лекарств, добавок или процедур;
- на странице должно быть короткое медицинское ограничение.

Вне specs:

- финальные медицинские тексты для интерфейса;
- конкретные диагнозы, состояния, схемы, препараты, добавки или процедуры;
- юридические формулировки дисклеймера;
- онлайн-консультация и персональные рекомендации.

## Что делаем

1. Создать `spec/feature-specs/medical-content-rules.md`.
2. Описать допустимые и запрещенные медицинские формулировки.
3. Описать короткое медицинское ограничение первой версии.
4. Зафиксировать правила для сомнительных формулировок и острых симптомов.
5. Обновить `spec/feature-specs/README.md` и skill spec-map.

## Что не делаем в этом плане

- Не пишем финальные тексты интерфейса.
- Не добавляем медицинские советы, диагнозы или схемы лечения.
- Не добавляем онлайн-консультацию.
- Не меняем код приложения.
- Не выполняем git commit и push.

## Проверка

Команды:

```bash
rg -n "medical-content-rules|медицин|выздоров|диагноз|консультац|схем|симптом|персональн|результат|остр|опасн|обещ" spec/feature-specs/README.md spec/feature-specs/medical-content-rules.md spec/feature-specs/doctor-block.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Ручная проверка:

- Убедиться, что spec не добавляет медицинскую консультацию.
- Убедиться, что spec не содержит конкретных схем лечения или инструкций.
- Убедиться, что правила не противоречат `doctor-block.md` и `courses-block.md`.

## Критерии готовности

- `medical-content-rules.md` создан.
- `README.md` и `spec-map.md` обновлены.
- Медицинские ограничения согласованы с `global-spec.md`, `functional-map.md`, `doctor-block.md` и `courses-block.md`.
- Результат проверки записан в план.

## Результат проверки

Выполнены проверки:

```bash
rg -n "medical-content-rules|медицин|выздоров|диагноз|консультац|схем|симптом|персональн|результат|остр|опасн|обещ" spec/feature-specs/README.md spec/feature-specs/medical-content-rules.md spec/feature-specs/doctor-block.md spec/feature-specs/courses-block.md .agents/skills/doctor-amal-specs/references/spec-map.md
git diff --check
```

Результат:

- `medical-content-rules.md` создан и связан с картой feature specs;
- зафиксированы допустимые и запрещенные медицинские формулировки;
- зафиксировано, что первая локальная версия не обещает выздоровление, не ставит диагнозы, не заменяет очную консультацию и не дает персональные рекомендации;
- зафиксировано, что финальные медицинские тексты, список направлений и уровень детализации описаний нужно подтвердить перед реализацией;
- `git diff --check` выполнен без ошибок.

## Измененные файлы

- `spec/feature-specs/medical-content-rules.md`
- `spec/feature-specs/README.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `Work plans/Завершенные/031-feature-spec-medical-content-rules.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add spec/feature-specs/medical-content-rules.md spec/feature-specs/README.md .agents/skills/doctor-amal-specs/references/spec-map.md "Work plans/Завершенные/031-feature-spec-medical-content-rules.md" Roadmap/chronology.md Roadmap/project-roadmap.md
git commit -m "Добавить feature spec медицинских ограничений"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
