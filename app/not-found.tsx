import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-section">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p className="lead">
        В текущей версии Doctor Amal есть только главная Taplink-страница. Вернитесь на главную,
        чтобы выбрать нужный блок или внешнюю платформу.
      </p>
      <div className="actions">
        <Link className="button" href="/">
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}
