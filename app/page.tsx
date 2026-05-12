import Link from "next/link";

const topics = [
  "Кожа",
  "ЖКТ",
  "Гормональный баланс",
  "Головные боли",
  "Хроническое воспаление",
  "Дефициты",
  "Психологическое состояние"
];

export default function HomePage() {
  return (
    <section className="page-section">
      <p className="eyebrow">Локальная версия</p>
      <h1>Doctor Amal</h1>
      <p className="lead">
        Образовательные курсы и материалы о поддержке здоровья женщин, питании и образе жизни.
      </p>
      <div className="actions">
        <Link className="button" href="/courses">
          Перейти к курсам
        </Link>
        <Link className="button button-secondary" href="/doctor">
          Узнать о докторе
        </Link>
      </div>
      <section className="content-block" aria-labelledby="topics-title">
        <h2 id="topics-title">Основные темы</h2>
        <ul className="tag-list">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
      <section className="content-block">
        <h2>Материалы</h2>
        <p>Бесплатные статьи помогают познакомиться с подходом доктора до выбора курса.</p>
        <Link href="/articles">Открыть статьи</Link>
      </section>
    </section>
  );
}
