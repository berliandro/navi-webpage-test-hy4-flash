# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Scope

**This project is specifically the NAVI MPL Indonesia Season 18 fan hub.** Every roster fact, fixture, award and regular-season statistic in it belongs to MPL ID Season 18. It is a season-bound artifact, not a permanent team site: when the next season starts, a **new, separate project** will be created for it. The team (NAVI MPL ID) stays the same; the season-specific data, visual decisions and deployment do not carry over. Never add later-season data, players or results to this project — archive it as the S18 edition instead.

## Stack

Next.js 16 (React) with a full static export to `out/` (`output: "export"`, `trailingSlash`, `basePath` from `NEXT_PUBLIC_BASE_PATH`). Delivered as copy-paste static files on GitHub Pages under `/navi-webpage-test-hy4-flash` with `.nojekyll`. Assets and the Archivo font are self-hosted; no hosted font stylesheet, no runtime API, no checkout.

## Users

NAVI MPL ID fans and the wider Mobile Legends: Bangbang / MPL Indonesia community. They arrive from search, social channels, fan communities and embeds. Their job: keep up with the Season 18 squad (roster, results, titles, media) and find merchandise they can actually buy. Success is an informed fan who clicks through to a real product on the seller's own site.

The former primary user — a UI/UX designer publishing a case-study piece — is no longer the target. The portfolio layer (`/design-notes`) was retired.

## Product Purpose

A live, fan-facing team website for the NAVI MPL ID Season 18 squad. It informs supporters about that season's roster, results, titles and media, and routes them to official and fan-made merchandise through outbound links. It exists to serve fans and drive real click-throughs, not to demonstrate design craft.

## Positioning

A fan hub for NAVI's Season 18 MPL ID squad: verified team information plus a curated merchandise directory that distinguishes official from fan-made goods and sends visitors to the seller. No competitive or commercial claim may be invented; only verifiable facts and real, linked products.

## Operating Context

Published publicly on the live web for fans. Social share metadata and a purpose-built share card are in scope. The GitHub repository is the delivery target; the static export is deployed under the repository subpath. Build with `NEXT_PUBLIC_BASE_PATH=/navi-webpage-test-hy4-flash` and confirm `out/.nojekyll` exists.

## Capabilities and Constraints

- **Inform:** Home roster, `/matches` (official Season 18 fixture ledger), `/titles` (verified awards), `/media` (official portraits and sourced imagery). Roster, fixture and stat facts stay sourced and unchanged; no jersey numbers, invented metrics, testimonials or endorsements.
- **Shop / directory:** 36 real, sourced merchandise images with official/fan classification and verified outbound seller URLs. No in-site checkout, cart or payment; official and fan-made goods are visibly separated.
- **Product imagery:** self-hosted WebP/PNG with recorded provenance; no hotlinks. Player cutouts are retained as masters with alpha-safe derivatives.
- **Visual identity:** the Cut-and-Sew Jersey world, locked from the impeccable concept-seed roll (`seed:7d5bf508817409da`). Panelled cloth, one NAVI-yellow piping thread, a woven line-up tag, a stitched Shop action, and the fixed six-block contract in `.impeccable/surfaces/app-page.md`. This world belongs to the S18 edition.
- **Live-web readiness:** self-hosted font, semantic routes, 404, social metadata, accessibility and a measured performance budget are in scope.

## Brand Commitments

The NAVI team mark is the recognizable brand asset and persists across seasons. Official and fan-made merchandise must be clearly distinguished; fan-made goods must never be presented as officially endorsed. No invented endorsements, prices or product claims.

## Evidence on Hand

- Verified NAVI MPL ID Season 18 roster, fixture ledger, awards and official regular-season statistics — sourced as documented in `AGENTS.md` and `public/assets/`.
- The sourced merchandise catalogue and provenance in `public/assets/merch/PROVENANCE.md`.
- `Reference.gif` is retained only as a record of the retired pre-fan-hub identity; it is not the approved comp.

## Product Principles

1. Fans first — the site serves supporters' need to follow the Season 18 team and find real merchandise.
2. Verified facts — all roster, results and season data stay traceable to official sources.
3. Real products, honest links — only actual merchandise with verified outbound links; official and fan-made clearly separated; no in-site checkout.
4. Season-bound — this is the Season 18 edition; a new season means a new project, not a rewrite of this one.
5. Live-web ready — ship as a public static site with proper delivery, metadata, performance and accessibility.
