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
npm install github:Artificiality-Institute/design-kit#v1.0.0
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

Chart furniture (`--chart-grid`, `--chart-axis`, `--chart-label`, `--chart-annotation`) is neutral and lives in foundations.

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
