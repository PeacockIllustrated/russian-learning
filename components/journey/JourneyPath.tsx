import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { curriculum } from "@/content/curriculum";
import type { CurriculumUnit, Lesson } from "@/lib/content/types";

// the journey: every unit shows its lessons as tappable nodes on a connected
// path. authored units are open; A2 units stay locked until their lessons land.
export function JourneyPath() {
  return (
    <div className="flex flex-col items-center pb-10 pt-1">
      {curriculum.map((unit, ui) => (
        <UnitSection key={unit.position} unit={unit} first={ui === 0} />
      ))}
    </div>
  );
}

function UnitSection({ unit, first }: { unit: CurriculumUnit; first: boolean }) {
  const locked = unit.lessons.length === 0;
  return (
    <section className="flex w-full flex-col items-center pt-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-tag border-2 border-ink bg-paper px-2.5 py-1 font-display text-[10px] font-extrabold">
          Unit {unit.position}
        </span>
        <span className="text-[11px] font-semibold text-greyish">{unit.title}</span>
      </div>
      {locked ? (
        <LockedNode position={unit.position} />
      ) : (
        unit.lessons.map((lesson, li) => (
          <div key={lesson.position} className="flex flex-col items-center">
            {li > 0 ? <Connector /> : null}
            <LessonNode unitPos={unit.position} lesson={lesson} current={first && li === 0} />
          </div>
        ))
      )}
    </section>
  );
}

function LessonNode({ unitPos, lesson, current }: { unitPos: number; lesson: Lesson; current: boolean }) {
  return (
    <Link
      href={`/lesson/${unitPos}/${lesson.position}`}
      aria-label={lesson.title}
      className="flex flex-col items-center"
    >
      <div
        className={cn(
          "grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-paper font-display text-xl font-extrabold text-ink shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          current && "animate-bob shadow-comic ring-[3px] ring-ink ring-offset-4 ring-offset-paper",
        )}
      >
        {lesson.position}
      </div>
      <span className="mt-2 block max-w-[160px] truncate rounded-tag border-2 border-ink bg-paper px-2 py-0.5 text-center text-[10px] font-bold">
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
