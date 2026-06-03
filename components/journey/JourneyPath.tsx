import Link from "next/link";
import { spine } from "@/content/spine";
import { UnitNode, type NodeState } from "@/components/journey/UnitNode";

// a clean, centred, connected path. unit 1 is current and opens its lesson;
// the rest are locked until the spine fills in. progress is stubbed honestly.
function Connector() {
  return (
    <div
      className="my-1 h-8 w-1"
      style={{ backgroundImage: "repeating-linear-gradient(var(--ink) 0 6px, transparent 6px 12px)" }}
      aria-hidden="true"
    />
  );
}

export function JourneyPath() {
  return (
    <div className="flex flex-col items-center pb-8 pt-2">
      {spine.map((unit, i) => {
        const state: NodeState = i === 0 ? "current" : "locked";
        return (
          <div key={unit.position} className="flex flex-col items-center">
            {i > 0 ? <Connector /> : null}
            {state === "current" ? (
              <Link href="/lesson" aria-label={`Open ${unit.title}`}>
                <UnitNode unit={unit} state={state} />
              </Link>
            ) : (
              <UnitNode unit={unit} state={state} />
            )}
          </div>
        );
      })}
    </div>
  );
}
