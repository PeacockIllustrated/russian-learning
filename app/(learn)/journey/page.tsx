import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StartBanner } from "@/components/journey/StartBanner";
import { JourneyPath } from "@/components/journey/JourneyPath";
import { curriculum } from "@/content/curriculum";

function firstUndone(done: Set<string>) {
  for (const unit of curriculum) {
    for (const lesson of unit.lessons) {
      if (!done.has(`${unit.position}-${lesson.position}`)) {
        return { unit: unit.position, lesson: lesson.position, title: lesson.title };
      }
    }
  }
  const unit = curriculum[0];
  const lesson = unit.lessons[0];
  return { unit: unit.position, lesson: lesson.position, title: lesson.title };
}

export default async function JourneyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let doneKeys: string[] = [];
  if (user) {
    const { data } = await supabase
      .from("russ_lesson_progress")
      .select("unit_position,lesson_position")
      .eq("owner", user.id);
    doneKeys = (data ?? []).map((row) => `${row.unit_position}-${row.lesson_position}`);
  }

  const next = firstUndone(new Set(doneKeys));

  return (
    <div className="pt-1">
      {!user ? (
        <Link
          href="/login"
          className="mb-4 block rounded-card border-2 border-dashed border-ink bg-paper2 px-4 py-3 text-center text-xs font-semibold"
        >
          Sign in to save your progress and streak
        </Link>
      ) : null}
      <StartBanner lessonTitle={next.title} href={`/lesson/${next.unit}/${next.lesson}`} />
      <JourneyPath doneKeys={doneKeys} />
    </div>
  );
}
