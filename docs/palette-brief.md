# Brief: what the kit needs for a new palette (Summit 2027)

For Stephanie, from Dave and Helen. The Institute's design kit is a small, public repository of CSS, fonts and logos that every Institute website, chart and social post draws on. Type, spacing and the warm neutrals (cream paper, warm ink) are fixed. What changes from one Summit to the next is the **palette**: the set of hues, and which job each hue does. This note says exactly what we need from you so the Summit 2027 palette drops into the kit without interpretation on our side.

The live reference is the preview page (`preview/index.html`, or the hosted copy if Pages is enabled): it shows the current Institute palette filling every slot, the chart ramps, two example charts and the four slide moods. The new palette will appear beside it in the picker.

## 1. The hues

A list of the colors in the Summit 2027 palette, each with:

- a **name** of one or two words (we keep your names; they become `--<name>` in the kit and never change afterwards),
- the **hex** value in sRGB,
- one line on **what it's for** in your mind.

Six to ten hues is typical. Fewer is fine. The Institute neutrals (paper `#FAF8F2`, inks from `#1A1A18` to `#ECE9DF`) stay as they are, so you don't need to supply grays or creams; if you want the Summit to sit on a different paper tone, say so and we'll talk, because that is a bigger change than a palette.

## 2. Which hue does which job

The kit's components never name a color; they name a **slot**. A palette is the assignment of hues to slots. Please assign:

| Slot | What it does | Need from you |
|---|---|---|
| **primary** | The lead color: links, buttons, key data, full-bleed slides | one hue, plus a deeper (hover/pressed) and a softer (tints, links on cream) variant, and a faint tint for washes. If you only give the main hue, we derive the three variants and send them back for a yes/no. |
| **accent-warm** | Highlights and call-outs; the second full-bleed slide color | one hue, plus a deeper variant that reads as body text on cream |
| **accent-second** | Secondary accent, "medium" states | one hue |
| **accent-calm** | Positive, success, tags | one hue |
| **accent-rare** | Rare editorial flourish | one hue |
| **accent-fill** | Subdued fills behind content | one hue, light |
| **positive / caution / negative** | Status colors | usually calm / second / warm-deep; say if different |

For every hue that will carry text on top of it (primary, accent-warm, and any you want usable as a slide background), tell us the **text color** you want on it: cream or ink, normally. We check contrast; 4.5:1 for body text, 3:1 where only large display text sits on it.

## 3. Colors for data

Charts use the palette through three more groups:

- **Series order**: the hues in the order they should be used when a chart has 2, 3, 4… categories. Up to eight; the last one or two may be neutral grays for "everything else". Adjacent colors should be distinguishable, and the first two should work together as a pair.
- **Highlight against the rest**: which hue marks "Oregon" (or the featured item) when everything else is gray. Usually the primary; a second highlight hue for a two-way comparison.
- **Ramps**: a light-to-dark sequential ramp and a warm-to-cool diverging ramp, 7 steps each. Give us the two endpoints of each (and the midpoint for diverging) and we interpolate in OKLab and show you the result; or give all steps if you prefer.

## 4. Rules of use, in a few lines

Anything you want respected everywhere: pairings to avoid, which hues may fill a whole slide, whether the Summit mark ever sits on a hue other than paper, anything that must stay Institute blue even inside Summit material.

## 5. Format

A short document or a Figma page with named color styles is enough. We'll turn it into a palette file, run the kit's check (every slot filled, nothing extra), render the preview and the two example charts under it, and send you screenshots to approve. After approval it is tagged as a kit release and every project picks it up by bumping one version number.

What you don't need to do: anything with type (the four families are fixed), logos, spacing, or the Summit 2026 palette (it stays in the Summit materials and is not being added to the kit).
