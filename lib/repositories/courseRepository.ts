import coursesJson from "@/data/courses.json";
import { isCourse, isPublishableCourse, type Course } from "@/domain/course";

function loadCourses(): Course[] {
  const rawCourses: unknown = coursesJson;

  if (!Array.isArray(rawCourses)) {
    return [];
  }

  return rawCourses.filter(isCourse);
}

export async function getPublishedCourses(): Promise<Course[]> {
  return loadCourses().filter(isPublishableCourse);
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getPublishedCourses();
  return courses.find((course) => course.id === id) ?? null;
}
