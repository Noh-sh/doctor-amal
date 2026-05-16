import Link from "next/link";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { hasAnyOpenSales } from "@/domain/sales";
import { ruMessages } from "@/lib/messages/ru";
import { getPublishedCourses } from "@/lib/repositories/courseRepository";

function getCatalogNotice(courses: Awaited<ReturnType<typeof getPublishedCourses>>) {
  if (hasAnyOpenSales(courses)) {
    const openCourses = courses.filter((course) => course.salesStatus === "open");

    return {
      status: "open" as const,
      title: "Продажи открыты",
      text:
        openCourses.length === 1
          ? "Сейчас можно оставить заявку на один курс."
          : "Сейчас можно оставить заявку на несколько курсов.",
      courses: openCourses
    };
  }

  if (courses.some((course) => course.salesStatus === "coming_soon")) {
    const upcomingCourses = courses.filter((course) => course.salesStatus === "coming_soon");

    return {
      status: "coming_soon" as const,
      title: "Продажи скоро откроются",
      text:
        "Заявки пока не принимаются. Можно изучить описания курсов и следить за объявлением о старте продаж.",
      courses: upcomingCourses
    };
  }

  return {
    status: "closed" as const,
    title: "Продажи закрыты",
    text:
      "Заявки на покупку сейчас не принимаются. Каталог доступен для ознакомления, а статьи можно читать в обычном режиме.",
    courses: []
  };
}

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  const catalogNotice = getCatalogNotice(courses);

  return (
    <section className="page-section">
      <p className="eyebrow">Каталог</p>
      <h1>Курсы</h1>
      <p className="lead">
        Опубликованные образовательные курсы Doctor Amal по темам здоровья, питанию и образу жизни.
      </p>

      {courses.length > 0 ? (
        <section
          className={`catalog-status catalog-status-${catalogNotice.status}`}
          aria-labelledby="catalog-status-title"
        >
          <div>
            <span className={`status-pill status-${catalogNotice.status}`}>
              {ruMessages.salesStatus[catalogNotice.status]}
            </span>
            <h2 id="catalog-status-title">{catalogNotice.title}</h2>
            <p>{catalogNotice.text}</p>
          </div>
          {catalogNotice.courses.length > 0 ? (
            <div className="catalog-status-courses" aria-label="Курсы по текущему статусу продаж">
              {catalogNotice.courses.map((course) => (
                <Link className="catalog-status-course" href={`/courses/${course.id}`} key={course.id}>
                  <strong>{course.title}</strong>
                  {course.salesPeriod.displayText ? <span>{course.salesPeriod.displayText}</span> : null}
                </Link>
              ))}
            </div>
          ) : (
            <Link className="button button-secondary" href="/articles">
              Читать статьи
            </Link>
          )}
        </section>
      ) : null}

      {courses.length > 0 ? (
        <CourseCatalog courses={courses} />
      ) : (
        <section className="empty-state">
          <h2>{ruMessages.empty.courses}</h2>
          <p>
            Пока можно перейти к ознакомительным статьям или вернуться позже, когда курсы будут опубликованы.
          </p>
        </section>
      )}

      <div className="notice">
        Каталог не является системой онлайн-обучения. Доступ к материалам курса предоставляется вручную
        через закрытый Telegram-канал после согласованной оплаты вне сайта.
      </div>
      <Link href="/articles">Перейти к ознакомительным статьям</Link>
    </section>
  );
}
