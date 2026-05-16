import { RequestForm } from "@/components/requests/RequestForm";
import type { RequestType } from "@/domain/request";
import { canSubmitCoursePurchase } from "@/domain/sales";
import { getPublishedCourses } from "@/lib/repositories/courseRepository";

type RequestPageProps = {
  searchParams: Promise<{
    type?: string;
    courseId?: string;
  }>;
};

function isRequestType(value: string | undefined): value is RequestType {
  return value === "course_purchase" || value === "pre_purchase_consultation";
}

export default async function RequestPage({ searchParams }: RequestPageProps) {
  const params = await searchParams;
  const courses = await getPublishedCourses();
  const hasAnyOpenSales = courses.some(canSubmitCoursePurchase);
  const requestedType = params.type;
  const initialType = isRequestType(requestedType)
    ? requestedType
    : hasAnyOpenSales
      ? "pre_purchase_consultation"
      : "course_purchase";
  const requestedCourse = courses.find((course) => course.id === params.courseId) ?? null;
  const initialCourseId =
    initialType === "course_purchase" ? requestedCourse?.id ?? courses.find(canSubmitCoursePurchase)?.id ?? "" : "";
  const queryMessage = !requestedType || isRequestType(requestedType)
    ? null
    : "Параметры ссылки некорректны. Выберите доступный тип заявки.";

  return (
    <section className="page-section">
      <p className="eyebrow">Заявка</p>
      <h1>Форма заявки</h1>
      <p className="lead">
        Оставьте заявку на покупку курса с открытыми продажами или на консультацию по подбору курса.
        Заявка не является онлайн-оплатой или медицинской консультацией внутри сайта.
      </p>
      <RequestForm
        courses={courses}
        initialCourseId={initialCourseId}
        initialType={initialType}
        queryMessage={queryMessage}
      />
    </section>
  );
}
