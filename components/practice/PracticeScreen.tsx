"use client";

import { useState } from "react";
import { scenarios, getScenario } from "@/content/scenarios";
import { ChatRoom } from "@/components/practice/ChatRoom";

export function PracticeScreen() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? getScenario(activeId) : undefined;

  if (active) {
    return <ChatRoom scenario={active} onBack={() => setActiveId(null)} />;
  }

  return (
    <div className="pt-2">
      <h1 className="font-display text-lg font-extrabold">Talk</h1>
      <p className="mb-4 mt-1 text-xs text-greyish">Pick a scene and have a short conversation in Russian.</p>
      <div className="space-y-3">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className="flex w-full items-center gap-3 rounded-card border-[3px] border-ink bg-paper p-3.5 text-left shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-ink font-display text-base font-extrabold text-paper">
              {s.character.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm font-extrabold">{s.title}</div>
              <div className="truncate text-[11px] text-greyish">{s.setting}</div>
            </div>
            <span className="ml-auto shrink-0 rounded-tag border-2 border-ink px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
              {s.level}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
