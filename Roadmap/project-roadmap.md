# Дорожная карта проекта

Этот файл показывает общую последовательность стадий проекта Doctor Amal: что уже сделано, что в работе и что запланировано дальше.

`Roadmap/chronology.md` хранит хронологию завершенных действий, а этот файл хранит общую карту движения вперед.

## Статусы

- `Завершено` - стадия выполнена, проверена и отражена в хронологии.
- `Следующий этап` - ближайшая стадия для начала работы.
- `Запланировано` - стадия еще не начата.
- `Текущая локальная версия завершена` - все стадии первой локальной версии выполнены.

## Стадии проекта

| № | Стадия | Статус | Связанный план | Что входит |
|---|---|---|---|---|
| 0 | Организация процесса | Завершено | без отдельного завершенного плана | `Work plans`, `Roadmap`, правила в `AGENTS.md`, шаблоны планов и roadmap |
| 1 | Каркас проекта | Завершено | `Work plans/Завершенные/001-karkas-proekta.md` | Next.js + TypeScript, App Router, базовые маршруты, layout, навигация, 404, базовые стили |
| 2 | Доменные модели и локальные данные | Завершено | `Work plans/Завершенные/002-modeli-i-dannye.md` | модели `Course`, `Article`, `UserRequest`, JSON-данные, repository layer |
| 3 | Каталог курсов | Завершено | `Work plans/Завершенные/003-katalog-kursov.md` | список опубликованных курсов, карточки, статусы продаж, пустые состояния |
| 4 | Поиск и фильтры курсов | Завершено | `Work plans/Завершенные/004-poisk-i-filtry-kursov.md` | поиск по названию, теме, категории и симптомам, фильтры по теме и статусу продаж |
| 5 | Страница курса | Завершено | `Work plans/Завершенные/005-stranica-kursa.md` | детальная страница курса, условия покупки, Telegram-доступ, правила `open`, `closed`, `coming_soon` |
| 6 | Заявки | Завершено | `Work plans/Завершенные/006-zayavki.md` | формы покупки и консультации по подбору курса, валидация, `localStorage`, защита от повторной заявки |
| 7 | Статьи | Завершено | `Work plans/Завершенные/007-stati.md` | список статей, страница статьи, скрытие черновиков, состояние “статья не найдена” |
| 8 | Главная и страница “О докторе” | Завершено | `Work plans/Завершенные/008-glavnaya-i-o-doktore.md` | полноценное наполнение главной и страницы о докторе по specs |
| 9 | Ошибки и финальная приемка | Завершено | `Work plans/Завершенные/009-oshibki-i-finalnaya-priemka.md` | 404, ошибки данных, ошибки форм, regression checklist, финальная проверка |
| 10 | Переписывание глобальных specs под Taplink-формат | Завершено | `Work plans/Завершенные/010-perepisanie-globalnyh-specs.md` | новая концепция `global-spec.md` и `functional-map.md`: локальная страница ссылок, без сбора данных, без заявок и покупок в первой версии |
| 11 | Детализация functional map для Taplink-страницы | Завершено | `Work plans/Завершенные/011-detalizaciya-functional-map.md` | одна страница, фото и имя доктора, кнопки `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`, без медицинских текстов и сбора данных |
| 12 | Уточнение блоков "О докторе" и "Курсы" | Завершено | `Work plans/Завершенные/012-utochnenie-blokov-o-doktore-i-kursah.md` | блоки `О докторе` и `Курсы` на одной странице, описания и цены курсов, кнопка `Купить` ведет в Telegram к менеджеру, будущая онлайн-оплата вынесена за пределы первой версии |
| 13 | Порядок кнопок в functional map | Завершено | `Work plans/Завершенные/013-poryadok-knopok-v-functional-map.md` | порядок кнопок первой версии: `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram` |
| 14 | Кнопки без ссылок в functional map | Завершено | `Work plans/Завершенные/014-knopki-bez-ssylok-v-functional-map.md` | кнопку без ссылки можно показывать как неактивную или будущий раздел, но нельзя показывать как рабочую внешнюю ссылку |
| 15 | Чистка global spec и functional map перед feature specs | Завершено | `Work plans/Завершенные/015-chistka-global-i-functional-map.md` | согласованы верхние specs: одна локальная страница с внутренними блоками и внешними переходами, без отдельного каталога, корзины, оформления и оплаты внутри проекта |
| 16 | Единый текст кнопки "Купить" | Завершено | `Work plans/Завершенные/016-edinyy-tekst-knopki-kupit.md` | в `functional-map.md` зафиксирована кнопка покупки курса `Купить` |
| 17 | Feature specs README и блок "О докторе" | Завершено | `Work plans/Завершенные/017-feature-specs-readme-i-doctor-block.md` | новая карта feature specs Taplink-версии, первый feature spec `doctor-block.md`, старые feature specs помечены как предыдущая версия |
| 18 | Убрать онлайн-консультации из doctor-block | Завершено | `Work plans/Завершенные/018-ubrat-online-konsultacii-iz-doctor-block.md` | будущие расширения блока `О докторе` ограничены биографией, документами и подтвержденными материалами; онлайн-консультации убраны |
| 19 | Смягчить будущую онлайн-покупку в doctor-block | Завершено | `Work plans/Завершенные/019-smyagchit-budushchuyu-online-pokupku-v-doctor-block.md` | онлайн-покупка курса описана как возможное расширение при необходимости, а не обязательная функция будущей онлайн-версии |
| 20 | Feature spec блока "Курсы" | Завершено | `Work plans/Завершенные/020-feature-spec-courses-block.md` | создан `courses-block.md`: структура курса, цена, раскрытие курса, кнопка `Купить`, ограничения без оплаты и сбора данных |
| 21 | Уточнить раскрытие курса по названию | Завершено | `Work plans/Завершенные/021-utochnit-raskrytie-kursa-po-nazvaniyu.md` | в блоке `Курсы` сначала видны названия, по нажатию раскрываются описание, цена и кнопка `Купить` |
| 22 | Показывать цену в свернутом курсе | Завершено | `Work plans/Завершенные/022-pokazyvat-cenu-v-svernutom-kurse.md` | в свернутом курсе видны название и цена; после нажатия раскрываются описание, цена и `Купить` |
| 23 | Убрать цену из раскрытого курса | Завершено | `Work plans/Завершенные/023-ubrat-cenu-iz-raskrytogo-kursa.md` | цена видна в свернутом курсе; после нажатия раскрываются описание и `Купить` без дублирования цены |
| 24 | Выбор варианта раскрытия курса после проверки | Завершено | `Work plans/Завершенные/024-vybor-varianta-raskrytiya-kursa-posle-proverki.md` | варианты раскрытия курса оставлены до визуальной проверки: accordion, карточка под названием или modal без маршрута |
| 25 | Уточнить медицинские ограничения описания курса | Завершено | `Work plans/Завершенные/025-utochnit-medicinskie-ogranicheniya-opisaniya-kursa.md` | ограничения относятся к публичному описанию курса; внутреннее содержание курса может включать схемы, добавки или процедуры после отдельного подтверждения |
| 26 | Уточнить неактивную кнопку "Купить" | Завершено | `Work plans/Завершенные/026-utochnit-neaktivnuyu-knopku-kupit.md` | если Telegram-ссылка не задана, `Купить` можно показывать только как неактивную кнопку с понятным состоянием |
| 27 | Feature spec кнопки "Купить" | Завершено | `Work plans/Завершенные/027-feature-spec-course-purchase-link.md` | создан `course-purchase-link.md`: кнопка `Купить` ведет в Telegram к менеджеру, без формы, оплаты, сбора данных и автоматического доступа |
| 28 | Уточнить общую Telegram-ссылку кнопки "Купить" | Завершено | `Work plans/Завершенные/028-utochnit-obshchuyu-telegram-ssylku-kupit.md` | для всех курсов используется одна Telegram-ссылка на одного менеджера; при переходе передается название выбранного курса |
| 29 | Feature spec внешних ссылок | Завершено | `Work plans/Завершенные/029-feature-spec-external-links.md` | создан `external-links.md`: внешние кнопки ведут только на подтвержденные URL, без аналитики, интеграций, авторизации, оплаты, форм и сбора данных |
| 30 | Внешние кнопки видны без URL | Завершено | `Work plans/Завершенные/030-vneshnie-knopki-vidny-bez-url.md` | все внешние кнопки первой версии видны в интерфейсе; без подтвержденного URL кнопка остается видимой, но неактивной |
| 31 | Feature spec медицинских ограничений текстов | Завершено | `Work plans/Завершенные/031-feature-spec-medical-content-rules.md` | создан `medical-content-rules.md`: правила медицинских текстов без обещаний результата, диагностики, схем лечения и персональных рекомендаций |
| 32 | Feature spec будущей онлайн-покупки | Завершено | `Work plans/Завершенные/032-feature-spec-future-online-purchase.md` | создан `future-online-purchase.md`: онлайн-покупка остается будущим направлением и не входит в первую локальную версию |
| 33 | Удалить старые feature specs | Завершено | `Work plans/Завершенные/033-udalit-starye-feature-specs.md` | удалены feature specs предыдущей структуры и старый outline; текущие карты specs больше не направляют к удаленным feature specs |
| 34 | Упростить feature specs | Завершено | `Work plans/Завершенные/034-uprostit-feature-specs.md` | убрана лишняя связь блока `О докторе` с будущей онлайн-покупкой; добавлен принцип не повторять общие ограничения в каждом feature spec полным списком |
| 35 | User stories для Taplink-версии | Завершено | `Work plans/Завершенные/035-user-stories-taplink.md` | user stories переписаны под одну Taplink-страницу: первое знакомство, блок `О докторе`, блок `Курсы`, раскрытие курса, `Купить`, внешние платформы и минимальное медицинское ограничение |
| 36 | Technical specs для Taplink-версии | Завершено | `Work plans/Завершенные/036-technical-specs-taplink.md` | technical specs переписаны под Next.js + TypeScript, один маршрут `/`, локальные данные страницы, без каталога, заявок, статей, `localStorage`, сервера, базы, админки и оплаты |
| 37 | Закрыть серые зоны перед реализацией Taplink-страницы | Завершено | `Work plans/Завершенные/037-zakryt-serye-zony-pered-realizaciey.md` | placeholder для фото, мягкий будущий онлайн-формат, accordion, 404, простая Telegram-ссылка без автоматической передачи курса, тексты неактивных кнопок |
| 38 | Реализация Taplink-страницы | Завершено | `Work plans/Завершенные/038-realizaciya-taplink-stranicy.md` | код приведен к первой Taplink-версии: один маршрут `/`, 404, локальные Taplink-данные, блоки `О докторе` и `Курсы`, accordion, внешние кнопки, без старых маршрутов, форм, заявок, статей и `localStorage` |
| 39 | Временные placeholder-данные для просмотра UI | Завершено | `Work plans/Завершенные/039-vremennye-placeholder-dannye-dlya-prosmotra.md` | добавлены временные placeholder-данные и inline-раскрытие блоков `О докторе` и `Курсы` под соответствующими кнопками для визуальной проверки |
| 40 | Исправить раскрытие блоков Taplink-страницы | Завершено | `Work plans/Завершенные/040-ispravit-raskrytie-blokov-taplink.md` | верхние блоки `О докторе` и `Курсы` раскрываются через native `details` / `summary` без зависимости от client state |
| 41 | Тестовая design map | Завершено | `Work plans/Завершенные/041-test-design-map.md` | создана тестовая design map для проверки визуальных решений до переноса в настоящий дизайн |
| 42 | Реальный визуальный дизайн Taplink-страницы | Завершено | `Work plans/Завершенные/042-realnyy-vizualnyy-dizayn.md` | утвержден текущий green nutrition дизайн, подключено фото, заполнен блок `О докторе`, добавлены подтвержденные курсы и компактный UI |
| 43 | UI design rules | Завершено | `Work plans/Завершенные/043-ui-design-rules.md` | UI-правила переведены в статус утвержденных правил первой Taplink-версии |
| 44 | План действий перед Supabase | Завершено | `Work plans/Завершенные/044-plan-supabase-content-source.md` | подготовлен порядок: specs, online Supabase Dashboard, env-переменные, подключение данных, проверки и deploy |
| 45 | Specs Supabase как источника контента | Завершено | `Work plans/Завершенные/045-supabase-content-specs.md` | technical specs для Supabase content source без заявок, оплаты, auth покупателей, заказов, медицинских данных и MCP |
| 46 | Подготовка online Supabase Dashboard | Завершено | `Work plans/Завершенные/046-supabase-dashboard-setup.md` | инструкция и SQL для таблиц контента, RLS policies, seed текущего контента и проверочных запросов |
| 47 | Env и безопасный источник данных Supabase | Завершено | `Work plans/Завершенные/047-supabase-env-and-safe-data-source.md` | `.env.local`, `.env.example`, data-provider Supabase с fallback на локальные данные |
| 48 | Проектные env-названия Supabase | Завершено | `Work plans/Завершенные/048-project-env-names-for-supabase.md` | переименование env в `DOCTOR_SUPABASE_*`, описание service role как server-only переменной |
| 49 | Supabase CLI migration для таблиц контента | Завершено | `Work plans/Завершенные/049-supabase-cli-migration.md` | migration для таблиц контента, RLS policies и seed; `supabase login`, `link`, `db push` |
| 50 | Правила Supabase MCP access | Завершено | `Work plans/Завершенные/050-supabase-mcp-access.md` | spec для MCP inspection/read workflow, без обхода specs и CLI migrations |
| 51 | Подключение Supabase MCP для инспекции | Завершено | `Work plans/Завершенные/051-supabase-mcp-setup.md` | Codex Supabase MCP подключен read-only к project `dagykilvpiacfbwpcluv`, проверены таблицы, RLS status и migration |
| 52 | Закрыть старые активные планы | Завершено | `Work plans/Завершенные/052-zakryt-starye-aktivnye-plany.md` | старые планы `044` перенесены из активных в завершенные, roadmap обновлен, активная папка очищена |
| 53 | Подготовка админки и Auth для редактирования контента | Завершено | `Work plans/Завершенные/053-start-admin-auth-content-editing.md` | specs будущей админки: только доктор, email/password, редактирование контента, без покупателей, заявок, оплаты, медицинских анкет и аналитики |
| 54 | Supabase Auth и RLS для админки | Завершено | `Work plans/Завершенные/054-plan-admin-auth-rls.md` | `admin_users`, `doctor_admin`, RLS write policies и grants только для разрешенных контентных таблиц; Auth user доктора связан с доступом |
| 55 | UI входа в админку | Завершено | `Work plans/Завершенные/055-plan-admin-login-ui.md` | route `/admin`, email/password вход, проверка `doctor_admin`, отказ доступа, logout и защищенная оболочка без форм редактирования |
| 56 | Редактор контента в админке | Завершено | `Work plans/Завершенные/056-plan-admin-content-editor.md` | формы редактирования профиля, существующих курсов/цен, внешних ссылок и Telegram-ссылки менеджера через Supabase и RLS |
| 57 | Исправить повторный Supabase browser client | Завершено | `Work plans/Завершенные/057-ispravit-povtorniy-supabase-browser-client.md` | browser Supabase client кешируется по auth `storageKey`, чтобы повторный вызов helper не создавал второй `GoTrueClient` для `/admin` |
| 58 | Сократить delay обновления контента | Завершено | `Work plans/Завершенные/058-sokratit-delay-obnovleniya-kontenta.md` | revalidate чтения Supabase сокращен с 300 до 30 секунд, без мгновенного сброса кеша после сохранения |
| 59 | Online-проверка админки и кеша | Завершено | `Work plans/Завершенные/059-online-proverka-admin-i-kesha.md` | добавлен явный feedback сохранения в админке: кнопка сохраненной формы показывает `Сохранено` с галочкой |
| 60 | Specs добавления курсов в админке | Завершено | `Work plans/Завершенные/060-specs-dobavlenie-kursov-v-adminke.md` | описаны поля нового курса, `insert` policy для `courses`, правила `slug`, `sort_order`, `purchase_label` и скрытие вместо физического удаления |
| 61 | Реализация добавления курсов в админке | Завершено | `Work plans/Завершенные/061-realizaciya-dobavleniya-kursov-v-adminke.md` | добавлены migration `insert` policy для `courses`, helper `createCourse` и форма `Новый курс` в `/admin`; `delete` не добавлен |
| 62 | Расписать `.env.example` | Завершено | `Work plans/Завершенные/062-raspisat-env-example.md` | `.env.example` подробно описывает разрешенные `DOCTOR_SUPABASE_*` переменные, источники значений и запреты на `NEXT_PUBLIC_*` secrets |
| 63 | Уточнить `NEXT_PUBLIC` в `.env.example` | Завершено | `Work plans/Завершенные/063-utochnit-next-public-v-env-example.md` | `.env.example` явно разделяет public Supabase keys и `NEXT_PUBLIC_*` механизм Next.js |
| 64 | `NEXT_PUBLIC` env для Supabase | Завершено | `Work plans/Завершенные/064-next-public-supabase-env.md` | добавлены `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` как основная public env-пара, `DOCTOR_SUPABASE_*` сохранены как server-side/fallback |
| 65 | Сократить `.env.example` | Завершено | `Work plans/Завершенные/065-sokratit-env-example.md` | из `.env.example` убраны лишние пояснения, оставлен короткий список Supabase env |
| 66 | Правильная Supabase env-схема | Завершено | `Work plans/Завершенные/066-pravilnaya-supabase-env-schema.md` | `.env.example` и код приведены к чистой схеме `NEXT_PUBLIC_SUPABASE_*` + server-only `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`, legacy fallback убран |
| 67 | Актуализация и уточнение specs | Завершено | `Work plans/Завершенные/067-aktualizaciya-i-utochnenie-specs.md` | specs приведены к текущей online-версии с Supabase и `/admin`; текущие решения отделены от будущих функций |
| 68 | Мастер-план до 10/10 | В работе | `Work plans/Активные/068-master-plan-do-10-iz-10.md` | задана шкала качества и последовательность этапов: аудит, quality gate, RLS, надежность, UI/accessibility и production |
| 69 | Чистая базовая точка | Завершено | `Work plans/Завершенные/069-etap-0-chistaya-bazovaya-tochka.md` | изменения `067` и планы `068/069` проверены, разделены на commit и смержены в `main` через PR #39 |
| 70 | Технический аудит текущей версии | Завершено | `Work plans/Завершенные/070-tehnicheskiy-audit-tekuschey-versii.md` | код сверено со specs; critical/high дефектов не найдено; подготовлены следующие bugfix-планы |
| 71 | Терминология текущей версии | Завершено | `Work plans/Завершенные/071-ispravit-terminologiyu-tekuschey-versii.md` | из UI и актуальных specs убраны остаточные формулировки старого локального этапа без изменения поведения |
| 72 | Quality gate lint и typecheck | Завершено | `Work plans/Завершенные/072-nastroit-quality-gate-lint-typecheck.md` | настроены `lint`, `typecheck`, `quality`, ESLint config, защита от `tsbuildinfo` и production audit без уязвимостей |
| 73 | Accessibility feedback админки | Завершено | `Work plans/Завершенные/073-accessibility-feedback-adminki.md` | error feedback в admin editor объявляется через `role="alert"`, success остается `role="status"` |
| 74 | Проверка remote Supabase и RLS | Завершено | `Work plans/Завершенные/074-proverka-remote-supabase-rls.md` | local/remote migrations совпадают, RLS включен и policies ожидаемые; найден лишний `TRUNCATE` privilege у `anon`/`authenticated` |
| 75 | Отозвать лишний TRUNCATE privilege | Завершено | `Work plans/Завершенные/075-otozvat-truncate-grants.md` | добавлена и применена migration `20260613000000`; `TRUNCATE` у `anon`/`authenticated` на контентных таблицах отозван |
| 76 | Защита от параллельного сохранения | Завершено | `Work plans/Завершенные/076-zaschita-ot-parallelnogo-sohraneniya.md` | admin editor блокирует параллельные сохранения и повторный submit через Enter во время активного сохранения |
| 77 | Ошибки входа и сессии админки | Завершено | `Work plans/Завершенные/077-oshibki-vhoda-i-sessii-adminki.md` | неожиданные ошибки `getSession` и `signInWithPassword` показывают понятный feedback и не оставляют UI в зависшем состоянии |
| 78 | Валидация публичных URL из Supabase | Завершено | `Work plans/Завершенные/078-validaciya-publichnyh-url-iz-supabase.md` | невалидные внешние URL и Telegram URL из Supabase не становятся активными ссылками публичной страницы |
| 79 | Полный набор внешних кнопок при partial-data | Завершено | `Work plans/Завершенные/079-polnyy-nabor-vneshnih-knopok-pri-partial-data.md` | публичная страница всегда получает 4 внешние кнопки; отсутствующие Supabase rows остаются видимыми неактивными кнопками |
| 80 | UI responsive accessibility приемка | Завершено | `Work plans/Завершенные/080-ui-responsive-accessibility-priemka.md` | добавлен явный `focus-visible` для основных публичных и admin-кнопок; screenshot-приемка требует отдельного browser/tooling шага |
| 81 | Visual responsive проверка | Завершено | `Work plans/Завершенные/081-visual-responsive-proverka.md` | через временный Playwright сняты screenshots `/` и `/admin` на `360`, `390`, `768`, `1024`, `1440`; явных перекрытий не найдено |
| 82 | Production и эксплуатация | Завершено | `Work plans/Завершенные/082-production-i-ekspluataciya.md` | локальный quality/build и проверка секретов прошли; описаны deploy checklist, rollback и восстановление admin-доступа; production/Vercel проверка требует ручного доступа |
| 83 | Дополнительная проверка Codex-окружения | Завершено | `Work plans/Завершенные/083-dopolnitelnaya-proverka-codex-okruzheniya.md` | проверены project instructions, quality gate, tracked env, Codex config и warnings вне проекта |
| 84 | Восстановить Supabase MCP | Завершено | `Work plans/Завершенные/084-vosstanovit-supabase-mcp.md` | Supabase MCP заново подключен в read-only режиме для project `dagykilvpiacfbwpcluv` |
| 85 | Production URL и Vercel-проверка | Завершено | `Work plans/Завершенные/085-production-url-i-vercel-proverka.md` | основной production domain `doctor-amal.vercel.app` проверен после переноса Vercel env и redeploy; Supabase-контент на production подтвержден |
| 86 | Проверка соответствия планов 070-082 | Завершено | `Work plans/Завершенные/086-proverka-sootvetstviya-planov-070-082.md` | подтверждено, что работа из планов `070-082` не выглядит потерянной или откатанной; critical/high расхождений не найдено |
| 88 | Обновить авторизацию Supabase MCP | Завершено | `Work plans/Завершенные/088-obnovit-avtorizaciyu-supabase-mcp.md` | повторно выполнен `codex mcp login supabase`; причина startup warning подтверждена как OAuth refresh/auth issue |
| 89 | Мгновенное обновление публичной страницы после сохранения | Завершено | `Work plans/Завершенные/089-mgnovennoe-obnovlenie-publichnoy-stranicy.md` | добавлен защищенный `POST /admin/revalidate` для `doctor_admin`; после admin-сохранения выполняется `revalidatePath("/")`, а обычный `revalidate: 30` остается fallback |

## Текущий статус

Текущая версия Doctor Amal реализована как online Next.js Taplink-страница `/` с Supabase как основным источником контента и локальным fallback.

Защищенная админка `/admin` использует Supabase Auth. Активный `doctor_admin` может редактировать разрешенные профильные тексты, внешние ссылки, Telegram-ссылку менеджера, существующие курсы и создавать новые курсы. После успешного сохранения админка вызывает защищенный `POST /admin/revalidate`, который проверяет `doctor_admin` и выполняет server-side `revalidatePath("/")`, чтобы публичная страница `/` обновлялась сразу или почти сразу. Обычный `revalidate: 30` остается fallback, если мгновенный сброс кеша временно не сработал. Физическое удаление курсов, загрузка фото, управление Auth users, новые роли, заявки, auth покупателей и онлайн-оплата не входят в текущую версию.

Актуальные specs приведены к фактической реализации. Они однозначно фиксируют маршруты, accordion-поведение, открытие внешних ссылок в новой вкладке, обязательность полей, права доступа, migrations-first работу с Supabase и read-only назначение MCP.

Перед следующей продуктовой работой нужно свериться с актуальными specs и создать новый активный план. Новые функции сначала требуют подтверждения и обновления specs.

Технический аудит текущей версии завершен. Critical/high дефектов не найдено. Устаревшие формулировки старого локального этапа исправлены. Quality gate настроен: `lint`, `typecheck`, `quality` и production audit проходят. Accessibility feedback админки исправлен. Remote Supabase/RLS проверены: migrations совпадают, RLS включен, policies ожидаемые. Лишний `TRUNCATE` privilege у `anon` и `authenticated` на контентных таблицах отозван отдельной migration и проверен на remote. В админке добавлена защита от параллельных сохранений и обработка неожиданных ошибок входа/сессии. На публичной странице невалидные URL из Supabase больше не становятся активными ссылками, а неполные `external_links` не скрывают внешние кнопки текущей версии. UI/accessibility этап закрыт: добавлен keyboard focus для основных кнопок и выполнена visual responsive проверка `/` и `/admin` на ширинах `360`, `390`, `768`, `1024`, `1440`. Production/exploitation readiness задокументирована: локальный build, секреты, deploy checklist, rollback и восстановление admin-доступа проверены/описаны. Основной production domain `doctor-amal.vercel.app` проверен после переноса Vercel env и redeploy: `/` и `/admin` возвращают `200`, неизвестный URL возвращает `404`, Supabase-контент на production подтвержден активной Telegram-ссылкой покупки. Вход доктора и тестовое сохранение production-контента оставлены ручной проверкой после восстановления пароля.

Дополнительная проверка Codex-окружения выполнена 2026-06-16. Проект Doctor Amal не выглядит причиной нестабильной работы Codex: `npm run quality` проходит, tracked env-секретов нет, конфликтующих локальных инструкций не найдено. Найдены внешние причины риска: в текущей глобальной Codex-конфигурации `codex mcp list` не показывает Supabase MCP, хотя раньше он был зафиксирован как подключенный; также есть предупреждения Codex plugin/skills loader и `401 Unauthorized` при прогреве featured plugins cache. При необходимости Supabase MCP нужно подключить заново без записи токенов и секретов в проект.

Supabase MCP восстановлен 2026-06-16. `codex mcp list` показывает server `supabase` в статусе `enabled`, а `codex mcp get supabase` подтверждает URL с `project_ref=dagykilvpiacfbwpcluv`, `read_only=true` и `features=database,docs`. MCP остается только read-only inspection layer; при истечении авторизации нужно повторить `codex mcp login supabase`.

Авторизация Supabase MCP обновлена 2026-06-22 после повторяющегося сообщения `MCP startup incomplete (failed: supabase)`. Логи Codex показывали `AuthorizationRequired` и невозможность refresh OAuth token; повторный `codex mcp login supabase` завершился успешно. Read-only URL и project `dagykilvpiacfbwpcluv` сохранены. Текущая API-сессия может потребовать перезапуска, чтобы MCP tools поднялись при старте.

Проверка соответствия планов `070-082` выполнена 2026-06-17. Фактическое состояние проекта совпадает с завершенными этапами: quality gate, admin bugfixes, URL validation, partial-data fallback, focus-visible, migration revoke truncate, Supabase RLS/grants и production domain подтверждены. Признаков отката работы, выполненной до проблем с Codex, не найдено. Вход доктора и тестовое сохранение production-контента остаются отдельной ручной проверкой после восстановления пароля.

## Архивный статус до актуализации specs

Начат пересмотр проекта под новую концепцию Taplink-страницы.

Верхний уровень specs уже обновлен:

- `spec/global-spec.md`;
- `spec/functional-map.md`.

`global-spec.md` и `functional-map.md` согласованы между собой: первая версия является одной локальной страницей с внутренними блоками и внешними переходами.

`functional-map.md` уже содержит подтвержденную структуру первой версии: фото и имя доктора, кнопки `О докторе`, `Курсы`, `Telegram`, `WhatsApp`, `YouTube`, `Instagram`, внутренние блоки `О докторе` и `Курсы`, цена в свернутом курсе, описание и кнопка `Купить` после раскрытия курса, переход `Купить` в Telegram к менеджеру без сбора данных внутри проекта.

Код приложения еще может соответствовать старой версии с курсами, заявками и статьями. Перед новой реализацией нужно сверить все specs и затем привести код к новой концепции.

Feature specs новой версии начаты:

- `spec/feature-specs/README.md`;
- `spec/feature-specs/doctor-block.md`;
- `spec/feature-specs/courses-block.md`;
- `spec/feature-specs/course-purchase-link.md`;
- `spec/feature-specs/external-links.md`;
- `spec/feature-specs/medical-content-rules.md`;
- `spec/feature-specs/future-online-purchase.md`.

Все feature specs из текущего списка новой Taplink-версии созданы.

Feature specs дополнительно упрощены: общие ограничения первой локальной версии не нужно механически повторять в каждом feature spec, а блок `О докторе` больше не связывается с будущей онлайн-покупкой курса.

User stories переписаны под первую Taplink-версию: одна страница, блоки `О докторе` и `Курсы`, раскрытие курса, кнопка `Купить` с переходом в Telegram, внешние платформы и минимальное медицинское ограничение `Информация на странице носит ознакомительный характер.`

Technical specs переписаны под первую Taplink-версию: Next.js + TypeScript, один публичный маршрут `/`, локальные данные страницы, блоки `О докторе` и `Курсы`, внешние кнопки, `Купить` в Telegram, без пользовательского `localStorage`, заявок, статей, оплаты, сервера, базы данных и админки.

Серые зоны перед реализацией закрыты: если фото доктора еще нет, можно использовать согласованный placeholder; курс раскрывается через accordion; неизвестные внутренние URL показывают 404; `Купить` ведет на общую Telegram-ссылку менеджера без автоматической передачи названия курса; неактивные внешние кнопки показывают `Ссылка будет добавлена позже`; неактивная `Купить` показывает `Покупка временно недоступна`.

Код первой Taplink-страницы реализован по обновленным specs. В приложении остался один публичный пользовательский маршрут `/`, неизвестные внутренние URL показывают 404, старые маршруты, формы, заявки, статьи, пользовательский `localStorage`, старые модели и старые repository удалены из текущей версии.

Для визуальной проверки временно добавлены placeholder-данные блока `О докторе` и двух курсов. Блоки `О докторе` и `Курсы` раскрываются inline под соответствующей кнопкой через native `details` / `summary`, без отдельного маршрута и без зависимости от клиентского состояния React.

Тестовая design map подготовлена в `Design map/test-design-map.md`. Она фиксирует границы визуального тестирования, проверочные ширины, состояния интерфейса и правило: перенос решений в настоящий дизайн только после ручного подтверждения владельца проекта.

Текущий визуальный вариант перенесен из тестового статуса в реальный дизайн первой Taplink-страницы. Утвержденные UI-правила находятся в `Design map/design-rules.md`.

Supabase-этап как источник контента страницы подготовлен и выполнен до inspection/read MCP-слоя.

План действий перед Supabase закрыт в `Work plans/Завершенные/044-plan-supabase-content-source.md`. Справочный документ порядка работ находится в `Work plans/Завершенные/044-supabase-action-plan.md`.

Specs Supabase content source зафиксированы в `spec/technical-specs/supabase-content-source.md`. Инструкция для online Supabase Dashboard готова в `spec/technical-specs/supabase-dashboard-setup.md`.

Кодовый слой Supabase подготовлен так, чтобы сайт не ломался при недоступности Supabase: используется подтвержденный локальный fallback.

Env-переменные Supabase для проекта используют проектный префикс `DOCTOR_SUPABASE_*`. Service role key может храниться только как server-only переменная и текущим кодом не используется.

Supabase CLI migration применен к online project. Таблицы контента, RLS policies и seed должны быть доступны в Supabase.

Правила будущего Supabase MCP access зафиксированы в `spec/technical-specs/supabase-mcp-access.md`. Первый MCP-этап ограничен инспекцией и проверкой; изменения schema должны идти через `supabase/migrations/` и Supabase CLI.

Supabase MCP подключен в локальном Codex config как read-only inspection server для project `dagykilvpiacfbwpcluv`. Через MCP подтверждены таблицы первого Supabase-этапа, RLS status и migration `20260530000000_create_taplink_content_tables`.

Старые активные планы Supabase закрыты, `Work plans/Активные/` очищена от завершенных задач.

Подготовлены specs будущей админки и Auth. Минимальный подтвержденный вариант: контент редактирует только доктор, вход через email/password, изменения публикуются сразу после сохранения, редактируются профильные тексты, курсы, цены, внешние ссылки и Telegram-ссылка менеджера. Фото доктора редактируется через админку только при необходимости и после отдельного технического описания. Медицинское предупреждение, журнал изменений, черновики, роль менеджера, покупатели, заявки, оплата, медицинские анкеты и аналитика не входят в первый admin/Auth этап.

Технический слой доступа для админки применен в Supabase: создана таблица `admin_users`, добавлена роль `doctor_admin`, включены RLS policies и ограничены update grants. В `admin_users` есть один активный доктор-администратор. UI `/admin` и формы редактирования еще не реализованы.

UI входа в админку реализован: `/admin` открывает форму email/password, проверяет активную роль `doctor_admin` через `admin_users`, показывает защищенную оболочку и поддерживает logout. Владелец проекта вручную проверил вход доктора.

Редактор контента в админке реализован: активный доктор может редактировать профильные тексты, существующие курсы и цены, внешние ссылки и общую Telegram-ссылку менеджера. Сохранение идет в Supabase через RLS. Медицинское предупреждение, загрузка фото, добавление/удаление курсов, покупатели, заявки, оплата, аналитика, черновики и журнал изменений не добавлены.

Browser Supabase client для админки сделан стабильным: helper переиспользует один client для auth `storageKey` проекта, чтобы не создавать несколько `GoTrueClient` в одном browser context при повторном render или hot reload.

Delay обновления публичной страницы после изменений в админке сокращен: публичный route `/` теперь пересобирает данные Supabase примерно раз в 30 секунд вместо 5 минут. Мгновенный сброс кеша после сохранения не добавлен.

Feedback сохранения в админке уточнен: после успешного сохранения конкретная кнопка показывает `Сохранено` с круглой галочкой, чтобы доктор видел результат действия рядом с редактируемой формой.

Specs добавления курсов через админку подготовлены. Новый курс создается с названием, описанием, ценой текстом, подтверждением цены и активностью; технические поля формируются приложением. Для реализации потребуется отдельная migration с `insert` policy для `courses`. Физическое удаление курсов не входит в этап: курс скрывается через `is_active = false` и не оставляет пустой блок на публичной странице.

Добавление курсов через админку реализовано. Активный `doctor_admin` может создать новый курс в `/admin`; приложение формирует `id`, `slug`, `sort_order` и `purchase_label = Купить`. Remote Supabase получил `insert` policy для `courses`. Физическое удаление курсов не добавлено: курс скрывается через checkbox `Показывать курс на публичной странице`.

Env-схема Supabase приведена к чистому правилу Next.js + Supabase: public env для browser/client Supabase — `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; server-side/project URL — `DOCTOR_SUPABASE_URL`; service role key — только `DOCTOR_SUPABASE_SERVICE_ROLE_KEY`, без `NEXT_PUBLIC_*` и без использования текущим кодом. Legacy fallback `DOCTOR_SUPABASE_PUBLISHABLE_KEY` и `DOCTOR_SUPABASE_ANON_KEY` убран из `.env.example` и кода.

Перед следующей продуктовой работой:

1. свериться с актуальными specs;
2. если новое требование отсутствует в `spec/`, сначала согласовать и обновить specs;
3. использовать закрытые решения по placeholder, accordion, 404, Telegram-ссылке и неактивным состояниям;
4. создать новую ветку от `main`, если это требуется владельцу проекта;
5. создать активный план в `Work plans/Активные/`;
6. после проверки обновить `Roadmap/chronology.md` и этот файл.
