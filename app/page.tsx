import Link from "next/link";
import { canSubmitPrePurchaseConsultation, hasAnyOpenSales } from "@/domain/sales";
import { getPublishedCourses } from "@/lib/repositories/courseRepository";

const topics = [
  "Кожа",
  "ЖКТ",
  "Гормональный баланс",
  "Головные боли",
  "Хроническое воспаление",
  "Дефициты",
  "Психологическое состояние"
];

const projectPrinciples = [
  "образовательные материалы вместо обещаний результата",
  "внимание к питанию, образу жизни и профилактике",
  "аккуратные формулировки без диагностики внутри сайта",
  "заявки и оплата проходят без хранения платежных данных"
];

export default async function HomePage() {
  const courses = await getPublishedCourses();
  const canRequestConsultation = canSubmitPrePurchaseConsultation(hasAnyOpenSales(courses));

  return (
    <section className="page-section">
      <p className="eyebrow">Локальная версия</p>
      <h1>Doctor Amal</h1>
      <p className="lead">
        Образовательный проект о поддержке здоровья женщин, питании и образе жизни. Здесь можно
        познакомиться с подходом доктора, изучить курсы и читать бесплатные материалы.
      </p>
      <div className="actions">
        <Link className="button" href="/courses">
          Перейти к курсам
        </Link>
        <Link className="button button-secondary" href="/doctor">
          Узнать о докторе
        </Link>
        <Link className="button button-secondary" href="/articles">
          Читать статьи
        </Link>
      </div>

      <section className="content-block feature-panel" aria-labelledby="home-about-title">
        <div>
          <p className="eyebrow">Суть проекта</p>
          <h2 id="home-about-title">Курсы помогают изучать темы здоровья системно</h2>
        </div>
        <p>
          Материалы Doctor Amal носят образовательный характер. Они помогают разобраться в темах
          питания, привычек, профилактики и самонаблюдения, но не ставят диагноз и не заменяют
          очный медицинский осмотр.
        </p>
        <ul className="plain-list">
          {projectPrinciples.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>

      <section className="content-block" aria-labelledby="topics-title">
        <h2 id="topics-title">Основные темы</h2>
        <p className="muted">
          Темы помогают выбрать направление для изучения курса или статьи. Они не используются для
          постановки диагноза.
        </p>
        <ul className="tag-list">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <div className="content-grid">
        <section className="content-block">
          <h2>Как устроены курсы</h2>
          <p>
            Курсы размещаются в закрытых Telegram-каналах. После заявки оплата обсуждается вне
            сайта, а доступ предоставляется вручную после согласования.
          </p>
          <Link href="/courses">Открыть каталог курсов</Link>
        </section>
        <section className="content-block">
          <h2>Знакомство через статьи</h2>
          <p>
            Бесплатные материалы помогают спокойно познакомиться с подходом Doctor Amal до выбора
            курса или в период закрытых продаж.
          </p>
          <Link href="/articles">Открыть статьи</Link>
        </section>
      </div>

      <section
        className={`course-action-panel ${canRequestConsultation ? "" : "course-action-panel-muted"}`}
        aria-labelledby="home-consultation-title"
      >
        <div>
          <h2 id="home-consultation-title">
            {canRequestConsultation ? "Нужна помощь с выбором курса" : "Сейчас можно изучать материалы"}
          </h2>
          <p>
            {canRequestConsultation
              ? "В период открытых продаж можно оставить заявку на консультацию по подбору курса. Это помогает передать информацию доктору или ассистенту, но не является медицинской консультацией внутри сайта."
              : "Когда продажи закрыты, заявки на покупку и подбор курса не принимаются. Перед следующим открытием продаж будет объявление, а статьи остаются доступными для ознакомления."}
          </p>
        </div>
        {canRequestConsultation ? (
          <Link className="button" href="/request?type=pre_purchase_consultation">
            Оставить заявку на подбор курса
          </Link>
        ) : (
          <Link className="button button-secondary" href="/articles">
            Читать статьи
          </Link>
        )}
      </section>

      <div className="notice">
        Сайт не принимает онлайн-оплату, не хранит платежные данные и не является каналом
        экстренной медицинской связи. При острых или опасных симптомах нужно обратиться за очной
        медицинской помощью.
      </div>
    </section>
  );
}
