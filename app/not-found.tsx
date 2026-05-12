import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p className="lead">Такой страницы нет или она пока недоступна.</p>
      <Link className="button" href="/">
        Вернуться на главную
      </Link>
    </section>
  );
}
