"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { cyrillicLetters } from "@/lib/content/cyrillic";

interface Question {
  glyph: string;
  anchor: string;
  options: string[];
  answer: number;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// weight the harder letters: false friends three times, new twice, familiar once
function buildQuiz(): Question[] {
  const pool = cyrillicLetters;
  const weighted = pool.flatMap((l) =>
    l.group === "false_friend" ? [l, l, l] : l.group === "new" ? [l, l] : [l],
  );
  const chosen: typeof pool = [];
  const seen = new Set<string>();
  let guard = 0;
  while (chosen.length < 8 && guard++ < 500) {
    const letter = weighted[Math.floor(Math.random() * weighted.length)];
    if (!seen.has(letter.upper)) {
      seen.add(letter.upper);
      chosen.push(letter);
    }
  }
  return chosen.map((letter) => {
    const otherSounds = [
      ...new Set(pool.filter((p) => p.sound !== letter.sound).map((p) => p.sound)),
    ];
    const distractors = shuffle(otherSounds).slice(0, 3);
    const options = shuffle([letter.sound, ...distractors]);
    return { glyph: letter.upper, anchor: letter.anchor, options, answer: options.indexOf(letter.sound) };
  });
}

export function AlphabetPractice() {
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // build on the client only, so the random order does not clash with the server render
  useEffect(() => {
    setQuiz(buildQuiz());
  }, []);

  function restart() {
    setQuiz(buildQuiz());
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setDone(false);
  }

  if (!quiz) {
    return <div className="py-12 text-center text-xs text-greyish">Setting up the drill</div>;
  }

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <span className="mb-5 inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
          Drill done
        </span>
        <div className="font-display text-[64px] font-black leading-none text-pop" style={{ textShadow: "3px 3px 0 var(--paper3)" }}>
          {score}/{quiz.length}
        </div>
        <p className="mt-3 text-xs text-greyish">sounds matched</p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-[13px] border-[3px] border-ink bg-ink px-5 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          Again
        </button>
      </div>
    );
  }

  const q = quiz[index];
  const isCorrect = checked && selected === q.answer;

  function check() {
    if (selected === null) return;
    setChecked(true);
    if (selected === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (index + 1 < quiz!.length) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
    } else {
      setDone(true);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">
        <span>
          Sound {index + 1} of {quiz.length}
        </span>
        <span>{score} right</span>
      </div>
      <div className="grid place-items-center rounded-[18px] border-[3px] border-ink bg-paper p-6 shadow-comic">
        <span className="font-display text-[72px] font-black leading-none">{q.glyph}</span>
      </div>
      <p className="mb-4 mt-4 text-center text-[11px] font-bold uppercase tracking-[1.4px] text-greyish">Which sound is this?</p>
      <div className="grid grid-cols-2 gap-2.5">
        {q.options.map((opt, oi) => {
          const isSel = selected === oi;
          const isAns = oi === q.answer;
          let style = "border-ink bg-paper";
          if (checked) {
            if (isAns && isSel) style = "border-pop bg-paper animate-stampIn";
            else if (isAns) style = "border-ink bg-ink text-paper";
            else if (isSel) style = "border-dashed border-ink bg-paper animate-shake";
            else style = "border-ink bg-paper opacity-50";
          } else if (isSel) {
            style = "border-ink bg-ink text-paper";
          }
          return (
            <button
              key={oi}
              type="button"
              disabled={checked}
              onClick={() => setSelected(oi)}
              className={cn(
                "rounded-[13px] border-[3px] px-3 py-3 text-center font-display text-base font-extrabold shadow-comic-sm transition",
                style,
                !checked && "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="mt-5">
        {!checked ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={check}
            className={cn(
              "w-full rounded-[13px] border-[3px] border-ink bg-ink px-4 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition",
              selected === null ? "opacity-40" : "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
            )}
          >
            Check
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className={cn("min-w-0 truncate font-display text-sm font-extrabold", isCorrect ? "text-pop" : "text-ink")}>
              {isCorrect ? "Correct" : q.anchor.split(",")[0]}
            </span>
            <button
              type="button"
              onClick={next}
              className="shrink-0 rounded-[13px] border-[3px] border-ink bg-ink px-5 py-3 font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
