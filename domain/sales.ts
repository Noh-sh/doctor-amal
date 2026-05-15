import type { Course } from "./course";

export function canSubmitCoursePurchase(course: Course): boolean {
  return course.publicationStatus === "published" && course.salesStatus === "open";
}

export function canSubmitPrePurchaseConsultation(hasAnyOpenSales: boolean): boolean {
  return hasAnyOpenSales;
}

export function hasAnyOpenSales(courses: Course[]): boolean {
  return courses.some((course) => canSubmitCoursePurchase(course));
}
