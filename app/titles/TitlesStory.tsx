"use client";

import { useState, type CSSProperties } from "react";
import { asset } from "../assetPath";

export type SeasonAward = {
  crest: string;
  subject: string;
  level: "Team" | "Individual";
  result: string;
};

const orgSource = "https://en.wikipedia.org/wiki/Natus_Vincere";

const chapters = [
  {
    year: "2009",
    game: "Foundation",
    title: "Born to win",
    detail: "Natus Vincere is formed on 17 December in Kyiv, Ukraine.",
  },
  {
    year: "2010",
    game: "Counter-Strike",
    title: "Three crowns, one year",
    detail: "ESWC, WCG and DreamHack Winter. The first side to hold IEM, ESWC and WCG at once.",
  },
  {
    year: "2011",
    game: "Dota 2",
    title: "The first International",
    detail: "EHOME beaten 3–1 in the grand final for $1,000,000.",
  },
  {
    year: "2021",
    game: "CS:GO",
    title: "The Major, at last",
    detail: "PGL Stockholm 2021, 2–0 over G2. The Intel Grand Slam follows.",
  },
  {
    year: "2024",
    game: "CS2",
    title: "A new era, the same name",
    detail: "PGL Copenhagen 2024 — the first CS2 Major — and HLTV Team of the Year.",
  },
];

const fronts = [
  "MLBB · MPL ID",
  "CS2",
  "Dota 2",
  "LoL · LEC",
  "VALORANT · VCT EMEA",
  "PUBG",
  "R6 Siege",
  "Brawl Stars",
  "Chess",
];

export default function TitlesStory({ awards }: { awards: SeasonAward[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="legacy">
      {/* Act I — the season this site is about. MLBB first, always. */}
      <section className="legacy-season" aria-labelledby="legacy-season-head">
        <h2 className="legacy-season-head" id="legacy-season-head">
          Season 18 <span>· the shirt on our back</span>
        </h2>
        <ul className="legacy-awards">
          {awards.map((award, i) => (
            <li
              className="legacy-award"
              key={`${award.subject}-${award.result}`}
              style={{ "--i": i } as CSSProperties}
            >
              <span className="legacy-crest" aria-hidden="true">
                <img src={asset(`/assets/achievements/${award.crest}`)} alt="" />
              </span>
              <span className="legacy-award-copy">
                <strong className="legacy-award-subject">{award.subject}</strong>
                <span className="legacy-award-result">{award.result}</span>
              </span>
              <span className="legacy-award-level">{award.level}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Act II — pull the camera back: the archive and the name behind it. */}
      <section className="legacy-archive" aria-labelledby="legacy-archive-head">
        <h2 className="legacy-section-head" id="legacy-archive-head">
          The name behind the shirt
        </h2>
        <p className="legacy-section-intro">
          Not just Mobile Legends — this badge was earned long before this roster.
        </p>
        <div className="legacy-plates">
          <figure className="legacy-plate">
            <img
              src={asset("/assets/heritage/navi-eswc-2010.jpg")}
              alt="NAVI players lifting the ESWC 2010 Counter-Strike trophy"
              width={626}
              height={414}
            />
            <figcaption>
              <strong>ESWC 2010</strong> · Counter-Strike world champions
              <span>Photo: Андрей &apos;Xeo&apos; Яценко / NaVi-Gaming.com · CC BY-SA 3.0</span>
            </figcaption>
          </figure>
          <figure className="legacy-plate">
            <img
              src={asset("/assets/heritage/navi-wcg-2010.jpg")}
              alt="NAVI players on the WCG 2010 podium with the Ukrainian flag"
              width={638}
              height={424}
            />
            <figcaption>
              <strong>WCG 2010</strong> · World Cyber Games champions
              <span>Photo: Андрей &apos;Xeo&apos; Яценко / NaVi-Gaming.com · CC BY-SA 3.0</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Act III — history after history, in the order it happened. */}
      <section className="legacy-history" aria-labelledby="legacy-history-head">
        <h2 className="legacy-section-head" id="legacy-history-head">
          History after history
        </h2>
        <ol className="legacy-chapters">
          {chapters.map((chapter, i) => (
            <li
              className="legacy-chapter"
              key={chapter.year}
              style={{ "--i": i } as CSSProperties}
            >
              <span className="legacy-year" aria-hidden="true">{chapter.year}</span>
              <span className="legacy-node" aria-hidden="true" />
              <span className="legacy-chapter-copy">
                <span className="legacy-game">{chapter.game}</span>
                <strong className="legacy-chapter-title">{chapter.title}</strong>
                <span className="legacy-detail">{chapter.detail}</span>
              </span>
              <a
                className="legacy-source"
                href={orgSource}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source for ${chapter.year}: Natus Vincere on Wikipedia (opens in a new tab)`}
              >
                source ↗
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Act IV — the reach, with MLBB leading the list. */}
      <section className="legacy-reach" aria-labelledby="legacy-reach-head">
        <h2 className="legacy-section-head" id="legacy-reach-head">
          Every front, one name
        </h2>
        <ul className="legacy-fronts">
          {fronts.map((front) => (
            <li className={front.startsWith("MLBB") ? "legacy-front legacy-front--home" : "legacy-front"} key={front}>
              {front}
            </li>
          ))}
        </ul>
      </section>

      {/* Act V — the drawer. Nothing hidden from assistive tech. */}
      <section className="legacy-wider" aria-labelledby="legacy-wider-head">
        <h2 className="legacy-section-head" id="legacy-wider-head">
          The wider record
        </h2>
        <button
          type="button"
          className="legacy-toggle"
          aria-expanded={open}
          aria-controls="legacy-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close the wider record" : "Open the wider record"}
          <span className="legacy-toggle-mark" aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <div id="legacy-drawer" className={`legacy-drawer${open ? " is-open" : ""}`}>
          <div className="legacy-drawer-inner">
            <ul className="legacy-links">
              <li>
                <a href="https://navi.gg/" target="_blank" rel="noopener noreferrer">
                  Natus Vincere — official site ↗
                </a>
              </li>
              <li>
                <a href={orgSource} target="_blank" rel="noopener noreferrer">
                  Natus Vincere — sourced record ↗
                </a>
              </li>
              <li>
                <a
                  href="https://commons.wikimedia.org/wiki/File:NaVi-ESWC.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Archive photograph — ESWC 2010 ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
