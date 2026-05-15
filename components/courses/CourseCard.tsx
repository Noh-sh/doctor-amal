import Link from "next/link";
import type { Course } from "@/domain/course";
import { canSubmitCoursePurchase } from "@/domain/sales";
import { ruMessages } from "@/lib/messages/ru";

type CourseCardProps = {
  course: Course;
};

function getSalesStatusClass(status: Course["salesStatus"]): string {
  return `status-pill status-${status}`;
}

export function CourseCard({ course }: CourseCardProps) {
  const canPurchase = canSubmitCoursePurchase(course);
  const visibleTags = [...course.topics, ...course.symptoms].slice(0, 5);

  return (
    <article className="course-card">
      <div className="course-card-header">
        <div>
          <p className="course-category">{course.category}</p>
          <h2>{course.title}</h2>
        </div>
        <span className={getSalesStatusClass(course.salesStatus)}>
          {ruMessages.salesStatus[course.salesStatus]}
        </span>
      </div>

      <p className="course-description">{course.shortDescription}</p>

      {visibleTags.length > 0 ? (
        <ul className="tag-list" aria-label="Темы и симптомы курса">
          {visibleTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}

      <dl className="course-facts">
        <div>
          <dt>Стоимость</dt>
          <dd>{course.price.displayText || "Стоимость уточняется"}</dd>
        </div>
        {course.salesPeriod.displayText ? (
          <div>
            <dt>Период продаж</dt>
            <dd>{course.salesPeriod.displayText}</dd>
          </div>
        ) : null}
        <div>
          <dt>Формат доступа</dt>
          <dd>{course.telegramAccessDescription}</dd>
        </div>
      </dl>

      <div className="course-card-footer">
        <p className="muted">{canPurchase ? "Доступна заявка со страницы курса." : "Ознакомительный режим."}</p>
        <Link className="button" href={`/courses/${course.id}`}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
