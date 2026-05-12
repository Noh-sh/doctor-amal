import Link from "next/link";

export default function ArticlesPage() {
  return (
    <section className="page-section">
      <p className="eyebrow">Материалы</p>
      <h1>Статьи</h1>
      <p className="lead">
        Здесь будет список бесплатных опубликованных материалов, которые помогают познакомиться с подходом доктора.
      </p>

      <section className="article-preview-list" aria-labelledby="article-preview-title">
        <div>
          <h2 id="article-preview-title">Будущий список материалов</h2>
          <p className="muted">
            На следующем этапе здесь появятся опубликованные статьи из локальных данных.
          </p>
        </div>
        <article className="article-preview-item">
          <div>
            <p className="article-meta">Питание · дата публикации</p>
            <h3>Пример материала из Telegram-канала</h3>
            <p>
              В статье будут краткое описание, тема, источник и переход к полному тексту материала.
            </p>
          </div>
          <Link href="/articles/test-article">Открыть пример статьи</Link>
        </article>
        <article className="article-preview-item">
          <div>
            <p className="article-meta">Образ жизни · дата публикации</p>
            <h3>Еще один пример материала</h3>
            <p>
              Статьи остаются ознакомительным разделом и не ведут напрямую к заявке на покупку.
            </p>
          </div>
          <Link href="/doctor">О подходе доктора</Link>
        </article>
      </section>

      <div className="notice">
        Статьи остаются ознакомительным разделом и не ведут напрямую к заявке на покупку курса.
      </div>
      <Link href="/courses">Перейти к каталогу курсов</Link>
    </section>
  );
}
