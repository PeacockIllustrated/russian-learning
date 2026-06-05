"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { speak } from "@/lib/audio/tts";
import { gradeCard } from "@/lib/progress/actions";
import type { ReviewGrade } from "@/lib/srs";

type Card = { id: string; ru: string; en: string; translit: string | null };

export function ReviewQueue({ cards }: { cards: Card[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return <Empty />;
  if (index >= cards.length) return <Done count={cards.length} />;

  const card = cards[index];

  function grade(g: ReviewGrade) {
    void gradeCard(card.id, g);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="pt-2">
      <div className="mb-4 text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">
        Card {index + 1} of {cards.length}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Flip the card"
        className={cn("flip-card relative h-56 w-full", flipped && "is-flipped")}
      >
        <span className="flip-inner block">
          <span className="flip-face flex flex-col items-center justify-center gap-2 rounded-[20px] border-[3px] border-ink bg-paper shadow-comic">
            <span className="font-display text-3xl font-extrabold">{card.ru}</span>
            {card.translit ? <span className="text-[12px] italic text-greyish">{card.translit}</span> : null}
            <span className="absolute bottom-4 text-[11px] font-semibold text-greyish">tap to flip</span>
          </span>
          <span
            className="flip-face flip-back flex flex-col items-center justify-center rounded-[20px] border-[3px] border-ink bg-ink px-6 text-center text-paper shadow-comic"
            style={{ backgroundImage: "radial-gradient(var(--paper) .6px, transparent .7px)", backgroundSize: "10px 10px" }}
          >
            <span className="font-display text-2xl font-extrabold">{card.en}</span>
          </span>
        </span>
      </button>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => speak(card.ru)}
          className="flex items-center gap-2 rounded-tag border-[3px] border-ink bg-paper px-4 py-2 font-display text-[12px] font-bold shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
          Listen
        </button>
      </div>

      <div className="mt-6">
        {flipped ? (
          <div className="flex gap-2.5">
            <Grade onClick={() => grade("again")}>Again</Grade>
            <Grade onClick={() => grade("hard")}>Hard</Grade>
            <Grade onClick={() => grade("easy")} primary>
              Easy
            </Grade>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="w-full rounded-[13px] border-[3px] border-ink bg-ink px-4 py-3 text-center font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Show answer
          </button>
        )}
      </div>
    </div>
  );
}

function Grade({ children, onClick, primary }: { children: ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-[13px] border-[3px] border-ink px-3 py-3 font-display text-[13px] font-extrabold shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        primary ? "bg-ink text-paper" : "bg-paper text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Empty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
        All clear
      </span>
      <p className="text-sm font-semibold">Nothing due right now</p>
      <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-greyish">
        Finish a lesson and its words join your deck, then come back when they are due.
      </p>
      <Link
        href="/journey"
        className="mt-6 rounded-[13px] border-[3px] border-ink bg-ink px-5 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        Back to the journey
      </Link>
    </div>
  );
}

function Done({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <span className="mb-5 inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
        Review done
      </span>
      <div className="font-display text-[64px] font-black leading-none text-pop" style={{ textShadow: "3px 3px 0 var(--paper3)" }}>
        {count}
      </div>
      <p className="mt-3 text-xs text-greyish">{count === 1 ? "card reviewed" : "cards reviewed"}</p>
      <Link
        href="/journey"
        className="mt-6 rounded-[13px] border-[3px] border-ink bg-ink px-5 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        Back to the journey
      </Link>
    </div>
  );
}
