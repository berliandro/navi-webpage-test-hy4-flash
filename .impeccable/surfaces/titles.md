# Shape brief: Titles (NAVI MPL ID fan hub)

Mode: Read, with Persuade energy at the opening. Audience: an MPL ID S18 fan who wants to know what this team has won, and why the NAVI name carries weight.

## Storytelling theory — the widening lens

The page does **not** open with a museum of other games. It opens on the thing the visitor came for: this MLBB squad's four verified Season 18 honours, rendered with the same four crests already sewn onto Home. Only after that proof is clear does the camera pull back — first to the 2010 archive photographs, then to the chapter timeline, then to the full list of fronts where NAVI competes. Each step answers the question the previous step raises: *what did they win? → who are they? → how long have they been doing this? → where else?*

That order is the thesis: **the season is the shirt; the history is the cloth it was cut from.** Heritage is context, never a substitute for the S18 record. No later-season MLBB result, player, metric or endorsement enters this project through the heritage block.

## Structure

1. **The season, first.** S18 runners-up, Joshuaa's two individual honours and Aprho's First Team roamer call, shown with the four authored crest PNGs from `public/assets/achievements/`. Exactly the four verified awards already in `app/titles/page.tsx`.
2. **The name.** Two sourced 2010 archive photographs (ESWC and WCG) with visible CC BY-SA 3.0 credit, framed as fabric plates, not a gallery wall.
3. **History after history.** Five dated chapters — 2009 foundation, 2010 triple crown, 2011 The International, 2021 first CS:GO Major, 2024 first CS2 Major — each with a source link. Years are the sequence; no invented ranking or "greatest" claim.
4. **The reach.** A stitch-tab strip of the games/leagues in the organisation record, with MLBB · MPL ID first so the page returns to its subject.
5. **The wider record.** An expandable disclosure (keyboard accessible, `aria-expanded`) carrying the org-level fact list and outbound links to the official site and the sourced record. It is a drawer, not a modal; nothing is hidden from assistive tech.

## Constraints

- Every heritage fact and image URL is in `public/assets/heritage/PROVENANCE.md`. Nothing invented.
- Self-hosted images through `asset()`; no hotlinks. Outbound links open in a new tab with `rel="noopener noreferrer"`.
- Keep the Cut-and-Sew world: cloth panels, one yellow thread, squared 2px seams, Archivo type ramp, one authored press-in moment, reduced-motion support.
- Responsive 1440→390 with no clipping; the S18 block stays above the fold on a phone.
