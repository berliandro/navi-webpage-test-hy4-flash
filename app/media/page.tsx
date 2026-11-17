import type { Metadata } from "next";
import MediaImage from "../MediaImage";
import SubPage from "../SubPage";
import { asset } from "../assetPath";

export const metadata: Metadata = {
  title: "Media — NAVI MPL ID",
  description: "Official player portraits and social imagery from NAVI MPL ID.",
};

// Official @navi_mlbb Instagram posts, sourced at 1080px from the league's
// own embeds. Captions name the source and era, never a current player unless
// the post itself makes that association — several posts predate this roster.
const socialPosts = [
  {
    src: "/assets/media/navi-roster-poster.webp",
    caption: "Official roster poster · MPL ID S15",
    alt: "NAVI MLBB roster poster in black and yellow",
    width: 1080,
    height: 1350,
  },
  {
    src: "/assets/media/karss-reel.webp",
    caption: "Karss · MPL ID S17",
    alt: "NAVI MLBB reel thumbnail featuring Karss",
    width: 1080,
    height: 1920,
  },
  {
    src: "/assets/media/player-of-the-week.webp",
    caption: "Player of the Week · MPL ID S17",
    alt: "NAVI MLBB Player of the Week graphic in black and yellow",
    width: 1080,
    height: 1920,
  },
  {
    src: "/assets/media/mic-check-tlid.webp",
    caption: "Mic check · MPL ID S16",
    alt: "NAVI player in a headset during a mic-check reel",
    width: 1080,
    height: 1920,
  },
  {
    src: "/assets/media/mic-check-junior.webp",
    caption: "NAVI Junior · MPL ID S11",
    alt: "NAVI Junior mic-check reel thumbnail",
    width: 1080,
    height: 1920,
  },
  {
    src: "/assets/media/navi-junior-transfer.webp",
    caption: "Transfer announcement · MPL ID S15",
    alt: "NAVI MLBB transfer announcement graphic",
    width: 1080,
    height: 1080,
  },
  {
    src: "/assets/media/fan-wall.webp",
    caption: "Supporters · NAVI Nation",
    alt: "Supporters waving NAVI flags in the arena",
    width: 1080,
    height: 720,
  },
];

const portraits = [
  { handle: "Joshuaa", src: "/assets/players/joshuaa.webp" },
  { handle: "Aprho", src: "/assets/players/aprho.webp" },
  { handle: "Karss", src: "/assets/players/karss.webp" },
  { handle: "Zeonn", src: "/assets/players/zeonn.webp" },
  { handle: "Jiizee", src: "/assets/players/jiizee.webp" },
  { handle: "Febbb", src: "/assets/players/febby.webp" },
  { handle: "Andoryuuu", src: "/assets/players/andoryuuu.webp" },
];

// A monogram must be a single grapheme: code-unit slicing breaks emoji
// surrogate pairs and combining marks, and an empty handle still has to yield
// a visible fallback. Mirrors the home page's segmenter approach locally so
// this route stays self-contained.
const GraphemeSegmenter =
  typeof Intl === "object" && "Segmenter" in Intl ? Intl.Segmenter : undefined;

function firstGrapheme(value: string): string {
  const text = value.trim();
  if (!text) return "?";
  if (GraphemeSegmenter) {
    return (
      Array.from(
        new GraphemeSegmenter(undefined, { granularity: "grapheme" }).segment(text),
        (segment) => segment.segment,
      )[0] ?? "?"
    );
  }
  return Array.from(text)[0] ?? "?";
}

export default function MediaPage() {
  return (
    <SubPage
      active="Media"
      title="Media"
      lede="Official player portraits and social imagery from the NAVI MPL ID roster."
    >
      {portraits.length === 0 ? (
        <div className="page-empty" role="status">
          <p>No player portraits are available in this portfolio preview.</p>
        </div>
      ) : (
        <>
          <div className="media-grid" role="group" aria-label="NAVI MPL ID player portraits">
            {portraits.map((player, index) => (
              <figure className="media-item" key={`${player.handle}-${index}`}>
                <div className="media-plate">
                  <MediaImage
                    src={asset(player.src)}
                    alt={`Portrait of ${player.handle}, NAVI MPL ID`}
                    width={830}
                    height={1044}
                    fallbackLabel={firstGrapheme(player.handle)}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </div>
                <figcaption className="media-caption">{player.handle}</figcaption>
              </figure>
            ))}
          </div>
          <p className="section-label media-section-label">Official social imagery</p>
          <div
            className="media-grid media-grid--photos"
            role="group"
            aria-label="Official NAVI MLBB social imagery"
          >
            {socialPosts.map((post) => (
              <figure
                className={`media-item${post.height < post.width ? " media-item--wide" : ""}`}
                key={post.src}
              >
                <div className="media-plate">
                  <MediaImage
                    src={asset(post.src)}
                    alt={post.alt}
                    width={post.width}
                    height={post.height}
                    fallbackLabel="N"
                    loading="lazy"
                  />
                </div>
                <figcaption className="media-caption">{post.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="page-note">
            Player portraits are used as supplied. Social imagery is sourced from the
            official @navi_mlbb Instagram account and captioned by source and era;
            several posts predate the current roster. Full provenance is in
            <code> public/assets/media/PROVENANCE.md</code>.
          </p>
        </>
      )}
    </SubPage>
  );
}
