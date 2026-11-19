# Changelog

## 1.3.0 — 2026-11-19

Two changes from the Journal's layout review, both chosen by looking at real pages side by side.

- **The small label is one size up: 11px, from 10px.** `.label`, the browse bar's menu labels (`.browse-label`) and table headers inside `.longform`. The colour is unchanged. 10px was hard to read on a phone. A project that wrote the label out by hand (`font-mono text-[10px] uppercase ...`) does not change until it uses `.label`; use the class, so the next change reaches everything.
- **A reading measure**: `--measure-reading` (38rem) and `.lf-measure`, the column a piece is read in. At the long-form size it gives about 66 characters a line; the 44rem column the Journal used gave about 74.
- Written down, not changed: on a page 1rem is 17px, because the kit sets the base size on `<html>`. The px in the type scale's comments are sizes at a 16px rem, so everything renders 6.25% larger than they say. The comparison kept the sizes as they render; `foundations.css` now says so.

## 1.2.0 — 2026-11-14

A long-form layer, for sites that are mostly reading.

- **`css/longform.css`** (loaded by `kit.css`): title and card sizes that follow the screen (`.lf-title`, `.lf-page-title`, `.lf-section-title`, `.lf-card-title`, `.lf-card-title-lg`), small text (`.lf-lede`, `.lf-summary`, `.lf-meta`, `.lf-flush`), quiet links and a button (`a.lf-quiet`, `a.lf-button`), and `.longform` for running text: lists, tables, and headings inside an essay at reading sizes. Moved here from the Journal, where it was written against real pieces at phone and wide-screen widths. Every value is a token or role already in the kit.
- **`css/browse.css`** (loaded by `kit.css`): the browse bar, for any page that lists a growing collection. One row of menus that narrow and order the list (`.browse`, `.browse-bar`, `.browse-menu`, `.browse-panel`), each menu's button showing what is chosen, with a clear link (`.browse-clear`) and a count (`.browse-count`). Written for the Commons's page of charts and adopted by the Journal's indexes, so both sites are browsed the same way. `CLAUDE.md` has the markup and the rules.
- Nothing existing changes. The base `h1` to `h4`, `p` and `a` styles are as they were; the new classes are opt-in.

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
