# Artificiality Institute design kit

The house style, as code: fonts, colors, type scale, spacing, chart ramps, logos, and the guide that tells a project (and Claude) how to use them. Every Institute project installs this kit rather than carrying its own copy, so a change here reaches every project at the next version bump.

Plain CSS with no build step. Preview: `npm run preview`, then open `http://localhost:4173/preview/`.

## Layers

| File | Layer | Changes when |
|---|---|---|
| `css/foundations.css` | Fonts, warm neutrals (ink, paper), type scale, spacing, radii, shadows, motion, layout, chart furniture | Rarely. These never vary by palette. |
| `css/colors.css` | Named colors: every brand hue as a constant (`--brand-blue`, `--clay`, …) | A new palette brings new hues. Names are added, never changed. |
| `css/palettes/<name>.css` | A palette: fills the fixed set of **slots** (`--primary`, `--accent-warm`, `--series-1…8`, `--seq-1…7`, …) from named colors | A new palette is a new file. `institute` is the default; `summit-2027` is next. |
| `css/semantic.css` | Roles components use (`--fg-1`, `--bg`, `--link`, `--success`), slide moods, base element styles | Rarely. |
| `css/tailwind.css` | Tailwind v4 `@theme inline` block mapping utilities to the variables | When a slot or named color is added. |
| `css/kit.css` | Imports the layers in order | Never. |

The rule that makes palettes swappable: **components and chart recipes name slots or roles, never hexes and never named colors**, unless they mean that exact hue (a logo, a one-off editorial flourish).

## Switching palettes

```html
<html data-palette="summit-2027">          <!-- whole page -->
<section data-palette="institute">…</section>  <!-- one region inside it -->
<div data-mood="ink">…</div>               <!-- full-bleed surface; text roles follow -->
```

Load `palettes/institute.css` (via `kit.css`) always; load any other palette after it. Nothing else changes.

## Installing in a project

```bash
npm install github:Artificiality-Institute/design-kit#v1.0.0
npx design-kit-install static        # copies fonts/ and assets/ into static/
```

In a SvelteKit app, `src/app.css`:

```css
@import 'tailwindcss';
@import '@artificiality/design-kit';
@import '@artificiality/design-kit/tailwind';
/* optional: @import '@artificiality/design-kit/palettes/summit-2027.css'; */
```

Then `bg-paper`, `text-primary`, `font-display`, `fill-series-3`, `rounded-card` and the rest work as utilities, and `var(--primary)` works anywhere, including SVG attributes in chart components.

For a page with no bundler, link the files directly: `css/kit.css` and the palette files, with `fonts/` served at `/fonts/`.

Pin a tag. Bump it deliberately, and read `CHANGELOG.md` when you do.

## Adding a palette

What to ask a designer for is in `docs/palette-brief.md`. Then:

1. Add the new hues to `css/colors.css` by name.
2. Copy `css/palettes/_template.css` to `css/palettes/<name>.css` and fill every slot (the comment at the top says how to derive variants and what contrast to reach).
3. `npm run check` must pass. Open the preview and compare the new palette with `institute` side by side.
4. Note it in `CHANGELOG.md`, tag a new version.

A palette file never edits another one. Work made under one Summit's palette keeps rendering the same after the next Summit's palette exists.

## Licenses

MIT for the CSS, scripts and guide. The fonts are under the SIL Open Font License 1.1, with each family's license text in `fonts/`. The logos are Institute trademarks, included for Institute projects.
