export type SalesStatus = "open" | "closed" | "coming_soon";

export type PublicationStatus = "published" | "draft" | "archived";

export type CourseCurrency = "USD" | "EUR" | "UAH" | "RUB" | null;

export interface CoursePrice {
  amount: number | null;
  currency: CourseCurrency;
  displayText: string;
}

export interface SalesPeriod {
  startsAt: string | null;
  endsAt: string | null;
  displayText: string | null;
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  topics: string[];
  symptoms: string[];
  price: CoursePrice;
  salesStatus: SalesStatus;
  salesPeriod: SalesPeriod;
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

export function isCourse(value: unknown): value is Course {
  if (!value || typeof value !== "object") {
    return false;
  }

  const course = value as Course;

  return (
    typeof course.id === "string" &&
    typeof course.title === "string" &&
    typeof course.shortDescription === "string" &&
    typeof course.fullDescription === "string" &&
    typeof course.category === "string" &&
    Array.isArray(course.topics) &&
    Array.isArray(course.symptoms) &&
    typeof course.price === "object" &&
    course.price !== null &&
    typeof course.price.displayText === "string" &&
    ["open", "closed", "coming_soon"].includes(course.salesStatus) &&
    typeof course.salesPeriod === "object" &&
    course.salesPeriod !== null &&
    typeof course.salesRuleDescription === "string" &&
    typeof course.telegramAccessDescription === "string" &&
    Array.isArray(course.benefits) &&
    Array.isArray(course.purchaseTerms) &&
    Array.isArray(course.relatedCourseIds) &&
    ["published", "draft", "archived"].includes(course.publicationStatus) &&
    typeof course.createdAt === "string" &&
    typeof course.updatedAt === "string"
  );
}

export function isPublishableCourse(course: Course): boolean {
  return (
    course.publicationStatus === "published" &&
    course.id.trim().length > 0 &&
    course.title.trim().length > 0 &&
    course.shortDescription.trim().length > 0 &&
    course.fullDescription.trim().length > 0 &&
    course.category.trim().length > 0 &&
    course.telegramAccessDescription.trim().length > 0
  );
}
