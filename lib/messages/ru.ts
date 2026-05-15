export const ruMessages = {
  salesStatus: {
    open: "Продажи открыты",
    closed: "Продажи закрыты",
    coming_soon: "Продажи скоро откроются"
  },
  publicationStatus: {
    published: "Опубликовано",
    draft: "Черновик",
    archived: "Архив"
  },
  empty: {
    courses: "Курсы пока не опубликованы.",
    articles: "Материалы пока не опубликованы."
  },
  errors: {
    coursesUnavailable: "Курсы не удалось загрузить. Проверьте локальные данные проекта.",
    articlesUnavailable: "Материалы не удалось загрузить. Проверьте локальные данные проекта.",
    courseNotFound: "Курс не найден или пока недоступен.",
    articleNotFound: "Статья не найдена или пока недоступна."
  }
} as const;
