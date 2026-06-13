# План 072: Настроить quality gate lint и typecheck

## Статус

Завершен.

## Цель

Починить обязательные локальные проверки проекта: заменить нерабочий `next lint`, добавить явный `typecheck`, обработать `tsconfig.tsbuildinfo` и создать единую команду quality gate.

## Подтверждение specs

Основание:

- `Work plans/Активные/068-master-plan-do-10-iz-10.md`;
- `Work plans/Завершенные/070-tehnicheskiy-audit-tekuschey-versii.md`;
- `spec/technical-specs/change-management.md`;
- `spec/technical-specs/implementation-checklist.md`.

Подтверждено:

- нужно добавить рабочие команды статической проверки и typecheck;
- `npm run lint` сейчас не работает из-за отсутствия команды `next lint` в текущем Next.js CLI;
- `npx tsc --noEmit` проходит, но создает untracked `tsconfig.tsbuildinfo`;
- можно менять техническую конфигурацию проверок без изменения пользовательского поведения.

Вне specs:

- нет.

## Что делаем

1. Добавить ESLint-зависимости, совместимые с текущим Next.js.
2. Добавить ESLint config для Next.js и TypeScript.
3. Заменить `lint` script на рабочую команду ESLint.
4. Добавить `typecheck` script.
5. Добавить `quality` script как последовательность `lint`, `typecheck`, `build`.
6. Добавить игнорирование `tsconfig.tsbuildinfo`.
7. Выполнить проверки.

## Что не делаем в этом плане

- Не добавляем unit/e2e test runner.
- Не меняем кодовую логику приложения.
- Не меняем UI, маршруты, данные, Supabase migrations или remote database.
- Не исправляем accessibility feedback админки.
- Не выполняем push без отдельного подтверждения пользователя.

## Проверка

Команды:

```bash
npm run lint
npm run typecheck
npm run quality
git diff --check
git status --short
```

Ручная проверка:

- `lint` больше не вызывает `next lint`;
- `typecheck` не оставляет untracked `tsconfig.tsbuildinfo`;
- команды не меняют продуктовый сценарий.

## Критерии готовности

- `npm run lint` проходит.
- `npm run typecheck` проходит.
- `npm run quality` проходит.
- `tsconfig.tsbuildinfo` не попадает в git status.
- `git diff --check` проходит.

## Результат проверки

- Добавлены devDependencies `eslint` и `eslint-config-next`.
- Добавлен flat config `eslint.config.mjs` для Next.js core web vitals и TypeScript.
- `lint` script заменен с нерабочего `next lint` на `eslint .`.
- Добавлен `typecheck` script: `tsc --noEmit --incremental false`.
- Добавлен `quality` script: `npm run lint && npm run typecheck && npm run build`.
- В `.gitignore` добавлено `*.tsbuildinfo`.
- `app/error.tsx` переведен с `<a href="/">` на `next/link`.
- `AdminContentEditor` обновлен так, чтобы `loadContent` был стабильной callback-зависимостью эффекта.
- Добавлен `overrides.postcss = 8.5.10`, потому что `npm audit --omit=dev` обнаружил moderate vulnerability в transitive `postcss@8.4.31` через `next`.
- `npm ls postcss` подтвердил `postcss@8.5.10 overridden`.
- `npm audit --omit=dev --cache /private/tmp/doctor-amal-npm-cache` выполнен успешно: `found 0 vulnerabilities`.
- `npm run lint` выполнен успешно.
- `npm run typecheck` выполнен успешно.
- `npm run quality` выполнен успешно.
- `git diff --check` выполнен без ошибок.
- `tsconfig.tsbuildinfo` отсутствует в рабочем дереве после typecheck/quality.

## Измененные файлы

- `.gitignore`
- `eslint.config.mjs`
- `package.json`
- `package-lock.json`
- `app/error.tsx`
- `components/admin/AdminContentEditor.tsx`
- `Work plans/Завершенные/072-nastroit-quality-gate-lint-typecheck.md`
- `Roadmap/chronology.md`
- `Roadmap/project-roadmap.md`

## Git после проверки

После успешной проверки подготовить commit только после подтверждения пользователя.

Push на GitHub выполнять только после отдельного подтверждения пользователя.
