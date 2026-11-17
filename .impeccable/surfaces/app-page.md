# Surface: Home (NAVI fan hub)

Mode: Persuade. Audience: a NAVI MPL ID fan / MLBB community visitor arriving from search, social or fan channels. Job: understand the team's current roster and results quickly, and find the path to merchandise. The former Experience/portfolio identity is retired.

Status: direction locked on the decision page; build in progress. The replacement world is the Cut-and-Sew Jersey, chosen by the user from the IMPECCABLE'S PICK card of the `concept-seed` roll. This changed no code yet; `DESIGN.md` and the sidecar are rewritten at finish from the built world.

Proof on hand: verified NAVI MPL ID roster (7 players + staff), S18 runner-up, First Team and Rookie awards, the official Season 18 fixture ledger, and official Season 18 regular-season statistics from `id-mpl.com/s18/en/statistics`. No invented numbers, stats, jersey numbers or endorsements. The merchandise directory is sourced from 36 real images with a complete official/fan provenance table in `public/assets/merch/PROVENANCE.md`.

Scope: the Home stage introduces the team and routes to information (`/matches`, `/titles`, `/media`) and the new shop surface. Verified roster content is kept; the visual world is replaced. `Reference.gif` frame 1 is no longer the approved comp — the retired Experience contract below no longer binds this surface.

Retired direction contract: the previous contract (THESIS "roster is the artifact"; OWN-WORLD near-black / NAVI-yellow; faithful reskin of `Reference.gif` frame 1; `seed: none (pinned)`) belonged to the portfolio identity. Do not implement it.

Visitor mode and outcome: inform first, act second. A first-time visitor should know what this team is, see the current verified roster and results, and find one obvious route to the shop. Success is an informed click-through to a real product's seller site.

## Direction contract

THESIS: The team is the shirt every fan wears and shops for. The category-default fan site — hero photo, row of equal player cards, merch grid — is refused. The page is one garment seen once, at one scale, from one point of view: its chest carries the identity and proof, its woven tag carries the roster, its care label carries the action.

OWN-WORLD: Cut-and-sew construction as the recognizable language with all content removed — black and off-white curved panels, visible seam lines and garment-tape edges, one NAVI-yellow piping thread as the only signal colour. Heat-pressed condensed capitals for the team name and proof; a narrow vertical woven tag column sets tiny condensed player names and one-word roles; tabular figures only where a verified number appears. No gradients, glass, generic icon tiles, or stock component shells.

STORY: The visitor reads NAVI as something you wear and belong to, not a case study. They see the seven verified names on the woven tag, the S18 runner-up proof heat-pressed on the chest panel, and the current lineup in one glance, then follow the stitched Shop action to a directory of real merchandise where official and fan-made goods are visibly separated. Fan-made goods are never presented as endorsed.

FIRST VIEWPORT: A full-bleed panelled jersey fills the fold at 1440×810. A top rail sets the NAVI mark and plain links Roster, Matches, Titles, Media, Shop. The chest panel carries NAVI MPL ID in heat-pressed condensed caps and one line of verified proof: MPL ID Season 18 runners-up. A vertical woven tag at the right edge lists the seven players with the one-word roles JUNGLE, EXP, MID, GOLD, ROAM and a staff line. One unmistakable NAVI-yellow stitched Shop the collection tab sits at the tag's foot. A slim verified results strip runs along the bottom edge and the next section starts below it. On phones the panels stack and the tag becomes a horizontal hem band; the Shop action stays above the fold.

FORM: The Cut-and-Sew Jersey — position 1 of the grounded list, locked from the IMPECCABLE'S PICK card; `seed:7d5bf508817409da`. Approved comp: `.impeccable/mocks/decision/model-pick.webp` (prompt sidecar marked approved) is the finish-review critique reference.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

Scope and boundaries: keep all verified content; no invented roster facts, jersey numbers, stats, testimonials or endorsements. The shop is an outbound directory, not a checkout. Keep self-hosted assets and no hosted font stylesheet. Do not restyle the old pinned world — replace it. Visible role vocabulary stays one word: JUNGLE, EXP, MID, GOLD, ROAM.

States and ranges: realistic content — 7 players + staff, 19 verified fixtures, verified awards and a partial stat set (Febbb has no published figures → designed no-data state). Merchandise: 36 sourced images, official and fan-made, each linking to its real seller page.

Interaction and layout: the garment is the page's carrier, not a picture of a garment. Navigation reads as links on the panels, the roster reads as set text on the tag, and the Shop action is plainly clickable. Roster filter, featured-player cycling and the Stats panel work in the garment's vocabulary. The phone composition keeps the proof strip and Shop action above the fold.

Constraints and open decisions: GitHub is the delivery target — produce a static `out/` directory with `.nojekyll` for copy-paste deployment; no domain decision blocks launch. Do not invent a repo URL. Product imagery comes only from `public/assets/merch/PROVENANCE.md`.
