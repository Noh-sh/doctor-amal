export type ExternalPlatform = "telegram" | "whatsapp" | "youtube" | "instagram";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface DoctorProfile {
  displayName: string;
  photo: ImageAsset | null;
  shortIntro: string | null;
  education: string[];
  experience: string[];
  professionalDirections: string[];
  healthTopics: string[];
  helpFormats: string[];
}

export interface ExternalLink {
  platform: ExternalPlatform;
  label: "Telegram" | "WhatsApp" | "YouTube" | "Instagram";
  url: string | null;
  isEnabled: boolean;
  inactiveText: string | null;
}

export interface CoursePrice {
  displayText: string;
  isConfirmed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: CoursePrice;
  purchaseLabel: "Купить";
}

export interface PurchaseSettings {
  managerTelegramUrl: string | null;
  inactiveText: string | null;
}

export interface TaplinkPageData {
  doctor: DoctorProfile;
  medicalNotice: string;
  externalLinks: ExternalLink[];
  courses: Course[];
  purchase: PurchaseSettings;
}
