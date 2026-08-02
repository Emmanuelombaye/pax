# Pax Longevity — Brand Kit

**Client source of truth:** [https://pax-longevity-flow.lovable.app/](https://pax-longevity-flow.lovable.app/)  
Full notes: [`docs/client-brand-kit.md`](./client-brand-kit.md)  
Code tokens: `src/brand/kit.css` · `src/brand/passport.js`  
Marks: `public/brand/*.svg`

Web source of truth: **OKLCH** (HEX for print / logo work)

## Color palette

| Token | Role | HEX | OKLCH |
| --- | --- | --- | --- |
| Sand | Background / default canvas | `#FAF6F0` | `oklch(0.972 0.018 78)` |
| Forest | Primary — buttons, banners (P+RX dark green) | `#1C3F34` | `oklch(0.32 0.065 160)` |
| Terracotta | Accent — links, focus, numerals only | `#C17C74` | `oklch(0.642 0.108 30)` |
| Dune | Warm neutral / thin soft tints | `#E8C5A0` | `oklch(0.851 0.068 65)` |
| Indigo | Kit table / rare print only — not web ink | `#3B5266` | `oklch(0.40 0.04 245)` |

**Interim note:** Forest uses Dark Green P+RX (`#1C3F34`) instead of the older handoff green (`#2D5A3D`). Indigo is no longer used for body text or large web surfaces.

## Typography

- **Instrument Serif only** — display, body, UI labels, captions.
- Weights: **400 + italic only**. No bold in this system.
- Hierarchy from size, italic, tracking, and color.
- Body ~17–18px, line-height ~1.55.
- Never introduce a second font (no Work Sans / Inter / system UI sans).

## Recommended usage

- **Canvas:** Sand. Soft blocks: thin Dune mixes on Sand — not brown panels.
- **Headings / body:** Instrument Serif, Forest (or soft forest mixes). Sand on Forest banners.
- **Buttons:** Forest background, Sand text. Hover: Forest at ~90% opacity.
- **Accents:** Terracotta for links, focus, numerals — never large areas.
- **Overlays on photography:** Forest-tinted scrims — never navy / indigo / black washes.
- **Logo:** Horizontal Forest-on-Sand default (`public/brand/pax-horizontal.svg`). Sand-on-Forest for dark grounds. Compact stacked for drawers. Compare at `#/brand-compare`.
- **Tagline:** Live longer. Feel younger. *Age intentionally.*

Pax Longevity — pax-longevity.com
