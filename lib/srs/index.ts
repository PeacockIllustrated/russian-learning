import {
  fsrs,
  generatorParameters,
  createEmptyCard,
  Rating,
  State,
  type Card,
  type Grade,
} from "ts-fsrs";

// Long-term scheduler: no separate learning steps, so a card's whole state
// reconstructs from the columns russ_srs_cards stores. Fuzz spreads due dates
// so reviews do not pile on one day.
const scheduler = fsrs(generatorParameters({ enable_short_term: false, enable_fuzz: true }));

export type ReviewGrade = "again" | "hard" | "good" | "easy";

const GRADE: Record<ReviewGrade, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

// the subset of russ_srs_cards the scheduler reads and writes
export interface SrsState {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  due_at: string; // ISO timestamp
  last_reviewed: string | null;
}

export function newCard(now: Date = new Date()): SrsState {
  const card = createEmptyCard(now);
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    due_at: card.due.toISOString(),
    last_reviewed: null,
  };
}

function toCard(state: SrsState): Card {
  return {
    due: new Date(state.due_at),
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: 0,
    scheduled_days: 0,
    learning_steps: 0,
    reps: state.reps,
    lapses: state.lapses,
    state: state.last_reviewed ? State.Review : State.New,
    last_review: state.last_reviewed ? new Date(state.last_reviewed) : undefined,
  };
}

export function review(state: SrsState, grade: ReviewGrade, now: Date = new Date()): SrsState {
  const { card } = scheduler.next(toCard(state), now, GRADE[grade]);
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    reps: card.reps,
    lapses: card.lapses,
    due_at: card.due.toISOString(),
    last_reviewed: now.toISOString(),
  };
}
