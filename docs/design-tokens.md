# Design tokens

The single source for the visual system. Lifted from the approved mockups. Monochrome ink on cream, one vermilion accent rationed to earned and live moments.

## Colour

| Token | Hex | Use |
|---|---|---|
| ink | #16140f | text, borders, fills, shadows |
| paper | #f3ede0 | primary surface |
| paper2 | #e7dfcd | app background, recessed panels |
| paper3 | #dcd2bb | locked or empty states, shadow tint |
| grey | #8c867a | secondary text, captions |
| pop | #ed4a2b | accent, interaction reward only |

### Accent rule

`pop` is the only colour in the product. It appears only on:
- a correct answer (stamp, action lines, tick)
- a score or result number as it lands, not while counting
- a streak gain (flame, plus one)
- live recording (pulsing rings)
- a lesson node completing (ring pulse)

It never appears on static UI, navigation, buttons at rest, or wrong-answer feedback. Wrong answers stay ink, dashed. Scarcity is the point.

## Type

- Display: Unbounded, weights 700 to 900. Headlines, Cyrillic phrases, big numbers.
- Body and UI: Golos Text, weights 400 to 700.
- Both fonts carry full Cyrillic. Do not substitute fonts that drop Cyrillic glyphs.

## Surfaces and depth

- Border: 3px solid ink on primary surfaces, 2px on secondary, dashed for placeholders and wrong states.
- Radius: 13px to 20px on cards and buttons, full pill on tags and toggles, 50% on nodes and avatars.
- Hard offset shadow, no blur:
  - shadow: 5px 5px 0 ink
  - shadow-sm: 3px 3px 0 ink
- Halftone texture: `radial-gradient(ink 0.6px, transparent 0.7px)`, size 7px on the background, 9px to 11px inside panels.

## Motion

Short and gentle, confident not busy. Catalogue from the animation gallery:

- Button press: translate 3 to 4px, shadow collapses to 0.
- Correct: stamp scales in with a slight overshoot, action lines radiate, in pop.
- Wrong: a quick horizontal shake, border turns dashed, no colour.
- Score and result: count up in ink, land in pop.
- Streak: counter bumps, flame flicks, plus one floats up in pop.
- Recording: two pop rings pulse outward, waveform bars dance.
- Reveal: speech bubbles and cards pop in with overshoot and a tail.
- Flashcard: rotateY flip for review.
- Node complete: fills with ink, tick stamps, a pop ring pulses out.
- Screen entry: rows cascade with staggered delay.

## Tailwind

config/tailwind.tokens.js extends the theme with these values. Import it into the project Tailwind config.
