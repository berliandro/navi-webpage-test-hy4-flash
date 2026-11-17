# Design system and composition

## Status of the shipped world

The code currently ships **"The Dugout Lightboard"**: a dark competition field where the roster is the artifact. One oversized cutout on an angular plate, four dimmed companions, NAVI yellow only as a signal, hairline controls, tracked uppercase labels.

**That world is retired as the target direction.** The user requested a replacement look and a Persuade-mode fan/team site. Do not keep restyling it as if the pinned Experience contract were still in force; run the `concept-seed` roll and lock a new direction before visual work. Until the replacement lands, the facts below still describe what is in `app/globals.css`.

- Ground `#070A1C`, elevated `#0D1234`, ink `#F7F8FF`, acid `#F7E600`.
- One Voice Rule: yellow marks state/identity only (active chip, name accent, proof diamonds, focus ring, stats polygon). It never fills a content region.
- Maps of the same role use one visible word: `JUNGLE`, `EXP`, `MID`, `GOLD`, `ROAM`.

## Tokens (in `app/globals.css`)

- Spacing: `--gutter: 4.2%`, `--section-gap`, `--section-gap-lg`.
- Shape: `--radius-pill: 999px`, `--clip-plate` (portrait octagon), `--clip-plate-shallow` (staff/empty states).
- Type: `--type-display`, `--type-subdisplay`, `--type-label`, `--type-label-sm`, `--type-card-handle` with matching `--track-*`. Display tracking is `-0.055em`; the featured handle scales by grapheme count. Label floors are 11px/12px so nothing renders below 11px.
- Depth: `--shadow-cutout*`, `--shadow-text`, `--stage-inset`. No zero-offset halos.
- Motion: one ease-out curve (`cubic-bezier(0.16,1,0.3,1)`); the feature swap is the authored moment. `prefers-reduced-motion` collapses entrance motion but keeps an 80 ms state beat so controls still respond.

## Composition

Desktop: one 100svh stage, `--gutter` side inset, three bands — top nav, tabs/filters, roster field — with the proof strip at the bottom. Featured portrait ≈33% width; companions at 3.5%/19.5% from each edge; vertical role marker at the right. No card grid, no scroll.

Phone (≤560px): a poster inside 844px — hero ~40vh (`min-height: 300px`), two near companions ~130px, proof strip visible above the fold. The nav wraps to two rows and the one-time hint sits above the hero. Below 1024px the far companions and vertical marker are hidden; short landscape keeps the absolute field. Very short phones (e.g. 375×667) are a known gap: the proof strip can fall below the fold.

Subpages reuse `SiteHeader` and `SubPage` (`page-stage`, `page-wrap`, `page-content`, `page-title`, `page-lede`, `page-proof`). The shared proof strip carries four facts: S18 runners-up, Joshuaa First Team jungler, Joshuaa Rookie of the Season, Aprho First Team roamer. The planned route set retires `/design-notes`; `/matches`, `/titles`, `/media` stay and `/shop` is added.

## Filter and selection

- A role chip is a focus lens: it promotes the first in-role player to the featured slot and keeps in-role teammates bright; out-of-role cards drop to ~50% with light desaturation. The count reads `Focus · N <role>`.
- With a single in-role player (JUNGLE, ROAM), no companion is dimmed — a fully dimmed bench reads as broken.
- Clicking an out-of-role companion clears the lens to ALL so the pressed chip never contradicts the hero; arrows then move freely again.
- Prev/next cycles within the active role and leaves the chip unchanged; with ALL it cycles the full roster.
- Promoting a companion backfills its flank slot so the same player never appears twice.
- The vertical role marker uses the one-word code (`ROAM`, `EXP`), matching chips and cards.

## Stats readout

- The toggle reads `Season 18` with a hexagon glyph and dashed hairline; `aria-label="Season 18 statistics"`. Hidden from Staff. Hidden-mounted with `hidden` + `inert` so `aria-controls` always resolves.
- On the phone reflow, opening the readout scrolls it into view with `scrollIntoView` (reduced motion snaps); on desktop it docks into the left channel and the bench fades deliberately.
- The visible values are published figures (`axis.raw`); the polygon geometry may derive/invert but the source line must explain it. `AVG D* LOW` is the published average deaths with a lower-is-better inversion for geometry.
- Close paths: X, Escape, toggle; every path returns focus to the toggle. A page-level `role="status"` announces values.
- The hexagon tweens with a JS rAF interpolation; reduced motion snaps to final geometry. No-data players get the dashed panel.

## Accessibility

- One `h1` (sr-only on Home), APG tabs with Arrow/Home/End, `aria-pressed` filters, labelled groups, focus-visible yellow ring.
- 44px coarse-pointer hit areas for pills, tabs, the Season 18 toggle, close and feature arrows; fine-pointer arrows are 40px with a 44px pseudo-target.
- Forced-colors replaces yellow state with system outlines. Do not rely on hue alone.
- Media failures become a monogram inside the plate; no broken-image glyph, no layout shift.
- With Stats open on desktop, bench cards are `pointer-events: none` and faded; keep them out of the tab order as well (known gap).

## Merchandise (planned shop surface)

- Source of truth is `public/assets/merch/PROVENANCE.md`: 15 real images with official/fan classification, direct image URLs and outbound seller pages. Do not invent a product, price or URL.
- Each card opens the seller's site; there is no in-site checkout.
- Official and fan-made goods must be visibly separated by a thin border/label so fan merchandise is never presented as officially endorsed.

## Share metadata

`app/layout.tsx` sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3200`) plus `openGraph`/`twitter` tags. The current `/og-card.png` is a portfolio case-study card; the fan-site build replaces that framing with general web/social sharing. Keep any share claim to verified facts.

## Do not

- Add a second accent, soft rounded content cards, gradient text, a kicker above a heading, or decorative glass.
- Add inert links that look interactive; the old static `EN / Log in / Join` utilities were removed for this reason.
- Add invented numbers, ages, jersey numbers, products, URLs or endorsements.
- Break the phone poster by adding a new full row above the fold.
