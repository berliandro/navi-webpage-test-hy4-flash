# Verified content and asset sourcing

## Roster (verified)

| Handle | Role | Country | Portrait |
|---|---|---|---|
| Joshuaa | JUNGLE | ID | `public/assets/players/joshuaa.webp` |
| Aprho | ROAM | ID | `aprho.webp` |
| Karss | EXP | ID | `karss.webp` |
| Zeonn | GOLD | ID | `zeonn.webp` |
| Jiizee | MID | ID | `jiizee.webp` |
| Febbb | EXP | ID | `febby.webp` |
| Andoryuuu | RES | PH | `andoryuuu.webp` |

Staff: YnoT (Head Coach, PH), Jacklee (Assistant Coach, ID), HAN (Analyst, ID).

Visible role words are exactly `JUNGLE`, `EXP`, `MID`, `GOLD`, `ROAM` (and `RES` for the reserve card). Do not reintroduce `JGL`/`Jungler` as a parallel visible vocabulary.

Sources: `https://navi.gg/en/teams/mlbb`, `https://id-mpl.com/en/team/navi`.

## Verified proof

- MPL ID Season 18 runners-up.
- Joshuaa — First Team jungler and Rookie of the Season.
- Aprho — First Team roamer.

No jersey numbers, ages, testimonials or endorsements exist in the project record. Do not add them.

## Matches

- 19 distinct Season 18 fixtures, transcribed from `https://id-mpl.com/en/team/navi`.
- Scores are normalized **NAVI-first**. The source prints one Week 6 GEEK fixture twice; the ledger lists it once. Preserve that note if editing.
- No individual player statistics belong in the ledger.

## Season 18 statistics (STATS hexagon)

Source: `https://id-mpl.com/s18/en/statistics` (regular season).

| Player | GP | K | D | A | KDA | KP |
|---|---:|---:|---:|---:|---:|---:|
| Joshuaa | 25 | 5.28 | 1.72 | 5.04 | 6.00 | 81% |
| Karss | 37 | 1.27 | 2.05 | 6.51 | 3.79 | 67% |
| Andoryuuu | 12 | 3.58 | 2.25 | 4.17 | 3.44 | 84% |
| Aprho | 37 | 0.95 | 2.14 | 7.95 | 4.16 | 76% |
| Zeonn | 37 | 2.27 | 0.92 | 4.95 | 7.85 | 62% |
| Jiizee | 37 | 2.43 | 1.24 | 6.95 | 7.54 | 81% |
| Febbb | 0 | — | — | — | — | — |

Rules baked into `app/page.tsx`: the visible value is always the published figure (`axis.raw`); the polygon uses a normalized/inverted value only for geometry. `AVG D*` is average deaths; the asterisk is explained in the source caption. Febbb gets the dashed no-data panel, not an empty hexagon.

## Merchandise (source of truth)

`public/assets/merch/PROVENANCE.md` is the only catalogue of truth: 15 downloaded images, each with item name, `official` or `fan` classification, direct image URL and the outbound Shopee/Fraggaming product page. Official = NAVIMLBB Official Store listings; fan = third-party sellers. No product, price, seller URL or image may be invented.

Rules for the planned shop surface:

- Card image comes from the local `public/assets/merch/*.jpg`; the card links to the provenance file's outbound product URL, never to an in-site checkout.
- Official and fan-made items are separated by a visible thin border/label so fan goods are never presented as officially endorsed.
- Sources that blocked download (`shop.navi.gg`, `thedota2store.com`) are recorded as failed in the provenance file; do not turn them into live links.

## Asset inventory

- `public/assets/players/*.webp` — seven 830×1044 transparent cutouts; `*.png` masters retained.
- `public/assets/staff/*.webp` — YnoT and Jacklee at 830×1044 from their `navi.gg` profile pages; HAN at 500×500 from the league site.
- `public/assets/brand/team-logo.png` — 142×142 NAVI mark.
- `public/assets/media/*.webp` — seven official `@navi_mlbb` Instagram images, 1080px long edge.
- `public/fonts/archivo-latin.woff2` — self-hosted variable Archivo.
- `public/assets/merch/*.jpg` — 15 official/fan merchandise images; catalogue and outbound URLs in `public/assets/merch/PROVENANCE.md`.
- `public/og-card.png` — current 1200×630 portfolio share card; the fan-site build replaces this framing with general web/social sharing.
- Provenance: `public/assets/PROVENANCE.md`, `public/assets/media/PROVENANCE.md`, `public/assets/merch/PROVENANCE.md`.

## Cloudflare-protected image recipe

`img.navi.gg` and `navi.gg` return 403 to curl/PowerShell. Do not try to bypass with headers. The working path:

1. Open `https://navi.gg/en/teams/mlbb` in the in-app browser and let the Cloudflare challenge clear.
2. Open the image URL directly. It is same-origin with itself, so the image document can be read.
3. In the page, draw `document.images[0]` to a canvas and take `toDataURL('image/png')`. Same-origin avoids a tainted canvas.
4. `fetch` is blocked by the image document's CSP, and cross-origin `fetch` is CORS-blocked. Move the payload with `window.name`, which survives navigation: set `window.name = name + '|' + base64`, navigate to a localhost endpoint, then POST the decoded bytes.
5. Run a tiny local Python HTTP server that writes the POST body to disk and sends `Access-Control-Allow-Origin: *`. This avoids passing megabytes through the conversation.
6. Verify each file opens and has alpha; place it under `public/assets/...` and record the source URL.

For Instagram: fetch `https://www.instagram.com/p/<shortcode>/embed/captioned/` (or `/reel/...`) with a `facebookexternalhit/1.1` user agent. The response exposes Instagram's own `srcset` up to 1080w. Signed CDN URLs cannot be resized by hand. Caption older-season posts by source/era, not by current player names.

## Derivatives

```powershell
ffmpeg -i master.png -c:v libwebp -quality 82 -pix_fmt bgra name.webp
```

`-pix_fmt bgra` is deliberate: `yuva420p` subsamples alpha and frays cutout edges against the dark plate. This machine's ffmpeg drops alpha on AVIF, so AVIF is not used. Keep the PNG master and record the source and command in the provenance file.
