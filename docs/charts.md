# Chart style

Institute charts follow two teachers. Tufte: the ink serves the data, nothing decorates, small
multiples and direct labels beat legends, and a chart may be small. The Economist: one message per
chart, the headline states it, the chart's form is chosen for that message, and emphasis is spent
sparingly so the eye lands on the one thing that matters. Consistency from chart to chart is itself
a design decision; a reader should recognise an Institute chart before reading a word.

The chart roles are in `css/charts.css`; this page says how to use them. The recipes that draw
charts to this grammar are in the Institute's `present` package. A project adds its own rules on
top (what its subject is, how its source line reads); it does not change these.

Throughout, **the subject** is the thing a publication is about and marks on every chart. In the
Oregon AI Index the subject is Oregon.

## Two registers, one grammar

A chart appears in one of two registers, and the register is chosen by the message and the
data, not by habit.

**Editorial** (the Economist): one message, one frame, nothing to operate. The headline makes a
claim, the form is chosen for that claim, emphasis is spent on one thing, and the reader is done in
ten seconds. This is the register of reports, decks, social posts and every share frame. It is the
default when there is something to say.

**Explorer** (Our World in Data): a question, not a claim. The reader chooses the places, the
period, the series and the scale, compares what they want, reads the data table and takes the CSV,
and sees exactly where every number came from. This is the register of chart pages and dashboards.
It is the right register when the data are richer than one claim: many places, long series,
several publishers of the same measure.

Both registers share the grammar below. What differs is the defaults:

| | editorial | explorer |
|---|---|---|
| headline | the claim, written by hand | the measure, with a headline template filled from the current selection |
| series shown | only what the claim needs | everything the data holds, with the subject and a sensible default set selected |
| emphasis | fixed by the author | follows the reader's selection; the subject keeps its colour |
| colour budget | one emphasis, one secondary | up to six selected entities on a fixed palette, the rest context gray |
| controls | none | entity picker, period range, linear or log, relative or absolute, chart or table |
| annotations | written sentences on the chart | hover and tap details; written notes beneath |
| data and sources | source line | source line, plus the data table, the CSV and where each number came from |
| small multiples | chosen by the author | a "faceted" view the reader can switch on |

An editorial frame is one saved explorer state with a hand-written headline.

## The grammar of every chart

1. **Headline is the claim**, in Hedvig Letters Serif, sentence case, no full stop, one line where
   possible. It says what the chart shows, not what the chart is: "Oregon adopts AI faster than it
   builds it", not "AI adoption by state". Never bold or italic.
2. **Subtitle is the measure**: what is counted, the unit, the population, the period. Literata,
   `--chart-text-muted`. The subtitle carries the caveat the headline earns.
3. **One emphasis.** The series the claim is about is `--chart-emphasis`. Everything that exists
   for comparison is `--chart-context` and labelled directly. A second accent
   (`--chart-secondary`) is allowed only when the claim is about two things. Three colours is the
   ceiling on a single chart; beyond that, small multiples.
4. **Direct labels, no legends.** A series is named at its line end or beside its bar. A legend is
   a last resort for small multiples where the panel titles already carry the names.
5. **Horizontal gridlines only**, hairline (`--chart-grid`), no axis lines, no tick marks, no
   chart border, no background fill. The y axis has three to five labelled gridlines; the zero
   line is drawn when zero is on the chart. Bars start at zero; lines may not.
6. **Numbers in JetBrains Mono**, axis and micro-labels in Inter, never smaller than 10 px on
   screen or 7 pt in print. Value labels are shown where the reader will want the number (bar
   ends, the latest point, the emphasised series), not on every point.
7. **The subject is always marked** when it is on the chart: emphasis colour, name in full, and
   its rank where the chart is a ranking ("24th of 51").
8. **Source line** at the foot, Inter, `--chart-text-muted`: publisher, dataset, vintage, then the
   publication's name and the chart's id. Share frames add the licence and the URL.
9. **Annotations are sentences** placed on the chart near what they explain, with a thin leader
   only when distance demands it. Prefer one good annotation to three callouts.
10. **No chartjunk**: no 3-D, no drop shadows, no gradients, no icons in place of bars, no
    rounded bar ends, no dual y axes (use two panels), no pie charts, no truncated bar axes.

## Choosing the form

**Time first.** The default form of any measure is its change over time, historical and projected
where a projection exists. A ranking or a single reading is the form only when the source has one
vintage, and then the subtitle says so ("one reading, August 2026"). A series that is short only
because the earlier years have not been gathered is a data job, not a reason to draw a bar.

The form serves the message, and the message is one of a few kinds:

| message | form | recipe |
|---|---|---|
| the subject's place among its peers | ranked bar, the subject emphasised, the median marked as a hairline | `RankedBar` |
| how the subject has moved | line, the subject emphasised, comparators in context gray, labelled at the right end | `Line` |
| the same measure across many places or series | small multiples on a common scale, one panel per unit, the subject's panel first | `SmallMultiples` |
| a place in a ranking over a few readings | a rank strip: position, not gap | `RankStrip` |
| two publishers disagree | the series side by side on one scale, each named, the disagreement in the headline | `Line` |
| a share of a whole | stacked bar, at most four parts, ordered by the story | `StackedBar` |
| a before and after | slope chart | `Slope` |
| shares of use shifting over time | waves: one dot per wave on a time axis, the subject's emphasised | `Waves` |
| one magnitude, or two set against each other | a big number, or a pair of numbers, not a chart (see below) | `BigNumber` |

**When a number is the chart.** If the message is a single magnitude ("23% of firms use AI"), or
two magnitudes whose contrast is the point ("23% here against 31% next door"), a chart spends ink
to say what the number already says. Use the big-number form: the claim as headline; one or two
numbers in Hedvig at display size, each with its measure beneath in Literata (what is counted, the
period, the population) and its source on the source line; nothing else. Two numbers sit side by
side at the same type size, the one the claim is about in the emphasis colour. A big number is
sourced like any chart: it is a value from the data, not a figure typed into a slide. The ceiling
is three numbers; beyond that, a table with in-cell bars.

Ratios, indexes and shares are stated in the subtitle with their base. Per-capita measures say
which population.

## Size and frames

Charts are drawn for the frame they will be seen in and never scaled as images:

| frame | size | use |
|---|---|---|
| page | fluid, 640 to 880 px wide | reports and chart pages |
| social | 1200 × 675 (16:9) | general sharing; attribution strip at the foot |
| card | 1200 × 627 (1.91:1) | the link card shown when a chart's URL is shared |
| portrait | 1080 × 1350 (4:5) | Instagram and LinkedIn feed posts |
| square | 1080 × 1080 (1:1) | square feeds |
| slide | 1920 × 1080 | decks, headline larger, source line smaller |
| print | 170 mm wide | PDF, A4 and Letter |

Type scales with the frame (`--chart-headline` and `--chart-subtitle` are set per frame by the
`.chart-frame-*` classes; the recipes scale their labels with the frame); line weights do not
change.

## Colour

Charts name roles. The values below are the roles under the default `institute` palette; another
palette fills the same roles with its own hues.

| role | institute | what it is for |
|---|---|---|
| `--chart-emphasis` | clay | the series the claim is about; the subject |
| `--chart-secondary` | brand blue | a second subject, when the claim has two |
| `--chart-context` | ink-300 | comparators, the field |
| `--chart-context-strong` | ink-400 | a named comparator the reader must find (a national figure, a peer) |
| `--chart-grid` | ink-200 | gridlines, the median marker |
| `--chart-text` | ink-1000 | headline, direct labels of emphasised series |
| `--chart-text-muted` | ink-500 | subtitle, axis labels, source line |
| `--chart-positive` / `--chart-negative` | moss / clay-deep | only where sign is the message |

Sequential and diverging scales come from the palette's `seq-*` and `div-*` ramps; use them when a
map or a heatmap earns one. Never use pure black or cold grays.

## Hover

Every recipe answers the pointer the same way: the hovered entity is brought forward (stronger
stroke, its label in text colour) and a readout appears beside the pointer in the house type, paper
on a hairline border: the period as its title, then each entity's value in mono, the emphasised and
hovered ones bold. Time recipes add a dashed hairline at the hovered period with a hollow dot on
every series. Bars give the row's value, rank and the median; a stacked bar gives every part; a
slope gives both values and the change. Nothing of this appears in a static frame.

## Explore mode

The explorer register in practice. A chart page lets the reader change the period, the set of
places, the series and the scale. The explore state never changes the grammar: the chosen subjects
take the selection palette (the subject keeps its colour), everything else falls to context, the
headline is rewritten from the recipe's template, and the source line updates. A URL carries the
state so a particular view can be shared; a saved state with a written headline is an editorial
frame.

## Typography note

Hedvig Letters Serif as published has a corrupt "ff" ligature glyph: a letter drops out of
"different" and "staff". The kit's font files have that one ligature rule removed
(`fonts/MODIFICATIONS.md`), so headlines need no special setting. A project that carries its own
copy of the fonts must take them from the kit, version 1.1.0 or later.
