# Media photo provenance

Instagram imagery sourced from the **official NAVI MLBB account** ([@navi_mlbb](https://www.instagram.com/navi_mlbb/), verified, owner id `25390154119`). All images were retrieved on **2026-11-17** from each post's server-rendered embed (`/p/<shortcode>/embed/captioned/` or `/reel/<shortcode>/embed/captioned/`), using the `1080w` source in Instagram's own `srcset` — i.e. the full-quality upload, not the 640px Open Graph thumbnail.

## Shipping files

| File (WebP + JPG master) | Source post | Native size | Post date / era | Depicts |
|---|---|---|---|---|
| `navi-roster-poster` | [DFzo1gGvupx](https://www.instagram.com/p/DFzo1gGvupx/) | 1080×1350 | 2025-02-08, MPL ID S15 | Official NAVI MLBB roster poster (black/yellow). Caption names Aether, Woshipaul, HanaFiTzy, xMagic, **Karss**, **Zeonn**. |
| `karss-reel` | [DH51yLKvSTX](https://www.instagram.com/reel/DH51yLKvSTX/) | 1080×1920 | MPL ID S17, 2026 | Thank-you reel for **Karss**; the person shown is presumed Karss from the post context (not explicitly labelled in-frame). |
| `player-of-the-week` | [DHvTKqwPAFH](https://www.instagram.com/reel/DHvTKqwPAFH/) | 1080×1920 | MPL ID S17, 2026 | "Player of the Week: Aether" graphic — black/yellow, on-brand. Aether is **not** on the current roster. |
| `mic-check-tlid` | [DHIci08PYKA](https://www.instagram.com/reel/DHIci08PYKA/) | 1080×1920 | MPL ID S16 | Mic-check thumbnail vs Team Liquid ID; NAVI player in headset, dark/yellow grade. |
| `mic-check-junior` | [DIdlQyhvIud](https://www.instagram.com/reel/DIdlQyhvIud/) | 1080×1920 | MPL ID S11 | NAVI Junior mic-check thumbnail, dark/yellow grade. |
| `navi-junior-transfer` | [DIiJMcgPqpw](https://www.instagram.com/p/DIiJMcgPqpw/) | 1080×1080 | MPL ID S15 | "BQ SYAI" transfer announcement; black/yellow, NAVI Junior to NAVI. |
| `fan-wall` | [DfzC2f_kzo5](https://www.instagram.com/p/DfzC2f_kzo5/) | 1080×720 | 2026 | Candid arena photo: supporters waving NAVI flags. Landscape — best used full-width or object-fit: cover. |

## Format

- **Masters:** `*.jpg` — the untouched 1080w JPEG from Instagram's CDN. Source of truth.
- **Shipping derivatives:** `*.webp` — `ffmpeg -i <master>.jpg -c:v libwebp -quality 85 <name>.webp`. No crop or resize; full resolution retained.
- Long edge is **1080 px** on every file; the reel stills are full-HD 1080×1920 portrait.

## Selection rationale

Chosen for fit with the pinned "Dugout Lightboard" visual system: near-black grounds, NAVI yellow as the only saturated accent, heavy condensed display type. Rejected candidates were the blue/white "Rebellion Esports" era graphics (e.g. `Cs5iGf8rseN`, `CjnAn9rNXt1`, `C9j5PrEvQsm`), which break the palette.

## Captioning caution (important)

These are posts from **earlier seasons** and several depict people who are **not** on the current verified roster (Aether, BQ SYAI, NAVI Junior players). Do **not** caption them with current player names, jersey numbers, or stats. Safe captions describe the source and era, e.g. "NAVI MLBB · official Instagram", "MPL ID S17", "Mic check · MPL ID S16", "Supporters · NAVI Nation". Only `navi-roster-poster` and `karss-reel` have a defensible player association from their own captions.
