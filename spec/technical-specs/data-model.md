# Technical Spec: Модель данных

## Цель

Зафиксировать технические модели данных первой локальной Taplink-версии Doctor Amal.

Модели нужны для отображения страницы. Они не описывают серверную базу данных, заявки, статьи, платежи или админку первой версии.

## Общие правила

- Данные хранятся локально в проекте.
- Данные могут быть TypeScript-константами или JSON.
- Пользователь не редактирует эти данные через интерфейс первой версии.
- Технические ключи не показываются пользователю.
- Нельзя придумывать неподтвержденные данные о докторе, курсы, цены или URL.

## TaplinkPageData

```ts
interface TaplinkPageData {
  doctor: DoctorProfile;
  medicalNotice: string;
  externalLinks: ExternalLink[];
  courses: Course[];
  purchase: PurchaseSettings;
}
```

`medicalNotice` для первой версии:

```text
Информация на странице носит ознакомительный характер.
```

## DoctorProfile

```ts
interface DoctorProfile {
  displayName: string;
  photo: ImageAsset | null;
  shortIntro: string | null;
  education: string[];
  experience: string[];
  professionalDirections: string[];
  healthTopics: string[];
  helpFormats: string[];
}
```

Правила:

- `displayName` должен быть подтвержден перед реализацией.
- `photo` должен быть предоставлен владельцем проекта или заменен только согласованным временным вариантом.
- Массивы могут быть пустыми, если данные не подтверждены.
- UI не должен показывать пустые списки как техническую ошибку.

## ImageAsset

```ts
interface ImageAsset {
  src: string;
  alt: string;
}
```

`alt` должен быть пользовательским и русскоязычным, если изображение несет смысл.

## ExternalLink

```ts
type ExternalPlatform = "telegram" | "whatsapp" | "youtube" | "instagram";

interface ExternalLink {
  platform: ExternalPlatform;
  label: "Telegram" | "WhatsApp" | "YouTube" | "Instagram";
  url: string | null;
  isEnabled: boolean;
  inactiveText: string | null;
}
```

Правила:

- `url` может быть рабочим только после подтверждения владельцем проекта.
- `isEnabled` должен быть `false`, если `url` не задан.
- `inactiveText` для внешней кнопки без URL: `Ссылка будет добавлена позже`.
- Нельзя добавлять UTM-метки, аналитику или интеграции без отдельного подтверждения.

## Course

```ts
interface Course {
  id: string;
  title: string;
  description: string;
  price: CoursePrice;
  purchaseLabel: "Купить";
}
```

Правила:

- `id` нужен только для технической работы UI, например для состояния раскрытого курса.
- `id` не используется для публичного маршрута.
- `title`, `description` и `price` должны быть подтверждены владельцем проекта.
- Курс не имеет статуса продаж в первой версии.
- Курс не имеет отдельной страницы.
- Курс не имеет отдельной Telegram-ссылки.

## CoursePrice

```ts
interface CoursePrice {
  displayText: string;
  isConfirmed: boolean;
}
```

Правила:

- В UI показывается `displayText`.
- Если цена не подтверждена, нельзя придумывать сумму.
- Формулировка вроде `цена уточняется` допустима только после подтверждения владельцем проекта.

## PurchaseSettings

```ts
interface PurchaseSettings {
  managerTelegramUrl: string | null;
  inactiveText: string | null;
}
```

Правила:

- В первой версии используется одна общая Telegram-ссылка менеджера для всех курсов.
- `managerTelegramUrl` должен быть подтвержден владельцем проекта.
- В первой версии название выбранного курса не передается автоматически.
- Пользователь самостоятельно сообщает менеджеру, какой курс его интересует.
- `inactiveText` для кнопки `Купить` без Telegram-ссылки: `Покупка временно недоступна`.
- Автоматическая передача названия курса, prefilled message или Telegram bot не входят в первую версию и могут быть добавлены только после отдельного подтверждения и обновления specs.

## Модели, которых нет в первой версии

В первой локальной Taplink-версии нет моделей:

- `Article`;
- `UserRequest`;
- `SalesStatus`;
- `RequestStatus`;
- `Payment`;
- `User`;
- `Admin`;
- `Order`.

Эти сущности могут появиться только в будущих specs.

## Пример локальных данных

```ts
export const taplinkPageData: TaplinkPageData = {
  doctor: {
    displayName: "Доктор Амал",
    photo: null,
    shortIntro: null,
    education: [],
    experience: [],
    professionalDirections: [],
    healthTopics: [],
    helpFormats: []
  },
  medicalNotice: "Информация на странице носит ознакомительный характер.",
  externalLinks: [
    {
      platform: "telegram",
      label: "Telegram",
      url: null,
      isEnabled: false,
      inactiveText: "Ссылка будет добавлена позже"
    }
  ],
  courses: [],
  purchase: {
    managerTelegramUrl: null,
    inactiveText: "Покупка временно недоступна"
  }
};
```

Пример не является финальным контентом. Реальные данные должны быть подтверждены владельцем проекта.
