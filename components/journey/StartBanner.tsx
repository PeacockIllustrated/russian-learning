import { Button } from "@/components/ui/Button";

// the continue card. inert this phase; the lesson player it opens arrives in phase 3.
export function StartBanner({ lessonTitle }: { lessonTitle: string }) {
  return (
    <div className="mb-5 flex -rotate-[0.6deg] items-center justify-between rounded-card border-[3px] border-ink bg-ink p-3.5 text-paper shadow-comic">
      <div>
        <div className="font-display text-sm font-extrabold">Begin</div>
        <div className="text-[11px] opacity-80">{lessonTitle}</div>
      </div>
      <Button variant="ghost" size="sm" inert>
        Open
      </Button>
    </div>
  );
}
