import Link from "next/link";

export default function DoctorPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">О докторе</p>
      <h1>Подход Doctor Amal</h1>
      <p className="lead">
        Эта страница предназначена для публичной информации о докторе, ценностях и роли образовательных курсов.
      </p>
      <div className="content-grid">
        <section className="content-block">
          <h2>Роль курсов</h2>
          <p>
            Курсы описываются как образовательные материалы по питанию, профилактике и образу жизни.
          </p>
        </section>
        <section className="content-block">
          <h2>Формат доступа</h2>
          <p>
            Доступ к закрытому Telegram-каналу предоставляется вручную после согласованной оплаты вне сайта.
          </p>
        </section>
      </div>
      <div className="actions">
        <Link className="button" href="/courses">
          Смотреть курсы
        </Link>
        <Link className="button button-secondary" href="/articles">
          Читать статьи
        </Link>
      </div>
    </section>
  );
}
