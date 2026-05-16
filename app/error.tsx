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
        Данные не удалось загрузить. Попробуйте повторить действие или перейдите в другой раздел проекта.
      </p>
      <div className="actions">
        <button className="button" onClick={reset} type="button">
          Попробовать снова
        </button>
        <Link className="button button-secondary" href="/">
          На главную
        </Link>
        <Link className="button button-secondary" href="/articles">
          Читать статьи
        </Link>
      </div>
      <div className="notice">
        Технические детали ошибки не показываются пользователю. Материалы проекта остаются
        ознакомительными и не заменяют очный медицинский осмотр.
      </div>
    </section>
  );
}
