"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/browserClient";

type AdminAccessProps = {
  supabaseUrl: string | null;
  supabaseKey: string | null;
};

type AccessState = "checking" | "signed_out" | "signed_in" | "denied" | "config_error";

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

export function AdminAccess({ supabaseUrl, supabaseKey }: AdminAccessProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessState, setAccessState] = useState<AccessState>("checking");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      try {
        const hasAccess = await checkDoctorAdminAccess(client, session);

        if (!isMounted) {
          return;
        }

        if (!hasAccess) {
          await client.auth.signOut();
        }

        setAccessState(hasAccess ? "signed_in" : "denied");
        setMessage(hasAccess ? "" : "У этой учетной записи нет доступа к админке.");
      } catch {
        await client.auth.signOut();

        if (isMounted) {
          setAccessState("denied");
          setMessage("Не удалось проверить доступ к админке.");
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.session) {
      setIsSubmitting(false);
      setAccessState("signed_out");
      setMessage("Неверный email или пароль.");
      return;
    }

    try {
      const hasAccess = await checkDoctorAdminAccess(supabase, data.session);

      if (!hasAccess) {
        await supabase.auth.signOut();
        setAccessState("denied");
        setMessage("У этой учетной записи нет доступа к админке.");
        return;
      }

      setAccessState("signed_in");
      setPassword("");
    } catch {
      await supabase.auth.signOut();
      setAccessState("denied");
      setMessage("Не удалось проверить доступ к админке.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    if (supabase) {
      await supabase.auth.signOut();
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

  if (accessState === "signed_in") {
    return (
      <section className="admin-panel admin-shell" aria-label="Админка">
        <div className="admin-panel-header">
          <p className="admin-eyebrow">Doctor Amal</p>
          <h1>Админка</h1>
          <p className="admin-muted">Вход выполнен. Редактирование контента будет добавлено следующим этапом.</p>
        </div>
        <div className="admin-status" role="status">
          <span className="admin-status-dot" aria-hidden="true" />
          Доступ доктора подтвержден
        </div>
        <button className="admin-button admin-button-secondary" type="button" onClick={handleLogout}>
          Выйти
        </button>
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
      </form>
    </section>
  );
}
