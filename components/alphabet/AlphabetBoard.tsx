"use client";

import { useState } from "react";
import { cyrillicLetters, letterGroups, lettersByGroup, letterCount } from "@/lib/content/cyrillic";
import { FeaturedCard } from "@/components/alphabet/FeaturedCard";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils/cn";
import { reactivateLetter } from "@/lib/progress/actions";
import type { CyrillicLetter } from "@/lib/content/types";

// reactivation persists to russ_letter_progress when signed in, local otherwise.
export function AlphabetBoard({ initialReactivated = [] }: { initialReactivated?: string[] }) {
  const [selected, setSelected] = useState<CyrillicLetter>(cyrillicLetters[0]);
  const [reactivated, setReactivated] = useState<Set<string>>(() => new Set(initialReactivated));
  const [pulsing, setPulsing] = useState<string | null>(null);

  function select(letter: CyrillicLetter) {
    setSelected(letter);
    if (!reactivated.has(letter.upper)) {
      setReactivated((prev) => new Set(prev).add(letter.upper));
      setPulsing(letter.upper); // the one earned, live vermilion moment on this screen
      void reactivateLetter(letter.upper);
    }
  }

  return (
    <div>
      <FeaturedCard key={selected.upper} letter={selected} />

      <div className="mt-5 space-y-5">
        {letterGroups.map((group) => (
          <section key={group.key}>
            <div className="mb-2 flex items-baseline gap-2">
              <Tag>{group.label}</Tag>
              <span className="text-[10px] text-greyish">{group.blurb}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {lettersByGroup(group.key).map((letter) => {
                const seen = reactivated.has(letter.upper);
                const isSelected = selected.upper === letter.upper;
                return (
                  <button
                    key={letter.upper}
                    type="button"
                    onClick={() => select(letter)}
                    aria-pressed={isSelected}
                    className={cn(
                      "relative grid aspect-square place-items-center rounded-[12px] border-2 border-ink font-display text-xl font-extrabold shadow-comic-sm transition",
                      "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                      seen ? "bg-ink text-paper" : "bg-paper text-ink",
                      isSelected && !seen && "ring-2 ring-ink ring-offset-2 ring-offset-paper",
                    )}
                  >
                    {pulsing === letter.upper && (
                      <span
                        onAnimationEnd={() => setPulsing(null)}
                        className="animate-pop-ring pointer-events-none absolute inset-0 z-10 rounded-[12px] border-[3px] border-pop"
                      />
                    )}
                    {letter.upper}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-[12px] border-2 border-dashed border-ink bg-paper2 px-3.5 py-3 text-xs">
        <span>Letters reactivated</span>
        <span className="font-display font-extrabold">
          {reactivated.size} / {letterCount}
        </span>
      </div>
    </div>
  );
}
