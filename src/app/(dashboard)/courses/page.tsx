import { CoursesList } from "@/app/(dashboard)/courses/CoursesList";
import { getCourses } from "@/app/actions/courses";

export default async function CoursesPage() {
  const { data, error } = await getCourses();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500">
        Error al cargar los cursos: {error}
      </div>
    );
  }

  const courses = data ?? [];

  return <CoursesList initialCourses={courses} />;
}
