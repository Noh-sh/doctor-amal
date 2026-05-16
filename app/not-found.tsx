import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p className="lead">
        Такой страницы нет или она пока недоступна. Вернитесь на главную страницу или выберите
        ближайший раздел проекта.
      </p>
      <div className="actions">
        <Link className="button" href="/">
          Вернуться на главную
        </Link>
        <Link className="button button-secondary" href="/courses">
          Перейти к курсам
        </Link>
        <Link className="button button-secondary" href="/articles">
          Читать статьи
        </Link>
      </div>
    </section>
  );
}
