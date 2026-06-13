"use client";

import Link from "next/link";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <section className="page-section">
      <p className="eyebrow">Ошибка</p>
      <h1>Не удалось показать страницу</h1>
      <p className="lead">
        Локальные данные страницы не удалось показать. Попробуйте повторить действие или вернитесь на главную.
      </p>
      <div className="actions">
        <button className="button" onClick={reset} type="button">
          Попробовать снова
        </button>
        <Link className="button button-secondary" href="/">
          На главную
        </Link>
      </div>
      <div className="notice">
        Технические детали ошибки не показываются пользователю. Информация на странице носит
        ознакомительный характер.
      </div>
    </section>
  );
}
