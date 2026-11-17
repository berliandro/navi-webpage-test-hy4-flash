"use client";

import { useMemo, useState, type CSSProperties } from "react";

export type Match = {
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

type Lens = "all" | "regular" | "playoffs";

const lenses: { id: Lens; label: string }[] = [
  { id: "all", label: "All results" },
  { id: "regular", label: "Regular season" },
  { id: "playoffs", label: "Playoffs" },
];

function splitWhen(when: string) {
  const [date, time] = when.split(" · ");
  const [day, month] = date.split(" ");
  return { day, month: month.toUpperCase(), time };
}

export default function MatchesLedger({ matches }: { matches: Match[] }) {
  const [lens, setLens] = useState<Lens>("all");

  const wins = matches.filter((m) => m.outcome === "WIN").length;
  const losses = matches.length - wins;

  const visible = useMemo(() => {
    if (lens === "playoffs") return matches.filter((m) => m.stage === "Playoffs");
    if (lens === "regular") return matches.filter((m) => m.stage !== "Playoffs");
    return matches;
  }, [lens, matches]);

  const groups = useMemo(() => {
    const order: string[] = [];
    for (const m of visible) if (!order.includes(m.stage)) order.push(m.stage);
    return order.map((stage) => {
      const items = visible.filter((m) => m.stage === stage);
      return {
        stage,
        items,
        wins: items.filter((m) => m.outcome === "WIN").length,
        losses: items.filter((m) => m.outcome === "LOSE").length,
        from: items[0].when.split(" · ")[0],
        to: items[items.length - 1].when.split(" · ")[0],
      };
    });
  }, [visible]);

  return (
    <section className="match-board" aria-label="MPL ID Season 18 results">
      {/* The form tape reads the whole season at a glance: oldest result first. */}
      <div
        className="match-tape"
        role="img"
        aria-label={`Season form, oldest first: ${matches.length} matches, ${wins} wins, ${losses} losses.`}
      >
        <div className="match-tape-line">
          <span className="match-tape-label">Season form · oldest first</span>
          <span className="match-tape-record">
            {wins} W <span aria-hidden="true">/</span> {losses} L
          </span>
        </div>
        <div className="match-tape-track">
          {matches.map((m, i) => (
            <span
              key={`${m.stage}-${m.when}-${m.opponent}`}
              className={`match-tape-stitch match-tape-stitch--${m.outcome.toLowerCase()}`}
              style={{ "--i": i } as CSSProperties}
              title={`${m.stage} · ${m.when} · ${m.outcome} ${m.score} vs ${m.opponent}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="match-tape-ends" aria-hidden="true">
          <span>14 AUG</span>
          <span>8 NOV</span>
        </div>
      </div>

      <div className="match-filter" role="group" aria-label="Filter results by stage">
        {lenses.map((option) => (
          <button
            key={option.id}
            type="button"
            className="filter"
            aria-pressed={lens === option.id}
            onClick={() => setLens(option.id)}
          >
            {option.label}
          </button>
        ))}
        <span className="match-filter-count" aria-live="polite">
          {visible.length} / {matches.length} shown
        </span>
      </div>

      {/* Remounting on lens change replays the single authored press-in moment. */}
      <div className="match-timeline" key={lens}>
        {groups.map((group) => (
          <section className="match-stage" key={group.stage} aria-labelledby={`stage-${group.stage.replace(/\s+/g, "-").toLowerCase()}`}>
            <h2
              className="match-stage-head"
              id={`stage-${group.stage.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <span className="match-stage-name">{group.stage}</span>
              <span className="match-stage-range">
                {group.from} – {group.to}
              </span>
              <span className="match-stage-record">
                {group.wins} W · {group.losses} L
              </span>
            </h2>
            <ol className="match-list">
              {group.items.map((m) => {
                const index = matches.indexOf(m);
                const { day, month, time } = splitWhen(m.when);
                return (
                  <li
                    className="match-row"
                    key={`${m.stage}-${m.when}-${m.opponent}`}
                    style={{ "--i": index } as CSSProperties}
                    aria-label={`${m.stage}. ${m.when}. NAVI ${m.outcome === "WIN" ? "won" : "lost"} ${m.score.replace("–", " to ")} against ${m.opponent}.`}
                  >
                    <span className="match-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`match-node match-node--${m.outcome.toLowerCase()}`} aria-hidden="true" />
                    <span className="match-date">
                      <span className="match-day">{day}</span>
                      <span className="match-when">
                        {month} · {time}
                      </span>
                    </span>
                    <span className="match-opponent">
                      <span className="match-versus">vs</span> {m.opponent}
                    </span>
                    <span className="match-score">{m.score}</span>
                    <span className={`match-outcome match-outcome--${m.outcome.toLowerCase()}`}>
                      {m.outcome}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </section>
  );
}
