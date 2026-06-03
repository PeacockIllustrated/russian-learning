// Shared content shapes. The alphabet seed is read only reference data; the
// spine is the fixed curriculum backbone. Per user content lives in Supabase.

export type LetterGroup = "familiar" | "false_friend" | "new";

export interface CyrillicLetter {
  upper: string;
  lower: string;
  sound: string;
  anchor: string; // English sound cue
  group: LetterGroup;
}

export type Level = "A1" | "A2";

export interface SpineUnit {
  position: number;
  title: string;
  domain: string; // greetings, market, directions, ...
  level: Level;
  coreVocab: number; // rough core vocabulary size
  summary: string;
}
