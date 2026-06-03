import data from "@/seed/unit-01.json";
import type { SeedLesson } from "@/lib/content/types";

// the seeded unit 1 lessons, real content for day one before generation runs
export const seedLessons = data.lessons as unknown as SeedLesson[];

export function getSeedLesson(position: number): SeedLesson {
  return seedLessons.find((lesson) => lesson.position === position) ?? seedLessons[0];
}
