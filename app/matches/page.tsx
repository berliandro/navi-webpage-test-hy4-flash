import type { Metadata } from "next";
import SubPage from "../SubPage";

export const metadata: Metadata = {
  title: "Matches — NAVI MPL ID",
  description: "Verified results from every NAVI match in MPL ID Season 18.",
};

type Match = {
  /** Stage as published by the league: "Week 1" … "Week 9" or "Playoffs". */
  stage: string;
  /** Day and start time. Kept as published; month names are localized to English for this EN interface. */
  when: string;
  /** Opposing team's published abbreviation. */
  opponent: string;
  /** Game score with NAVI's tally first, normalized from either listing order. */
  score: string;
  /** The league's own WIN / LOSE call for NAVI. */
  outcome: "WIN" | "LOSE";
};

// Every row below is transcribed from MPL Indonesia's official NAVI team page
// (id-mpl.com/en/team/navi → MATCH SEASON 18). The source lists some fixtures
// opponent-first; scores are restated NAVI-first without changing any result.
// No match is invented. The source prints one duplicate Week 6 GEEK fixture;
// it is listed once here so the ledger stays a true record of distinct games.
// Indonesian month abbreviations are rendered in English; days, times and
// results are unchanged.
const matches: Match[] = [
  { stage: "Week 1", when: "14 Aug · 18:00", opponent: "AE", score: "0–2", outcome: "LOSE" },
  { stage: "Week 1", when: "15 Aug · 20:00", opponent: "EVOS", score: "2–1", outcome: "WIN" },
  { stage: "Week 2", when: "21 Aug · 15:00", opponent: "TLID", score: "2–0", outcome: "WIN" },
  { stage: "Week 2", when: "22 Aug · 17:00", opponent: "GEEK", score: "2–1", outcome: "WIN" },
  { stage: "Week 3", when: "28 Aug · 15:00", opponent: "BTR", score: "0–2", outcome: "LOSE" },
  { stage: "Week 3", when: "30 Aug · 14:00", opponent: "ONIC", score: "2–0", outcome: "WIN" },
  { stage: "Week 4", when: "4 Sep · 15:00", opponent: "DEWA", score: "2–0", outcome: "WIN" },
  { stage: "Week 4", when: "6 Sep · 14:00", opponent: "RRQ", score: "2–0", outcome: "WIN" },
  { stage: "Week 5", when: "12 Sep · 20:00", opponent: "EVOS", score: "2–0", outcome: "WIN" },
  { stage: "Week 6", when: "19 Sep · 14:00", opponent: "GEEK", score: "2–0", outcome: "WIN" },
  { stage: "Week 7", when: "3 Oct · 14:00", opponent: "AE", score: "2–1", outcome: "WIN" },
  { stage: "Week 7", when: "4 Oct · 20:00", opponent: "ONIC", score: "1–2", outcome: "LOSE" },
  { stage: "Week 8", when: "8 Oct · 20:00", opponent: "TLID", score: "2–0", outcome: "WIN" },
  { stage: "Week 8", when: "9 Oct · 20:00", opponent: "DEWA", score: "2–0", outcome: "WIN" },
  { stage: "Week 9", when: "16 Oct · 15:00", opponent: "RRQ", score: "2–1", outcome: "WIN" },
  { stage: "Week 9", when: "18 Oct · 17:00", opponent: "BTR", score: "0–2", outcome: "LOSE" },
  { stage: "Playoffs", when: "5 Nov · 14:30", opponent: "AE", score: "3–1", outcome: "WIN" },
  { stage: "Playoffs", when: "6 Nov · 19:15", opponent: "TLID", score: "3–2", outcome: "WIN" },
  { stage: "Playoffs", when: "8 Nov · 17:30", opponent: "BTR", score: "3–4", outcome: "LOSE" },
];

export default function MatchesPage() {
  return (
    <SubPage
      active="Matches"
      title="Matches"
      lede="Every MPL ID Season 18 match NAVI played, with NAVI's score shown first."
    >
      {matches.length > 0 ? (
        <div className="ledger ledger--matches" role="list" aria-label="MPL ID Season 18 match results">
          {matches.map(({ stage, when, opponent, score, outcome }) => (
            <div
              className="ledger-row"
              role="listitem"
              key={`${stage}-${when}-${opponent}`}
              aria-label={`${stage}. ${when}. NAVI ${outcome === "WIN" ? "won" : "lost"} ${score.replace("–", " to ")} against ${opponent}.`}
            >
              {/* NAVI is named once by the page; the score is already NAVI-first. */}
              <span className="ledger-main">{score} {opponent}</span>
              <span className="ledger-meta">{stage} · {when}</span>
              <span className={`ledger-value ledger-value--${outcome.toLowerCase()}`}>{outcome}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="page-empty" role="status">
          <p>No verified results are available in this portfolio preview.</p>
        </div>
      )}
      <p className="page-note">
        Results are transcribed from the official MPL Indonesia team record. No
        individual player statistics are published for this roster.
      </p>
    </SubPage>
  );
}
