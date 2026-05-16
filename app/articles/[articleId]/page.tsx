import Link from "next/link";
import type { Article } from "@/domain/article";
import { ruMessages } from "@/lib/messages/ru";
import { getArticleById } from "@/lib/repositories/articleRepository";

type ArticlePageProps = {
  params: Promise<{
    articleId: string;
  }>;
};

function formatArticleDate(publishedAt: Article["publishedAt"]): string | null {
  if (!publishedAt) {
    return null;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(publishedAt));
}

function splitArticleBody(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function ArticleUnavailableState() {
  return (
    <section className="page-section">
      <p className="eyebrow">Статья</p>
      <h1>{ruMessages.errors.articleNotFound}</h1>
      <p className="lead">
        Вернитесь к списку материалов и выберите опубликованную статью. Черновики и неполные материалы
        не показываются как полноценные статьи.
      </p>
      <div className="actions">
        <Link className="button" href="/articles">
          Вернуться к статьям
        </Link>
        <Link className="button button-secondary" href="/courses">
          Перейти к каталогу
        </Link>
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;
  const article = await getArticleById(articleId);

  if (!article) {
    return <ArticleUnavailableState />;
  }

  const publishedDate = formatArticleDate(article.publishedAt);
  const paragraphs = splitArticleBody(article.body);

  return (
    <section className="page-section">
      <article className="article-detail">
        <header className="article-header">
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="lead">{article.summary}</p>
          <dl className="article-facts">
            {publishedDate ? (
              <div>
                <dt>Дата публикации</dt>
                <dd>{publishedDate}</dd>
              </div>
            ) : null}
            <div>
              <dt>Тема</dt>
              <dd>{article.category}</dd>
            </div>
            {article.source.displayText ? (
              <div>
                <dt>Источник</dt>
                <dd>
                  {article.source.url ? (
                    <a href={article.source.url} rel="noreferrer" target="_blank">
                      {article.source.displayText}
                    </a>
                  ) : (
                    article.source.displayText
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        </header>

        {article.tags.length > 0 ? (
          <ul className="tag-list" aria-label="Темы статьи">
            {article.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <div className="article-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="notice">
        Материал носит ознакомительный характер, не ставит диагноз, не назначает лечение и не заменяет
        очный медицинский осмотр.
      </div>

      <div className="actions">
        <Link className="button" href="/articles">
          Вернуться к статьям
        </Link>
        <Link className="button button-secondary" href="/courses">
          Перейти к каталогу
        </Link>
        <Link className="button button-secondary" href="/doctor">
          О докторе
        </Link>
      </div>
    </section>
  );
}
