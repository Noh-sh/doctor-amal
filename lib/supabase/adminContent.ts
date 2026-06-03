import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExternalPlatform } from "@/domain/taplink";

export type AdminDoctorProfile = {
  displayName: string;
  shortIntro: string;
  education: string[];
  experience: string[];
  professionalDirections: string[];
  healthTopics: string[];
  helpFormats: string[];
};

export type AdminExternalLink = {
  id: number;
  platform: ExternalPlatform;
  label: "Telegram" | "WhatsApp" | "YouTube" | "Instagram";
  url: string;
  isEnabled: boolean;
  inactiveText: string;
};

export type AdminCourse = {
  id: string;
  title: string;
  description: string;
  priceDisplayText: string;
  priceIsConfirmed: boolean;
  isActive: boolean;
};

export type AdminPurchaseSettings = {
  managerTelegramUrl: string;
  inactiveText: string;
};

export type AdminContent = {
  doctorProfile: AdminDoctorProfile;
  externalLinks: AdminExternalLink[];
  courses: AdminCourse[];
  purchaseSettings: AdminPurchaseSettings;
};

type DoctorProfileRow = {
  display_name: string | null;
  short_intro: string | null;
  education: unknown;
  experience: unknown;
  professional_directions: unknown;
  health_topics: unknown;
  help_formats: unknown;
};

type ExternalLinkRow = {
  id: number;
  platform: string | null;
  label: string | null;
  url: string | null;
  is_enabled: boolean | null;
  inactive_text: string | null;
};

type CourseRow = {
  id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  price_display_text: string | null;
  price_is_confirmed: boolean | null;
  is_active: boolean | null;
  sort_order: number | null;
};

type PurchaseSettingsRow = {
  manager_telegram_url: string | null;
  inactive_text: string | null;
};

export type DoctorProfileUpdate = {
  displayName: string;
  shortIntro: string;
  education: string[];
  experience: string[];
  professionalDirections: string[];
  healthTopics: string[];
  helpFormats: string[];
};

export type ExternalLinkUpdate = {
  url: string;
  isEnabled: boolean;
  inactiveText: string;
};

export type CourseUpdate = {
  title: string;
  description: string;
  priceDisplayText: string;
  priceIsConfirmed: boolean;
  isActive: boolean;
};

export type CourseCreate = CourseUpdate;

export type PurchaseSettingsUpdate = {
  managerTelegramUrl: string;
  inactiveText: string;
};

const platformLabels: Record<ExternalPlatform, AdminExternalLink["label"]> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
  instagram: "Instagram"
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function isExternalPlatform(value: string | null): value is ExternalPlatform {
  return value === "telegram" || value === "whatsapp" || value === "youtube" || value === "instagram";
}

function toText(value: string | null | undefined) {
  return value ?? "";
}

function toNullableText(value: string) {
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createCourseKeys(title: string) {
  const suffix = Date.now().toString(36);
  const id = `course-${suffix}`;
  const slugBase = slugify(title);

  return {
    id,
    slug: slugBase ? `${slugBase}-${suffix}` : id
  };
}

function mapDoctorProfile(row: DoctorProfileRow): AdminDoctorProfile {
  return {
    displayName: toText(row.display_name),
    shortIntro: toText(row.short_intro),
    education: asStringArray(row.education),
    experience: asStringArray(row.experience),
    professionalDirections: asStringArray(row.professional_directions),
    healthTopics: asStringArray(row.health_topics),
    helpFormats: asStringArray(row.help_formats)
  };
}

function mapExternalLinks(rows: ExternalLinkRow[]): AdminExternalLink[] {
  return rows
    .filter((row) => isExternalPlatform(row.platform))
    .map((row) => {
      const platform = row.platform as ExternalPlatform;

      return {
        id: row.id,
        platform,
        label: platformLabels[platform],
        url: toText(row.url),
        isEnabled: Boolean(row.is_enabled),
        inactiveText: toText(row.inactive_text)
      };
    });
}

function mapCourses(rows: CourseRow[]): AdminCourse[] {
  return rows.map((row) => ({
    id: row.id,
    title: toText(row.title),
    description: toText(row.description),
    priceDisplayText: toText(row.price_display_text),
    priceIsConfirmed: Boolean(row.price_is_confirmed),
    isActive: Boolean(row.is_active)
  }));
}

function mapPurchaseSettings(row: PurchaseSettingsRow): AdminPurchaseSettings {
  return {
    managerTelegramUrl: toText(row.manager_telegram_url),
    inactiveText: toText(row.inactive_text)
  };
}

export async function fetchAdminContent(supabase: SupabaseClient): Promise<AdminContent> {
  const [doctorProfileResult, externalLinksResult, coursesResult, purchaseSettingsResult] = await Promise.all([
    supabase
      .from("doctor_profile")
      .select("display_name,short_intro,education,experience,professional_directions,health_topics,help_formats")
      .eq("id", "main")
      .maybeSingle<DoctorProfileRow>(),
    supabase
      .from("external_links")
      .select("id,platform,label,url,is_enabled,inactive_text")
      .order("sort_order", { ascending: true })
      .returns<ExternalLinkRow[]>(),
    supabase
      .from("courses")
      .select("id,slug,title,description,price_display_text,price_is_confirmed,is_active,sort_order")
      .order("sort_order", { ascending: true })
      .returns<CourseRow[]>(),
    supabase
      .from("purchase_settings")
      .select("manager_telegram_url,inactive_text")
      .eq("id", "main")
      .maybeSingle<PurchaseSettingsRow>()
  ]);

  if (doctorProfileResult.error) {
    throw doctorProfileResult.error;
  }

  if (externalLinksResult.error) {
    throw externalLinksResult.error;
  }

  if (coursesResult.error) {
    throw coursesResult.error;
  }

  if (purchaseSettingsResult.error) {
    throw purchaseSettingsResult.error;
  }

  if (!doctorProfileResult.data || !purchaseSettingsResult.data) {
    throw new Error("Admin content is incomplete.");
  }

  return {
    doctorProfile: mapDoctorProfile(doctorProfileResult.data),
    externalLinks: mapExternalLinks(externalLinksResult.data ?? []),
    courses: mapCourses(coursesResult.data ?? []),
    purchaseSettings: mapPurchaseSettings(purchaseSettingsResult.data)
  };
}

export async function updateDoctorProfile(supabase: SupabaseClient, input: DoctorProfileUpdate) {
  const { error } = await supabase
    .from("doctor_profile")
    .update({
      display_name: input.displayName.trim(),
      short_intro: toNullableText(input.shortIntro),
      education: input.education,
      experience: input.experience,
      professional_directions: input.professionalDirections,
      health_topics: input.healthTopics,
      help_formats: input.helpFormats
    })
    .eq("id", "main");

  if (error) {
    throw error;
  }
}

export async function updateExternalLink(supabase: SupabaseClient, id: number, input: ExternalLinkUpdate) {
  const { error } = await supabase
    .from("external_links")
    .update({
      url: toNullableText(input.url),
      is_enabled: input.isEnabled,
      inactive_text: toNullableText(input.inactiveText)
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateCourse(supabase: SupabaseClient, id: string, input: CourseUpdate) {
  const { error } = await supabase
    .from("courses")
    .update({
      title: input.title.trim(),
      description: input.description.trim(),
      price_display_text: input.priceDisplayText.trim(),
      price_is_confirmed: input.priceIsConfirmed,
      is_active: input.isActive
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function createCourse(supabase: SupabaseClient, input: CourseCreate) {
  const { id, slug } = createCourseKeys(input.title);
  const { data: latestCourse, error: latestCourseError } = await supabase
    .from("courses")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle<Pick<CourseRow, "sort_order">>();

  if (latestCourseError) {
    throw latestCourseError;
  }

  const sortOrder = typeof latestCourse?.sort_order === "number" ? latestCourse.sort_order + 1 : 0;
  const { error } = await supabase.from("courses").insert({
    id,
    slug,
    title: input.title.trim(),
    description: input.description.trim(),
    price_display_text: input.priceDisplayText.trim(),
    price_is_confirmed: input.priceIsConfirmed,
    purchase_label: "Купить",
    is_active: input.isActive,
    sort_order: sortOrder
  });

  if (error) {
    throw error;
  }
}

export async function updatePurchaseSettings(supabase: SupabaseClient, input: PurchaseSettingsUpdate) {
  const { error } = await supabase
    .from("purchase_settings")
    .update({
      manager_telegram_url: toNullableText(input.managerTelegramUrl),
      inactive_text: toNullableText(input.inactiveText)
    })
    .eq("id", "main");

  if (error) {
    throw error;
  }
}
