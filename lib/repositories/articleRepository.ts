import articlesJson from "@/data/articles.json";
import { isArticle, isPublishableArticle, type Article } from "@/domain/article";

function comparePublishedAtDesc(left: Article, right: Article): number {
  if (!left.publishedAt && !right.publishedAt) {
    return 0;
  }

  if (!left.publishedAt) {
    return 1;
  }

  if (!right.publishedAt) {
    return -1;
  }

  return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
}

function loadArticles(): Article[] {
  const rawArticles: unknown = articlesJson;

  if (!Array.isArray(rawArticles)) {
    return [];
  }

  return rawArticles.filter(isArticle);
}

export async function getPublishedArticles(): Promise<Article[]> {
  return loadArticles().filter(isPublishableArticle).sort(comparePublishedAtDesc);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getPublishedArticles();
  return articles.find((article) => article.id === id) ?? null;
}
