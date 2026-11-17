---
name: navi-roster-site
description: Work on the NAVI MPL ID site — currently a Next.js 16 roster portfolio in transition to a Persuade-mode fan/team website with a sourced merchandise directory and a GitHub-ready static export. Use before any substantial task, and whenever a build fails, a preview looks stale, a visual mismatch or content change appears, or the deployment/direction changes. Covers production verification, static export, impeccable artifacts, Cloudflare-protected asset sourcing, verified-content rules, and concurrent-edit safety.
---

# NAVI MPL ID site

Use this skill at the start of any substantive task here, and again when a build fails, a preview looks stale, a subagent reports a fix, or the user corrects something. It records the project facts and failure modes that cost the most time.

## Read next

- `PLAN.md` — the confirmed transition decisions and the six-phase handoff.
- `references/verification.md` — build, serve, static export, health-check, screenshot and concurrency commands.
- `references/content-and-assets.md` — verified roster/fixture/stat/merch facts and the asset-sourcing recipe.
- `references/design-system.md` — the shipped token system and composition, plus what is being retired.
- `references/impeccable-workflow.md` — impeccable artifacts, detector/doctor, concept-seed, critique cycles.

## Non-negotiables

- **Verify content before shipping it.** Roster, fixtures, awards and stats come only from the sources named in `references/content-and-assets.md`. Merchandise comes only from `public/assets/merch/PROVENANCE.md`. Never invent jersey numbers, metrics, products, seller URLs or endorsements. If a figure is derived (e.g. the hexagon geometry), label the published value and explain the derivation.
- **The Experience world is retired, but no new look is chosen yet.** The user explicitly requested a replacement visual world. Run `concept-seed --scope direction --mode persuade`, present the roll, and let a direction be locked before any visual code changes. Do not pre-pick a look in code; do not treat the old pinned reskin as still authoritative for new work.
- **Merge, do not overwrite, verified content.** Keep every verified roster/fixture/award/stat fact. Replace only the visual world and the portfolio framing.
- **Merch is an outbound directory, not a checkout.** Every card uses a real image and real outbound seller URL from the provenance file; official and fan-made goods are separated by a visible thin border/label so fan goods are never presented as endorsed.
- **Self-host every asset.** No hotlinked images and no hosted font stylesheet; ship WebP/PNG plus the local Archivo woff2.
- **Verify in a production build.** The dev server never hydrates in this harness. `npm run build`, then `npx next start -p 3200`; a dev-server "dead click" is an environment artifact, not a bug. After enabling static export, verify `out/` with a static server instead.
- **Deliver copy-paste deployable files.** GitHub is the delivery target: no hosting/domain decision is needed. Produce a static `out/` directory with `next.config.ts` export settings and `.nojekyll`; let the buyer deploy it anywhere.
- **Deliver completely.** The user delegates implementation choices and expects the whole request finished, including subagents for blockers. Ask only when a fact only they know blocks progress.
- **Keep the records honest.** When scope, content or the visual system changes, update the matching artifact: `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `.impeccable/surfaces/app-page.md`, `AGENTS.md`, `PLAN.md`, and asset provenance.

## Every-change runbook

1. `npm run build` — the TypeScript gate. If it says another build is running, check for a real `next build` process; if none, remove the stale `.next\lock` and retry.
2. Run the detector on changed UI files and `doctor --json` (exact commands in `references/verification.md`). Clean means `[]` and zero findings.
3. Serve production and confirm the page **and its CSS chunk** return 200; a page that renders unstyled is a stale-server symptom.
4. Screenshot at 1440×810 and 390×844, then inspect the images. Do not judge fidelity from code.
5. Exercise the changed interactions (filter, featured cycle, Stats open/close, Staff tab, keyboard, shop outbound links) and check for console errors.
6. If a subagent claims a fix, re-read the merged source and repeat steps 1–5; concurrent sessions edit these files.

## Gotchas

| Symptom | Cause | Do |
|---|---|---|
| Clicks do nothing; page rendered but inert | `next dev` HMR websocket fails in this harness | Use the production build + `next start`. |
| Unstyled page, CSS 500 or `000` | A rebuild replaced chunks while an old `next start` kept serving the old HTML | Kill the listener on 3200, restart from the current `.next`, then confirm the CSS URL returns 200. |
| `next start` fails after adding `output: "export"` | Static export has no Next server | Serve `out/` with `python -m http.server 3200 --directory out`. |
| `Another next build process is already running` | Stale `.next\lock` after a crashed/concurrent build | Confirm no `next build` process, remove `.next\lock`, rebuild. |
| `&&` is not a valid statement separator | Windows PowerShell | Use separate commands or `;`. |
| `surface-brief write` fails with `os error 3` | Launcher cannot handle this Windows path | Write `.impeccable/surfaces/app-page.md` directly. |
| `doctor` reports `design-sidecar-stale` | `DESIGN.md` was edited after the sidecar | Update `.impeccable/design.json` (`generatedAt`, new tokens/components), or run the document flow. |
| Detector cannot create a browser profile | Sandbox denies the temp profile | Use the source scan; for rendered evidence point Chrome at a writable profile and pass `--cdp`. |
| `img.navi.gg` / `navi.gg` return 403 in shell | Cloudflare blocks curl/PowerShell | Use the in-app browser canvas + `window.name` + local POST recipe. Never hotlink or scrape via curl. |
| In-app browser screenshot says "needs a visible tab" | Headless/background window | Use the Playwright MCP screenshot instead. |
| Playwright page unexpectedly on another port | The MCP session is shared across agents | Re-navigate explicitly and read `page.url()` before trusting a capture. |
| A subagent's report and the files disagree | Concurrent writers | Treat the files and a fresh build as truth; re-read before editing, use targeted `edit` calls, verify the merged result. |
| `opencode` is not on PATH | Desktop install | CLI: `%LOCALAPPDATA%\Programs\ai.opencode.desktop\resources\opencode-cli.exe` (v2.3.0). |
| No git commands work | This directory is not a git repo | Do not assume branches, commits or diffs; verify with files and builds. |

## Playbooks

**Direction change.** Read `PLAN.md` and `references/impeccable-workflow.md`. Run the `concept-seed` roll, present the dealt directions on the decision page, and write the locked six-block contract to `.impeccable/surfaces/app-page.md`. Rewrite `DESIGN.md` and the sidecar only at finish from the built world.

**Visual refinement.** Read the surface brief and `references/design-system.md`; edit `app/page.tsx` / `app/globals.css` using existing tokens; run the every-change runbook; inspect both screenshots; fix and recapture once, batching corrections.

**Content or data change.** Confirm the fact against the official source named in `references/content-and-assets.md` or `public/assets/merch/PROVENANCE.md`. Update the page, `AGENTS.md` content constraints, and any provenance note in the same pass. Do not add ages, jersey numbers, invented products, seller URLs or individual stats the source does not publish.

**Asset refresh.** Follow the browser-canvas → `window.name` → local POST recipe in `references/content-and-assets.md`; transcode with `ffmpeg -pix_fmt bgra` for alpha; record source URL and conversion in the correct provenance file.

**GitHub static export.** Add `next.config.ts` with `output: "export"`, `basePath` from `NEXT_PUBLIC_BASE_PATH`, `images.unoptimized` and `trailingSlash`; rebuild; create `out/.nojekyll`; verify `out/` with a static server. Do not invent a repo URL — leave that to the buyer.

**Impeccable refinement cycle.** Run `context` once per session, then follow `references/impeccable-workflow.md`. Critique needs two isolated assessment subagents; apply its fixes, then re-run build/detector/doctor and capture fresh screenshots. Do not record a `build-phase finish` state that never ran.

## Done means

- `npm run build` passes; detector returns `[]`; `doctor --json` returns zero findings.
- The served page and its CSS chunk return 200; no console errors.
- Desktop and mobile screenshots were inspected, and the phone composition still fits its proof strip above the fold.
- Changed interactions work with mouse and keyboard; Stats closes with Escape and restores focus.
- Merch cards use only sourced images/URLs, with official and fan-made separated visibly.
- For GitHub delivery, `out/` exists, contains `.nojekyll`, and serves correctly from a static server.
- Content is sourced, docs and provenance are consistent, and nothing invented shipped.

## Maintenance

Update this skill when the user corrects you, a failure or retry loop occurs, a recorded instruction is wrong or incomplete, a better method is verified, or a manual step repeats. Find the root cause; decide whether the skill caused or failed to prevent it; verify the better approach; apply the admission test (would a fresh agent act differently, is it non-obvious, recurring, and verified?); edit the right file in place, merging instead of duplicating; delete contradicted content without "formerly" notes; re-check size and move detail into `references/`. The user's current instructions outrank this skill.

Supporting script: `scripts/verify.ps1` runs the build plus detector/doctor and prints the evidence.
