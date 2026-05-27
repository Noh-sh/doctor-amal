import type { TaplinkPageData } from "@/domain/taplink";

export const taplinkPageData: TaplinkPageData = {
  doctor: {
    displayName: "Dr.Amal",
    photo: {
      src: "/images/doctor-amal-avatar.jpg",
      alt: "Dr.Amal"
    },
    shortIntro: "Официальная страница Dr.Amal с материалами, курсами и полезными ресурсами.",
    education: [
      "У меня среднее и высшее медицинское образование.",
      "До медицинского университета я окончила медицинское училище по направлению «сестринское дело».",
      "В 2010 году окончила Украинский медицинский университет, а в 2013 году завершила интернатуру по специальности «общая практика — семейная медицина»."
    ],
    experience: [
      "Я семейный врач, специалист интегративно-превентивного подхода, дипломированный нутрициолог и хаджам.",
      "Также имею диплом косметолога и опыт работы в этом направлении.",
      "После интернатуры проходила практику в реанимационном отделении кардиологии.",
      "Работала в кардиологическом и реабилитационном направлении, включая сопровождение пациентов после инфарктов и инсультов."
    ],
    professionalDirections: [
      "В профессиональной практике я работаю с темами кожи, женского здоровья, обмена веществ, ЖКТ, гормонального баланса, дефицитных состояний, хронического воспаления, усталости, сна, настроения и общего самочувствия."
    ],
    healthTopics: [],
    helpFormats: [
      "Мой подход основан на внимательном рассмотрении взаимосвязей в организме и поиске возможных причин нарушений, с учетом общего состояния человека."
    ]
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
      title: "Эко дом",
      description: "Описание курса будет добавлено после подтверждения. Сейчас этот текст нужен только для проверки внешнего вида раскрытого курса.",
      price: {
        displayText: "15 000 руб.",
        isConfirmed: true
      },
      purchaseLabel: "Купить"
    },
    {
      id: "visual-placeholder-course-2",
      title: "Витамины и минералы",
      description: "Финальное описание, темы и условия курса будут добавлены только после подтверждения владельцем проекта.",
      price: {
        displayText: "15 000 руб.",
        isConfirmed: true
      },
      purchaseLabel: "Купить"
    }
  ],
  purchase: {
    managerTelegramUrl: null,
    inactiveText: "Покупка временно недоступна"
  }
};
