# Verification commands

All commands run from the project root on Windows PowerShell. Do not chain with `&&`.

## Build

```powershell
npm run build
```

Use it as the TypeScript and static-render gate. If it reports another build running:

```powershell
Get-CimInstance Win32_Process -Filter "name='node.exe'" |
  Where-Object { $_.CommandLine -match 'next build' } |
  Select-Object ProcessId, CommandLine
```

If nothing is building, the lock is stale:

```powershell
Remove-Item .next\lock -Force -ErrorAction SilentlyContinue
npm run build
```

## Detector and doctor

```powershell
$impeccable = "$env:USERPROFILE\.config\opencode\skills\impeccable\scripts\impeccable.cmd"

& $impeccable detect --json `
  'app/page.tsx' 'app/MediaImage.tsx' 'app/layout.tsx' 'app/SiteHeader.tsx' `
  'app/SubPage.tsx' 'app/globals.css' 'app/matches/page.tsx' 'app/titles/page.tsx' `
  'app/media/page.tsx' 'app/shop/page.tsx'

& $impeccable doctor --json
```

Clean = `[]` for the detector and `"findings": []` for doctor. Pass markup files; a CSS-only list undercounts. The launcher may print an "engine unknown / pins 0.1.24" warning — it still runs. A full rendered scan needs Chrome on `--remote-debugging-port` and `detect --cdp`. `/design-notes` is retired; `/shop` is included. The detector also checks literal font sizes against the `DESIGN.md` typography ramp — tokenize them in `:root` or document every size.

## Serve and health-check

```powershell
# stop whatever owns 3200, then start the current build
Get-NetTCPConnection -LocalPort 3200 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
npx next start -p 3200
```

Run the start in the background. Then verify both the document and the CSS chunk:

```powershell
$html = curl.exe -s http://127.0.0.1:3200/
$chunk = ([regex]'/_next/static/chunks/[^"]+\.css').Match($html).Value
curl.exe -s -o NUL -w "page:%{http_code}`n" http://127.0.0.1:3200/
curl.exe -s -o NUL -w "css:%{http_code}`n" "http://127.0.0.1:3200$chunk"
```

Both must be 200. If the document is 200 but the chunk is 500/000, the server is stale: rebuild, kill the listener, restart.

## GitHub static export

The delivery target is a copy-paste deployable folder, not a live host. Add `next.config.ts` with `output: "export"`, `basePath` from `NEXT_PUBLIC_BASE_PATH`, `images: { unoptimized: true }` and `trailingSlash: true`; the app already uses plain `<img>` tags, so images need no loader. `basePath` rewrites Next's own chunks only — every image and metadata URL must go through `asset()` from `app/assetPath.ts`, and `prebuild` injects the base path into the self-hosted font URL. Otherwise the page loads styled but all cutouts fall back to monograms.

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/navi-webpage-test-hy4-flash"   # omit for a custom domain / root
npm run build                                       # runs prebuild automatically
New-Item -ItemType File -Path 'out\.nojekyll' -Force
# serve the export under the same prefix via a junction (Windows)
$preview = "$env:TEMP\opencode\static-preview"
New-Item -ItemType Directory -Force -Path $preview | Out-Null
New-Item -ItemType Junction -Path "$preview\navi-webpage-test-hy4-flash" -Target (Resolve-Path 'out').Path -Force | Out-Null
python -m http.server 3200 --directory $preview
```

Verify `http://localhost:3200/navi-webpage-test-hy4-flash/` plus its CSS chunk, `assets/players/joshuaa.webp`, `assets/brand/team-logo.png`, `fonts/archivo-latin.woff2`, a merch image and `shop/` all return 200. `next start` does **not** work once `output: "export"` is set; use the static server above. Leave the real repo URL to the buyer — do not invent one.

## Screenshots

Use the Playwright MCP tools through code mode (no `browser_run_code_unsafe` in this harness). Paths are relative to the workspace; the static-export preview needs the repo prefix:

```js
const url = "http://127.0.0.1:3200/navi-webpage-test-hy4-flash/";
await tools.playwright.browser_navigate({ url });
await tools.playwright.browser_resize({ width: 1440, height: 810 });
await tools.playwright.browser_take_screenshot({ filename: ".impeccable/review/desktop.png", scale: "css" });
await tools.playwright.browser_resize({ width: 390, height: 844 });
await tools.playwright.browser_take_screenshot({ filename: ".impeccable/review/mobile.png", scale: "css" });
const fold = await tools.playwright.browser_evaluate({ function:
  "() => ({ proofBottom: Math.round(document.querySelector('.hem').getBoundingClientRect().bottom), viewportH: innerHeight })" });
```

Wait for the image fade-in before judging the bench prints: a freshly captured `loaded` image can still compute `opacity: 0` during its 460ms transition. Read the PNGs with the image reader before judging. Re-capture after fixes; do not reuse a pre-fix screenshot. The phone proof strip must end above 844px.

The MCP session is shared with other agents. Always `goto` explicitly and read `page.url()` if a capture looks wrong. The in-app browser screenshot path fails when its tab is not visible; Playwright does not have that limit.

## Interaction checks

At 1440×810 and 390×844:

- Click a role chip: the first in-role player is promoted to hero, the `Focus · N <role>` count appears, and out-of-role cards dim to ~50%; with a single in-role player the bench stays lit.
- Next/previous within a filter stays inside that role and leaves the chip unchanged; clicking an out-of-role companion clears the lens to ALL so arrows move again.
- Click a companion: it becomes featured and its flank slot is backfilled; no duplicate player.
- Season 18 readout: opens (and scrolls into view on phones), shows six published values, Escape closes and returns focus to the toggle; Febbb shows the no-data panel; the Staff tab has no toggle.
- Staff: three staff cards with portraits and the contextual proof strip.
- Tabs: ArrowLeft/ArrowRight move and focus; `aria-selected` follows.

## Concurrency

- Concurrent agents rebuild `.next` and edit `app/page.tsx` / `app/globals.css`. Re-read a file immediately before editing it, and re-run the build and detector after merges.
- Treat subagent reports as claims: verify with `Select-String`, `git`-free file reads, a fresh build, and screenshots.
- A stale preview server is the most common false alarm. Restart it before concluding the code is broken.
- `.next` and `node_modules` are generated; never edit them.
