import { cn } from "@/lib/utils/cn";
import type { SpineUnit } from "@/lib/content/types";

export type NodeState = "done" | "current" | "locked";

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// done is inverted ink, current bobs with the double ring, locked is dashed grey.
// no vermilion at rest; the completion pulse fires only when a node is finished.
export function UnitNode({ unit, state }: { unit: SpineUnit; state: NodeState }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink font-display text-xl font-extrabold",
          state === "done" && "bg-ink text-paper shadow-comic-sm",
          state === "current" &&
            "animate-bob bg-paper text-ink shadow-comic ring-[3px] ring-ink ring-offset-4 ring-offset-paper",
          state === "locked" && "border-dashed bg-paper3 text-greyish",
        )}
      >
        {state === "done" ? <Check /> : unit.position}
      </div>
      <span
        className={cn(
          "mt-2 whitespace-nowrap rounded-tag border-2 border-ink px-2 py-0.5 text-[10px] font-bold",
          state === "current" ? "bg-ink text-paper" : "bg-paper",
          state === "locked" && "text-greyish",
        )}
      >
        {unit.title}
      </span>
    </div>
  );
}
