---
name: NAVI MPL ID Fan Hub
description: A fan site built as one cut-and-sew jersey — panelled cloth, one yellow piping thread, a woven line-up tag and a stitched care label.
colors:
  cloth-black: "#0d0f10"
  cloth-black-2: "#171a1c"
  cloth-black-3: "#202426"
  cloth-white: "#f2f0e8"
  cloth-white-2: "#d8d4c8"
  thread: "#ffd400"
  thread-wash: "rgba(255,212,0,0.12)"
  seam: "#3a3a35"
  seam-soft: "rgba(242,240,232,0.14)"
  on-black: "#f2f0e8"
  on-black-soft: "rgba(242,240,232,0.64)"
  on-black-faint: "rgba(242,240,232,0.46)"
  on-white: "#14150f"
  on-white-soft: "rgba(20,21,15,0.62)"
  radius-seam: "2px"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 5.2rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.055em"
  print:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2rem, calc(var(--type-print-vw) * 7 / var(--chars, 7)), 4.6rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.055em"
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.62rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.18em"
  code:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.54rem"
    fontWeight: 800
    letterSpacing: "0.24em"
rounded:
  seam: "2px"
spacing:
  gutter: "clamp(1.1rem, 4.2vw, 4rem)"
  section-gap: "2.5rem"
components:
  stitch-control:
    backgroundColor: "transparent"
    textColor: "{colors.on-black-soft}"
    rounded: "{rounded.seam}"
    padding: "0.5rem 1rem"
  stitch-control-active:
    backgroundColor: "{colors.thread}"
    textColor: "{colors.on-white}"
    rounded: "{rounded.seam}"
    padding: "0.5rem 1rem"
  woven-tag-row:
    backgroundColor: "transparent"
    textColor: "{colors.on-black}"
    rounded: "{rounded.seam}"
    padding: "0.44rem 0.4rem"
  care-label:
    backgroundColor: "{colors.thread}"
    textColor: "{colors.on-white}"
    rounded: "{rounded.seam}"
    padding: "0.85rem 0.7rem"
  shop-card-official:
    backgroundColor: "{colors.cloth-black-2}"
    textColor: "{colors.on-black}"
    rounded: "{rounded.seam}"
    padding: "0.6rem"
  shop-card-fan:
    backgroundColor: "{colors.cloth-black-2}"
    textColor: "{colors.on-black}"
    rounded: "{rounded.seam}"
    padding: "0.6rem"
---

# Design System: NAVI MPL ID Fan Hub

## Overview

**Creative North Star: "The Cut-and-Sew Jersey"**

This is a replacement world for the retired portfolio identity. The page is one garment seen once, at one scale, from one point of view: a panelled black-and-off-white cloth field carries the team name and a player print, a narrow woven tag at the right carries the seven names and one-word roles, and a yellow care label carries the only Shop action. The category-default fan site — hero photograph, row of equal player cards, merchandise grid — is refused.

Color lives in materials, not decoration. Black and off-white fabric panels, visible seam lines and a fine woven grain do the work; a single NAVI-yellow piping thread marks the seam, the active control, the selected tag row and the Shop tab. Official player portrait cutouts supply the only photography. No gradients-as-content, glass, generic icon tiles or soft rounded cards appear.

**Key Characteristics:**
- One panelled cloth field, one diagonal piping seam, one woven tag column.
- Yellow is a stitch and a state signal, never a content field.
- Heat-pressed condensed caps for identity; tiny tracked caps for the woven tag.
- Squared 2px corners and dashed seam borders — garment hardware, not UI chrome.

## Colors

Two fabric neutrals and one signal thread. All other values are tonal steps of those, declared as CSS custom properties in `:root`.

### Primary
- **NAVI Thread** (#ffd400): The only saturated color. The diagonal piping, focus ring, selected tab/filter, current line-up row, care label, official-merch border and the accented final grapheme of a handle. Its rarity is the point.

### Neutral
- **Cloth Black** (#0d0f10): The ground and the black garment panel.
- **Cloth Black 2** (#171a1c): The woven tag, stats label, shop cards and secondary panels.
- **Cloth Black 3** (#202426): The no-data stats plate.
- **Chalk** (#f2f0e8): Primary text and the off-white garment panel.
- **Chalk Soft** (rgba(242,240,232,0.64)): Secondary labels and inactive controls.
- **Chalk Faint** (rgba(242,240,232,0.46)): Low-priority instrumentation; still clears 4.5:1 against cloth.
- **Ink on Thread** (#14150f): Solid dark set on a yellow fill — selected tab, care label, official badge.

**The One Thread Rule.** Yellow marks the seam, identity and state only. If two large yellow regions compete for the same viewport, reduce all but the primary action.

## Typography

**Display and Body Font:** Archivo (self-hosted variable woff2, Arial fallback). No hosted font stylesheet.

**Character:** A compact, heavy grotesque. Identity is set in very tight, uppercase display weight like heat-pressed lettering; the woven tag and control labels are small and widely tracked, like a garment care label. Tabular figures are reserved for published statistics and product metadata.

### Hierarchy

Every role has a named token and a **12px functional floor**. Nothing user-visible renders smaller; hierarchy below the display sizes comes from weight, tracking, case and position, never from a smaller glyph. Archivo is variable 100–900, so `font-synthesis: none` prevents the browser faking a weight.

- **Display** (`--type-display`, 900, clamp(2.4rem, 5vw, 5.2rem), line-height 0.86, tracking -0.055em): `NAVI MPL ID` on the chest panel.
- **Print** (900, clamp(2rem, calc(--type-print-vw × 7 / --chars), 4.6rem), tracking -0.055em): The featured player handle, scaled by grapheme count; final grapheme in thread.
- **Headline** (`--type-headline`, clamp(1.8rem, 5vw, 3rem)) and **Title** (`--type-title`, clamp(1.1rem, 2vw, 1.7rem)): subpage headers and section heads.
- **Body** (`--type-body`, 1rem/16px, line-height 1.5–1.6, measure 45–75ch): prose and descriptions.
- **Label** (`--type-label`, 800, 0.875rem/14px, tracking 0.18em, uppercase): Navigation, tabs, filters, tag heading, hem facts, shop controls.
- **Code** (`--type-code`, 800, 0.8125rem/13px, tracking 0.24em, uppercase): One-word roles on the tag, counters, product resolution.
- **Meta** (`--type-meta`, 0.75rem/12px): Credits, provenance links, match metadata and the smallest instrumentation.

The numbered steps `--type-step-01`…`--type-step-14` alias these role tokens so existing selectors inherit the floor; adjacent steps differentiate by weight and tracking rather than by glyph size below 12px.

## Layout

Desktop is a single 100svh garment. The neck tape (nav) sits at 3.4%, the stitched control row at 11.5%, the jersey field from 18% to 89%, and the hem of verified facts at 3.2% from the bottom — all sharing `--gutter`. The field is a two-column grid: the cloth chest takes the remaining width and the woven tag takes `clamp(180px, 18vw, 258px)`.

Inside the chest, an off-white panel occupies the left 46% with a clipped diagonal edge; a black panel occupies the right 64%; a dashed seam and a 3px yellow piping run between them at a slight skew. The chest copy is heat-pressed into the off-white panel at 6% from the left. The featured player print is the dominant move: centred at 60% with a 46% width and 94% height, so the cutout reads as one decisive peak. The woven tag is a real column: heading, **one selector** whose seven rows each carry a portrait, handle and one-word role, then the care-label action pinned to its foot. The former four-card bench and the name-only tag rows were duplicate selectors and are gone.

Below 1024px the page becomes a document. The chest reflows to a shorter block, the woven tag becomes a full-width band with a two-column player-selector grid, and the hem follows directly so all four verified facts stay above the fold at 390×844. Short landscape keeps the single-screen field. Coarse pointers grow controls to 44px. Safe-area insets come from `viewport-fit=cover`.

The Staff tab keeps the same two-panel grammar: the off-white panel carries a quiet `NAVI MPL ID / Coaching staff · Season 18` identity, and the three staff cards occupy the dark field. Each card carries only three verified facts — name, role and country code — with a larger portrait than the player-selector thumbnails. On phones the cloth goes full-width and each card becomes a compact horizontal row so all three fit without filler copy.

## Elevation & Depth

Flat by default; depth comes from fabric layering, a fine woven grain and a few downward-offset shadows. Every shadow carries a downward offset and soft blur — no zero-offset colored halos. The touch cue, the selected tag row and the care label are the only elements that lift.

### Shadow Vocabulary
- **Stitch lift** (`--shadow-stitch`: `0 10px 28px rgba(0,0,0,0.42)`): Woven tag and care label against the cloth. The stats readout is printed flat on the fabric and never lifts.
- **Print drop** (`0 16px 24px rgba(0,0,0,0.55)`): Player cutouts against the garment.
- **Ink shadow under heat-pressed type** (`0 8px 22px rgba(0,0,0,0.65)`): The featured handle on the white chest panel; deeper than print drop so the heavy caps read against cloth grain.
- **Pressed care-label lift** (`0 14px 30px rgba(0,0,0,0.5)`): The Shop care label on hover; a downward-offset soft shadow, never a colour halo.

**The Unbroken Print Rule.** A cutout that is loading or has failed never breaks the field — the swatch and a monogram hold the space.

There is one authored motion: a heat transfer pressed onto cloth. The new print is revealed by a slanted press travelling along the piping's diagonal, settles from a slight 1.045 scale, and the fabric wash blooms once behind it; the yellow piping catches the heat for a single 640ms pulse. The handle ink sets 110ms later and the role follows at 200ms. Direction comes from the entry point (arrows, selector rows and swipe declare it), so the press travels the way the selection came from. Lane chips are a lens and never select a player. Total sequence stays under 640ms with a confident ease-out — no layout-driving properties. Reduced motion replaces the whole sequence with one 140ms opacity cue; forced colors replaces the yellow state signal with system outlines.
At rest the garment stays quietly alive: two soft glints pass along the yellow piping half a cycle apart (9s, seamless at the loop point), and each cloth's weave drifts exactly one 4px tile (14s/18s, opposite directions). Both loops use only transform/background-position, pause when the tab is hidden, and are disabled under reduced motion, where the piping simply keeps its static lit glow.

Every page also carries a **selvedge**: forty loose thread ends, twenty on each raw edge of the garment. Each bit starts just outside the edge, travels inward as it climbs, and fades into faintness; both edges climb upward. They are 1–2px wide and 2–3px long — a touch smaller than the last pass — with durations from 5.4s to 15.2s. Every attribute (vertical band, phase, duration, size, brightness, inward distance and climb) comes from a **seeded PRNG at module load**, with a different seed per edge: stratified bands keep the edge covered while breaking the visible lattice that evenly spaced tops, alternating heights and arithmetic sequences produced. Seeded values are deterministic, so server and client agree. A bounded 4–6px shadow intensifies as the bit enters, peaks as it climbs, and dies away as it fades — light on yarn, never a particle field, orb or gradient blob. All motion is transform and opacity on isolated bits; the loops pause with the other ambient motion when the tab is hidden. Under reduced motion the ends sit faint and still at the edge, with no glow.

## Shapes

Corners are squared at 2px (`--radius-seam`) — garment hardware, not soft cards. The off-white panel uses a four-point diagonal clip; selector portrait swatches use a shallow eight-point cut; the piping and seam are skewed hairlines. Borders are solid for official merchandise and dashed for fan-made goods, so classification survives color flattening.

## Components

### Stitched control (tab / filter / stats toggle)
- Squared 2px, 1px seam border, transparent ground, tracked uppercase label.
- Selected: yellow fill with ink text; filter active state is yellow text on a yellow wash.
- Stats toggle keeps a dashed border and a hairline divider so it reads as an instrument, not a third tab.
- The focus-count status sits in a reserved line directly beneath the filter chips, not beside them in the control row. It is always in the layout (hidden when no lens is active), so selecting a lens never reflows or re-centres the lane chips.
- Every control shares one press cue: a 260ms depression to 0.955 scale on the same ease-out, then a confident release. It fires for pointer and keyboard activation and never stacks under repeated presses. Reduced motion replaces it with a 140ms opacity beat.

### Featured print
- A transparent official player cutout at full height on the cloth, with the handle across its lower third and a one-word role beneath.
- Previous/next controls are squared, seam-bordered buttons at the right edge, with a `01 / 07 · BROWSE` counter.

### Woven tag / player selector
- A narrow dark column with a fine horizontal weave, a 3px yellow left border, a heading, seven player rows and a care-label action. Each row is **one control** carrying a portrait thumbnail, handle and one-word role; the selected row gets a yellow wash, a 2px yellow left edge and `aria-current`/`aria-pressed`. Rows outside the active lane lens dim but stay usable on hover/focus. There is no second player selector on the page.

### Stats spec sheet
- Not a popup. The `Season 18` toggle turns the off-white cloth panel into one printed specification sheet. The featured player's handle is the display headline — heavy ink at up to 5.2rem, grapheme-scaled so the longest name stays on one line — with `Season 18 · ROLE` as a tracked code beneath it, marked by a yellow square. A 3px ink rule separates the head.
- Ink is the data field — a 0.9-opacity dark hexagon with a 4px edge on cream (12.5:1) and a defined outer ring — and NAVI thread is the signal inside it: larger yellow vertex dots ringed in ink (10:1 against the shape). Values are 38px tabular ink with 900-weight labels, a clear second step below the handle; notes and source stay small. Hierarchy comes from scale, weight and position, not extra accents.
- The hexagon sits in a square frame so the SVG never letterboxes into empty side gutters. On phones the frame and the values share one row — a 44% glyph column beside a two-column value grid — which removes the wide blank bands and makes the glyph larger without adding height.
- Each of the six axes has a focusable vertex, labelled at rest with the metric identity (KDA, KP, K, A, AVG D* LOW, GP). Hover, keyboard focus or a touch tap grows the dot and reveals a tooltip with the player's published figure and the team maximum, both read from the Season 18 table and formatted by the axis's own formatter. The tooltip sits anchored to the vertex on desktop and below the glyph on phones; it fades in on a 170ms ease-out.
- Published values sit in a three-column definition list with a hairline ink divider; the `Shape · not a score` note keeps derived geometry distinct from published data, and the source line names MPL Indonesia Season 18 regular season. Players with no published figures get the same ink-and-thread treatment with a plain ink rule, never a dark no-data plate.
- Companions, the touch cue and the player print quiet down while the sheet is open; on narrow screens the whole cloth becomes the sheet, then returns to the jersey on close. Escape closes it and focus returns to the toggle; switching players updates the readout in place.

### Merchandise card
- Real self-hosted product image, classification badge, sourced item name, resolution line and an outbound `View at seller ↗` link (`target="_blank"`, `rel="noopener noreferrer"`).
- Official: solid yellow border and a filled yellow badge. Fan-made: dashed seam border and a chalk badge. There is no in-site cart or checkout.

### Hem strip
- A dashed top border with small square-marked, tracked facts. Evidence only; no call to action.

## Do's and Don'ts

### Do:
- **Do** keep the cloth panels, diagonal piping and woven tag — remove them and the world disappears.
- **Do** self-host Archivo, the player cutouts and every merchandise image; no hosted font stylesheet or hotlinks.
- **Do** keep all facts to the verified roster, fixtures, awards and Season 18 statistics, each with a named source.
- **Do** keep visible role vocabulary to one word: `JUNGLE`, `EXP`, `MID`, `GOLD`, `ROAM`.
- **Do** route repeated values through the named tokens in `:root`.

### Don't:
- **Don't** invent jersey numbers, prices, products, seller URLs, testimonials or endorsements.
- **Don't** present fan-made merchandise as officially endorsed — the border and badge are mandatory.
- **Don't** replace the garment with a hero photograph over a card grid, or the piping with a second accent color.
- **Don't** let a broken image glyph stand in for a missing portrait or product image; keep the designed fallback.
