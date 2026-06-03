import Link from "next/link";

// the continue card. opens unit 1, lesson 1 in the lesson player.
export function StartBanner({ lessonTitle }: { lessonTitle: string }) {
  return (
    <div className="mb-5 flex -rotate-[0.6deg] items-center justify-between rounded-card border-[3px] border-ink bg-ink p-3.5 text-paper shadow-comic">
      <div>
        <div className="font-display text-sm font-extrabold">Begin</div>
        <div className="text-[11px] opacity-80">{lessonTitle}</div>
      </div>
      <Link
        href="/lesson/1/1"
        className="rounded-[9px] border-2 border-ink bg-paper px-3.5 py-2 font-display text-[11px] font-extrabold text-ink transition active:translate-x-[2px] active:translate-y-[2px]"
      >
        Open
      </Link>
    </div>
  );
}
