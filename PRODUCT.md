# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js (React), retained from the existing build — the component model and multi-route structure still fit. The site is now a live public web presence, so delivery (host, domain, HTTPS, SEO metadata, 404, sitemap, performance budget) becomes product scope rather than a portfolio nicety. A deployment target is not yet confirmed; see `PLAN.md` open decisions.

## Users

NAVI MPL ID fans and the wider Mobile Legends: Bangbang / MPL Indonesia community. They arrive from search, social channels, fan communities and embeds — not from a Pinterest design portfolio. Their job: keep up with the team (roster, results, titles, media) and find merchandise they can actually buy. Success is an informed fan who clicks through to a real product on the seller's own site.

The former primary user — a UI/UX designer publishing a case-study piece — is no longer the target. The case-study layer (`/design-notes`) is a portfolio artifact and does not belong to the new identity.

## Product Purpose

A live, fan-facing team website for NAVI MPL ID. It informs supporters about the roster, results, titles and media, and routes them to official and fan-made merchandise through outbound links. It exists to serve fans and drive real click-throughs, not to demonstrate design craft.

## Positioning

A fan hub for NAVI's MPL ID squad: verified team information plus a curated merchandise directory that distinguishes official from fan-made goods and sends visitors to the seller. No competitive or commercial claim may be invented; only verifiable facts and real, linked products.

## Operating Context

Published publicly on the live web for fans. The Pinterest-bound portfolio framing is retired. Social share metadata and a purpose-built share card still matter, now for general web/social sharing rather than a Pinterest case-study link. A deployment target and domain must be chosen before launch.

## Capabilities and Constraints

- **Inform:** the existing roster Home stage, `/matches` (official Season 18 fixture ledger), `/titles` (verified awards) and `/media` remain the information base. All roster, fixture and season-stat facts stay sourced and unchanged; no jersey numbers, invented metrics, testimonials or endorsements.
- **Shop / directory:** a shop surface presents real merchandise with high-quality product imagery. Items are labelled **official** or **fan-made**, carry accurate names and pricing where published, and link out to the seller's own site. There is no in-site checkout, cart or payment. Every outbound URL must be real and verified to resolve; products and links must not be fabricated.
- **Product imagery:** high-quality images are required. They must be sourced with recorded provenance and permission/attribution; no hotlinked images. Until a real image plus source is verified, a product card uses a designed placeholder rather than a fabricated or hotlinked picture. (Constraint carried from the project's asset rules.)
- **Visual identity:** the pinned Experience world (faithful `Reference.gif` frame-1 reskin: near-black navy, one NAVI-yellow signal, octagon plates, dot matrix, Archivo) is retired as the project identity. The verified roster content is kept; the visual world is replaced. No replacement world has been chosen yet — it must be selected through the impeccable concept-seed roll before any build and recorded in the surface brief.
- **Live-web readiness:** hosting, domain, HTTPS, SEO metadata, social share card, favicon/icons, 404, sitemap/robots and an accessibility/performance budget are in scope for launch.
- **Multi-route structure:** sibling routes exist; a decision is pending on which to retire (`/design-notes` is a portfolio artifact) and which to keep, plus the new shop surface.

## Brand Commitments

The NAVI team mark is the recognizable brand asset. Official and fan-made merchandise must be clearly distinguished; fan-made goods must never be presented as officially endorsed. No invented endorsements, prices or product claims.

## Evidence on Hand

- Verified NAVI MPL ID roster, Season 18 fixture ledger, awards and official regular-season statistics — sourced as documented in `AGENTS.md` and `public/assets/`; these remain valid and unchanged.
- `Reference.gif` is retained only as a record of the retired Experience identity; it is no longer the approved comp.
- A merchandise catalogue (product names, images, official/fan-made classification, outbound URLs, provenance/permission) does not yet exist and must be sourced before the shop can be built. No products may be invented.

## Product Principles

1. Fans first — the site serves supporters' need to follow the team and find real merchandise.
2. Verified facts — all roster, results and season data stay traceable to official sources.
3. Real products, honest links — only actual merchandise with verified outbound links; official and fan-made clearly separated; no in-site checkout.
4. New visual world — replace the pinned Experience look rather than polishing it; keep every verified fact.
5. Live-web ready — ship as a public site with proper delivery, metadata, performance and accessibility, not as a portfolio artifact.
