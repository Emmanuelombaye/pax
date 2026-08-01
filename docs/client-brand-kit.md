# Pax Longevity — Client Brand Kit (source of truth)

**Client handoff (live):** [https://pax-longevity-flow.lovable.app/](https://pax-longevity-flow.lovable.app/)

| Field | Value |
| --- | --- |
| Title | Pax Longevity — Brand & Logo Handoff |
| Package | Developer Handoff · Complete Package v1.0 |
| Saved | 2026-07-27 |
| Local mirrors | [`docs/brand-kit.md`](./brand-kit.md), [`src/brand/kit.css`](../src/brand/kit.css), [`src/brand/passport.js`](../src/brand/passport.js), [`public/brand/`](../public/brand/) |

Use this Lovable handoff as the **client-provided brand documentation**. If anything in the PDF extract, older kit notes, or code conflicts with this page, **prefer the Lovable handoff**.

---

## Tagline & voice

- **Tagline:** Live longer. Feel younger. *Age intentionally.*
- **Tone:** Calm. Confident. Never salesy.
- Prefer intentional language over “optimize your health today.”

## Logos (four marks)

1. **Horizontal** — primary / default  
2. **Stacked** — square real estate  
3. **Circular seal** — supplements & wax  
4. **P monogram** — tight spaces, favicon, loading

Approved colorways only: Forest on Sand (default), Sand on Forest, Forest, Terracotta, Indigo, White.

## Icons

- Sunrise  
- Leaf  
- P monogram  

Do not invent new lockups or recombine marks.

## Color system (five colors — nothing else)

| Token | Role | HEX | OKLCH |
| --- | --- | --- | --- |
| Sand | Background · default canvas | `#FAF6F0` | `0.972 0.018 78` |
| Forest | Primary · buttons, banners | `#2D5A3D` | `0.405 0.063 152` |
| Terracotta | Accent · links, focus | `#C17C74` | `0.642 0.108 30` |
| Dune | Warm neutral · soft cards | `#E8C5A0` | `0.851 0.068 65` |
| Indigo | Text · grounding contrast | `#3B5266` | `0.40 0.04 245` |

Web source of truth: **OKLCH**. HEX for print / packaging / Illustrator.

## Typography

- **One typeface only:** Instrument Serif  
- Weights: **400 + italic only** (no bold in the system)  
- Hierarchy via size, italic, tracking, and color — not weight  
- Body ~17–18px / 1.55 line-height  
- Uppercase micro-labels: same serif ~11px with generous tracking  
- **Never use a sans-serif**

Emphasis: italic first; Terracotta for numerals/links; Forest for display/CTAs.

## Logo rules

Clear space = cap-height of PAX. Horizontal min width **120px** on screen.  
Don’t stretch, rotate, recolor outside approved table, add shadows/gradients, or outline.

## Local assets extracted from handoff

| File | Use |
| --- | --- |
| `public/brand/pax-horizontal.svg` | Primary lockup |
| `public/brand/pax-stacked.svg` | Stacked / square |
| `public/brand/pax-seal.svg` | Circular seal |
| `public/brand/pax-monogram.svg` | Monogram |
| `public/brand/pax-sun.svg` | Sunrise icon |
| `public/brand/pax-leaf.svg` | Leaf icon |
| `public/favicon.svg` | Favicon (monogram) |

## Code architecture

```
src/brand/
  kit.css        ← CSS tokens + utilities
  passport.js    ← product identity + BRAND_KIT
  marks.js       ← SVG mark/icon path map
  BrandLogo.jsx  ← marketing lockup
  BrandMark.jsx  ← portal / start lockup
  BrandIcon.jsx  ← sun | leaf | monogram
  index.js       ← public barrel
  connect.js     ← data adapter (not visual brand)
```
