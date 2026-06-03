import type { SpineUnit } from "@/lib/content/types";

// The fixed curriculum spine, transcribed from docs/curriculum-spine.md.
// Generated lessons sit inside these units; the spine fixes the order and targets.
export const spine: SpineUnit[] = [
  { position: 1, title: "First words", domain: "greetings", level: "A1", coreVocab: 15, summary: "Hello, goodbye, please, thank you, yes, no." },
  { position: 2, title: "Meeting people", domain: "introductions", level: "A1", coreVocab: 18, summary: "My name is, what is your name, nice to meet you." },
  { position: 3, title: "How are you", domain: "small talk", level: "A1", coreVocab: 15, summary: "How are you, fine, not bad, and you, see you later." },
  { position: 4, title: "Numbers and money", domain: "market", level: "A1", coreVocab: 25, summary: "Zero to twenty, hundred, rouble, how much, cheap." },
  { position: 5, title: "At the market", domain: "market", level: "A1", coreVocab: 22, summary: "I want, I would like, this, that, a kilo of." },
  { position: 6, title: "Food and drink", domain: "ordering", level: "A1", coreVocab: 24, summary: "Coffee, tea, water, bread, large, small, with, without." },
  { position: 7, title: "Getting around", domain: "directions", level: "A1", coreVocab: 22, summary: "Where is, left, right, straight on, metro, near, far." },
  { position: 8, title: "Family", domain: "family", level: "A1", coreVocab: 24, summary: "Mother, father, brother, sister, wife, husband, child." },
  { position: 9, title: "Time and days", domain: "time", level: "A2", coreVocab: 26, summary: "Days of the week, today, tomorrow, morning, evening." },
  { position: 10, title: "Likes and wants", domain: "preferences", level: "A2", coreVocab: 22, summary: "I like, I do not like, I want to, I can, I must." },
  { position: 11, title: "Past and future, lightly", domain: "everyday", level: "A2", coreVocab: 24, summary: "Was, will be, yesterday, will go, did." },
  { position: 12, title: "Around the home", domain: "home", level: "A2", coreVocab: 24, summary: "Room, kitchen, table, to live, to work, at home." },
  { position: 13, title: "Feeling and health", domain: "wellbeing", level: "A2", coreVocab: 22, summary: "I feel, tired, ill, better, doctor." },
  { position: 14, title: "Plans and arranging", domain: "social", level: "A2", coreVocab: 24, summary: "Let us, when, where shall we, free, busy." },
];

export const firstUnit = spine[0];
