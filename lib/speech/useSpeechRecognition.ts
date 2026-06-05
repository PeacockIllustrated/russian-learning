"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Minimal typings for the Web Speech API, which is not in the standard DOM lib.
// This is the V1 path for voice input: browser native, no key, runs client side.
// The Azure seam stays parked for per-phoneme scoring later.
type Alternative = { transcript: string };
interface RecognitionResult {
  readonly length: number;
  isFinal: boolean;
  [index: number]: Alternative;
}
interface RecognitionResultList {
  readonly length: number;
  [index: number]: RecognitionResult;
}
interface RecognitionEvent {
  resultIndex: number;
  results: RecognitionResultList;
}
interface RecognitionErrorEvent {
  error: string;
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function getCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(opts: {
  lang?: string;
  onResult?: (text: string, isFinal: boolean) => void;
} = {}) {
  const { lang = "ru-RU", onResult } = opts;
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<Recognition | null>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  useEffect(() => {
    setSupported(getCtor() !== null);
  }, []);

  const stop = useCallback(() => {
    recRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) return;
    const prev = recRef.current;
    if (prev) {
      prev.onstart = prev.onresult = prev.onerror = prev.onend = null;
      prev.abort();
    }
    setError(null);

    const rec = new Ctor();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = (e) => {
      if (e.error === "aborted") return; // fired by our own restart or unmount
      setError(e.error);
      setListening(false);
    };
    rec.onresult = (e) => {
      let text = "";
      let isFinal = false;
      for (let i = 0; i < e.results.length; i++) {
        const result = e.results[i];
        text += result[0].transcript;
        if (result.isFinal) isFinal = true;
      }
      onResultRef.current?.(text.trim(), isFinal);
    };

    recRef.current = rec;
    try {
      rec.start();
    } catch {
      // start() throws if a session is already running; safe to ignore
    }
  }, [lang]);

  useEffect(() => {
    return () => {
      const rec = recRef.current;
      if (rec) {
        rec.onstart = rec.onresult = rec.onerror = rec.onend = null;
        rec.abort();
      }
    };
  }, []);

  return { supported, listening, error, start, stop };
}
