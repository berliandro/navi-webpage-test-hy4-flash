# NAVI MPL ID — Season 18 Fan Hub

A fan-facing website for the **NAVI Mobile Legends: Bangbang Professional League Indonesia Season 18** squad. Verified roster, fixtures, titles and Season 18 statistics, plus an outbound directory of real official and fan-made merchandise.

## Scope

This project is **specific to MPL ID Season 18**. It is not a permanent team site and not a template for later seasons. When the next season begins, create a **new, separate project** for it. The team stays NAVI MPL ID; this season's data, visual world and deployment are not reused here. Do not add later-season facts to this repository.

## Build and preview

```
npm install
npm run build        # runs prebuild, then next build; typecheck included
npm run check:links   # verifies every exported internal URL carries the repo prefix
npm run dev           # :3000 — HMR does not hydrate in this harness; use the export for visual checks
```

For a production-equivalent preview, build with `NEXT_PUBLIC_BASE_PATH=/navi-webpage-test-hy4-flash`, then serve `out/` under that prefix:

```
python -m http.server 3200 --directory out
```

Set `NEXT_PUBLIC_SITE_URL` to the published origin before building so share-card URLs resolve.

## Delivery

`out/` is a static export for GitHub Pages under `/navi-webpage-test-hy4-flash` and includes `.nojekyll`. No server, API keys or runtime configuration are required.

## Records

- `PRODUCT.md` — product truth and Season 18 scope.
- `PLAN.md` — transition plan and decisions.
- `DESIGN.md` + `.impeccable/design.json` — the Cut-and-Sew Jersey visual system.
- `.impeccable/surfaces/` — surface briefs and the locked direction contract.
- `AGENTS.md` — commands, content rules and asset provenance.
