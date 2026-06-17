"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browserClient";

type AdminPasswordResetProps = {
  supabaseUrl: string | null;
  supabaseKey: string | null;
};

type ResetState = "checking" | "ready" | "success" | "error" | "config_error";

function getRecoveryTokens() {
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return null;
}

function getRecoveryCode() {
  return new URLSearchParams(window.location.search).get("code");
}

function clearRecoveryParams() {
  window.history.replaceState(null, "", window.location.pathname);
}

export function AdminPasswordReset({ supabaseUrl, supabaseKey }: AdminPasswordResetProps) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [resetState, setResetState] = useState<ResetState>("checking");
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
      setResetState("config_error");
      setMessage("Настройки восстановления временно недоступны.");
      return;
    }

    const client = supabase;
    let isMounted = true;

    async function prepareRecoverySession() {
      try {
        const tokens = getRecoveryTokens();
        const code = getRecoveryCode();

        if (tokens) {
          const { error } = await client.auth.setSession({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
          });

          if (error) {
            throw error;
          }

          clearRecoveryParams();
        } else if (code) {
          const { error } = await client.auth.exchangeCodeForSession(code);

          if (error) {
            throw error;
          }

          clearRecoveryParams();
        }

        const {
          data: { session }
        } = await client.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (!session) {
          setResetState("error");
          setMessage("Ссылка восстановления недействительна или устарела. Запросите новое письмо на странице входа.");
          return;
        }

        setResetState("ready");
      } catch {
        if (isMounted) {
          setResetState("error");
          setMessage("Не удалось открыть восстановление пароля. Запросите новое письмо на странице входа.");
        }
      }
    }

    void prepareRecoverySession();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setResetState("config_error");
      setMessage("Настройки восстановления временно недоступны.");
      return;
    }

    if (!password.trim()) {
      setResetState("ready");
      setMessage("Новый пароль не должен быть пустым.");
      return;
    }

    if (password !== passwordConfirmation) {
      setResetState("ready");
      setMessage("Пароли должны совпадать.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        setResetState("ready");
        setMessage("Не удалось сохранить новый пароль. Проверьте ссылку восстановления и попробуйте еще раз.");
        return;
      }

      await supabase.auth.signOut();
      setPassword("");
      setPasswordConfirmation("");
      setResetState("success");
      setMessage("Пароль обновлен. Теперь можно войти с новым паролем.");
    } catch {
      setResetState("ready");
      setMessage("Не удалось сохранить новый пароль. Проверьте подключение и попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (resetState === "checking") {
    return (
      <section className="admin-panel" aria-live="polite">
        <p className="admin-muted">Проверяем ссылку восстановления...</p>
      </section>
    );
  }

  return (
    <section className="admin-panel" aria-label="Задать новый пароль">
      <div className="admin-panel-header">
        <p className="admin-eyebrow">Doctor Amal</p>
        <h1>Новый пароль</h1>
        <p className="admin-muted">Задайте новый пароль для входа в админку.</p>
      </div>

      {resetState === "error" || resetState === "config_error" ? (
        <>
          <p className="admin-message" role="alert">
            {message}
          </p>
          <Link className="admin-button admin-button-secondary" href="/admin">
            Вернуться ко входу
          </Link>
        </>
      ) : null}

      {resetState === "success" ? (
        <>
          <p className="admin-message admin-message-success" role="status">
            {message}
          </p>
          <Link className="admin-button" href="/admin">
            Перейти ко входу
          </Link>
        </>
      ) : null}

      {resetState === "ready" ? (
        <form className="admin-form" onSubmit={handlePasswordUpdate}>
          <label className="admin-field">
            <span>Новый пароль</span>
            <input
              autoComplete="new-password"
              name="password"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="admin-field">
            <span>Повторите новый пароль</span>
            <input
              autoComplete="new-password"
              name="password-confirmation"
              required
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </label>

          {message ? (
            <p className="admin-message" role="alert">
              {message}
            </p>
          ) : null}

          <button className="admin-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Сохраняем..." : "Сохранить новый пароль"}
          </button>
          <Link className="admin-button admin-button-secondary" href="/admin">
            Вернуться ко входу
          </Link>
        </form>
      ) : null}
    </section>
  );
}
