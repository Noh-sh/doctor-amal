import Link from "next/link";
import { CourseCard } from "@/components/courses/CourseCard";
import { hasAnyOpenSales } from "@/domain/sales";
import { ruMessages } from "@/lib/messages/ru";
import { getPublishedCourses } from "@/lib/repositories/courseRepository";

function getCatalogNotice(courses: Awaited<ReturnType<typeof getPublishedCourses>>) {
  if (hasAnyOpenSales(courses)) {
    const openCourses = courses.filter((course) => course.salesStatus === "open");

    return {
      title: "Продажи открыты",
      text:
        openCourses.length === 1
          ? `Сейчас открыт курс “${openCourses[0].title}”. Подробные условия будут показаны на странице курса.`
          : "Сейчас есть курсы с открытыми продажами. Подробные условия будут показаны на страницах курсов."
    };
  }

  if (courses.some((course) => course.salesStatus === "coming_soon")) {
    return {
      title: "Продажи скоро откроются",
      text: "Сейчас можно изучить описания курсов и ознакомиться с материалами. Период продаж указан в карточке курса, если он известен."
    };
  }

  return {
    title: "Продажи закрыты",
    text: "Заявки на покупку сейчас не принимаются. Каталог доступен для ознакомления, а статьи можно читать в обычном режиме."
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
        <section className="catalog-status" aria-labelledby="catalog-status-title">
          <h2 id="catalog-status-title">{catalogNotice.title}</h2>
          <p>{catalogNotice.text}</p>
        </section>
      ) : null}

      {courses.length > 0 ? (
        <section className="course-grid" aria-label="Список курсов">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
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
