import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { curriculum } from "@/content/curriculum";
import type { CurriculumUnit, Lesson } from "@/lib/content/types";

type LessonState = "done" | "current" | "available";

// the journey: every authored lesson is a tappable node on a connected path,
// grouped by unit. done lessons fill in, the next one is current. A2 units lock.
export function JourneyPath({ doneKeys }: { doneKeys: string[] }) {
  const done = new Set(doneKeys);

  let currentKey: string | null = null;
  for (const unit of curriculum) {
    for (const lesson of unit.lessons) {
      const key = `${unit.position}-${lesson.position}`;
      if (!done.has(key)) {
        currentKey = key;
        break;
      }
    }
    if (currentKey) break;
  }

  return (
    <div className="flex flex-col items-center pb-10 pt-1">
      {curriculum.map((unit) => (
        <UnitSection key={unit.position} unit={unit} done={done} currentKey={currentKey} />
      ))}
    </div>
  );
}

function UnitSection({
  unit,
  done,
  currentKey,
}: {
  unit: CurriculumUnit;
  done: Set<string>;
  currentKey: string | null;
}) {
  if (unit.lessons.length === 0) {
    return (
      <section className="flex w-full flex-col items-center pt-5">
        <UnitHeader unit={unit} />
        <LockedNode position={unit.position} />
      </section>
    );
  }
  return (
    <section className="flex w-full flex-col items-center pt-5">
      <UnitHeader unit={unit} />
      {unit.lessons.map((lesson, li) => {
        const key = `${unit.position}-${lesson.position}`;
        const state: LessonState = done.has(key) ? "done" : key === currentKey ? "current" : "available";
        return (
          <div key={lesson.position} className="flex flex-col items-center">
            {li > 0 ? <Connector /> : null}
            <LessonNode unitPos={unit.position} lesson={lesson} state={state} />
          </div>
        );
      })}
    </section>
  );
}

function UnitHeader({ unit }: { unit: CurriculumUnit }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="rounded-tag border-2 border-ink bg-paper px-2.5 py-1 font-display text-[10px] font-extrabold">
        Unit {unit.position}
      </span>
      <span className="text-[11px] font-semibold text-greyish">{unit.title}</span>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LessonNode({ unitPos, lesson, state }: { unitPos: number; lesson: Lesson; state: LessonState }) {
  return (
    <Link href={`/lesson/${unitPos}/${lesson.position}`} aria-label={lesson.title} className="flex flex-col items-center">
      <div
        className={cn(
          "grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink font-display text-xl font-extrabold shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          state === "done" && "bg-ink text-paper",
          state === "current" && "animate-bob bg-paper text-ink shadow-comic ring-[3px] ring-ink ring-offset-4 ring-offset-paper",
          state === "available" && "bg-paper text-ink",
        )}
      >
        {state === "done" ? <Check /> : lesson.position}
      </div>
      <span
        className={cn(
          "mt-2 block max-w-[160px] truncate rounded-tag border-2 border-ink bg-paper px-2 py-0.5 text-center text-[10px] font-bold",
          state === "current" && "bg-ink text-paper",
        )}
      >
        {lesson.title}
      </span>
    </Link>
  );
}

function LockedNode({ position }: { position: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-dashed border-ink bg-paper3 font-display text-xl font-extrabold text-greyish">
        {position}
      </div>
      <span className="mt-2 rounded-tag border-2 border-dashed border-ink px-2 py-0.5 text-[10px] font-bold text-greyish">
        Locked
      </span>
    </div>
  );
}

function Connector() {
  return (
    <div
      className="my-1 h-7 w-1"
      style={{ backgroundImage: "repeating-linear-gradient(var(--ink) 0 6px, transparent 6px 12px)" }}
      aria-hidden="true"
    />
  );
}
