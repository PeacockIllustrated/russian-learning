"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { speak } from "@/lib/audio/tts";
import { saveLessonProgress } from "@/lib/progress/actions";
import type { Lesson, LessonPhrase, LessonComprehension } from "@/lib/content/types";

type Phase =
  | { kind: "intro" }
  | { kind: "phrase"; i: number }
  | { kind: "comp"; i: number }
  | { kind: "done" };

export function LessonPlayer({
  lesson,
  unitPos,
  lessonPos,
  backHref = "/journey",
}: {
  lesson: Lesson;
  unitPos: number;
  lessonPos: number;
  backHref?: string;
}) {
  const phrases = lesson.phrases;
  const comps = lesson.comprehension;

  const [phase, setPhase] = useState<Phase>({ kind: "intro" });
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  // save completion once we reach the end, only persists when signed in
  const savedRef = useRef(false);
  useEffect(() => {
    if (phase.kind === "done" && !savedRef.current) {
      savedRef.current = true;
      const score = comps.length ? Math.round((correct / comps.length) * 100) : null;
      void saveLessonProgress(unitPos, lessonPos, score);
    }
  }, [phase, correct, comps.length, unitPos, lessonPos]);

  const totalSteps = phrases.length + comps.length || 1;
  const stepIndex =
    phase.kind === "intro"
      ? 0
      : phase.kind === "phrase"
        ? phase.i
        : phase.kind === "comp"
          ? phrases.length + phase.i
          : totalSteps;
  const progress = Math.min(1, stepIndex / totalSteps);

  function startPhrases() {
    if (phrases.length) setPhase({ kind: "phrase", i: 0 });
    else if (comps.length) goComp(0);
    else setPhase({ kind: "done" });
  }
  function nextPhrase(i: number) {
    if (i + 1 < phrases.length) setPhase({ kind: "phrase", i: i + 1 });
    else if (comps.length) goComp(0);
    else setPhase({ kind: "done" });
  }
  function goComp(i: number) {
    setSelected(null);
    setChecked(false);
    setPhase({ kind: "comp", i });
  }
  function nextComp(i: number) {
    if (checked && selected === comps[i].answer) setCorrect((c) => c + 1);
    if (i + 1 < comps.length) goComp(i + 1);
    else setPhase({ kind: "done" });
  }

  const currentComp = phase.kind === "comp" ? comps[phase.i] : null;
  const isCorrect = currentComp != null && checked && selected === currentComp.answer;

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-paper">
      <header className="flex shrink-0 items-center gap-3 px-4 pb-2 pt-4">
        <Link
          href={backHref}
          aria-label="Close lesson"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-ink active:translate-x-[1px] active:translate-y-[1px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" className="h-4 w-4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
        <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-paper">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4 pt-2">
        {phase.kind === "intro" && <Intro lesson={lesson} />}
        {phase.kind === "phrase" && (
          <PhraseStep phrase={phrases[phase.i]} index={phase.i} total={phrases.length} />
        )}
        {phase.kind === "comp" && currentComp && (
          <CompStep
            comp={currentComp}
            selected={selected}
            checked={checked}
            onSelect={(idx) => !checked && setSelected(idx)}
          />
        )}
        {phase.kind === "done" && <Done correct={correct} total={comps.length} backHref={backHref} />}
      </main>

      <footer className="shrink-0 px-4 pb-5 pt-2">
        {phase.kind === "intro" && <Action onClick={startPhrases}>Begin</Action>}
        {phase.kind === "phrase" && (
          <Action onClick={() => nextPhrase(phase.i)}>
            {phase.i + 1 < phrases.length ? "Next" : comps.length ? "Listening" : "Finish"}
          </Action>
        )}
        {phase.kind === "comp" && !checked && (
          <Action disabled={selected === null} onClick={() => setChecked(true)}>
            Check
          </Action>
        )}
        {phase.kind === "comp" && checked && (
          <div className="flex items-center gap-3">
            <span className={cn("font-display text-sm font-extrabold", isCorrect ? "text-pop" : "text-ink")}>
              {isCorrect ? "Correct" : "Not quite"}
            </span>
            <Action className="flex-1" onClick={() => nextComp(phase.i)}>
              Next
            </Action>
          </div>
        )}
        {phase.kind === "done" && (
          <Link
            href={backHref}
            className="block w-full rounded-[13px] border-[3px] border-ink bg-ink px-4 py-3 text-center font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Continue the journey
          </Link>
        )}
      </footer>
    </div>
  );
}

function Action({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-[13px] border-[3px] border-ink bg-ink px-4 py-3 text-center font-display text-[13px] font-extrabold text-paper shadow-comic-sm transition",
        disabled ? "opacity-40" : "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" />
    </svg>
  );
}

function Intro({ lesson }: { lesson: Lesson }) {
  return (
    <div className="pt-2">
      <span className="inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
        Lesson
      </span>
      <h1 className="mt-3 font-display text-xl font-extrabold">{lesson.title}</h1>
      <p className="mt-1 text-xs text-greyish">{lesson.scenario}</p>
      <div className="mt-5 space-y-2.5">
        <Row icon={<span className="font-display text-[13px] font-extrabold">RU</span>} title={`${lesson.newWords.length} new words`} sub={lesson.newWords.join(", ")} />
        <Row icon={<span className="font-display text-[13px] font-extrabold">Aa</span>} title="Grammar" sub={lesson.grammar.title} />
        <Row icon={<PlayIcon className="h-4 w-4" />} title="Listening" sub={`${lesson.comprehension.length} checks`} />
      </div>
    </div>
  );
}

function Row({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[11px] border-2 border-ink bg-paper px-3 py-2.5 shadow-comic-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border-2 border-ink">{icon}</span>
      <span className="min-w-0">
        <b className="block text-[12.5px] font-bold">{title}</b>
        <span className="block truncate text-[10px] text-greyish">{sub}</span>
      </span>
    </div>
  );
}

function PhraseStep({ phrase, index, total }: { phrase: LessonPhrase; index: number; total: number }) {
  return (
    <div className="pt-2">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[1.4px] text-greyish">
        Phrase {index + 1} of {total}
      </div>
      <div className="rounded-[18px] border-[3px] border-ink bg-paper bg-halftone bg-dots-lg p-5 text-center shadow-comic">
        <div className="font-display text-[26px] font-extrabold leading-tight">{phrase.cyrillic}</div>
        {phrase.translit ? (
          <div className="mt-2 text-[12px] italic text-greyish">{phrase.translit}</div>
        ) : null}
        <div className="mt-1 text-[13px] font-semibold">{phrase.gloss}</div>
      </div>
      <button
        type="button"
        onClick={() => speak(phrase.cyrillic)}
        className="mx-auto mt-4 flex items-center gap-2 rounded-tag border-[3px] border-ink bg-paper px-4 py-2.5 font-display text-[12px] font-bold shadow-comic-sm transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        <PlayIcon className="h-4 w-4" />
        Listen
      </button>
      {phrase.note ? (
        <div className="mt-4 rounded-[12px] border-2 border-dashed border-ink bg-paper2 px-3.5 py-3">
          <div className="mb-1.5 flex items-center gap-1.5 font-display text-[10px] font-bold uppercase tracking-[1px]">
            <span className="h-2 w-2 rotate-45 bg-ink" />
            Note
          </div>
          <p className="text-[11.5px] leading-relaxed text-[#3c382f]">{phrase.note}</p>
        </div>
      ) : null}
    </div>
  );
}

function CompStep({
  comp,
  selected,
  checked,
  onSelect,
}: {
  comp: LessonComprehension;
  selected: number | null;
  checked: boolean;
  onSelect: (i: number) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  return (
    <div className="pt-2">
      <span className="inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
        {comp.prompt}
      </span>
      <button
        type="button"
        onClick={() => speak(comp.audio)}
        aria-label="Play audio"
        className="mx-auto mt-5 grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-ink text-paper shadow-comic transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
      >
        <PlayIcon className="h-7 w-7" />
      </button>
      <p className="mb-5 mt-3 text-center text-[11px] text-greyish">Tap to play, slowed</p>
      <div className="space-y-2.5">
        {comp.options.map((opt, i) => {
          const isSel = selected === i;
          const isAnswer = i === comp.answer;
          let style = "border-ink bg-paper";
          if (checked) {
            if (isAnswer && isSel) style = "border-pop bg-paper animate-stampIn";
            else if (isAnswer) style = "border-ink bg-ink text-paper";
            else if (isSel) style = "border-dashed border-ink bg-paper animate-shake";
            else style = "border-ink bg-paper opacity-50";
          } else if (isSel) {
            style = "border-ink bg-ink text-paper";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={checked}
              onClick={() => onSelect(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[13px] border-[3px] px-4 py-3 text-left text-sm font-semibold shadow-comic-sm transition",
                style,
                !checked && "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] border-2 border-current font-display text-[12px] font-extrabold">
                {letters[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Done({ correct, total, backHref }: { correct: number; total: number; backHref: string }) {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="mb-5 inline-block rounded-tag border-2 border-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-[1.4px]">
        Lesson done
      </span>
      <div
        className="font-display text-[64px] font-black leading-none text-pop"
        style={{ textShadow: "3px 3px 0 var(--paper3)" }}
      >
        {total ? `${correct}/${total}` : "Done"}
      </div>
      <p className="mt-3 text-xs text-greyish">
        {total ? "listening checks correct" : "nicely worked through"}
      </p>
      <Link href={backHref} className="sr-only">
        Back
      </Link>
    </div>
  );
}
