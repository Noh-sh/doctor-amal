# План 083: Дополнительная проверка Codex-окружения

## Статус

Завершен.

## Цель

Проверить, нет ли в проекте Doctor Amal локальных причин, из-за которых Codex мог работать нестабильно, ошибаться в процессе, не видеть контекст или некорректно выполнять команды.

## Подтверждение specs

Основание:

- `AGENTS.md`
- `.agents/skills/doctor-amal-specs/SKILL.md`
- `.agents/skills/doctor-amal-specs/references/spec-map.md`
- `spec/technical-specs/change-management.md`
- `Work plans/Активные/068-master-plan-do-10-iz-10.md`

Подтверждено:

- техническая диагностика окружения допустима без изменения продуктового поведения;
- проектные изменения должны оставаться в границах specs;
- git commit и push не выполняются без отдельной просьбы пользователя;
- результаты проверки нужно записать в work plan.

Вне specs:

- диагностика внешнего сервиса Codex, сетевых сбоев OpenAI, IDE/терминала и глобального пользовательского окружения за пределами проекта.

## Что делаем

1. Проверить локальный git status и активные планы.
2. Проверить наличие локальных Codex/agent конфигов внутри проекта.
3. Проверить проектные инструкции на возможные конфликты и перегрузку процесса.
4. Проверить package scripts, зависимости, TypeScript, lint и production build.
5. Проверить `.env`/секреты и наличие потенциально проблемных tracked-файлов.
6. Проверить структуру проекта на файлы или инструкции, которые могли мешать Codex.
7. Записать результаты и выводы в план.

## Что не делаем в этом плане

- Не меняем продуктовый код.
- Не меняем specs.
- Не коммитим изменения.
- Не выполняем push.
- Не читаем и не записываем значения секретов.
- Не диагностируем глобальные файлы за пределами проекта без отдельного подтверждения.

## Проверка

Команды:

```bash
git status --short --branch
npm run quality
git diff --check
git ls-files '.env*' 'supabase/.temp/*'
```

Ручная проверка:

- оценить `AGENTS.md`, repo skill и work plans на конфликтующие инструкции;
- оценить, есть ли локальные `.codex` файлы внутри проекта;
- оценить, есть ли подозрительные большие или временные файлы в рабочем дереве.

## Критерии готовности

- проверки проекта выполнены или блокеры явно записаны;
- возможные причины нестабильной работы Codex разделены на проектные и внешние;
- пользователь получил короткий список выводов и рекомендаций.

## Результат проверки

### Проект Doctor Amal

- Ветка: `quality/final-acceptance`.
- `git status --short --branch`: до плана рабочее дерево было чистым; после проверки изменен только этот work plan и roadmap-файлы.
- Внутри проекта нет локальной папки `.codex`.
- Внутри проекта есть только один `AGENTS.md` на корне.
- Repo skill `doctor-amal-specs` найден и читается из `.agents/skills/doctor-amal-specs/`.
- Противоречий между `AGENTS.md`, repo skill и `change-management.md`, которые могли бы ломать выполнение команд Codex, не найдено.
- Проектные правила строгие и могут замедлять работу Codex, потому что требуют specs и work plans даже для небольших задач, но это ожидаемое поведение, а не ошибка.
- Размер проекта около `605M`, из них `node_modules` около `434M`, `.next` около `162M`; это нормально для текущего Next.js-проекта и не выглядит причиной сбоев.

### Проверки проекта

- `npm run quality` выполнен успешно:
  - `npm run lint` прошел;
  - `npm run typecheck` прошел;
  - `npm run build` прошел;
  - production build сгенерировал `/`, `/_not-found`, `/admin`.
- `git diff --check` выполнен без ошибок.
- `git ls-files '.env*' 'supabase/.temp/*'` показывает только `.env.example`.
- `.gitignore` исключает `.env.local`, `.next/`, `node_modules/`, `supabase/.temp/`.
- `.env.example` содержит актуальную env-схему.
- `.env.local` не отслеживается git.

### Env-настройки

В `.env.local` обнаружена устаревшая локальная переменная `DOCTOR_SUPABASE_PUBLISHABLE_KEY`.

Это не ломает текущий код, потому что приложение читает:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`;
- server-side fallback `DOCTOR_SUPABASE_URL`.

Код не читает `DOCTOR_SUPABASE_PUBLISHABLE_KEY`, поэтому это не выглядит причиной некорректной работы Codex. Но для чистоты локального окружения переменную можно удалить из `.env.local` вручную, не записывая ее значение в git или документы.

### Глобальная Codex-конфигурация

- `codex --version`: `codex-cli 0.139.0`.
- `which codex`: `/Users/nohcho/.npm-global/bin/codex`.
- `~/.codex/config.toml` содержит trusted-настройку для проекта Doctor Amal.
- `codex mcp list` показал: `No MCP servers configured yet`.
- Это расходится с более ранними записями roadmap, где Supabase MCP был подключен.
- Если вчера ожидалось использование Supabase MCP, отсутствие MCP server в текущей Codex-конфигурации является вероятной причиной того, что Codex не мог выполнить Supabase inspection через MCP.
- `codex mcp list` также показал предупреждение: `could not create PATH aliases: Operation not permitted`. Это похоже на ограничение текущей sandbox/сессии, а не на ошибку проекта.

### Логи Codex

Проверены только технические агрегаты логов без вывода содержимого разговоров.

За последние сутки:

- `ERROR` в логах не найдено;
- найдено `35` предупреждений уровня `WARN`;
- основные источники предупреждений:
  - `codex_core_plugins::manifest`;
  - `codex_core_skills::loader`;
  - `codex_core::shell_snapshot`;
  - `codex_core_plugins::manager`.

Содержательно предупреждения указывают на:

- `401 Unauthorized` при попытке прогреть featured plugins cache;
- некорректный manifest внешнего плагина `ngs-analysis`, где `defaultPrompt` длиннее допустимого лимита;
- предупреждения по icon path у skills/plugins;
- единичную попытку удалить уже отсутствующий shell snapshot.

Эти предупреждения не относятся к коду Doctor Amal. Они могут объяснять нестабильность загрузки плагинов/инструментов Codex, но не показывают поломку проекта.

### Вывод

Проект Doctor Amal сейчас не выглядит причиной того, что Codex работал некорректно:

- сборка и quality gate проходят;
- tracked env-секретов нет;
- конфликтующих локальных инструкций внутри проекта не найдено;
- repo skill доступен;
- рабочая директория правильная;
- ветка совпадает с `main`/`origin/main` на последнем merge `2cd0b83`.

Наиболее вероятные причины вчерашнего поведения Codex находятся вне проекта:

1. В текущей глобальной Codex-конфигурации отсутствует Supabase MCP, хотя раньше он был зафиксирован как подключенный.
2. Есть warnings Codex plugin/skills loader.
3. Есть `401 Unauthorized` при обращении к featured plugins endpoint.
4. Есть sandbox warning про невозможность создать PATH aliases.

Рекомендации:

1. Если нужен Supabase MCP, заново подключить его через Codex MCP flow и проверить `codex mcp list`.
2. После подключения MCP не записывать токены, project secrets или реальные env-значения в specs, roadmap или work plans.
3. При повторении странного поведения Codex проверить auth-состояние Codex и доступность plugins/connectors.
4. Локально можно вручную убрать устаревший `DOCTOR_SUPABASE_PUBLISHABLE_KEY` из `.env.local`, если он больше не нужен.

## Измененные файлы

- `Work plans/Завершенные/083-dopolnitelnaya-proverka-codex-okruzheniya.md`

## Git после проверки

После успешной проверки подготовить:

```bash
git status
git add 'Work plans/Активные/083-dopolnitelnaya-proverka-codex-okruzheniya.md'
git commit -m "Проверить Codex-окружение проекта"
```

Push на GitHub выполнять только после отдельного подтверждения пользователя.
