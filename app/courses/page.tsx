import Link from "next/link";

export default function CoursesPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">Каталог</p>
      <h1>Курсы</h1>
      <p className="lead">
        Здесь будет каталог опубликованных образовательных курсов по темам здоровья, питанию и образу жизни.
      </p>

      <section className="catalog-preview" aria-labelledby="catalog-preview-title">
        <div>
          <h2 id="catalog-preview-title">Будущий вид каталога</h2>
          <p className="muted">
            На следующем этапе здесь появятся реальные курсы из локальных данных.
          </p>
        </div>
        <div className="filter-preview" aria-label="Будущие фильтры каталога">
          <span>Поиск по курсу</span>
          <span>Тема здоровья</span>
          <span>Статус продаж</span>
        </div>
        <article className="course-preview-card">
          <div>
            <span className="status-pill">Продажи скоро откроются</span>
            <h3>Пример карточки курса</h3>
            <p>
              В карточке будут название, краткое описание, категория, темы, стоимость и статус продаж.
            </p>
          </div>
          <Link className="button" href="/courses/test-course">
            Проверить страницу курса
          </Link>
        </article>
      </section>

      <div className="notice">
        Покупка курса будет доступна только при открытых продажах. Онлайн-оплата на сайте не выполняется.
      </div>
      <Link href="/articles">Перейти к ознакомительным статьям</Link>
    </section>
  );
}
