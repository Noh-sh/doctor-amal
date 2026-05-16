import Link from "next/link";
import { canSubmitPrePurchaseConsultation, hasAnyOpenSales } from "@/domain/sales";
import { getPublishedCourses } from "@/lib/repositories/courseRepository";

const values = [
  "образовательный формат без обещаний гарантированного результата",
  "внимание к образу жизни, питанию и профилактике",
  "уважение к индивидуальному состоянию пользователя",
  "понимание границ онлайн-материалов и необходимости очной помощи"
];

export default async function DoctorPage() {
  const courses = await getPublishedCourses();
  const canRequestConsultation = canSubmitPrePurchaseConsultation(hasAnyOpenSales(courses));

  return (
    <section className="page-section">
      <p className="eyebrow">О докторе</p>
      <h1>Подход Doctor Amal</h1>
      <p className="lead">
        Doctor Amal - проект семейного доктора с интегративным подходом к темам женского здоровья,
        питания, профилактики и образа жизни.
      </p>

      <section className="content-block feature-panel" aria-labelledby="doctor-public-title">
        <div>
          <p className="eyebrow">Публичная информация</p>
          <h2 id="doctor-public-title">Доктор помогает разбираться в здоровье бережно и системно</h2>
        </div>
        <p>
          Проект объединяет образовательные курсы и ознакомительные материалы для пользователей,
          которым важно лучше понимать связь питания, привычек, профилактики и самочувствия.
        </p>
        <p className="muted">
          На сайте не публикуются личные данные доктора, которые не предназначены для публичной
          страницы.
        </p>
      </section>

      <div className="content-grid">
        <section className="content-block" aria-labelledby="doctor-values-title">
          <h2 id="doctor-values-title">Подход и ценности</h2>
          <ul className="plain-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <p>
            При серьезных, острых или опасных симптомах пользователь должен обратиться за очной
            медицинской помощью.
          </p>
        </section>
        <section className="content-block" aria-labelledby="doctor-courses-title">
          <h2 id="doctor-courses-title">Роль курсов</h2>
          <p>
            Курсы - это образовательные материалы по питанию, профилактике и образу жизни. Они
            помогают изучать тему последовательно, но не ставят диагноз, не назначают лечение и не
            заменяют очный медицинский осмотр.
          </p>
        </section>
      </div>

      <div className="content-grid">
        <section className="content-block" aria-labelledby="doctor-telegram-title">
          <h2 id="doctor-telegram-title">Закрытые Telegram-каналы</h2>
          <p>
            Материалы курса находятся в закрытом Telegram-канале. Доступ предоставляется вручную
            после согласованной оплаты вне сайта.
          </p>
          <p className="muted">
            Сайт не добавляет пользователя в Telegram автоматически и не раскрывает закрытые
            материалы курса.
          </p>
        </section>
        <section className="content-block" aria-labelledby="doctor-payment-title">
          <h2 id="doctor-payment-title">Почему нет онлайн-оплаты</h2>
          <p>
            В первой локальной версии сайт не принимает оплату картой и не хранит платежные данные.
            После заявки дальнейшие шаги обсуждаются с доктором или ассистентом вне сайта.
          </p>
        </section>
      </div>

      <section
        className={`course-action-panel ${canRequestConsultation ? "" : "course-action-panel-muted"}`}
        aria-labelledby="doctor-consultation-title"
      >
        <div>
          <h2 id="doctor-consultation-title">Консультация по подбору курса</h2>
          <p>
            {canRequestConsultation
              ? "Если пользователь не понимает, какой курс выбрать, он может оставить заявку на подбор курса. Заявка помогает передать информацию доктору или ассистенту и не является экстренным медицинским каналом связи."
              : "Сейчас заявки на подбор курса не предлагаются, потому что продажи закрыты или еще не открылись. Можно читать статьи и следить за объявлением о следующем периоде продаж."}
          </p>
          <p className="muted">
            Подбор курса не заменяет очный осмотр и полноценную медицинскую консультацию.
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

      <div className="actions">
        <Link className="button" href="/courses">
          Смотреть курсы
        </Link>
        <Link className="button button-secondary" href="/articles">
          Читать статьи
        </Link>
        <Link className="button button-secondary" href="/">
          На главную
        </Link>
      </div>

      <div className="notice">
        Страница носит информационный характер. Сайт не обещает медицинский результат, не ставит
        диагноз и не заменяет очную медицинскую помощь.
      </div>
    </section>
  );
}
