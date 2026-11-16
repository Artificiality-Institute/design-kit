# Design kit guide — for Claude, in any Institute project

This project uses the Artificiality Institute design kit so everything we make looks and feels like one family. This file tells you how the kit is organized, how to install it, and how to stay on-brand. The project's own `CLAUDE.md` says what the project is; this file says how it should look.

**About the people you work with:** they are relatively new to coding. Explain what you're doing and why in plain language, prefer one clear way over a menu, keep structures simple, add no library unless something genuinely can't be done well without one, and run the checks yourself after changes (`npm run check`, `npm run build`).

## The stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2 with Svelte 5 (runes: `$state`, `$derived`, `$props`; not `export let` or `$:`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; the theme comes from the kit's `tailwind.css`, there is no `tailwind.config.js` |
| Fonts | All four families self-hosted from the kit |
| Deploy | Vercel |

## Installing the kit in a new SvelteKit project

```bash
npx sv create my-app      # SvelteKit minimal · TypeScript · add-ons: tailwindcss, prettier
cd my-app && npm install
npm install github:Artificiality-Institute/design-kit#v1.1.0
npx design-kit-install static
```

Replace `src/app.css` with:

```css
@import 'tailwindcss';
@import '@artificiality/design-kit';
@import '@artificiality/design-kit/tailwind';
```

and make sure `src/routes/+layout.svelte` imports it:

```svelte
<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-paper text-ink-1000">
	{@render children()}
</div>
```

Check: `npm run dev` shows a warm cream page (`#FAF8F2`), headings in Hedvig Letters Serif, body in Literata.

## How the kit is layered, and the one rule

Foundations (never vary) → named colors (constants) → **palettes** (fill fixed slots) → semantic roles (what components use). The one rule: **name slots or roles, never hexes.** `bg-primary`, `text-fg-2`, `fill-series-2`, `var(--highlight)`. Use a named color (`bg-clay`, `text-brand`) only when you mean that exact hue regardless of palette. Then a page, section or slide can switch its whole color world with `data-palette="summit-2027"`, and a chart built under one palette renders correctly under the next.

Slots a palette provides:

| Group | Slots |
|---|---|
| Lead color | `primary`, `primary-deep`, `primary-soft`, `primary-tint`, `on-primary` |
| Accents | `accent-warm` (+`-deep`, `on-`), `accent-second` (`on-`), `accent-calm` (`on-`), `accent-rare` (`on-`), `accent-fill` |
| Status | `positive`, `caution`, `negative` (roles: `success`, `warning`, `danger`) |
| Chart, categorical | `series-1` … `series-8`, in order; 7 and 8 are for "the rest" |
| Chart, one-vs-many | `highlight`, `highlight-2`, `muted`, `muted-strong` |
| Chart, ramps | `seq-1` … `seq-7` (light to dark), `div-1` … `div-7` (warm, neutral, lead) |

**Charts name chart roles, not slots.** `css/charts.css` maps the slots to what a chart needs: `--chart-emphasis` (the one series the chart is about), `--chart-secondary`, `--chart-context`, `--chart-context-strong`, `--chart-grid`, `--chart-zero`, `--chart-text`, `--chart-text-muted`, the four `--chart-font-*` roles and the line weights. The chart style guide, `docs/charts.md`, says how to use them: read it before drawing or changing any chart. Charts are drawn by the recipes in the Institute's `present` package; do not write a new chart component in a project when a recipe exists, and never give a chart its own colours.

### Palette: institute (default)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAF8F2` | canonical page background (warm cream) |
| `paper-soft` / `paper-warm` | `#F4F1E8` / `#F0EBDC` | subtle fills / warmer washes |
| `ink-1000` / `ink-900` | `#1A1A18` / `#232323` | primary text |
| `ink-700` / `ink-500` / `ink-400` | | secondary / muted / captions |
| `ink-200` | `#D9D6CC` | the default border |
| `brand-blue` → `primary` | `#054364` | links, primary actions, key data |
| `clay` → `accent-warm` | `#C8643C` | highlights, call-outs; `clay-deep` `#A04E2C` for text on paper |
| `ochre` → `accent-second` | `#D9A441` | secondary accent, "medium" states |
| `moss` → `accent-calm` | `#6B7A4F` | success, positive |
| `plum`, `sand` | `#6E3A4E`, `#E8DCC0` | rare flourish, subdued fills |

Never pure black, cold grays, or blue-tinted shadows. Everything warm-leaning.

## Typography: four families, strict roles

| Family | Utility | Role |
|---|---|---|
| Hedvig Letters Serif | `font-display` | headings, big display numbers, chart headlines, card titles. One weight. **Never bold, never italic.** |
| Literata | `font-serif` | body, prose, nav labels. Italic for ledes and quotes. |
| Inter | `font-ui` | dense UI: forms, buttons, small tables |
| JetBrains Mono | `font-mono` | code, data values, micro-labels |

The signature micro-label, uppercase tracked-out mono (also the `.label` class):

```svelte
<div class="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">Companies scored</div>
```

Body is 17px with 1.55 leading. Headings use tight leading and negative tracking (the base `h1–h4` styles handle it).

## Long-form reading

For a site that is mostly reading, `css/longform.css` (part of `kit.css`) gives titles that follow the screen and styles for running text. Put `.lf-title` on a piece's `h1`, `.lf-card-title` on a card's title, and wrap the body of an essay in `.longform`. The base heading styles are one size for every screen; these classes are how a reading page sizes them, so do not write heading sizes in a project.

## The browse bar

For any page that lists a growing collection (charts, pieces, talks), `css/browse.css` (part of `kit.css`) gives one bar that every Institute site uses, so a reader who has learned it on one site knows it on the next. Use it instead of rows of filter chips or tiles: those push the list down the page and grow with every topic.

The rules:

- **A menu per way of narrowing the list** (Topic, Place, Kind, Theme), then a count of what is shown, then a Sort menu at the right. Put the menus in the order a reader would reach for them; leave a menu out when it would hold one choice.
- **Every choice is a link** that changes the address (`?topic=work&place=oregon`). A default (all, or the first order) is left out of the address. So a view can be shared, the back button works, and the bar works with JavaScript off.
- **What is chosen shows in the menu's own button**, which fills in and names it. One Clear link takes every choice off. Do not add a second row of chips.
- **The list starts directly under the bar**, newest first unless the page has a reason for another order.
- **Counts beside the choices** in a menu, so nobody opens an empty view.

```html
<nav class="browse" aria-label="Browse the charts">
	<div class="browse-bar">
		<details class="browse-menu" name="browse" data-chosen>
			<summary><span class="browse-label">Topic</span><span>AI at work</span></summary>
			<div class="browse-panel">
				<ul>
					<li><a href="/chart"><span class="browse-name">All topics</span></a></li>
					<li><a href="/chart?topic=work" aria-current="true"><span class="browse-name">AI at work</span><span class="browse-n">11</span></a></li>
				</ul>
			</div>
		</details>
		<a class="browse-clear" href="/chart">Clear</a>
		<span class="browse-count">11 charts</span>
		<details class="browse-menu browse-sort" name="browse">
			<summary><span class="browse-label">Sort</span><span>Newest</span></summary>
			<div class="browse-panel"><ul><li><a href="/chart?topic=work" aria-current="true"><span class="browse-name">Newest</span></a></li></ul></div>
		</details>
	</div>
</nav>
```

`data-chosen` goes on a menu that has a choice made. Menus that share a `name` close one another. A choice set apart at the foot of a menu (a working view such as "not yet filed") goes in an `li.browse-quiet` after an `li.browse-rule`. The project adds a few lines of script to close an open menu on a click elsewhere or on Escape; each site has a small `BrowseBar` component that does this and builds the links.

## Component idioms

**Stat card**: bordered card on paper, mono label, big Hedvig value.

```svelte
<div class="rounded-card border border-border bg-bg px-[18px] pb-[18px] pt-4">
	<div class="label mb-2">Label</div>
	<div class="font-display text-[32px] leading-none tracking-[-0.015em] text-fg-1">42</div>
	<div class="mt-2 font-mono text-[11px] tracking-[0.02em] text-fg-3">supporting note</div>
</div>
```

**Panel**: card with a header bar (`border-b border-border px-[18px] py-3.5`, title `font-display text-[16px]`, meta `font-mono text-[11px] text-fg-3` pushed right).

**Table**: mono uppercase headers on `bg-paper-soft`, hairline row borders.

**Pill badge**: one slot drives text, border and background through `color-mix`:

```svelte
<span class="inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]"
	style="color: var(--positive); border-color: color-mix(in oklab, var(--positive) 30%, transparent); background: color-mix(in oklab, var(--positive) 10%, transparent)">Active</span>
```

**Slide mood**: a full-bleed surface for a social frame or deck slide. `data-mood="paper" | "ink" | "primary" | "warm"` on the slide; text roles follow.

## Layout rules

- Page container `mx-auto max-w-[76rem] px-8` (18px side padding on mobile). Prose measures 36rem / 44rem / 62rem.
- Cards `rounded-card` with `border-border`; shadows only when something floats, always the warm `--shadow-*` tokens.
- Motion fast and quiet: 120–200ms with `--ease-out`. No bouncing.

## Project-specific semantics

If a project has its own concepts that need consistent colors (statuses, categories, planes), map concept → slot in a small `src/lib/theme.css`, never hexes in components:

```css
:root {
	--plane-do: var(--primary);
	--plane-say: var(--accent-second);
	--band-high: var(--positive);
}
```

## Working conventions

Components in `src/lib/`, pages in `src/routes/`, shared types in `src/lib/types.ts`. Static-first: prerender and bake data in until the project truly needs a server. Deploy on Vercel with no extra config.
