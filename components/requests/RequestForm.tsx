"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Course } from "@/domain/course";
import type { RequestType } from "@/domain/request";
import { canSubmitCoursePurchase } from "@/domain/sales";
import { ruMessages } from "@/lib/messages/ru";
import { saveRequest } from "@/lib/repositories/requestRepository";
import {
  createUserRequest,
  getAgeWarning,
  type RequestFormErrors,
  type RequestFormValues,
  validateRequestForm
} from "@/lib/validation/requestValidation";

type RequestFormProps = {
  courses: Course[];
  initialType: RequestType;
  initialCourseId: string;
  queryMessage: string | null;
};

const requestTypeOptions: Array<{ value: RequestType; label: string; description: string }> = [
  {
    value: "course_purchase",
    label: "Покупка курса",
    description: "Для выбранного курса с открытыми продажами."
  },
  {
    value: "pre_purchase_consultation",
    label: "Консультация по подбору",
    description: "Если нужна помощь с выбором подходящих материалов."
  }
];

function createInitialValues(initialType: RequestType, initialCourseId: string): RequestFormValues {
  return {
    type: initialType,
    name: "",
    contact: "",
    consentNotMedicalConsultation: false,
    consentNoOnlinePayment: false,
    courseId: initialCourseId,
    comment: "",
    age: "",
    mainProblem: "",
    selectedTopics: [],
    questions: "",
    preferredCourseId: ""
  };
}

function getSubmitError(errorCode: string): string {
  if (errorCode === "duplicate_recent") {
    return "Похожая заявка уже была отправлена недавно. Проверьте данные перед повторной отправкой.";
  }

  return "Заявку не удалось сохранить. Проверьте данные и попробуйте еще раз.";
}

function getErrorList(errors: RequestFormErrors): string[] {
  return Object.values(errors).filter(Boolean) as string[];
}

export function RequestForm({ courses, initialType, initialCourseId, queryMessage }: RequestFormProps) {
  const [values, setValues] = useState<RequestFormValues>(() => createInitialValues(initialType, initialCourseId));
  const [errors, setErrors] = useState<RequestFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const submitFeedbackRef = useRef<HTMLDivElement | null>(null);

  const openCourses = useMemo(() => courses.filter(canSubmitCoursePurchase), [courses]);
  const topics = useMemo(
    () => Array.from(new Set(courses.flatMap((course) => course.topics))).sort((a, b) => a.localeCompare(b, "ru")),
    [courses]
  );
  const selectedCourse = courses.find((course) => course.id === values.courseId) ?? null;
  const ageWarning = values.type === "pre_purchase_consultation" ? getAgeWarning(values.age) : null;
  const errorList = getErrorList(errors);
  const isBlockedConsultation = values.type === "pre_purchase_consultation" && openCourses.length === 0;
  const submitFeedbackKey = successMessage ?? errorList.join("|");

  useEffect(() => {
    if (!submitFeedbackKey || isSaving) {
      return;
    }

    window.requestAnimationFrame(() => {
      submitFeedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      submitFeedbackRef.current?.focus({ preventScroll: true });
    });
  }, [submitFeedbackKey, isSaving]);

  function updateValue<Key extends keyof RequestFormValues>(key: Key, value: RequestFormValues[Key]) {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [key]: undefined, form: undefined }));
    setSuccessMessage(null);
  }

  function updateType(type: RequestType) {
    setValues((currentValues) => ({
      ...currentValues,
      type,
      courseId: type === "course_purchase" ? currentValues.courseId || openCourses[0]?.id || "" : currentValues.courseId
    }));
    setErrors({});
    setSuccessMessage(null);
  }

  function toggleTopic(topic: string) {
    setValues((currentValues) => {
      const selectedTopics = currentValues.selectedTopics.includes(topic)
        ? currentValues.selectedTopics.filter((item) => item !== topic)
        : [...currentValues.selectedTopics, topic];

      return { ...currentValues, selectedTopics };
    });
    setErrors((currentErrors) => ({ ...currentErrors, selectedTopics: undefined, form: undefined }));
    setSuccessMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage(null);

    const validationResult = validateRequestForm(values, courses);

    if (!validationResult.ok) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    const request = createUserRequest(validationResult.data);
    const saveResult = await saveRequest(request);

    setIsSaving(false);

    if (!saveResult.ok) {
      setErrors({ form: getSubmitError(saveResult.errorCode) });
      return;
    }

    setSuccessMessage(
      values.type === "course_purchase"
        ? "Заявка на покупку курса отправлена. Доктор или ассистент свяжется с вами для обсуждения оплаты и доступа к закрытому Telegram-каналу."
        : "Заявка отправлена. Доктор или ассистент сможет уточнить детали и помочь подобрать подходящий курс."
    );
  }

  return (
    <div className="request-layout">
      <form className="request-form" onSubmit={handleSubmit} noValidate>
        {queryMessage ? <div className="notice">{queryMessage}</div> : null}

        {errorList.length > 0 ? (
          <div className="form-summary" role="alert" aria-live="polite">
            <h2>Проверьте данные</h2>
            <ul className="plain-list">
              {errorList.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <fieldset className="form-fieldset">
          <legend>Тип заявки</legend>
          <div className="request-type-grid">
            {requestTypeOptions.map((option) => (
              <label className="request-type-option" key={option.value}>
                <input
                  checked={values.type === option.value}
                  name="requestType"
                  onChange={() => updateType(option.value)}
                  type="radio"
                  value={option.value}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {values.type === "course_purchase" ? (
          <fieldset className="form-fieldset">
            <legend>Выбранный курс</legend>
            <label className="field" htmlFor="courseId">
              <span>Курс</span>
              <select
                aria-describedby={errors.courseId ? "courseId-error" : undefined}
                id="courseId"
                name="courseId"
                onChange={(event) => updateValue("courseId", event.target.value)}
                value={values.courseId}
              >
                <option value="">Выберите курс</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} - {ruMessages.salesStatus[course.salesStatus]}
                  </option>
                ))}
              </select>
            </label>
            {errors.courseId ? (
              <p className="field-error" id="courseId-error">
                {errors.courseId}
              </p>
            ) : null}
            {selectedCourse ? (
              <div className="course-inline-summary">
                <span className={`status-pill status-${selectedCourse.salesStatus}`}>
                  {ruMessages.salesStatus[selectedCourse.salesStatus]}
                </span>
                <p>{selectedCourse.shortDescription}</p>
                <p className="muted">
                  Оплата не выполняется на сайте. Доступ к курсу предоставляется вручную через закрытый
                  Telegram-канал после согласованной оплаты.
                </p>
              </div>
            ) : null}
            <label className="field" htmlFor="comment">
              <span>Комментарий</span>
              <textarea
                aria-describedby={errors.comment ? "comment-error" : undefined}
                id="comment"
                maxLength={1000}
                name="comment"
                onChange={(event) => updateValue("comment", event.target.value)}
                rows={4}
                value={values.comment}
              />
            </label>
            {errors.comment ? (
              <p className="field-error" id="comment-error">
                {errors.comment}
              </p>
            ) : null}
          </fieldset>
        ) : (
          <fieldset className="form-fieldset" disabled={isBlockedConsultation}>
            <legend>Подбор курса</legend>
            {isBlockedConsultation ? (
              <div className="notice">
                Сейчас заявки не принимаются, потому что нет курсов с открытыми продажами. Можно читать
                статьи и следить за объявлениями о следующем открытии продаж.
              </div>
            ) : null}
            <label className="field" htmlFor="age">
              <span>Возраст</span>
              <input
                aria-describedby={errors.age ? "age-error" : ageWarning ? "age-warning" : undefined}
                id="age"
                inputMode="numeric"
                max="120"
                min="12"
                name="age"
                onChange={(event) => updateValue("age", event.target.value)}
                type="number"
                value={values.age}
              />
            </label>
            {errors.age ? (
              <p className="field-error" id="age-error">
                {errors.age}
              </p>
            ) : ageWarning ? (
              <p className="field-hint" id="age-warning">
                {ageWarning}
              </p>
            ) : null}
            <label className="field" htmlFor="mainProblem">
              <span>Основные симптомы или проблема</span>
              <textarea
                aria-describedby={errors.mainProblem ? "mainProblem-error" : "mainProblem-hint"}
                id="mainProblem"
                name="mainProblem"
                onChange={(event) => updateValue("mainProblem", event.target.value)}
                rows={6}
                value={values.mainProblem}
              />
            </label>
            <p className="field-hint" id="mainProblem-hint">
              Опишите вопрос кратко, без документов, анализов и платежных данных.
            </p>
            {errors.mainProblem ? (
              <p className="field-error" id="mainProblem-error">
                {errors.mainProblem}
              </p>
            ) : null}
            {topics.length > 0 ? (
              <div className="checkbox-group" aria-describedby={errors.selectedTopics ? "selectedTopics-error" : undefined}>
                <span className="field-label">Темы здоровья</span>
                <div className="checkbox-grid">
                  {topics.map((topic) => (
                    <label className="checkbox-option" key={topic}>
                      <input
                        checked={values.selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        type="checkbox"
                        value={topic}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
                {errors.selectedTopics ? (
                  <p className="field-error" id="selectedTopics-error">
                    {errors.selectedTopics}
                  </p>
                ) : null}
              </div>
            ) : null}
            <label className="field" htmlFor="questions">
              <span>Вопросы пользователя</span>
              <textarea
                aria-describedby={errors.questions ? "questions-error" : undefined}
                id="questions"
                maxLength={1500}
                name="questions"
                onChange={(event) => updateValue("questions", event.target.value)}
                rows={4}
                value={values.questions}
              />
            </label>
            {errors.questions ? (
              <p className="field-error" id="questions-error">
                {errors.questions}
              </p>
            ) : null}
            <label className="field" htmlFor="preferredCourseId">
              <span>Желаемый курс или предпочтение</span>
              <select
                aria-describedby={errors.preferredCourseId ? "preferredCourseId-error" : undefined}
                id="preferredCourseId"
                name="preferredCourseId"
                onChange={(event) => updateValue("preferredCourseId", event.target.value)}
                value={values.preferredCourseId}
              >
                <option value="">Пока нет предпочтения</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>
            {errors.preferredCourseId ? (
              <p className="field-error" id="preferredCourseId-error">
                {errors.preferredCourseId}
              </p>
            ) : null}
          </fieldset>
        )}

        <fieldset className="form-fieldset">
          <legend>Контакт и согласия</legend>
          <label className="field" htmlFor="name">
            <span>Имя</span>
            <input
              aria-describedby={errors.name ? "name-error" : undefined}
              id="name"
              name="name"
              onChange={(event) => updateValue("name", event.target.value)}
              value={values.name}
            />
          </label>
          {errors.name ? (
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
          ) : null}
          <label className="field" htmlFor="contact">
            <span>Контакт для связи</span>
            <input
              aria-describedby={errors.contact ? "contact-error" : "contact-hint"}
              id="contact"
              name="contact"
              onChange={(event) => updateValue("contact", event.target.value)}
              placeholder="email, @telegram или телефон"
              value={values.contact}
            />
          </label>
          <p className="field-hint" id="contact-hint">
            Подойдёт email, Telegram username или номер телефона.
          </p>
          {errors.contact ? (
            <p className="field-error" id="contact-error">
              {errors.contact}
            </p>
          ) : null}
          <label className="checkbox-option checkbox-option-wide">
            <input
              aria-describedby={
                errors.consentNotMedicalConsultation ? "consentNotMedicalConsultation-error" : undefined
              }
              checked={values.consentNotMedicalConsultation}
              onChange={(event) => updateValue("consentNotMedicalConsultation", event.target.checked)}
              type="checkbox"
            />
            <span>Я понимаю, что заявка не является медицинской консультацией и не заменяет очный медицинский осмотр.</span>
          </label>
          {errors.consentNotMedicalConsultation ? (
            <p className="field-error" id="consentNotMedicalConsultation-error">
              {errors.consentNotMedicalConsultation}
            </p>
          ) : null}
          <label className="checkbox-option checkbox-option-wide">
            <input
              aria-describedby={errors.consentNoOnlinePayment ? "consentNoOnlinePayment-error" : undefined}
              checked={values.consentNoOnlinePayment}
              onChange={(event) => updateValue("consentNoOnlinePayment", event.target.checked)}
              type="checkbox"
            />
            <span>Я понимаю, что оплата не выполняется на сайте и обсуждается отдельно с доктором или ассистентом.</span>
          </label>
          {errors.consentNoOnlinePayment ? (
            <p className="field-error" id="consentNoOnlinePayment-error">
              {errors.consentNoOnlinePayment}
            </p>
          ) : null}
        </fieldset>

        {successMessage || errorList.length > 0 ? (
          <div
            aria-live={successMessage ? "polite" : "assertive"}
            className={`submit-feedback ${successMessage ? "success-panel" : "form-summary"}`}
            ref={submitFeedbackRef}
            role={successMessage ? "status" : "alert"}
            tabIndex={-1}
          >
            <h2>{successMessage ? "Заявка сохранена" : "Проверьте заявку"}</h2>
            {successMessage ? (
              <>
                <p>{successMessage}</p>
                <div className="actions">
                  <Link className="button button-secondary" href="/courses">
                    Вернуться к курсам
                  </Link>
                  <Link className="button button-secondary" href="/articles">
                    Читать статьи
                  </Link>
                </div>
              </>
            ) : (
              <ul className="plain-list">
                {errorList.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        <div className="form-footer">
          <button className="button" disabled={isSaving || isBlockedConsultation} type="submit">
            {isSaving ? "Сохранение..." : "Отправить заявку"}
          </button>
          <Link className="button button-secondary" href="/courses">
            Вернуться к курсам
          </Link>
        </div>
      </form>

      <aside className="request-side-note" aria-label="Важная информация о заявке">
        <h2>Как обрабатывается заявка</h2>
        <p>
          Заявка сохраняется локально в браузере. Онлайн-оплата на сайте не выполняется, платежные данные
          не запрашиваются.
        </p>
        <p>
          Доступ к закрытому Telegram-каналу предоставляется вручную после согласованной оплаты вне сайта.
        </p>
        <p className="muted">
          Материалы проекта носят ознакомительный характер и не заменяют очный медицинский осмотр.
        </p>
      </aside>
    </div>
  );
}
