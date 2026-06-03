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

// shapes of the seeded lesson content in seed/unit-01.json
export interface SeedNewVocab {
  lemma: string;
  gloss: string;
  part_of_speech: string;
  gender: string | null;
}

export interface SeedPhrase {
  cyrillic: string;
  transliteration: string;
  gloss: string;
  grammar_note: string | null;
  target_phonemes: string[];
  new_vocabulary: SeedNewVocab[];
}

export interface SeedComprehension {
  audio_phrase: string;
  prompt: string;
  options: string[];
  answer_index: number;
}

export interface SeedLesson {
  position: number;
  title: string;
  scenario: string;
  level: string;
  grammar_focus: { title: string; note: string };
  phrases: SeedPhrase[];
  comprehension: SeedComprehension[];
}
