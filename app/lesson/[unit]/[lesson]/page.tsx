import { notFound } from "next/navigation";
import { getLesson } from "@/content/curriculum";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ unit: string; lesson: string }>;
}) {
  const { unit, lesson } = await params;
  const found = getLesson(Number(unit), Number(lesson));
  if (!found) notFound();
  return <LessonPlayer lesson={found.lesson} unitPos={Number(unit)} lessonPos={Number(lesson)} backHref="/journey" />;
}
