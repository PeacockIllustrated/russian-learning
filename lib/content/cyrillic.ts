import data from "@/seed/cyrillic.json";
import type { CyrillicLetter, LetterGroup } from "@/lib/content/types";

// the refresher reads the static alphabet seed, ordered as the Russian alphabet
export const cyrillicLetters = data.letters as CyrillicLetter[];

export const letterCount = cyrillicLetters.length;

// grouped by familiarity so reactivation leads with quick wins, then the
// Latin lookalikes that trip people up, then the genuinely new shapes
export const letterGroups: {
  key: LetterGroup;
  label: string;
  blurb: string;
}[] = [
  { key: "familiar", label: "Familiar", blurb: "Read these on sight." },
  { key: "false_friend", label: "False friends", blurb: "Look Latin, sound Russian." },
  { key: "new", label: "New to you", blurb: "Fresh shapes to learn." },
];

export function lettersByGroup(group: LetterGroup): CyrillicLetter[] {
  return cyrillicLetters.filter((letter) => letter.group === group);
}
