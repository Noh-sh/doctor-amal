"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { AdminContentEditor } from "@/components/admin/AdminContentEditor";
import { createBrowserSupabaseClient } from "@/lib/supabase/browserClient";

type AdminAccessProps = {
  supabaseUrl: string | null;
  supabaseKey: string | null;
};

type AccessState = "checking" | "signed_out" | "signed_in" | "denied" | "config_error";
type AuthView = "sign_in" | "password_recovery";

type AdminUserRow = {
  role: string;
  is_active: boolean;
};

async function checkDoctorAdminAccess(supabase: SupabaseClient, session: Session) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("role,is_active")
    .eq("user_id", session.user.id)
    .eq("role", "doctor_admin")
    .eq("is_active", true)
    .maybeSingle<AdminUserRow>();

  if (error) {
    throw error;
  }

  return Boolean(data?.role === "doctor_admin" && data.is_active);
}

async function safeSignOut(supabase: SupabaseClient) {
  try {
    await supabase.auth.signOut();
  } catch {
    // Ошибка выхода не должна показывать технические детали или ломать форму входа.
  }
}

export function AdminAccess({ supabaseUrl, supabaseKey }: AdminAccessProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [authView, setAuthView] = useState<AuthView>("sign_in");
  const [accessState, setAccessState] = useState<AccessState>("checking");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecoverySubmitting, setIsRecoverySubmitting] = useState(false);

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseKey) {
      return null;
    }

    return createBrowserSupabaseClient(supabaseUrl, supabaseKey);
  }, [supabaseKey, supabaseUrl]);

  useEffect(() => {
    if (!supabase) {
      setAccessState("config_error");
      setMessage("Настройки входа временно недоступны.");
      return;
    }

    const client = supabase;
    let isMounted = true;

    async function checkCurrentSession() {
      try {
        const {
          data: { session }
        } = await client.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (!session) {
          setAccessState("signed_out");
          return;
        }

        const hasAccess = await checkDoctorAdminAccess(client, session);

        if (!isMounted) {
          return;
        }

        if (!hasAccess) {
          await safeSignOut(client);
        }

        setAccessState(hasAccess ? "signed_in" : "denied");
        setMessage(hasAccess ? "" : "У этой учетной записи нет доступа к админке.");
      } catch {
        await safeSignOut(client);

        if (isMounted) {
          setAccessState("signed_out");
          setMessage("Не удалось проверить текущую сессию. Войдите снова.");
        }
      }
    }

    void checkCurrentSession();

    const {
      data: { subscription }
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAccessState("signed_out");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setAccessState("config_error");
      setMessage("Настройки входа временно недоступны.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.session) {
        setAccessState("signed_out");
        setMessage("Неверный email или пароль.");
        return;
      }

      const hasAccess = await checkDoctorAdminAccess(supabase, data.session);

      if (!hasAccess) {
        await safeSignOut(supabase);
        setAccessState("denied");
        setMessage("У этой учетной записи нет доступа к админке.");
        return;
      }

      setAccessState("signed_in");
      setPassword("");
    } catch {
      await safeSignOut(supabase);
      setAccessState("signed_out");
      setMessage("Не удалось выполнить вход. Проверьте подключение и попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setAccessState("config_error");
      setMessage("Настройки входа временно недоступны.");
      return;
    }

    setIsRecoverySubmitting(true);
    setMessage("");

    try {
      const redirectTo = `${window.location.origin}/admin/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail, {
        redirectTo
      });

      if (error) {
        setMessage("Не удалось отправить письмо восстановления. Проверьте подключение и попробуйте еще раз.");
        return;
      }

      setMessage("Если email зарегистрирован, ссылка для восстановления отправлена.");
    } catch {
      setMessage("Не удалось отправить письмо восстановления. Проверьте подключение и попробуйте еще раз.");
    } finally {
      setIsRecoverySubmitting(false);
    }
  }

  async function handleLogout() {
    if (supabase) {
      await safeSignOut(supabase);
    }

    setAccessState("signed_out");
    setEmail("");
    setPassword("");
    setMessage("");
  }

  if (accessState === "checking") {
    return (
      <section className="admin-panel" aria-live="polite">
        <p className="admin-muted">Проверяем доступ...</p>
      </section>
    );
  }

  if (accessState === "signed_in" && supabase) {
    return (
      <section className="admin-panel admin-shell" aria-label="Админка">
        <div className="admin-panel-header">
          <p className="admin-eyebrow">Doctor Amal</p>
          <h1>Админка</h1>
          <p className="admin-muted">Редактирование контента публичной страницы.</p>
        </div>
        <div className="admin-status" role="status">
          <span className="admin-status-dot" aria-hidden="true" />
          Доступ доктора подтвержден
        </div>
        <AdminContentEditor supabase={supabase} />
        <button className="admin-button admin-button-secondary" type="button" onClick={handleLogout}>
          Выйти
        </button>
      </section>
    );
  }

  if (authView === "password_recovery") {
    return (
      <section className="admin-panel" aria-label="Восстановление пароля">
        <div className="admin-panel-header">
          <p className="admin-eyebrow">Doctor Amal</p>
          <h1>Восстановление пароля</h1>
          <p className="admin-muted">Введите email доктора. Если email зарегистрирован, Supabase отправит ссылку для восстановления.</p>
        </div>

        <form className="admin-form" onSubmit={handlePasswordRecovery}>
          <label className="admin-field">
            <span>Email</span>
            <input
              autoComplete="email"
              inputMode="email"
              name="email"
              required
              type="email"
              value={recoveryEmail}
              onChange={(event) => setRecoveryEmail(event.target.value)}
            />
          </label>

          {message ? (
            <p
              className={message.startsWith("Если email") ? "admin-message admin-message-success" : "admin-message"}
              role={message.startsWith("Если email") ? "status" : "alert"}
            >
              {message}
            </p>
          ) : null}

          <button className="admin-button" disabled={isRecoverySubmitting || accessState === "config_error"} type="submit">
            {isRecoverySubmitting ? "Отправляем..." : "Отправить ссылку для восстановления"}
          </button>
          <button
            className="admin-button admin-button-secondary"
            type="button"
            onClick={() => {
              setAuthView("sign_in");
              setMessage("");
            }}
          >
            Вернуться ко входу
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="admin-panel" aria-label="Вход в админку">
      <div className="admin-panel-header">
        <p className="admin-eyebrow">Doctor Amal</p>
        <h1>Вход в админку</h1>
        <p className="admin-muted">Доступ только для доктора.</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Email</span>
          <input
            autoComplete="email"
            inputMode="email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Пароль</span>
          <input
            autoComplete="current-password"
            name="password"
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {message ? (
          <p className="admin-message" role="alert">
            {message}
          </p>
        ) : null}

        <button className="admin-button" disabled={isSubmitting || accessState === "config_error"} type="submit">
          {isSubmitting ? "Проверяем..." : "Войти"}
        </button>
        <button
          className="admin-link-button"
          type="button"
          onClick={() => {
            setRecoveryEmail(email);
            setAuthView("password_recovery");
            setMessage("");
          }}
        >
          Забыли пароль?
        </button>
      </form>
    </section>
  );
}
