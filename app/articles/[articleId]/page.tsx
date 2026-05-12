import Link from "next/link";

type ArticlePageProps = {
  params: Promise<{
    articleId: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;

  return (
    <section className="page-section">
      <p className="eyebrow">Статья</p>
      <h1>Материал пока не подключен</h1>
      <p className="lead">
        Маршрут отдельной статьи создан. Полный текст будет загружаться из локального repository на следующем этапе.
      </p>
      <p className="muted">Технический адрес статьи: {articleId}</p>
      <Link className="button" href="/articles">
        Вернуться к статьям
      </Link>
    </section>
  );
}
