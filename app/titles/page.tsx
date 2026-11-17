import type { Metadata } from "next";
import SubPage from "../SubPage";

export const metadata: Metadata = {
  title: "Titles — NAVI MPL ID",
  description: "Verified awards and honours for the NAVI MPL ID squad.",
};

type Award = {
  subject: string;
  level: "Team" | "Individual";
  result: string;
};

// Only awards verifiable from the team and league records. Held as data so the
// ledger renders uniformly and an empty set resolves to a designed state rather
// than a blank region or a half-built list.
const awards: Award[] = [
  { subject: "MPL ID Season 18", level: "Team", result: "Runners-up" },
  { subject: "Joshuaa", level: "Individual", result: "First Team Jungler" },
  { subject: "Joshuaa", level: "Individual", result: "Rookie of the Season" },
  { subject: "Aprho", level: "Individual", result: "First Team Roamer" },
];

export default function TitlesPage() {
  return (
    <SubPage
      active="Titles"
      title="Titles"
      lede="Verified awards and honours, at team and individual level."
    >
      {awards.length > 0 ? (
        <div className="ledger" role="list" aria-label="Verified awards and honours">
          {awards.map((award) => (
            <div
              className="ledger-row"
              role="listitem"
              key={`${award.subject}-${award.result}`}
            >
              <span className="ledger-main">{award.subject}</span>
              <span className="ledger-meta">{award.level}</span>
              <span className="ledger-value">{award.result}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="page-empty" role="status">
          <p>No verified titles are available in this portfolio preview.</p>
        </div>
      )}
      <p className="page-note">
        Only awards that can be verified from the team and league records are listed.
      </p>
    </SubPage>
  );
}
