import type { Course, PurchaseSettings } from "@/domain/taplink";
import { getInactivePurchaseText, isPurchaseEnabled } from "@/lib/links/externalLinks";

type CoursesBlockProps = {
  courses: Course[];
  panelId: string;
  purchase: PurchaseSettings;
};

function PurchaseButton({ purchase, label }: { purchase: PurchaseSettings; label: "Купить" }) {
  if (isPurchaseEnabled(purchase) && purchase.managerTelegramUrl) {
    return (
      <a className="button" href={purchase.managerTelegramUrl} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return (
    <button className="button button-disabled" disabled type="button">
      {getInactivePurchaseText(purchase)}
    </button>
  );
}

export function CoursesBlock({ courses, panelId, purchase }: CoursesBlockProps) {
  if (courses.length === 0) {
    return (
      <section className="taplink-section" id={panelId} aria-labelledby="courses-title">
        <h2 className="visually-hidden" id="courses-title">Курсы</h2>
        <p className="muted">Список курсов, описания и цены не заполняются без подтвержденных данных.</p>
      </section>
    );
  }

  return (
    <section className="taplink-section" id={panelId} aria-labelledby="courses-title">
      <h2 className="visually-hidden" id="courses-title">Курсы</h2>
      <div className="course-accordion">
        {courses.map((course) => (
          <details className="course-item" key={course.id} suppressHydrationWarning>
            <summary>
              <span className="course-title">
                <span className="course-title-icon" aria-hidden="true" />
                <span>{course.title}</span>
              </span>
              <strong>{course.price.displayText}</strong>
            </summary>
            <div className="course-item-body">
              <p>{course.description}</p>
              <PurchaseButton label={course.purchaseLabel} purchase={purchase} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
