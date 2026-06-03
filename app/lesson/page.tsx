import { getSeedLesson } from "@/lib/content/lessons";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

// unit 1, lesson 1 from the seed. generation fills the rest of the spine later.
export default function LessonPage() {
  const lesson = getSeedLesson(1);
  return <LessonPlayer lesson={lesson} />;
}
