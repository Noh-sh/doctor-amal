"use client";

import type { SaveRequestResult, UserRequest } from "@/domain/request";
import { normalizeContact } from "@/lib/validation/requestValidation";

const REQUESTS_STORAGE_KEY = "doctor-amal:requests";
const STORAGE_VERSION_KEY = "doctor-amal:storage-version";
const SUPPORTED_STORAGE_VERSION = "1";
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

type ReadRequestsResult =
  | { ok: true; requests: UserRequest[] }
  | { ok: false; errorCode: "storage_unavailable" | "unknown" };

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isBaseUserRequest(value: unknown): value is UserRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const request = value as UserRequest;

  return (
    isString(request.id) &&
    ["course_purchase", "pre_purchase_consultation"].includes(request.type) &&
    ["new", "needs_clarification", "course_recommended", "awaiting_offline_payment", "telegram_access_granted", "closed", "cancelled"].includes(
      request.status
    ) &&
    isString(request.createdAt) &&
    isString(request.updatedAt) &&
    isString(request.name) &&
    isString(request.contact) &&
    request.consentNotMedicalConsultation === true &&
    request.consentNoOnlinePayment === true
  );
}

function isUserRequest(value: unknown): value is UserRequest {
  if (!isBaseUserRequest(value)) {
    return false;
  }

  if (value.type === "course_purchase") {
    return (
      isString(value.courseId) &&
      isString(value.comment) &&
      value.paymentHandledOutsideSite === true &&
      value.telegramAccessAfterAgreedPayment === true
    );
  }

  return (
    typeof value.age === "number" &&
    isString(value.mainProblem) &&
    isStringArray(value.selectedTopics) &&
    isString(value.questions) &&
    (value.preferredCourseId === null || isString(value.preferredCourseId))
  );
}

function readRequests(): ReadRequestsResult {
  if (typeof window === "undefined") {
    return { ok: false, errorCode: "storage_unavailable" };
  }

  try {
    const version = window.localStorage.getItem(STORAGE_VERSION_KEY);

    if (version && Number(version) > Number(SUPPORTED_STORAGE_VERSION)) {
      return { ok: false, errorCode: "storage_unavailable" };
    }

    const storedValue = window.localStorage.getItem(REQUESTS_STORAGE_KEY);

    if (!storedValue) {
      return { ok: true, requests: [] };
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue) || !parsedValue.every(isUserRequest)) {
      return { ok: false, errorCode: "storage_unavailable" };
    }

    return { ok: true, requests: parsedValue };
  } catch (error) {
    console.error("Не удалось прочитать заявки из localStorage", error);
    return { ok: false, errorCode: "storage_unavailable" };
  }
}

function isRecentDuplicate(requests: UserRequest[], request: UserRequest): boolean {
  const contact = normalizeContact(request.contact);
  const createdAfter = Date.now() - DUPLICATE_WINDOW_MS;

  return requests.some((savedRequest) => {
    const sameType = savedRequest.type === request.type;
    const sameContact = normalizeContact(savedRequest.contact) === contact;
    const createdAt = Date.parse(savedRequest.createdAt);
    const isRecent = Number.isFinite(createdAt) && createdAt >= createdAfter;
    const sameCourse =
      request.type !== "course_purchase" ||
      (savedRequest.type === "course_purchase" && savedRequest.courseId === request.courseId);

    return sameType && sameContact && sameCourse && isRecent;
  });
}

export async function listRequests(): Promise<UserRequest[]> {
  const result = readRequests();

  if (!result.ok) {
    return [];
  }

  return result.requests;
}

export async function saveRequest(request: UserRequest): Promise<SaveRequestResult> {
  if (!isUserRequest(request)) {
    return { ok: false, errorCode: "validation_failed" };
  }

  const readResult = readRequests();

  if (!readResult.ok) {
    return { ok: false, errorCode: readResult.errorCode };
  }

  if (isRecentDuplicate(readResult.requests, request)) {
    return { ok: false, errorCode: "duplicate_recent" };
  }

  try {
    window.localStorage.setItem(STORAGE_VERSION_KEY, SUPPORTED_STORAGE_VERSION);
    window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify([...readResult.requests, request]));

    return { ok: true, requestId: request.id };
  } catch (error) {
    console.error("Не удалось сохранить заявку в localStorage", error);
    return { ok: false, errorCode: "storage_unavailable" };
  }
}
