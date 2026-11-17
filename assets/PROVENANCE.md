# Asset provenance

## Player cutouts

- **Masters:** `players/*.png` — the seven official 830×1044 transparent player cutouts from `img.navi.gg`. Retained as the source of truth.
- **Shipping derivatives:** `players/*.webp` — full-resolution WebP encodings of those masters. No crop, resize, or content change.
- **Conversion:** `ffmpeg -i <master>.png -c:v libwebp -quality 82 -pix_fmt bgra <name>.webp`
  - `-pix_fmt bgra` is deliberate: it keeps the alpha channel at full resolution. The usual `yuva420p` WebP path subsamples alpha 2× and frays the cutout edges against the dark plate.

## Staff cutouts

- `staff/ynot.*` and `staff/jacklee.*` — the official 830×1044 transparent NAVI portraits from the staff members' own `navi.gg` profile pages (`/en/mlbb/ynot`, `/en/mlbb/jacklee`). Full-resolution source: `https://img.navi.gg/players/2026/10/players-14478/navi_portrait/64686/conversions/ynot-830x1044-webp.webp` and `https://img.navi.gg/players/2026/10/players-14482/navi_portrait/64690/conversions/jacklee-830x1044-webp.webp`. Same dimensions and treatment as the seven player cutouts.
- `staff/han.*` — the official Season 18 analyst cutout from `id-mpl.com/en/team/navi`: `https://cdn.id-mpl.com/season18/player/NAVI/Han.png` (signed CDN URL). NAVI's own site does not publish an analyst portrait, so this is the closest official source; it ships at the league's native 500×500 with transparent alpha.
- **Masters:** `staff/*.png` — retained as alpha-safe working masters. The two NAVI portraits were decoded from the CDN WebP (no higher-resolution original is published); HAN's PNG is the league's original file.
- **Shipping derivatives:** `staff/*.webp` — `ffmpeg -i <master>.png -c:v libwebp -quality 82 -pix_fmt bgra <name>.webp`, the same alpha-safe encoding used for the player derivatives.
- The two NAVI portraits were retrieved through `images.weserv.nl` as a server-side proxy because `img.navi.gg` returns 403 to direct clients; no crop, resize, or content change was applied.

## Brand

- `brand/team-logo.png` — the NAVI team mark, used as the in-page logo and favicon. Left as PNG (15 KB) for maximum favicon compatibility.
