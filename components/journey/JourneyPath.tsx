import { spine } from "@/content/spine";
import { UnitNode, type NodeState } from "@/components/journey/UnitNode";

// winding offsets so the path feels organic, kept inside the column width.
// progress is stubbed honestly: unit 1 is current, the rest locked, none done.
const OFFSETS = [88, 28, 140, 56, 150, 40, 112, 20];

export function JourneyPath() {
  return (
    <div className="relative pb-6 pt-1">
      {spine.map((unit, i) => {
        const state: NodeState = i === 0 ? "current" : "locked";
        const offset = OFFSETS[i % OFFSETS.length];
        return (
          <div key={unit.position}>
            <UnitNode unit={unit} state={state} offset={offset} />
            {i < spine.length - 1 && (
              <div
                className="my-1.5 h-7 w-1"
                style={{
                  marginLeft: offset + 30,
                  backgroundImage: "repeating-linear-gradient(var(--ink) 0 6px, transparent 6px 12px)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
