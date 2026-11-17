# Impeccable workflow in this project

The global skill is `impeccable`; load it with the `skill` tool (`{ "id": "impeccable" }`). Its launcher on this machine:

```powershell
$impeccable = "$env:USERPROFILE\.config\opencode\skills\impeccable\scripts\impeccable.cmd"
```

## Setup and artifacts

- Run `& $impeccable context` **once per session**, from the project root.
- The durable artifacts are `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, `.impeccable/config.json`, `.impeccable/surfaces/app-page.md`, `.impeccable/review/` screenshots, and `.impeccable/critique/` snapshots.
- The configured build path is `comp`. The old Experience direction was pinned, but the user has retired it and requested a replacement Persuade-world fan site. A replacement world **requires** a `concept-seed` roll and a locked direction before visual code; do not pick a look ad hoc. Do not fabricate a build-phase ledger that never ran; `build-phase finish` fails when `.impeccable/build/state.json` is absent.
- `surface-brief write` fails on this Windows path (`os error 3`). Edit `.impeccable/surfaces/app-page.md` directly and keep its direction contract blocks intact.
- Editing `DESIGN.md` makes `doctor` report `design-sidecar-stale`. Update `.impeccable/design.json` (`generatedAt`, plus any new color/component entries) in the same pass.

## Replacement world (fan-site direction)

```powershell
& $impeccable concept-seed --scope direction --mode persuade
& $impeccable serve-question --schema
& $impeccable serve-question --start --payload <payload.json>
& $impeccable serve-question --wait --key <key>
```

- Record the printed `SEED REFERENCE:` value, never the raw seed key, in the surface brief's FORM line.
- The roll deals directions; a direction must be locked on the decision page before any build. With image generation available, create one comp per card under `.impeccable/mocks/decision/` with a prompt sidecar. Build payload carries `"buildPath":{"value":"comp","toggle":true}`.
- Write the six-block contract (THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM, FINISH) directly to `.impeccable/surfaces/app-page.md`; `surface-brief write` fails on this Windows path.
- `DESIGN.md` and `.impeccable/design.json` are rewritten at finish from the built world, not during planning.

## Detector and doctor

```powershell
& $impeccable detect --json 'app/page.tsx' 'app/globals.css'
& $impeccable doctor --json
```

- Clean = `[]` and `"findings": []`. Exit 2 means findings, not a crash.
- The launcher may warn that its bundled binary reports "engine unknown" against the pinned version; the scan still runs.
- A rendered detector pass needs a Chrome instance with `--remote-debugging-port` pointing at a writable profile, then `detect --cdp <port>`. The default temp-profile launch is denied in this sandbox.
- `detect` is a mechanical check, not a design review; `doctor` checks artifact drift, not truth drift.

## Refinement commands

Use the skill's command references rather than ad-hoc edits:

- `harden` — resilience, empty/failure states, long/RTL text, focus.
- `clarify` — labels, errors, copy; preserve pinned vocabulary.
- `typeset` — role tokens and legibility; do not add a kicker.
- `adapt` — responsive composition, safe areas, coarse pointers.
- `animate` — one authored moment; reduced-motion guard.
- `optimize` — measure first; image derivatives and delivery.
- `distill` — remove genuine redundancy only.
- `polish` — final cross-viewport pass.
- `document` — refresh `DESIGN.md` / sidecar from built code.

Every refinement ends with the every-change runbook in `SKILL.md`.

## Critique

`impeccable.cmd critique` does not exist; critique is an LLM-driven flow:

1. Resolve the target to `app/page.tsx`; the slug is `app-page-tsx`.
2. Spawn **two isolated subagents in parallel**: Assessment A (design review, Nielsen heuristics, specificity, personas) and Assessment B (detector + browser evidence). They must not see each other's output.
3. Synthesize: report header, heuristic table out of the applicable maximum (Experience and Persuade surfaces commonly mark 7 and 10 `n/a`, so /32; if both are scored use /40), specificity verdict, strengths, 3–5 P0–P3 issues with fixes and suggested commands, persona red flags, minor observations, questions.
4. Persist with `critique-storage write` if it works; the helper can fail with access-denied in this sandbox — report the failure and keep the report in chat.
5. If questions are skipped under an autonomous goal, include the literal line `Questions skipped: <reason>` rather than ending silently.
6. Apply the fixes, re-run the gates, and only then start the next cycle.

The finish reviewer and documenter subagents are not available in this harness; substitute a fresh general subagent with the full input packet and disclose it, or do the pass in-thread and say so.

## Documentation discipline

- `PRODUCT.md` owns product truth and scope; `DESIGN.md` owns visual decisions; the surface brief owns route strategy; `AGENTS.md` owns agent-facing commands and content constraints.
- When a new capability ships, update all four that apply in one pass. Do not duplicate product truth into `DESIGN.md`.
- Keep asset provenance beside the assets and mention it in `AGENTS.md`.
- The Next.js block at the end of `AGENTS.md` is re-added by `next dev`; leave it alone.
