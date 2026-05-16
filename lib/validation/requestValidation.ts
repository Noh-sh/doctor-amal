import type { Course } from "@/domain/course";
import type { RequestType, UserRequest } from "@/domain/request";
import { canSubmitCoursePurchase } from "@/domain/sales";

export type RequestFormField =
  | "form"
  | "name"
  | "contact"
  | "consentNotMedicalConsultation"
  | "consentNoOnlinePayment"
  | "courseId"
  | "comment"
  | "age"
  | "mainProblem"
  | "selectedTopics"
  | "questions"
  | "preferredCourseId";

export type RequestFormErrors = Partial<Record<RequestFormField, string>>;

export interface RequestFormValues {
  type: RequestType;
  name: string;
  contact: string;
  consentNotMedicalConsultation: boolean;
  consentNoOnlinePayment: boolean;
  courseId: string;
  comment: string;
  age: string;
  mainProblem: string;
  selectedTopics: string[];
  questions: string;
  preferredCourseId: string;
}

type ValidatedRequestData =
  | {
      type: "course_purchase";
      name: string;
      contact: string;
      courseId: string;
      comment: string;
    }
  | {
      type: "pre_purchase_consultation";
      name: string;
      contact: string;
      age: number;
      mainProblem: string;
      selectedTopics: string[];
      questions: string;
      preferredCourseId: string | null;
    };

export type RequestValidationResult =
  | { ok: true; data: ValidatedRequestData }
  | { ok: false; errors: RequestFormErrors };

export function normalizeContact(contact: string): string {
  return contact.trim().toLowerCase().replace(/\s+/g, "");
}

function isValidContact(contact: string): boolean {
  const value = contact.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telegramPattern = /^@?[A-Za-z0-9_]{5,}$/;
  const phonePattern = /^[+\d\s()\-]+$/;
  const digitCount = value.replace(/\D/g, "").length;

  return emailPattern.test(value) || telegramPattern.test(value) || (phonePattern.test(value) && digitCount >= 5);
}

function getKnownTopics(courses: Course[]): Set<string> {
  return new Set(courses.flatMap((course) => course.topics));
}

function createRequestId(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  const timestamp = [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 8);

  return `req_${timestamp}_${suffix}`;
}

export function getAgeWarning(age: string): string | null {
  const parsedAge = Number(age);

  if (Number.isFinite(parsedAge) && parsedAge >= 12 && parsedAge < 18) {
    return "Если вопрос связан со здоровьем несовершеннолетнего, рядом должен участвовать взрослый.";
  }

  return null;
}

export function validateRequestForm(values: RequestFormValues, courses: Course[]): RequestValidationResult {
  const errors: RequestFormErrors = {};
  const name = values.name.trim();
  const contact = values.contact.trim();

  if (name.length < 2) {
    errors.name = "Укажите имя, чтобы мы могли обработать заявку.";
  } else if (name.length > 80) {
    errors.name = "Сократите имя до 80 символов.";
  }

  if (contact.length === 0) {
    errors.contact = "Укажите контакт для связи, чтобы доктор или ассистент мог ответить на заявку.";
  } else if (contact.length < 3 || contact.length > 120 || !isValidContact(contact)) {
    errors.contact = "Проверьте контакт для связи. Возможно, в нем есть ошибка.";
  }

  if (!values.consentNotMedicalConsultation) {
    errors.consentNotMedicalConsultation =
      "Подтвердите, что заявка не является медицинской консультацией.";
  }

  if (!values.consentNoOnlinePayment) {
    errors.consentNoOnlinePayment = "Подтвердите, что оплата не выполняется на сайте.";
  }

  if (values.type === "course_purchase") {
    const course = courses.find((item) => item.id === values.courseId);
    const comment = values.comment.trim();

    if (!values.courseId) {
      errors.courseId = "Выберите курс, по которому хотите оставить заявку.";
    } else if (!course || course.publicationStatus !== "published") {
      errors.courseId = "Выберите доступный опубликованный курс.";
    } else if (!canSubmitCoursePurchase(course)) {
      errors.courseId = "Продажи курса сейчас закрыты. Заявки на покупку не принимаются.";
    }

    if (comment.length > 1000) {
      errors.comment = "Сократите комментарий до 1000 символов.";
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: {
        type: "course_purchase",
        name,
        contact,
        courseId: values.courseId,
        comment
      }
    };
  }

  const age = Number(values.age);
  const mainProblem = values.mainProblem.trim();
  const questions = values.questions.trim();
  const knownTopics = getKnownTopics(courses);
  const selectedTopics = values.selectedTopics.filter((topic) => knownTopics.has(topic));
  const preferredCourseId = values.preferredCourseId || null;
  const hasAnyOpenSales = courses.some(canSubmitCoursePurchase);

  if (!hasAnyOpenSales) {
    errors.form = "Сейчас заявки не принимаются. Вы можете читать статьи и ознакомительные материалы.";
  }

  if (!values.age.trim() || !Number.isFinite(age) || age < 12 || age > 120) {
    errors.age = "Укажите возраст числом от 12 до 120.";
  }

  if (mainProblem.length < 20) {
    errors.mainProblem =
      "Опишите вопрос подробнее, чтобы доктор или ассистент мог понять, какой курс может быть уместен.";
  } else if (mainProblem.length > 2000) {
    errors.mainProblem = "Сократите описание вопроса до 2000 символов.";
  }

  if (selectedTopics.length !== values.selectedTopics.length) {
    errors.selectedTopics = "Выберите темы из предложенного списка.";
  }

  if (questions.length > 1500) {
    errors.questions = "Сократите вопросы до 1500 символов.";
  }

  if (preferredCourseId && !courses.some((course) => course.id === preferredCourseId)) {
    errors.preferredCourseId = "Выберите опубликованный курс из списка или оставьте поле пустым.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      type: "pre_purchase_consultation",
      name,
      contact,
      age,
      mainProblem,
      selectedTopics,
      questions,
      preferredCourseId
    }
  };
}

export function createUserRequest(data: ValidatedRequestData, now = new Date()): UserRequest {
  const base = {
    id: createRequestId(now),
    status: "new" as const,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    name: data.name,
    contact: data.contact,
    consentNotMedicalConsultation: true as const,
    consentNoOnlinePayment: true as const
  };

  if (data.type === "course_purchase") {
    return {
      ...base,
      type: "course_purchase",
      courseId: data.courseId,
      comment: data.comment,
      paymentHandledOutsideSite: true,
      telegramAccessAfterAgreedPayment: true
    };
  }

  return {
    ...base,
    type: "pre_purchase_consultation",
    age: data.age,
    mainProblem: data.mainProblem,
    selectedTopics: data.selectedTopics,
    questions: data.questions,
    preferredCourseId: data.preferredCourseId
  };
}
