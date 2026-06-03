"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { AlphabetBoard } from "@/components/alphabet/AlphabetBoard";
import { AlphabetPractice } from "@/components/alphabet/AlphabetPractice";

export function AlphabetScreen() {
  const [mode, setMode] = useState<"learn" | "practice">("learn");

  return (
    <div className="pt-2">
      <h1 className="font-display text-lg font-extrabold">Cyrillic refresher</h1>
      <p className="mb-4 mt-1 text-xs text-greyish">
        {mode === "learn"
          ? "Tap a card to flip. You have seen these before."
          : "Read the letter, choose its sound. Leans on the tricky ones."}
      </p>

      <div className="mb-5 flex gap-1 rounded-tag border-2 border-ink p-1">
        <Seg active={mode === "learn"} onClick={() => setMode("learn")}>
          Learn
        </Seg>
        <Seg active={mode === "practice"} onClick={() => setMode("practice")}>
          Practice
        </Seg>
      </div>

      {mode === "learn" ? <AlphabetBoard /> : <AlphabetPractice />}
    </div>
  );
}

function Seg({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-tag px-3 py-1.5 font-display text-[12px] font-extrabold transition",
        active ? "bg-ink text-paper" : "text-ink",
      )}
    >
      {children}
    </button>
  );
}
