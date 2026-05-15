"use client";

import { useMemo, useState } from "react";
import type { Course, SalesStatus } from "@/domain/course";
import { ruMessages } from "@/lib/messages/ru";
import { CourseCard } from "./CourseCard";

type CourseCatalogProps = {
  courses: Course[];
};

type SalesStatusFilter = SalesStatus | "all";

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase();
}

function getCourseSearchText(course: Course): string {
  return [
    course.title,
    course.shortDescription,
    course.category,
    ...course.topics,
    ...course.symptoms
  ]
    .join(" ")
    .toLowerCase();
}

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [salesStatus, setSalesStatus] = useState<SalesStatusFilter>("all");

  const categories = useMemo(
    () => Array.from(new Set(courses.map((course) => course.category))).sort((left, right) => left.localeCompare(right, "ru")),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    return courses.filter((course) => {
      const matchesQuery = normalizedQuery.length === 0 || getCourseSearchText(course).includes(normalizedQuery);
      const matchesCategory = category === "all" || course.category === category;
      const matchesSalesStatus = salesStatus === "all" || course.salesStatus === salesStatus;

      return matchesQuery && matchesCategory && matchesSalesStatus;
    });
  }, [courses, query, category, salesStatus]);

  const hasActiveFilters = query.trim().length > 0 || category !== "all" || salesStatus !== "all";

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSalesStatus("all");
  }

  return (
    <section className="course-catalog" aria-label="Каталог курсов с поиском и фильтрами">
      <div className="catalog-controls">
        <label className="field">
          <span>Поиск</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Название, тема или симптом"
          />
        </label>

        <label className="field">
          <span>Категория</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">Все категории</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Статус продаж</span>
          <select value={salesStatus} onChange={(event) => setSalesStatus(event.target.value as SalesStatusFilter)}>
            <option value="all">Все статусы</option>
            <option value="open">{ruMessages.salesStatus.open}</option>
            <option value="closed">{ruMessages.salesStatus.closed}</option>
            <option value="coming_soon">{ruMessages.salesStatus.coming_soon}</option>
          </select>
        </label>
      </div>

      <p className="muted">
        Поиск помогает найти материалы по теме, но не ставит диагноз и не заменяет консультацию доктора.
      </p>

      {filteredCourses.length > 0 ? (
        <section className="course-grid" aria-label="Список курсов">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Подходящие курсы не найдены</h2>
          <p>Измените запрос или сбросьте фильтры, чтобы снова увидеть доступные курсы.</p>
          {hasActiveFilters ? (
            <button className="button" type="button" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          ) : null}
        </section>
      )}
    </section>
  );
}
