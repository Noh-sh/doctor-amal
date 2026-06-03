"use client";

import { type FormEvent, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type AdminContent,
  type AdminCourse,
  type AdminDoctorProfile,
  type AdminExternalLink,
  type AdminPurchaseSettings,
  createCourse,
  fetchAdminContent,
  updateCourse,
  updateDoctorProfile,
  updateExternalLink,
  updatePurchaseSettings
} from "@/lib/supabase/adminContent";

type AdminContentEditorProps = {
  supabase: SupabaseClient;
};

type Feedback = {
  tone: "success" | "error";
  text: string;
} | null;

type ProfileForm = {
  displayName: string;
  shortIntro: string;
  education: string;
  experience: string;
  professionalDirections: string;
  healthTopics: string;
  helpFormats: string;
};

type CourseForm = AdminCourse;
type NewCourseForm = Omit<CourseForm, "id">;
type ExternalLinkForm = AdminExternalLink;
type PurchaseForm = AdminPurchaseSettings;

function joinList(items: string[]) {
  return items.join("\n");
}

function splitList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toProfileForm(profile: AdminDoctorProfile): ProfileForm {
  return {
    displayName: profile.displayName,
    shortIntro: profile.shortIntro,
    education: joinList(profile.education),
    experience: joinList(profile.experience),
    professionalDirections: joinList(profile.professionalDirections),
    healthTopics: joinList(profile.healthTopics),
    helpFormats: joinList(profile.helpFormats)
  };
}

function hasText(value: string) {
  return value.trim().length > 0;
}

function createEmptyCourseForm(): NewCourseForm {
  return {
    title: "",
    description: "",
    priceDisplayText: "",
    priceIsConfirmed: false,
    isActive: true
  };
}

function readableError(error: unknown) {
  if (error instanceof Error && error.message.includes("violates check constraint")) {
    return "Данные не прошли проверку Supabase. Проверьте обязательные поля и активные ссылки.";
  }

  return "Не удалось сохранить изменения. Проверьте данные и попробуйте еще раз.";
}

export function AdminContentEditor({ supabase }: AdminContentEditorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [loadError, setLoadError] = useState("");
  const [profileForm, setProfileForm] = useState<ProfileForm | null>(null);
  const [courseForms, setCourseForms] = useState<CourseForm[]>([]);
  const [newCourseForm, setNewCourseForm] = useState<NewCourseForm>(() => createEmptyCourseForm());
  const [externalLinkForms, setExternalLinkForms] = useState<ExternalLinkForm[]>([]);
  const [purchaseForm, setPurchaseForm] = useState<PurchaseForm | null>(null);

  async function loadContent(mode: "initial" | "reload" = "reload") {
    if (mode === "initial") {
      setIsLoading(true);
    } else {
      setIsReloading(true);
    }

    setLoadError("");

    try {
      const content: AdminContent = await fetchAdminContent(supabase);

      setProfileForm(toProfileForm(content.doctorProfile));
      setCourseForms(content.courses);
      setExternalLinkForms(content.externalLinks);
      setPurchaseForm(content.purchaseSettings);
    } catch {
      setLoadError("Не удалось загрузить контент админки.");
    } finally {
      setIsLoading(false);
      setIsReloading(false);
    }
  }

  useEffect(() => {
    void loadContent("initial");
  }, []);

  useEffect(() => {
    if (!savedKey) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSavedKey(null);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [savedKey]);

  async function afterSave(text: string, key: string) {
    await loadContent("reload");
    setFeedback({ tone: "success", text });
    setSavedKey(key);
  }

  function renderSaveButton(key: string, label: string) {
    const isSaving = savingKey === key;
    const isSaved = savedKey === key;

    return (
      <button className={isSaved ? "admin-button admin-button-saved" : "admin-button"} disabled={isSaving} type="submit">
        {isSaving ? "Сохраняем..." : null}
        {!isSaving && isSaved ? (
          <>
            <span className="admin-save-check" aria-hidden="true" />
            Сохранено
          </>
        ) : null}
        {!isSaving && !isSaved ? label : null}
      </button>
    );
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profileForm || !hasText(profileForm.displayName)) {
      setFeedback({ tone: "error", text: "Имя доктора не должно быть пустым." });
      return;
    }

    setSavingKey("profile");
    setSavedKey(null);
    setFeedback(null);

    try {
      await updateDoctorProfile(supabase, {
        displayName: profileForm.displayName,
        shortIntro: profileForm.shortIntro,
        education: splitList(profileForm.education),
        experience: splitList(profileForm.experience),
        professionalDirections: splitList(profileForm.professionalDirections),
        healthTopics: splitList(profileForm.healthTopics),
        helpFormats: splitList(profileForm.helpFormats)
      });
      await afterSave("Профиль сохранен.", "profile");
    } catch (error) {
      setFeedback({ tone: "error", text: readableError(error) });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleCourseSubmit(event: FormEvent<HTMLFormElement>, course: CourseForm) {
    event.preventDefault();

    if (!hasText(course.title) || !hasText(course.description) || !hasText(course.priceDisplayText)) {
      setFeedback({ tone: "error", text: "Название, описание и цена курса не должны быть пустыми." });
      return;
    }

    setSavingKey(`course:${course.id}`);
    setSavedKey(null);
    setFeedback(null);

    try {
      await updateCourse(supabase, course.id, course);
      await afterSave("Курс сохранен.", `course:${course.id}`);
    } catch (error) {
      setFeedback({ tone: "error", text: readableError(error) });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleNewCourseSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasText(newCourseForm.title) || !hasText(newCourseForm.description) || !hasText(newCourseForm.priceDisplayText)) {
      setFeedback({ tone: "error", text: "Название, описание и цена нового курса не должны быть пустыми." });
      return;
    }

    setSavingKey("course:new");
    setSavedKey(null);
    setFeedback(null);

    try {
      await createCourse(supabase, newCourseForm);
      setNewCourseForm(createEmptyCourseForm());
      await afterSave("Новый курс добавлен.", "course:new");
    } catch (error) {
      setFeedback({ tone: "error", text: readableError(error) });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleExternalLinkSubmit(event: FormEvent<HTMLFormElement>, link: ExternalLinkForm) {
    event.preventDefault();

    if (link.isEnabled && !hasText(link.url)) {
      setFeedback({ tone: "error", text: `Для активной ссылки ${link.label} нужен URL.` });
      return;
    }

    setSavingKey(`link:${link.id}`);
    setSavedKey(null);
    setFeedback(null);

    try {
      await updateExternalLink(supabase, link.id, link);
      await afterSave("Внешняя ссылка сохранена.", `link:${link.id}`);
    } catch (error) {
      setFeedback({ tone: "error", text: readableError(error) });
    } finally {
      setSavingKey(null);
    }
  }

  async function handlePurchaseSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!purchaseForm) {
      return;
    }

    if (!hasText(purchaseForm.managerTelegramUrl) && !hasText(purchaseForm.inactiveText)) {
      setFeedback({ tone: "error", text: "Если Telegram-ссылка не задана, нужен текст неактивной кнопки." });
      return;
    }

    setSavingKey("purchase");
    setSavedKey(null);
    setFeedback(null);

    try {
      await updatePurchaseSettings(supabase, purchaseForm);
      await afterSave("Настройки покупки сохранены.", "purchase");
    } catch (error) {
      setFeedback({ tone: "error", text: readableError(error) });
    } finally {
      setSavingKey(null);
    }
  }

  function updateCourseForm(id: string, patch: Partial<CourseForm>) {
    setCourseForms((current) => current.map((course) => (course.id === id ? { ...course, ...patch } : course)));
  }

  function updateNewCourseForm(patch: Partial<NewCourseForm>) {
    setNewCourseForm((current) => ({ ...current, ...patch }));
  }

  function updateExternalLinkForm(id: number, patch: Partial<ExternalLinkForm>) {
    setExternalLinkForms((current) => current.map((link) => (link.id === id ? { ...link, ...patch } : link)));
  }

  if (isLoading) {
    return <p className="admin-muted">Загружаем контент...</p>;
  }

  if (loadError || !profileForm || !purchaseForm) {
    return (
      <div className="admin-editor-section">
        <p className="admin-message" role="alert">
          {loadError || "Контент админки временно недоступен."}
        </p>
        <button className="admin-button admin-button-secondary" type="button" onClick={() => void loadContent("reload")}>
          Повторить загрузку
        </button>
      </div>
    );
  }

  return (
    <div className="admin-editor" aria-busy={isReloading || Boolean(savingKey)}>
      {feedback ? (
        <p className={feedback.tone === "success" ? "admin-message admin-message-success" : "admin-message"} role="status">
          {feedback.text}
        </p>
      ) : null}

      <form className="admin-editor-section" onSubmit={handleProfileSubmit}>
        <div className="admin-section-header">
          <h2>Профиль</h2>
          <p className="admin-muted">Фото и медицинское предупреждение здесь не редактируются.</p>
        </div>

        <label className="admin-field">
          <span>Имя доктора</span>
          <input
            required
            value={profileForm.displayName}
            onChange={(event) => setProfileForm({ ...profileForm, displayName: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Краткое представление</span>
          <textarea
            rows={3}
            value={profileForm.shortIntro}
            onChange={(event) => setProfileForm({ ...profileForm, shortIntro: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Образование, по одному пункту в строке</span>
          <textarea
            rows={5}
            value={profileForm.education}
            onChange={(event) => setProfileForm({ ...profileForm, education: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Опыт, по одному пункту в строке</span>
          <textarea
            rows={6}
            value={profileForm.experience}
            onChange={(event) => setProfileForm({ ...profileForm, experience: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Профессиональные направления</span>
          <textarea
            rows={4}
            value={profileForm.professionalDirections}
            onChange={(event) => setProfileForm({ ...profileForm, professionalDirections: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Темы здоровья</span>
          <textarea
            rows={4}
            value={profileForm.healthTopics}
            onChange={(event) => setProfileForm({ ...profileForm, healthTopics: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Форматы помощи</span>
          <textarea
            rows={4}
            value={profileForm.helpFormats}
            onChange={(event) => setProfileForm({ ...profileForm, helpFormats: event.target.value })}
          />
        </label>

        <div className="admin-note">
          Тексты не должны обещать лечение, выздоровление или гарантированный результат.
        </div>

        {renderSaveButton("profile", "Сохранить профиль")}
      </form>

      <section className="admin-editor-section" aria-labelledby="admin-courses-title">
        <div className="admin-section-header">
          <h2 id="admin-courses-title">Курсы</h2>
          <p className="admin-muted">Можно добавить новый курс или скрыть существующий без удаления из Supabase.</p>
        </div>

        <form className="admin-subform" onSubmit={handleNewCourseSubmit}>
          <h3>Новый курс</h3>

          <label className="admin-field">
            <span>Название курса</span>
            <input
              required
              value={newCourseForm.title}
              onChange={(event) => updateNewCourseForm({ title: event.target.value })}
            />
          </label>

          <label className="admin-field">
            <span>Описание</span>
            <textarea
              required
              rows={4}
              value={newCourseForm.description}
              onChange={(event) => updateNewCourseForm({ description: event.target.value })}
            />
          </label>

          <label className="admin-field">
            <span>Цена текстом</span>
            <input
              required
              value={newCourseForm.priceDisplayText}
              onChange={(event) => updateNewCourseForm({ priceDisplayText: event.target.value })}
            />
          </label>

          <label className="admin-check">
            <input
              checked={newCourseForm.priceIsConfirmed}
              type="checkbox"
              onChange={(event) => updateNewCourseForm({ priceIsConfirmed: event.target.checked })}
            />
            <span>Цена подтверждена</span>
          </label>

          <label className="admin-check">
            <input
              checked={newCourseForm.isActive}
              type="checkbox"
              onChange={(event) => updateNewCourseForm({ isActive: event.target.checked })}
            />
            <span>Показывать курс на публичной странице</span>
          </label>

          {renderSaveButton("course:new", "Добавить курс")}
        </form>

        {courseForms.map((course) => (
          <form className="admin-subform" key={course.id} onSubmit={(event) => void handleCourseSubmit(event, course)}>
            <label className="admin-field">
              <span>Название курса</span>
              <input
                required
                value={course.title}
                onChange={(event) => updateCourseForm(course.id, { title: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Описание</span>
              <textarea
                required
                rows={4}
                value={course.description}
                onChange={(event) => updateCourseForm(course.id, { description: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Цена текстом</span>
              <input
                required
                value={course.priceDisplayText}
                onChange={(event) => updateCourseForm(course.id, { priceDisplayText: event.target.value })}
              />
            </label>

            <label className="admin-check">
              <input
                checked={course.priceIsConfirmed}
                type="checkbox"
                onChange={(event) => updateCourseForm(course.id, { priceIsConfirmed: event.target.checked })}
              />
              <span>Цена подтверждена</span>
            </label>

            <label className="admin-check">
              <input
                checked={course.isActive}
                type="checkbox"
                onChange={(event) => updateCourseForm(course.id, { isActive: event.target.checked })}
              />
              <span>Показывать курс на публичной странице</span>
            </label>

            {renderSaveButton(`course:${course.id}`, "Сохранить курс")}
          </form>
        ))}
      </section>

      <section className="admin-editor-section" aria-labelledby="admin-links-title">
        <div className="admin-section-header">
          <h2 id="admin-links-title">Внешние ссылки</h2>
          <p className="admin-muted">Новые платформы здесь не добавляются.</p>
        </div>

        {externalLinkForms.map((link) => (
          <form className="admin-subform" key={link.id} onSubmit={(event) => void handleExternalLinkSubmit(event, link)}>
            <h3>{link.label}</h3>

            <label className="admin-field">
              <span>URL</span>
              <input
                inputMode="url"
                type="url"
                value={link.url}
                onChange={(event) => updateExternalLinkForm(link.id, { url: event.target.value })}
              />
            </label>

            <label className="admin-field">
              <span>Текст неактивной кнопки</span>
              <input
                value={link.inactiveText}
                onChange={(event) => updateExternalLinkForm(link.id, { inactiveText: event.target.value })}
              />
            </label>

            <label className="admin-check">
              <input
                checked={link.isEnabled}
                type="checkbox"
                onChange={(event) => updateExternalLinkForm(link.id, { isEnabled: event.target.checked })}
              />
              <span>Ссылка активна</span>
            </label>

            {renderSaveButton(`link:${link.id}`, "Сохранить ссылку")}
          </form>
        ))}
      </section>

      <form className="admin-editor-section" onSubmit={handlePurchaseSubmit}>
        <div className="admin-section-header">
          <h2>Покупка</h2>
          <p className="admin-muted">Одна общая Telegram-ссылка менеджера для всех курсов.</p>
        </div>

        <label className="admin-field">
          <span>Telegram-ссылка менеджера</span>
          <input
            inputMode="url"
            type="url"
            value={purchaseForm.managerTelegramUrl}
            onChange={(event) => setPurchaseForm({ ...purchaseForm, managerTelegramUrl: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Текст неактивной кнопки Купить</span>
          <input
            value={purchaseForm.inactiveText}
            onChange={(event) => setPurchaseForm({ ...purchaseForm, inactiveText: event.target.value })}
          />
        </label>

        {renderSaveButton("purchase", "Сохранить покупку")}
      </form>
    </div>
  );
}
