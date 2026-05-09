# Technical Spec: Модель данных

## Цель
Зафиксировать технические модели данных для курсов, статей, заявок, статусов продаж и публикации.

Модели должны быть достаточно стабильными, чтобы первая локальная версия могла позже перейти на серверную базу данных без изменения пользовательской логики.

## Общие правила идентификаторов
- Все публичные сущности должны иметь стабильный строковый `id`.
- `id` используется в URL, связях и сохраненных заявках.
- `id` не показывается пользователю.
- Рекомендуемый формат: `kebab-case`, например `skin-health-basics`.

## Course

### TypeScript-модель
```ts
type SalesStatus = "open" | "closed" | "coming_soon";
type PublicationStatus = "published" | "draft" | "archived";

interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  topics: string[];
  symptoms: string[];
  price: {
    amount: number | null;
    currency: "USD" | "EUR" | "UAH" | "RUB" | null;
    displayText: string;
  };
  salesStatus: SalesStatus;
  salesPeriod: {
    startsAt: string | null;
    endsAt: string | null;
    displayText: string | null;
  };
  salesRuleDescription: string;
  telegramAccessDescription: string;
  telegramChannelInternalName?: string;
  benefits: string[];
  purchaseTerms: string[];
  relatedCourseIds: string[];
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}
```

### Обязательные поля для публикации
Курс можно показывать пользователю только если заполнены:
- `id`;
- `title`;
- `shortDescription`;
- `fullDescription`;
- `category`;
- `salesStatus`;
- `telegramAccessDescription`;
- `publicationStatus = "published"`.

Если этих данных нет, курс должен быть скрыт или страница должна показать понятное состояние недоступности.

### Служебные поля
`telegramChannelInternalName` может быть полезен администратору в будущем, но не должен показываться обычному пользователю.

## Article

### TypeScript-модель
```ts
interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  source: {
    type: "telegram" | "original" | "other";
    displayText: string | null;
    url: string | null;
  };
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}
```

### Обязательные поля для публикации
Статью можно показывать пользователю только если заполнены:
- `id`;
- `title`;
- `summary`;
- `body`;
- `category`;
- `publicationStatus = "published"`.

Если `body` пустой, статья не должна открываться как полноценный материал.

## UserRequest

### TypeScript-модель
```ts
type RequestType = "course_purchase" | "pre_purchase_consultation";

type RequestStatus =
  | "new"
  | "needs_clarification"
  | "course_recommended"
  | "awaiting_offline_payment"
  | "telegram_access_granted"
  | "closed"
  | "cancelled";

interface BaseUserRequest {
  id: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  name: string;
  contact: string;
  consentNotMedicalConsultation: true;
  consentNoOnlinePayment: true;
}

interface CoursePurchaseRequest extends BaseUserRequest {
  type: "course_purchase";
  courseId: string;
  comment: string;
  paymentHandledOutsideSite: true;
  telegramAccessAfterAgreedPayment: true;
}

interface PrePurchaseConsultationRequest extends BaseUserRequest {
  type: "pre_purchase_consultation";
  age: number;
  mainProblem: string;
  selectedTopics: string[];
  questions: string;
  preferredCourseId: string | null;
}

type UserRequest = CoursePurchaseRequest | PrePurchaseConsultationRequest;
```

## Поля, которые нельзя добавлять в заявку
Заявка не должна содержать:
- данные банковской карты;
- платежные реквизиты;
- пароли;
- медицинские документы;
- результаты анализов;
- диагнозы как структурированное поле;
- историю переписки;
- вложения файлов.

Свободный текст пользователя может содержать чувствительные сведения, поэтому интерфейс должен просить описывать вопрос кратко и не отправлять документы/анализы через форму.

## Status mapping для пользователя
Внутренние статусы должны отображаться пользователю понятными текстами.

```text
open -> Продажи открыты
closed -> Продажи закрыты
coming_soon -> Продажи скоро откроются
published -> Опубликовано
draft -> Черновик
archived -> Архив
```

Статусы заявок в первой локальной версии можно не показывать пользователю после отправки, потому что личного кабинета нет.

## Пример courses.json
```json
[
  {
    "id": "skin-health-basics",
    "title": "Курс по поддержке здоровья кожи",
    "shortDescription": "Ознакомительный курс о питании, образе жизни и факторах, которые могут влиять на состояние кожи.",
    "fullDescription": "Курс помогает разобраться в базовых принципах поддержки здоровья кожи через питание, образ жизни и профилактический подход.",
    "category": "Кожа",
    "topics": ["кожа", "питание", "воспаление"],
    "symptoms": ["высыпания", "сухость кожи"],
    "price": {
      "amount": null,
      "currency": null,
      "displayText": "Стоимость уточняется при заявке"
    },
    "salesStatus": "closed",
    "salesPeriod": {
      "startsAt": null,
      "endsAt": null,
      "displayText": null
    },
    "salesRuleDescription": "Продажи открываются отдельными периодами.",
    "telegramAccessDescription": "После согласованной оплаты доступ предоставляется вручную в закрытый Telegram-канал.",
    "telegramChannelInternalName": "internal-skin-course",
    "benefits": ["Понять основные факторы образа жизни", "Изучить образовательные материалы"],
    "purchaseTerms": ["Оплата не выполняется на сайте", "Доступ предоставляется вручную"],
    "relatedCourseIds": [],
    "publicationStatus": "published",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

## Пример articles.json
```json
[
  {
    "id": "nutrition-and-energy",
    "title": "Питание и уровень энергии",
    "summary": "Краткий материал о связи питания, режима и самочувствия.",
    "body": "Текст статьи...",
    "category": "Питание",
    "tags": ["питание", "образ жизни"],
    "publishedAt": "2026-01-01T00:00:00.000Z",
    "source": {
      "type": "telegram",
      "displayText": "Материал из Telegram-канала",
      "url": null
    },
    "publicationStatus": "published",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

## Пример заявки
```json
{
  "id": "req_20260101_000001",
  "type": "course_purchase",
  "status": "new",
  "createdAt": "2026-01-01T10:00:00.000Z",
  "updatedAt": "2026-01-01T10:00:00.000Z",
  "name": "Мария",
  "contact": "@maria_example",
  "consentNotMedicalConsultation": true,
  "consentNoOnlinePayment": true,
  "courseId": "skin-health-basics",
  "comment": "Хочу уточнить условия участия.",
  "paymentHandledOutsideSite": true,
  "telegramAccessAfterAgreedPayment": true
}
```

## Правила дат
- Все технические даты хранятся в ISO 8601.
- Для пользователя даты показываются в русском формате.
- Если период продаж неизвестен, поля периода могут быть `null`, а UI показывает нейтральный текст без выдуманной даты.

## Правила поиска
Поиск по курсам должен использовать:
- `title`;
- `shortDescription`;
- `category`;
- `topics`;
- `symptoms`.

Поиск по статьям должен использовать:
- `title`;
- `summary`;
- `category`;
- `tags`;
- `body`, если объем данных небольшой.

Поиск не должен интерпретировать симптом как диагноз.
