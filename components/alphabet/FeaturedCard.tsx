"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { CyrillicLetter } from "@/lib/content/types";

// the large flip card. front is the glyph, back is the sound and the English cue.
// remounted by key when the selected letter changes, so it always opens on the front.
export function FeaturedCard({ letter }: { letter: CyrillicLetter }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${letter.upper}, tap to reveal the sound`}
      className={cn("flip-card relative h-52 w-full", flipped && "is-flipped")}
    >
      <span className="flip-inner block">
        <span className="flip-face flex flex-col items-center justify-center rounded-[20px] border-[3px] border-ink bg-paper shadow-comic">
          <span className="font-display text-[88px] font-black leading-none">{letter.upper}</span>
          <span className="absolute bottom-4 text-[11px] font-semibold text-greyish">tap to reveal</span>
        </span>
        <span
          className="flip-face flip-back flex flex-col items-center justify-center gap-2 rounded-[20px] border-[3px] border-ink bg-ink px-6 text-center text-paper shadow-comic"
          style={{
            backgroundImage: "radial-gradient(var(--paper) .6px, transparent .7px)",
            backgroundSize: "10px 10px",
          }}
        >
          <span className="font-display text-4xl font-extrabold">{letter.sound}</span>
          <span className="text-[13px] leading-snug opacity-85">{letter.anchor}</span>
        </span>
      </span>
    </button>
  );
}
