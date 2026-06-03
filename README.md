# Russian learning app, init pack

Everything needed to start V1 in Claude Code. Personal, mobile-first, monochrome comic.

## What is here

- CLAUDE.md, the build prompt. Start here, it points at everything else.
- docs/design-tokens.md, the locked visual system.
- docs/curriculum-spine.md, the fixed A1 to A2 backbone.
- docs/lesson-generation-prompt.md, the runtime Anthropic call and JSON schema.
- db/schema.sql, the Supabase schema with RLS.
- seed/cyrillic.json, the alphabet reference for the refresher.
- seed/unit-01.json, a fully seeded first unit so day one is not empty.
- config/tailwind.tokens.js, the token extension for Tailwind.

## Order of work

1. Read CLAUDE.md.
2. Scaffold Next.js, Tailwind with config/tailwind.tokens.js, a Supabase project and Storage bucket.
3. Run db/schema.sql and generate types.
4. Load seed/cyrillic.json and seed/unit-01.json.
5. Build the UI primitives from the tokens, then the screens in the build order.
6. Wire the lesson endpoint from docs/lesson-generation-prompt.md once unit 1 plays end to end.

## Before generating content at volume

Confirm three things: utterances per lesson, the first domains to favour, and whether a daily target drives the streak. These are noted at the foot of CLAUDE.md.

## Not in V1

Azure per-phoneme scoring and conversation role-play are V2. Named phoneme diagnosis and a native reference corpus are V3. Leave seams, do not build them yet.

## Provisioning checklist

- Anthropic API key, present.
- Supabase project and Storage bucket.
- Azure Speech resource, key and region, used for the V1 word check and later V2 scoring.
- A Russian TTS voice chosen, female default. Worth a second opinion from a native ear.
