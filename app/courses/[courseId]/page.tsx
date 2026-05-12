import Link from "next/link";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  return (
    <section className="page-section">
      <p className="eyebrow">Страница курса</p>
      <h1>Курс пока не подключен</h1>
      <p className="lead">
        Маршрут для курса создан. Данные курса будут загружаться из локального repository на следующем этапе.
      </p>
      <p className="muted">Технический адрес курса: {courseId}</p>
      <Link className="button" href="/courses">
        Вернуться к каталогу
      </Link>
    </section>
  );
}
