# Changelog

## 1.0.0 — 2026-11-04

First release as a repository of its own, seeded from the kit copy in `oregon-ai-index/style/` (the Summit design-system zip).

- Split into layers: `foundations.css` (fonts, neutrals, type, spacing, radii, shadows, motion, layout, chart furniture), `colors.css` (named constants), `palettes/` (slots), `semantic.css` (roles, moods, base element styles), `tailwind.css` (`@theme inline`, no repeated hexes).
- All four font families self-hosted; the Google Fonts import is gone.
- Palette slots introduced: primary and variants, accents with their `on-` colors, status, an eight-step categorical series ramp, highlight/muted, sequential and diverging ramps (OKLab-interpolated). `institute` is the default; `_template.css` and `npm run check` keep palettes interchangeable.
- Slide moods (`data-mood`: paper, ink, primary, warm) for social frames and decks.
- Base element styles reference slots, so links and blockquotes follow the palette.
- `bin/install-assets.mjs` copies fonts and logos into a project's static folder; `preview/` is the living reference.

Next palette: `summit-2027`, once design delivers it (`docs/palette-brief.md`). The Summit 2026 palette is not being added; it is in the past.
