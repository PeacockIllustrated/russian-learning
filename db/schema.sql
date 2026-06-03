-- Russian learning app, V1 schema for Supabase Postgres.
-- Everything is owner scoped with RLS using auth.uid().
-- Shared database, so every object this app owns is prefixed russ_.
-- British spelling, sentence case comments, no em-dashes.

-- profiles, one row per user, holds level, streak, and settings
create table russ_profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text default 'Learner',
  level text not null default 'A1',          -- A1, A2, ...
  daily_target_minutes int not null default 10,
  streak_days int not null default 0,
  last_active date,
  show_transliteration boolean not null default true,
  tts_voice text not null default 'female',
  reminder_time time,
  scoring_enabled boolean not null default false,  -- V2 flag, off in V1
  playback_speed numeric not null default 0.8,
  created_at timestamptz not null default now()
);

-- units, the curriculum spine
create table russ_units (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  position int not null,
  title text not null,
  domain text not null,            -- greetings, market, food, directions, ...
  level text not null default 'A1',
  summary text,
  created_at timestamptz not null default now()
);

-- lessons, generated against the spine
create table russ_lessons (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  unit_id uuid not null references russ_units on delete cascade,
  position int not null,
  title text not null,
  scenario text,
  status text not null default 'locked',   -- locked, available, done
  grammar_focus jsonb,                     -- { title, note }
  score int,                               -- last session score
  created_at timestamptz not null default now()
);

-- phrases inside a lesson
create table russ_phrases (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  lesson_id uuid not null references russ_lessons on delete cascade,
  position int not null,
  cyrillic text not null,          -- stress marked where it matters
  transliteration text,
  gloss text not null,             -- English meaning
  grammar_note text,
  target_phonemes text[],          -- sounds this phrase drills
  audio_path text                  -- Storage path to native TTS render
);

-- vocabulary, with optional declension for the word detail screen
create table russ_vocabulary (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  lemma text not null,
  gloss text not null,
  part_of_speech text,
  gender text,                     -- m, f, n, or null
  lesson_id uuid references russ_lessons on delete set null,
  created_at timestamptz not null default now()
);

create table russ_vocab_cases (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  vocab_id uuid not null references russ_vocabulary on delete cascade,
  grammatical_case text not null,  -- nominative, genitive, ...
  form text not null
);

-- spaced repetition cards, FSRS fields
create table russ_srs_cards (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  vocab_id uuid references russ_vocabulary on delete cascade,
  phrase_id uuid references russ_phrases on delete cascade,
  stability numeric not null default 0,
  difficulty numeric not null default 0,
  reps int not null default 0,
  lapses int not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed timestamptz
);

-- recordings of the learner speaking
create table russ_recordings (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  phrase_id uuid not null references russ_phrases on delete cascade,
  audio_path text not null,        -- Storage path
  transcript text,                 -- Azure or Whisper word level result
  word_match boolean,              -- did the right words get said, V1
  recorded_at timestamptz not null default now()
);

-- per phoneme scores, populated in V2
create table russ_scores (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  recording_id uuid not null references russ_recordings on delete cascade,
  overall int,
  per_phoneme jsonb,               -- [{ phoneme, score }]
  created_at timestamptz not null default now()
);

-- listening comprehension attempts
create table russ_comprehension_attempts (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  lesson_id uuid references russ_lessons on delete cascade,
  prompt text not null,
  correct boolean not null,
  attempted_at timestamptz not null default now()
);

-- session summaries, drive the lesson complete screen and the trend
create table russ_sessions (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users on delete cascade,
  lesson_id uuid references russ_lessons on delete cascade,
  score int,
  new_words int default 0,
  avg_sound int,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

-- which Cyrillic letters have been reactivated
create table russ_letter_progress (
  owner uuid not null references auth.users on delete cascade,
  glyph text not null,             -- upper case letter
  reactivated boolean not null default false,
  reviewed_at timestamptz,
  primary key (owner, glyph)
);

-- enable RLS on everything
alter table russ_profiles enable row level security;
alter table russ_units enable row level security;
alter table russ_lessons enable row level security;
alter table russ_phrases enable row level security;
alter table russ_vocabulary enable row level security;
alter table russ_vocab_cases enable row level security;
alter table russ_srs_cards enable row level security;
alter table russ_recordings enable row level security;
alter table russ_scores enable row level security;
alter table russ_comprehension_attempts enable row level security;
alter table russ_sessions enable row level security;
alter table russ_letter_progress enable row level security;

-- owner only policies. profiles keys on id, the rest on owner.
create policy "own profile" on russ_profiles
  for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "own units" on russ_units
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own lessons" on russ_lessons
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own phrases" on russ_phrases
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own vocabulary" on russ_vocabulary
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own vocab_cases" on russ_vocab_cases
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own srs_cards" on russ_srs_cards
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own recordings" on russ_recordings
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own scores" on russ_scores
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own comprehension" on russ_comprehension_attempts
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own sessions" on russ_sessions
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "own letter_progress" on russ_letter_progress
  for all using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);

-- helpful indexes
create index on russ_lessons (owner, unit_id, position);
create index on russ_phrases (owner, lesson_id, position);
create index on russ_srs_cards (owner, due_at);
create index on russ_sessions (owner, completed_at);

-- foreign key indexes, so cascades and joins stay cheap as data grows
create index on russ_units (owner);
create index on russ_lessons (unit_id);
create index on russ_phrases (lesson_id);
create index on russ_vocabulary (owner);
create index on russ_vocabulary (lesson_id);
create index on russ_vocab_cases (owner);
create index on russ_vocab_cases (vocab_id);
create index on russ_srs_cards (vocab_id);
create index on russ_srs_cards (phrase_id);
create index on russ_recordings (owner);
create index on russ_recordings (phrase_id);
create index on russ_scores (owner);
create index on russ_scores (recording_id);
create index on russ_comprehension_attempts (owner);
create index on russ_comprehension_attempts (lesson_id);
create index on russ_sessions (lesson_id);
