# Changelog

## 1.1.0 — 2026-11-11

The chart look moves into the kit, so every project draws charts in one grammar.

- **Chart roles**, `css/charts.css` (loaded by `kit.css`): `--chart-emphasis`, `--chart-secondary`, `--chart-context` and the rest, pointing at palette slots, with the chart fonts, line weights and the headline and subtitle sizes per frame. Moved here from the Oregon AI Index, unchanged in value. They are declared wherever a palette or a mood is set, so a chart inside a `data-palette` region or on a dark slide follows it. Tailwind utilities for the colour roles (`fill-chart-emphasis`, `stroke-chart-grid`, …).
- **Chart style guide**, `docs/charts.md`: the grammar every chart follows, which form suits which message, the frames. Adapted from the Index's guide; what is particular to the Index stays there.
- The chart components themselves are not in the kit. They are the recipes in the Institute's `present` package, which names these roles.
- **Fixed: the display face dropped a letter.** Hedvig's "ff" ligature glyph is corrupt in the published files: "different" was set as "di f erent" and "staff" as "sta f" wherever ligatures were on. Headings with letter-spacing escaped it; other text in Hedvig did not. The kit's two Hedvig files now have that one ligature rule removed, so "ff" is two ordinary letters (`fonts/MODIFICATIONS.md`). Run `npx design-kit-install static` after bumping the kit to copy the corrected fonts. Projects that patched this in CSS can remove the patch.
- Changed: `--chart-grid` is now the border hairline (`var(--border)`), as the Index has drawn it; it was a softer mix. The chart furniture tokens (`--chart-grid`, `--chart-axis`, `--chart-label`, `--chart-annotation`) moved from `foundations.css` to `charts.css`; a project that imports the layers one by one adds `charts.css`.

## 1.0.0 — 2026-11-04

First release as a repository of its own, seeded from the kit copy in `oregon-ai-index/style/` (the Summit design-system zip).

- Split into layers: `foundations.css` (fonts, neutrals, type, spacing, radii, shadows, motion, layout, chart furniture), `colors.css` (named constants), `palettes/` (slots), `semantic.css` (roles, moods, base element styles), `tailwind.css` (`@theme inline`, no repeated hexes).
- All four font families self-hosted; the Google Fonts import is gone.
- Palette slots introduced: primary and variants, accents with their `on-` colors, status, an eight-step categorical series ramp, highlight/muted, sequential and diverging ramps (OKLab-interpolated). `institute` is the default; `_template.css` and `npm run check` keep palettes interchangeable.
- Slide moods (`data-mood`: paper, ink, primary, warm) for social frames and decks.
- Base element styles reference slots, so links and blockquotes follow the palette.
- `bin/install-assets.mjs` copies fonts and logos into a project's static folder; `preview/` is the living reference.

Next palette: `summit-2027`, once design delivers it (`docs/palette-brief.md`). The Summit 2026 palette is not being added; it is in the past.
