export type RequestType = "course_purchase" | "pre_purchase_consultation";

export type RequestStatus =
  | "new"
  | "needs_clarification"
  | "course_recommended"
  | "awaiting_offline_payment"
  | "telegram_access_granted"
  | "closed"
  | "cancelled";

export interface BaseUserRequest {
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

export interface CoursePurchaseRequest extends BaseUserRequest {
  type: "course_purchase";
  courseId: string;
  comment: string;
  paymentHandledOutsideSite: true;
  telegramAccessAfterAgreedPayment: true;
}

export interface PrePurchaseConsultationRequest extends BaseUserRequest {
  type: "pre_purchase_consultation";
  age: number;
  mainProblem: string;
  selectedTopics: string[];
  questions: string;
  preferredCourseId: string | null;
}

export type UserRequest = CoursePurchaseRequest | PrePurchaseConsultationRequest;

export type SaveRequestResult =
  | { ok: true; requestId: string }
  | {
      ok: false;
      errorCode: "storage_unavailable" | "validation_failed" | "duplicate_recent" | "unknown";
    };
