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
- **Display** (900, clamp(2.4rem, 5vw, 5.2rem), line-height 0.86, tracking -0.055em): `NAVI MPL ID` on the chest panel.
- **Print** (900, clamp(2rem, calc(--type-print-vw × 7 / --chars), 4.6rem), tracking -0.055em): The featured player handle, scaled by grapheme count; final grapheme in thread.
- **Label** (800, 0.62rem, tracking 0.18em, uppercase): Navigation, tabs, filters, tag heading, hem facts, shop controls.
- **Code** (800, 0.54rem, tracking 0.24em, uppercase): One-word roles on the tag, counters, product resolution.

## Layout

Desktop is a single 100svh garment. The neck tape (nav) sits at 3.4%, the stitched control row at 11.5%, the jersey field from 18% to 89%, and the hem of verified facts at 3.2% from the bottom — all sharing `--gutter`. The field is a two-column grid: the cloth chest takes the remaining width and the woven tag takes `clamp(180px, 18vw, 258px)`.

Inside the chest, an off-white panel occupies the left 46% with a clipped diagonal edge; a black panel occupies the right 64%; a dashed seam and a 3px yellow piping run between them at a slight skew. The chest copy sits at 45% from the left, the featured print is centred at 52% with a 36% width, and four small companion prints sit along the lower left. The woven tag is a real column: heading, seven clickable name/role rows, then the care-label action pinned to its foot.

Below 1024px the page becomes a document. The chest reflows to a shorter block, the woven tag becomes a full-width band with a three-column name grid, and the hem follows directly so all four verified facts stay above the fold at 390×844. Short landscape keeps the single-screen field. Coarse pointers grow controls to 44px. Safe-area insets come from `viewport-fit=cover`.

## Elevation & Depth

Flat by default; depth comes from fabric layering, a fine woven grain and a few downward-offset shadows. Every shadow carries a downward offset and soft blur — no zero-offset colored halos. The touch cue, the selected tag row and the care label are the only elements that lift.

### Shadow Vocabulary
- **Stitch lift** (`--shadow-stitch`: `0 10px 28px rgba(0,0,0,0.42)`): Woven tag, stats label and care label against the cloth.
- **Print drop** (`0 16px 24px rgba(0,0,0,0.55)`): Player cutouts against the garment; smaller companion variant below it.

**The Unbroken Print Rule.** A cutout that is loading or has failed never breaks the field — the swatch and a monogram hold the space.

There is one authored motion: the featured print is swapped like a transfer, wiping in from the direction the selection came from (arrows, companion cards, filter chips, tag rows and swipe all declare it), with the handle landing a beat behind. Reduced motion collapses it to a snap while keeping every value legible; forced colors replaces the yellow state signal with system outlines.

## Shapes

Corners are squared at 2px (`--radius-seam`) — garment hardware, not soft cards. The off-white panel uses a four-point diagonal clip; companion swatches use a shallow eight-point cut; the piping and seam are skewed hairlines. Borders are solid for official merchandise and dashed for fan-made goods, so classification survives color flattening.

## Components

### Stitched control (tab / filter / stats toggle)
- Squared 2px, 1px seam border, transparent ground, tracked uppercase label.
- Selected: yellow fill with ink text; filter active state is yellow text on a yellow wash.
- Stats toggle keeps a dashed border and a hairline divider so it reads as an instrument, not a third tab.

### Featured print
- A transparent official player cutout at full height on the cloth, with the handle across its lower third and a one-word role beneath.
- Previous/next controls are squared, seam-bordered buttons at the right edge, with a `01 / 07 · BROWSE` counter.

### Companion print
- Small cutout on a light fabric swatch with a two-line handle/role label. Selecting it swaps the featured print. Under a role lens, out-of-role prints dim rather than disappear.

### Woven tag
- A narrow dark column with a fine horizontal weave, a 3px yellow left border, a heading, seven clickable name/role rows and a care-label action. The current player's row gets a yellow wash and a 2px yellow left edge — lift-on-select without a second accent.

### Stats care label
- An optional, toggled panel docked over the chest. A six-axis hexagon in seam hairlines with the current player's polygon and dots in yellow; published values in a definition list; the `Shape · not a score` note keeps geometry distinct from data. Players with no published figures get a dashed no-data plate. Escape closes it and focus returns to the toggle.

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
