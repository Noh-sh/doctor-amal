import { taplinkPageData } from "@/data/taplink-page";
import type {
  Course,
  ExternalLink,
  ExternalPlatform,
  PurchaseSettings,
  TaplinkPageData
} from "@/domain/taplink";

type DoctorProfileRow = {
  display_name: string | null;
  photo_src: string | null;
  photo_alt: string | null;
  short_intro: string | null;
  education: unknown;
  experience: unknown;
  professional_directions: unknown;
  health_topics: unknown;
  help_formats: unknown;
};

type PageSettingsRow = {
  medical_notice: string | null;
};

type ExternalLinkRow = {
  platform: string | null;
  label: string | null;
  url: string | null;
  is_enabled: boolean | null;
  inactive_text: string | null;
};

type CourseRow = {
  id: string | null;
  slug: string | null;
  title: string | null;
  description: string | null;
  price_display_text: string | null;
  price_is_confirmed: boolean | null;
  purchase_label: string | null;
};

type PurchaseSettingsRow = {
  manager_telegram_url: string | null;
  inactive_text: string | null;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.DOCTOR_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function hasSupabaseEnv() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function isExternalPlatform(value: string | null): value is ExternalPlatform {
  return value === "telegram" || value === "whatsapp" || value === "youtube" || value === "instagram";
}

function toExternalLabel(platform: ExternalPlatform, label: string | null): ExternalLink["label"] {
  if (label === "Telegram" || label === "WhatsApp" || label === "YouTube" || label === "Instagram") {
    return label;
  }

  const fallbackLabels: Record<ExternalPlatform, ExternalLink["label"]> = {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    youtube: "YouTube",
    instagram: "Instagram"
  };

  return fallbackLabels[platform];
}

function toValidHttpUrl(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);

    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toValidTelegramUrl(value: string | null): string | null {
  const url = toValidHttpUrl(value);

  if (!url) {
    return null;
  }

  const hostname = new URL(url).hostname.toLowerCase();

  return hostname === "t.me" || hostname === "telegram.me" ? url : null;
}

async function readTable<T>(table: string, query = "select=*"): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return [];
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY
    },
    next: {
      revalidate: 30
    }
  });

  if (!response.ok) {
    throw new Error(`Supabase table ${table} returned ${response.status}`);
  }

  return response.json() as Promise<T[]>;
}

function mapSupabaseData({
  doctorProfile,
  pageSettings,
  externalLinks,
  courses,
  purchaseSettings
}: {
  doctorProfile: DoctorProfileRow;
  pageSettings: PageSettingsRow;
  externalLinks: ExternalLinkRow[];
  courses: CourseRow[];
  purchaseSettings: PurchaseSettingsRow;
}): TaplinkPageData {
  const mappedExternalLinks: ExternalLink[] = externalLinks
    .filter((link) => isExternalPlatform(link.platform))
    .map((link) => {
      const platform = link.platform as ExternalPlatform;
      const url = toValidHttpUrl(link.url);

      return {
        platform,
        label: toExternalLabel(platform, link.label),
        url,
        isEnabled: Boolean(link.is_enabled && url),
        inactiveText: link.inactive_text
      };
    });

  const mappedCourses: Course[] = courses
    .filter((course) => course.title && course.description && course.price_display_text)
    .map((course) => ({
      id: course.id ?? course.slug ?? course.title ?? "course",
      title: course.title ?? "",
      description: course.description ?? "",
      price: {
        displayText: course.price_display_text ?? "",
        isConfirmed: Boolean(course.price_is_confirmed)
      },
      purchaseLabel: course.purchase_label === "Купить" ? "Купить" : "Купить"
    }));

  const purchase: PurchaseSettings = {
    managerTelegramUrl: toValidTelegramUrl(purchaseSettings.manager_telegram_url),
    inactiveText: purchaseSettings.inactive_text
  };

  return {
    doctor: {
      displayName: doctorProfile.display_name || taplinkPageData.doctor.displayName,
      photo: doctorProfile.photo_src
        ? {
            src: doctorProfile.photo_src,
            alt: doctorProfile.photo_alt || doctorProfile.display_name || taplinkPageData.doctor.displayName
          }
        : taplinkPageData.doctor.photo,
      shortIntro: doctorProfile.short_intro,
      education: asStringArray(doctorProfile.education),
      experience: asStringArray(doctorProfile.experience),
      professionalDirections: asStringArray(doctorProfile.professional_directions),
      healthTopics: asStringArray(doctorProfile.health_topics),
      helpFormats: asStringArray(doctorProfile.help_formats)
    },
    medicalNotice: pageSettings.medical_notice || taplinkPageData.medicalNotice,
    externalLinks: mappedExternalLinks.length > 0 ? mappedExternalLinks : taplinkPageData.externalLinks,
    courses: mappedCourses,
    purchase
  };
}

async function getSupabaseTaplinkPageData(): Promise<TaplinkPageData | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  try {
    const [doctorProfiles, pageSettingsRows, externalLinks, courses, purchaseSettingsRows] = await Promise.all([
      readTable<DoctorProfileRow>("doctor_profile", "select=*&id=eq.main&is_published=eq.true&limit=1"),
      readTable<PageSettingsRow>("page_settings", "select=*&id=eq.main&is_published=eq.true&limit=1"),
      readTable<ExternalLinkRow>("external_links", "select=*&order=sort_order.asc"),
      readTable<CourseRow>("courses", "select=*&is_active=eq.true&order=sort_order.asc"),
      readTable<PurchaseSettingsRow>("purchase_settings", "select=*&id=eq.main&limit=1")
    ]);

    const doctorProfile = doctorProfiles[0];
    const pageSettings = pageSettingsRows[0];
    const purchaseSettings = purchaseSettingsRows[0];

    if (!doctorProfile || !pageSettings || !purchaseSettings) {
      return null;
    }

    return mapSupabaseData({
      doctorProfile,
      pageSettings,
      externalLinks,
      courses,
      purchaseSettings
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase content source is unavailable, using local Taplink data.", error);
    }

    return null;
  }
}

export async function getTaplinkPageData(): Promise<TaplinkPageData> {
  const supabaseData = await getSupabaseTaplinkPageData();

  return supabaseData ?? taplinkPageData;
}
