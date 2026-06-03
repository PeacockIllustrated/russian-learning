# CLAUDE.md, Russian learning app (V1)

A personal, mobile-first app for learning conversational Russian. This is a personal journey, not a product. Build the V1 spine first and make it usable within the first week. If a step does not move toward speaking and understanding, defer it.

## Goal

Get the learner conversational in Russian, able to hold everyday exchanges and understand replies at natural speed. The learner has basic familiarity with Russian sounds and once read Cyrillic but has lost it, so it needs reactivating, not teaching from zero.

## Stack

- Next.js 15 App Router, TypeScript.
- Tailwind CSS, tokens preloaded from config/tailwind.tokens.js.
- Supabase: Postgres, Auth, Row Level Security. Schema in db/schema.sql is the source of truth.
- Supabase Storage for audio. Recordings and reference audio live in Storage, never in git.
- Vercel for hosting.
- Recharts for the dashboard.
- Anthropic API for lesson generation. Runtime prompt and JSON schema in docs/lesson-generation-prompt.md.
- Azure Speech for the V1 word-level check (speech to text). Use the same Azure resource that V2 will use for pronunciation assessment, to avoid a second vendor. Whisper is an acceptable alternative if preferred.
- Cloud TTS for native audio to shadow. Pick a strong Russian voice; female is the default in settings.

## Scope, V1 only

In scope:
- Cyrillic refresher track, fast reactivation, seeded from seed/cyrillic.json.
- Journey home on a fixed curriculum spine, see docs/curriculum-spine.md.
- Claude-generated lessons: Cyrillic, fading transliteration, English gloss, generous explicit grammar notes.
- TTS native audio with listen and shadow, record yourself, play back.
- Azure word-level check, did the right words get said.
- Listening comprehension thread.
- Spaced repetition using FSRS.
- Basic progress dashboard.

Out of scope now, but do not architect them out, leave clean seams:
- V2: Azure per-phoneme pronunciation scoring, conversation role-play.
- V3: named phoneme diagnosis and a reference corpus recorded by a native speaker.

## Design system

Read docs/design-tokens.md. The look is monochrome ink on cream paper, graphic-novel comic: ben-day halftone, 3px ink outlines, hard offset shadows, inversion in place of colour.

A single vermilion accent (--pop, #ed4a2b) is the only colour in the app. It fires only on earned and live interaction moments: a correct answer, a score landing, a streak gain, live recording, a lesson completing, a result reveal. It never appears on static UI, navigation, or wrong-answer feedback. Wrong answers stay austere ink, which makes success feel brighter. Keep the accent scarce.

Fonts: Unbounded for display, Golos Text for body. Both carry full Cyrillic.

## Data

db/schema.sql is authoritative. Everything is scoped to the owner with RLS using auth.uid(). The static alphabet reference is read-only seed data. Generated lesson content is per-user.

## Lesson engine

docs/lesson-generation-prompt.md defines the Anthropic call: the system prompt, the inputs (level, current unit and domain, target vocabulary from the spine, recent weak phonemes, recently missed words, utterance count), and the strict JSON schema a lesson must return. The model returns JSON only, no preamble. Seed content in seed/unit-01.json shows the exact shape.

## Style rules

Apply to all code, comments, commit messages, and user-facing copy:
- No em-dashes. Use commas, semicolons, or full stops.
- No emojis.
- No exclamation marks in user-facing copy.
- Sentence case throughout.
- British spelling.
- No filler or patronising softening. Direct.

## Suggested file structure

```
app/                 routes, App Router
  (learn)/journey    home, the spine
  (learn)/lesson     lesson player, exercises
  (learn)/review     spaced repetition
  (learn)/alphabet   Cyrillic refresher
  (learn)/stats      dashboard
  api/generate       Anthropic lesson generation
  api/score          Azure word check (V1), pron assessment seam (V2)
components/          UI primitives carrying the tokens
lib/
  supabase/          client, server, types
  srs/               FSRS scheduling
  audio/             record, playback, TTS
  speech/            Azure integration
db/                  schema and migrations
content/             curriculum spine, seeded units, alphabet
```

## Build order

1. Scaffold Next.js, Tailwind with the tokens, Supabase project, Storage bucket, env vars.
2. Run db/schema.sql. Generate types.
3. Build the UI primitives from the tokens, prove the comic system once.
4. Cyrillic refresher from the seed.
5. Wire TTS and browser recording with playback.
6. Lesson player with the seeded unit 1, then the generation endpoint.
7. Listening comprehension and the FSRS review queue.
8. Dashboard. Then use it daily before adding V2.

## Open decisions to confirm before generating content at volume

- Utterances per lesson, five light or ten immersive.
- First conversational domains, given the learner is motivated by talking with family.
- Whether a daily target drives the streak, and its length.
