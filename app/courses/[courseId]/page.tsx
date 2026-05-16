import Link from "next/link";
import type { Course } from "@/domain/course";
import { canSubmitCoursePurchase } from "@/domain/sales";
import { ruMessages } from "@/lib/messages/ru";
import { getCourseById, getPublishedCourses } from "@/lib/repositories/courseRepository";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

function getSalesStatusClass(status: Course["salesStatus"]): string {
  return `status-pill status-${status}`;
}

function getRelatedCourses(course: Course, courses: Course[]): Course[] {
  const relatedIds = new Set(course.relatedCourseIds);

  return courses.filter((item) => item.id !== course.id && relatedIds.has(item.id));
}

function CourseUnavailableState() {
  return (
    <section className="page-section">
      <p className="eyebrow">Курс</p>
      <h1>{ruMessages.errors.courseNotFound}</h1>
      <p className="lead">
        Вернитесь в каталог курсов и выберите опубликованный курс. Черновые или недоступные курсы не
        показываются пользователю.
      </p>
      <Link className="button" href="/courses">
        Вернуться к каталогу
      </Link>
    </section>
  );
}

function CourseActions({ course }: { course: Course }) {
  if (canSubmitCoursePurchase(course)) {
    return (
      <section className="course-action-panel" aria-labelledby="course-actions-title">
        <div>
          <h2 id="course-actions-title">Что можно сделать сейчас</h2>
          <p>
            Вы можете оставить заявку на покупку курса. Оплата не выполняется на сайте и обсуждается
            с доктором или ассистентом после заявки.
          </p>
        </div>
        <div className="actions">
          <Link className="button" href={`/request?type=course_purchase&courseId=${course.id}`}>
            Оставить заявку на покупку
          </Link>
          <Link className="button button-secondary" href="/request?type=pre_purchase_consultation">
            Нужна помощь с выбором
          </Link>
        </div>
      </section>
    );
  }

  if (course.salesStatus === "coming_soon") {
    return (
      <section className="course-action-panel course-action-panel-muted" aria-labelledby="course-actions-title">
        <div>
          <h2 id="course-actions-title">Заявки пока не принимаются</h2>
          <p>
            Продажи скоро откроются. Заявка на покупку станет доступна только после открытия продаж.
            Пока можно изучить ознакомительные статьи и материалы проекта.
          </p>
        </div>
        <Link className="button button-secondary" href="/articles">
          Перейти к статьям
        </Link>
      </section>
    );
  }

  return (
    <section className="course-action-panel course-action-panel-muted" aria-labelledby="course-actions-title">
      <div>
        <h2 id="course-actions-title">Заявки сейчас не принимаются</h2>
        <p>
          Продажи курса закрыты. Перед следующим открытием продаж будет объявление. Пока можно читать
          статьи и Telegram-материалы проекта.
        </p>
      </div>
      <Link className="button button-secondary" href="/articles">
        Перейти к статьям
      </Link>
    </section>
  );
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const [course, courses] = await Promise.all([getCourseById(courseId), getPublishedCourses()]);

  if (!course) {
    return <CourseUnavailableState />;
  }

  const visibleTags = [...course.topics, ...course.symptoms];
  const relatedCourses = getRelatedCourses(course, courses);

  return (
    <section className="page-section">
      <div className="course-hero">
        <div className="course-hero-copy">
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p className="lead">{course.fullDescription}</p>
        </div>
        <aside className="course-summary" aria-label="Краткая информация о курсе">
          <span className={getSalesStatusClass(course.salesStatus)}>
            {ruMessages.salesStatus[course.salesStatus]}
          </span>
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
              <dd>Закрытый Telegram-канал</dd>
            </div>
          </dl>
        </aside>
      </div>

      {visibleTags.length > 0 ? (
        <section className="content-block" aria-labelledby="course-topics-title">
          <h2 id="course-topics-title">Темы и симптомы</h2>
          <ul className="tag-list">
            {visibleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="muted">
            Эти темы помогают ориентироваться в материалах курса, но не являются диагнозом или
            назначением лечения.
          </p>
        </section>
      ) : null}

      <div className="content-grid">
        {course.benefits.length > 0 ? (
          <section className="content-block" aria-labelledby="course-benefits-title">
            <h2 id="course-benefits-title">Польза материалов</h2>
            <ul className="plain-list">
              {course.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="content-block" aria-labelledby="course-access-title">
          <h2 id="course-access-title">Доступ к материалам</h2>
          <p>{course.telegramAccessDescription}</p>
          <p className="muted">
            Материалы курса находятся не внутри сайта. Автоматического добавления в Telegram-канал
            на сайте нет.
          </p>
        </section>
      </div>

      {course.purchaseTerms.length > 0 ? (
        <section className="content-block" aria-labelledby="course-terms-title">
          <h2 id="course-terms-title">Условия подачи заявки</h2>
          <ul className="plain-list">
            {course.purchaseTerms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
          <p className="muted">{course.salesRuleDescription}</p>
        </section>
      ) : (
        <section className="content-block" aria-labelledby="course-terms-title">
          <h2 id="course-terms-title">Условия подачи заявки</h2>
          <p>{course.salesRuleDescription}</p>
        </section>
      )}

      <CourseActions course={course} />

      <div className="notice">
        Сайт не выполняет онлайн-оплату и не хранит платежные данные. Материалы проекта носят
        образовательный характер, не ставят диагноз и не заменяют очный медицинский осмотр.
      </div>

      {relatedCourses.length > 0 ? (
        <section className="related-courses" aria-labelledby="related-courses-title">
          <div>
            <p className="eyebrow">Похожие курсы</p>
            <h2 id="related-courses-title">Можно изучить дальше</h2>
          </div>
          <div className="related-course-list">
            {relatedCourses.map((relatedCourse) => (
              <article className="related-course-item" key={relatedCourse.id}>
                <div>
                  <p className="course-category">{relatedCourse.category}</p>
                  <h3>{relatedCourse.title}</h3>
                  <p className="muted">{relatedCourse.shortDescription}</p>
                </div>
                <Link className="button button-secondary" href={`/courses/${relatedCourse.id}`}>
                  Открыть курс
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <Link href="/courses">Вернуться к каталогу курсов</Link>
    </section>
  );
}
