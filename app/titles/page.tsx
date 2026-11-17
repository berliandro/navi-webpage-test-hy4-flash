import type { Metadata } from "next";
import SubPage from "../SubPage";
import TitlesStory, { type SeasonAward } from "./TitlesStory";

export const metadata: Metadata = {
  title: "Titles — NAVI MPL ID",
  description: "Verified awards and honours for the NAVI MPL ID squad, and the organisation behind them.",
};

// Only awards verifiable from the team and league records. Held as data so the
// season block and the wider heritage never borrow facts from each other.
// Crest artwork is the authored set already used on the Home roster.
const awards: SeasonAward[] = [
  { crest: "runnerup.svg", subject: "MPL ID Season 18", level: "Team", result: "Runners-up" },
  { crest: "jungle.svg", subject: "Joshuaa", level: "Individual", result: "First Team Jungler" },
  { crest: "rookie.svg", subject: "Joshuaa", level: "Individual", result: "Rookie of the Season" },
  { crest: "roam.svg", subject: "Aprho", level: "Individual", result: "First Team Roamer" },
];

export default function TitlesPage() {
  return (
    <SubPage
      active="Titles"
      title="Titles"
      lede="Four verified Season 18 honours, and the long name that stands behind them."
    >
      <TitlesStory awards={awards} />
      <p className="page-note">
        Season 18 awards: team and league records. Heritage: the sourced organisation record.
      </p>
    </SubPage>
  );
}
