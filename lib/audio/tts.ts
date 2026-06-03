"use client";

// browser speech synthesis as a dev placeholder for native TTS. a cloud voice
// replaces this behind the same call once one is chosen. no key needed.
export function speak(text: string, opts: { rate?: number } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = opts.rate ?? 0.8;
  const russianVoice = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith("ru"));
  if (russianVoice) utterance.voice = russianVoice;
  synth.speak(utterance);
}

export function ttsAvailable() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
