import Link from "next/link";
import type { Article } from "@/domain/article";
import { ruMessages } from "@/lib/messages/ru";
import { getPublishedArticles } from "@/lib/repositories/articleRepository";

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

function getArticleMeta(article: Article): string {
  const date = formatArticleDate(article.publishedAt);
  const parts = [article.category, date, article.source.displayText].filter(Boolean);

  return parts.join(" · ");
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <section className="page-section">
      <p className="eyebrow">Материалы</p>
      <h1>Статьи</h1>
      <p className="lead">
        Бесплатные ознакомительные материалы о здоровье, питании, образе жизни и подходе Doctor Amal.
      </p>

      {articles.length > 0 ? (
        <section className="article-preview-list" aria-labelledby="article-preview-title">
          <div>
            <h2 id="article-preview-title">Опубликованные материалы</h2>
            <p className="muted">
              Статьи помогают познакомиться с темами проекта и не заменяют очный медицинский осмотр.
            </p>
          </div>
          {articles.map((article) => (
            <article className="article-preview-item" key={article.id}>
              <div>
                <p className="article-meta">{getArticleMeta(article)}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </div>
              <Link className="button button-secondary" href={`/articles/${article.id}`}>
                Читать статью
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>{ruMessages.empty.articles}</h2>
          <p>Пока можно перейти к каталогу курсов или вернуться позже, когда материалы будут опубликованы.</p>
        </section>
      )}

      <div className="notice">
        Материалы носят ознакомительный характер, не ставят диагноз, не назначают лечение и не ведут
        напрямую к заявке на покупку курса.
      </div>
      <div className="actions">
        <Link className="button button-secondary" href="/courses">
          Перейти к каталогу курсов
        </Link>
        <Link className="button button-secondary" href="/doctor">
          О докторе
        </Link>
      </div>
    </section>
  );
}
