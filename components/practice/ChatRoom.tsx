"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { speak } from "@/lib/audio/tts";
import { useSpeechRecognition } from "@/lib/speech/useSpeechRecognition";
import type { Scenario, ChatLine } from "@/content/scenarios";

type Msg = { role: "you" | "them"; ru: string; en: string; suggestions?: ChatLine[] };

export function ChatRoom({ scenario, onBack }: { scenario: Scenario; onBack: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "them", ru: scenario.opening.ru, en: scenario.opening.en, suggestions: scenario.suggestions },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    supported: micSupported,
    listening,
    error: micError,
    start,
    stop,
  } = useSpeechRecognition({ onResult: (text) => setInput(text) });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setError(null);
    const next: Msg[] = [...messages, { role: "you", ru: trimmed, en: "" }];
    setMessages(next);
    setLoading(true);
    try {
      const history = next.slice(1).map((m) => ({ role: m.role === "you" ? "user" : "assistant", ru: m.ru }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, history }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error === "not_configured" ? "not_configured" : "failed");
        return;
      }
      const reply = (await res.json()) as { ru: string; en: string; suggestions: ChatLine[] };
      setMessages((m) => [...m, { role: "them", ru: reply.ru, en: reply.en, suggestions: reply.suggestions }]);
    } catch {
      setError("failed");
    } finally {
      setLoading(false);
    }
  }

  const lastThem = [...messages].reverse().find((m) => m.role === "them");
  const suggestions = !loading && lastThem?.suggestions ? lastThem.suggestions : [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to scenes"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper active:translate-x-[1px] active:translate-y-[1px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-ink font-display text-base font-extrabold text-paper">
          {scenario.character.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-extrabold leading-tight">{scenario.character}</div>
          <div className="truncate text-[10px] text-greyish">{scenario.setting}</div>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto py-2">
        {messages.map((m, i) => (
          <Bubble key={i} msg={m} />
        ))}
        {loading ? <Typing /> : null}
        {error ? <ErrorNote kind={error} /> : null}
      </div>

      <div className="shrink-0 pt-2">
        {suggestions.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => send(s.ru)}
                className="rounded-tag border-2 border-ink bg-paper px-3 py-1.5 font-display text-[12px] font-bold transition active:translate-x-[1px] active:translate-y-[1px]"
              >
                {s.ru}
              </button>
            ))}
          </div>
        ) : null}
        {micSupported && micError ? (
          <p className="mb-2 text-[11px] font-medium text-greyish">{micHint(micError)}</p>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          {micSupported ? (
            <button
              type="button"
              onClick={() => {
                if (listening) {
                  stop();
                } else {
                  setInput("");
                  start();
                }
              }}
              aria-label={listening ? "Stop voice input" : "Speak in Russian"}
              aria-pressed={listening}
              className={cn(
                "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-ink shadow-comic-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                listening ? "bg-pop text-paper" : "bg-paper text-ink",
              )}
            >
              {listening ? (
                <span className="pointer-events-none absolute -inset-1 animate-mic-pulse rounded-full bg-pop" />
              ) : null}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10 h-5 w-5"
              >
                <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zM6 12a6 6 0 0012 0M12 18v3" />
              </svg>
            </button>
          ) : null}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? "Listening" : "Say something in Russian"}
            aria-label="Your message"
            className="flex-1 rounded-tag border-[3px] border-ink bg-paper px-3.5 py-2.5 text-sm font-semibold outline-none focus:bg-paper2"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-ink text-paper shadow-comic-sm transition",
              loading || !input.trim() ? "opacity-40" : "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
            )}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M3 11l18-8-8 18-2-7-8-3z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const them = msg.role === "them";
  return (
    <div className={cn("flex", them ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[82%] rounded-[16px] border-2 border-ink px-3 py-2 shadow-comic-sm",
          them ? "rounded-bl-[3px] bg-paper" : "rounded-br-[3px] bg-ink text-paper",
        )}
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0">
            <div className="font-display text-[14px] font-bold leading-snug">{msg.ru}</div>
            {msg.en ? <div className={cn("mt-1 text-[10px]", them ? "text-greyish" : "text-paper/60")}>{msg.en}</div> : null}
          </div>
          {them ? (
            <button type="button" onClick={() => speak(msg.ru)} aria-label="Listen" className="mt-0.5 shrink-0 text-ink/70">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="rounded-[16px] rounded-bl-[3px] border-2 border-ink bg-paper px-4 py-3 shadow-comic-sm">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bob rounded-full bg-ink" />
          <span className="h-2 w-2 animate-bob rounded-full bg-ink" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 animate-bob rounded-full bg-ink" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function ErrorNote({ kind }: { kind: string }) {
  return (
    <div className="rounded-[12px] border-2 border-dashed border-ink bg-paper2 px-3.5 py-2.5 text-xs leading-relaxed">
      {kind === "not_configured"
        ? "The conversation needs an Anthropic API key. Add ANTHROPIC_API_KEY to the environment and reload."
        : "The reply did not come through. Try again."}
    </div>
  );
}

function micHint(error: string): string {
  if (error === "not-allowed" || error === "service-not-allowed")
    return "Microphone access is off. Allow it in your browser to speak.";
  if (error === "no-speech") return "Did not catch that. Tap the mic and try again.";
  if (error === "audio-capture") return "No microphone found.";
  return "Voice input did not work. Try again.";
}
