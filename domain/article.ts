import type { PublicationStatus } from "./course";

export type ArticleSourceType = "telegram" | "original" | "other";

export interface ArticleSource {
  type: ArticleSourceType;
  displayText: string | null;
  url: string | null;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  source: ArticleSource;
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export function isArticle(value: unknown): value is Article {
  if (!value || typeof value !== "object") {
    return false;
  }

  const article = value as Article;

  return (
    typeof article.id === "string" &&
    typeof article.title === "string" &&
    typeof article.summary === "string" &&
    typeof article.body === "string" &&
    typeof article.category === "string" &&
    Array.isArray(article.tags) &&
    (typeof article.publishedAt === "string" || article.publishedAt === null) &&
    typeof article.source === "object" &&
    article.source !== null &&
    ["telegram", "original", "other"].includes(article.source.type) &&
    (typeof article.source.displayText === "string" || article.source.displayText === null) &&
    (typeof article.source.url === "string" || article.source.url === null) &&
    ["published", "draft", "archived"].includes(article.publicationStatus) &&
    typeof article.createdAt === "string" &&
    typeof article.updatedAt === "string"
  );
}

export function isPublishableArticle(article: Article): boolean {
  return (
    article.publicationStatus === "published" &&
    article.id.trim().length > 0 &&
    article.title.trim().length > 0 &&
    article.summary.trim().length > 0 &&
    article.body.trim().length > 0 &&
    article.category.trim().length > 0
  );
}
