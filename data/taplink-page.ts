import type { TaplinkPageData } from "@/domain/taplink";

export const taplinkPageData: TaplinkPageData = {
  doctor: {
    displayName: "Доктор Амал",
    photo: null,
    shortIntro: "Временное представление для визуальной проверки. Финальный текст будет добавлен после подтверждения.",
    education: ["Временный блок: образование будет добавлено после подтверждения."],
    experience: ["Временный блок: опыт будет добавлен после подтверждения."],
    professionalDirections: ["Временный блок: профессиональные направления будут добавлены после подтверждения."],
    healthTopics: ["Временный блок: направления здоровья будут добавлены после подтверждения."],
    helpFormats: ["Временный блок: форматы помощи будут добавлены после подтверждения."]
  },
  medicalNotice: "Информация на странице носит ознакомительный характер.",
  externalLinks: [
    {
      platform: "telegram",
      label: "Telegram",
      url: null,
      isEnabled: false,
      inactiveText: "Ссылка будет добавлена позже"
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      url: null,
      isEnabled: false,
      inactiveText: "Ссылка будет добавлена позже"
    },
    {
      platform: "youtube",
      label: "YouTube",
      url: null,
      isEnabled: false,
      inactiveText: "Ссылка будет добавлена позже"
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: null,
      isEnabled: false,
      inactiveText: "Ссылка будет добавлена позже"
    }
  ],
  courses: [
    {
      id: "visual-placeholder-course-1",
      title: "Временный пример курса 1",
      description: "Описание курса будет добавлено после подтверждения. Сейчас этот текст нужен только для проверки внешнего вида раскрытого курса.",
      price: {
        displayText: "Цена уточняется",
        isConfirmed: false
      },
      purchaseLabel: "Купить"
    },
    {
      id: "visual-placeholder-course-2",
      title: "Временный пример курса 2",
      description: "Финальное описание, темы и условия курса будут добавлены только после подтверждения владельцем проекта.",
      price: {
        displayText: "Цена уточняется",
        isConfirmed: false
      },
      purchaseLabel: "Купить"
    }
  ],
  purchase: {
    managerTelegramUrl: null,
    inactiveText: "Покупка временно недоступна"
  }
};
