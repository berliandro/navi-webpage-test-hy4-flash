# AGENTS.md

A Next.js 16 fan/team website for NAVI MPL ID. The retired UI/UX portfolio identity has been replaced by the **Cut-and-Sew Jersey** Persuade world: one panelled garment carries the team identity and a player print, a woven tag lists the verified line-up, and a stitched care label is the only route to the shop. The site informs fans and sends them to real merchandise on the seller's own site; there is no in-site checkout.

## Agent skill

Load the `navi-roster-site` skill before substantial work, and when a build fails, a preview looks stale, a subagent reports a fix, or the user corrects something. Load `impeccable` for visual work; its launcher is `C:\Users\nberl\.config\opencode\skills\impeccable\scripts\impeccable.cmd` (Windows shell needs `&` and the `.cmd` extension).

## Commands

- `npm install` — dependencies (already installed; Node 24).
- `npm run dev` — dev server on :3000. **HMR websockets fail in this harness** (the proxy returns an invalid upgrade response), so React never hydrates in a browser driven from here. For visual work, run `npm run build`, then `npx next start -p 3200` as separate commands; the production build hydrates and interactions work. PowerShell here has no `&&` operator.
- `npm run build` — runs `prebuild` (writes `NEXT_PUBLIC_BASE_PATH` into the self-hosted font URL), then TypeScript; the typecheck gate. With `output: "export"` this writes the static site to `out/`.
- Static hosting needs the repo subpath: set `NEXT_PUBLIC_BASE_PATH=/mlbb-team-fanpage` before building. Every image/metadata URL goes through `asset()` from `app/assetPath.ts`; plain `/assets/...` URLs will 404 under a subpath. `scripts/build-merch.mjs` regenerates `app/merch.ts` from the provenance table.
- `.\\.opencode\\skills\\navi-roster-site\\scripts\\verify.ps1` — build + detector + doctor in one pass. A clean run returns `[]` and zero doctor findings.
- `NEXT_PUBLIC_SITE_URL` — set to the published origin so relative `og:image`/`twitter:image` URLs resolve; defaults to `http://localhost:3200`.
- `NEXT_PUBLIC_BASE_PATH` — repo subpath for GitHub Pages (`/mlbb-team-fanpage` for the provided repository); leave empty for a custom domain or root deployment. After an export, `out/.nojekyll` must exist.

## Layout / architecture

- `app/page.tsx` — the garment Home surface and all client state (role filter, featured print, prev/next cycling, Players/Staff tabs, Stats care label). `app/globals.css` — all styling and tokens for the jersey world.
- `app/shop/page.tsx` — merchandise directory with an All/Official/Fan-made lens; `app/merch.ts` is generated from the provenance file by `scripts/build-merch.mjs`. Official goods carry a solid yellow border; fan-made goods a dashed seam border. Both link out to the seller.
- `app/SiteHeader.tsx`, `app/SubPage.tsx`, `app/MediaImage.tsx` — shared shell, subpage frame and load-gated image with a designed fallback. Routes: `/`, `/matches`, `/titles`, `/media`, `/shop`. The portfolio `/design-notes` route and all case-study links are retired.
- `PRODUCT.md` — product truth. `PLAN.md` — transition plan. `.impeccable/surfaces/app-page.md`, `home.md`, `shop.md` — surface strategy and the locked six-block direction contract (`seed:7d5bf508817409da`). `DESIGN.md` + `.impeccable/design.json` — the visual system extracted from the built code.
- Screenshots live in `.impeccable/review/` (`desktop.png` 1440×810, `mobile.png` 390×844). Decision comps and their prompt sidecars live in `.impeccable/mocks/decision/`; `model-pick.webp` is the approved comp.

## Assets and their provenance

- `public/assets/players/*.webp` are the seven shipped 830×1044 transparent cutouts; originals and provenance are in `public/assets/PROVENANCE.md`. `public/assets/staff/` and `public/assets/brand/team-logo.png` hold staff cutouts and the NAVI mark.
- `public/assets/merch/*.jpg` are 36 real product images (1024×1024 or 1000×1000). Names, official/fan classification, direct image URLs and seller pages are in `public/assets/merch/PROVENANCE.md`. Never add a product or seller URL that is not in that file.
- `img.navi.gg` and `navi.gg` return **403 to curl/PowerShell** (Cloudflare). The reliable path is the in-app browser: open the image URL directly, read `document.images[0]` into a canvas, and POST the PNG to a local endpoint. CORS/CSP block `fetch` from the image document, and browser screenshots need a visible tab; `window.name` survives origin navigation and carries the data.
- `public/fonts/archivo-latin.woff2` is self-hosted Archivo (variable 100–900). Never switch to a hosted Google Fonts stylesheet.

## Content constraints

- All roster facts are verified from `navi.gg/en/teams/mlbb` and `id-mpl.com/en/team/navi`. Do **not** invent jersey numbers, testimonials, or endorsements. Season statistics are allowed only from the official `id-mpl.com/s18/en/statistics` record.
- Verifiable proof only: MPL ID S18 runners-up, Joshuaa First Team jungler + Rookie of the Season, Aprho First Team roamer. The `/matches` ledger's 19 fixtures are transcribed from the official league record at `id-mpl.com/en/team/navi` (Season 18); scores are normalized NAVI-first.
- The Home `STATS` hexagon uses only Season 18 regular-season figures from `id-mpl.com/s18/en/statistics`, listed in `app/page.tsx`; Febbb has no published figures and gets a no-data panel. Do not invent metrics, jersey numbers, or endorsements.
- Visible role vocabulary is one word everywhere: `JUNGLE`, `EXP`, `MID`, `GOLD`, `ROAM` (the reserve slot stays `RES` in data but is not presented as a starting role).
- Merchandise is an outbound directory: no prices, cart, checkout or endorsement claims. Fan-made goods must never read as official.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
