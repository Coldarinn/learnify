import { Course } from "@/shared/types/course"

export type CreateCourseDto = Pick<Course, "name" | "description" | "includeVideo" | "difficultyLevel" | "category">
