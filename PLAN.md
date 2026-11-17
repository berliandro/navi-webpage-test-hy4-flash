# Transition plan — NAVI MPL ID portfolio → live fan/team site

**Season scope:** this repository is the **MPL ID Season 18** edition. It is complete and deployed as the S18 fan hub; a new season will be a separate project with the same team, not a continuation of this one. Do not merge later-season facts into it.

Status: the transition below has been executed — the fan hub, the Cut-and-Sew Jersey visual world, the sourced merchandise directory and the GitHub static export are shipped. This file is retained as the record of the decisions.

## Confirmed identity decisions

- **From:** Experience-mode UI/UX portfolio case study, discovered through Pinterest.
- **To:** a live, public NAVI MPL ID fan/team website that customers/fans can actually visit.
- **Goal:** inform visitors and route them to merchandise.
- **Shop:** high-quality images of real products, both **official** and **fan-made** merchandise, each card redirecting to the seller's own site. No in-site checkout.
- **Content:** keep every verified roster/fixture/award/stat fact. **Visual world:** replace it with a new look.

## Phase 1 — Close the open product decisions (before design)

These are facts only the owner can supply, and they block launch:

1. Deployment host and domain — required to "put on live."
2. Merchandise catalogue source of truth: real product names, official/fan-made classification, outbound URLs, and permission/attribution for product imagery. No product or link may be invented.
3. Labelling rules so fan-made goods are never presented as officially endorsed.
4. Route set: keep `/matches`, `/titles`, `/media`; add the shop surface; decide the fate of `/design-notes` (a portfolio artifact that does not fit a fan site).
5. Share metadata: replace the Pinterest case-study framing with general web/social sharing.

## Phase 2 — Choose the replacement visual world

- Run the impeccable `concept-seed` roll in **Persuade** mode for a replacement world (the user explicitly requested a new look, so the pinned Experience world is superseded, not restyled).
- The roll deals directions; the user locks one. Do not pre-pick a look in code.
- Record the locked direction as the six-block contract in `.impeccable/surfaces/app-page.md` (THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM with seed reference, FINISH).
- `DESIGN.md` and `.impeccable/design.json` are rewritten **at finish from the built world**, not during planning.

## Phase 3 — Surface and content plan

- **Home (Persuade):** team identity + current verified roster/results as trusted proof, with one obvious route to the shop.
- **Shop (new):** real products with high-quality images, official/fan-made filter, verified outbound links; designed placeholder until a real sourced image exists.
- **Information routes:** retain the verified, sourced content already built (`/matches`, `/titles`, `/media`).
- Keep the hard content rules from `AGENTS.md`: no jersey numbers, invented metrics, testimonials or endorsements; one-word role vocabulary; `STATS` figures only from the official Season 18 source.

## Phase 4 — Live-web readiness

Hosting, domain, HTTPS, SEO metadata, social share card, favicon/icons, `404`, sitemap/robots, performance budget, accessibility, and outbound-link validation (every shop link resolves).

## Phase 5 — Build and verify

Follow the project's production runbook: `npm run build`; run the detector and `doctor`; serve `npx next start -p 3200` and confirm the page and CSS chunk return 200; screenshot at 1440×810 and 390×844 and inspect them; exercise interactions with mouse and keyboard; check the console. Dev-server HMR is broken in this harness, so never judge from `next dev`.

## Phase 6 — Finish the records

Rewrite `DESIGN.md` from the built world and refresh `.impeccable/design.json`; update `AGENTS.md` content/architecture notes and `public/assets/PROVENANCE.md` for any new imagery; complete the impeccable finish review before calling the site done.

## Files changed in this planning pass

- `PRODUCT.md` — repositioned product truth (fan/team site, inform + shop, new world).
- `.impeccable/surfaces/app-page.md` — new Persuade-mode surface brief; old Experience direction contract retired; replacement direction left OPEN.
- `PLAN.md` — this transition plan.

## Files deliberately NOT changed

- `app/**`, `public/**` (code, styling and assets) — code/design work is out of scope for this pass.
- `DESIGN.md`, `.impeccable/design.json` — the visual system record is written at finish from the built world, not now.
- `AGENTS.md`, asset provenance — record updates deferred to the build that changes content/assets.
