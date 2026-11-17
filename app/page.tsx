"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import MediaImage from "./MediaImage";
import SiteHeader from "./SiteHeader";
import { asset } from "./assetPath";

type Player = {
  id: string;
  handle: string;
  full: string;
  country: string;
  role: string;
  roleLabel: string;
  img: string;
};

const players: Player[] = [
  {
    id: "joshuaa",
    handle: "Joshuaa",
    full: "Joshua Adonai Nathan Kurniawan",
    country: "ID",
    role: "JUNGLE",
    roleLabel: "JUNGLE",
    img: "/assets/players/joshuaa.webp",
  },
  {
    id: "aprho",
    handle: "Aprho",
    full: "Azzidan Marchino",
    country: "ID",
    role: "ROAM",
    roleLabel: "ROAM",
    img: "/assets/players/aprho.webp",
  },
  {
    id: "karss",
    handle: "Karss",
    full: "Karsten William",
    country: "ID",
    role: "EXP",
    roleLabel: "EXP",
    img: "/assets/players/karss.webp",
  },
  {
    id: "zeonn",
    handle: "Zeonn",
    full: "Budi Liunardi",
    country: "ID",
    role: "GOLD",
    roleLabel: "GOLD",
    img: "/assets/players/zeonn.webp",
  },
  {
    id: "jiizee",
    handle: "Jiizee",
    full: "Muhammad Najiyyullah",
    country: "ID",
    role: "MID",
    roleLabel: "MID",
    img: "/assets/players/jiizee.webp",
  },
  {
    id: "febby",
    handle: "Febbb",
    full: "Rio Wijaya",
    country: "ID",
    role: "EXP",
    roleLabel: "EXP",
    img: "/assets/players/febby.webp",
  },
  {
    id: "andoryuuu",
    handle: "Andoryuuu",
    full: "Andrew Flora",
    country: "PH",
    role: "RES",
    roleLabel: "RESERVE",
    img: "/assets/players/andoryuuu.webp",
  },
];

const sideIds = ["karss", "aprho", "jiizee", "zeonn"];
const filters = ["ALL", "JUNGLE", "EXP", "MID", "GOLD", "ROAM"];
const roleCountLabel: Record<string, string> = {
  EXP: "EXP",
  JUNGLE: "JUNGLE",
  MID: "MID",
  GOLD: "GOLD",
  ROAM: "ROAM",
};

// The feature and the flank are one stage: a companion promoted to the center
// leaves its slot empty. Backfill that slot with the next off-stage player so
// the symmetric four-card composition never repeats the featured face.
function companionsFor(featuredId: string, role = "ALL"): Player[] {
  // Under a role lens, surface the in-role teammates first so the count on the
  // chip is actually visible on the bench. With ALL, keep the pinned four.
  const preferred =
    role === "ALL"
      ? sideIds
      : [
          ...players.filter((p) => p.role === role).map((p) => p.id),
          ...sideIds,
        ];
  const ids: string[] = [];
  for (const id of preferred) {
    if (id !== featuredId && !ids.includes(id)) ids.push(id);
  }
  for (const player of players) {
    if (ids.length >= 4) break;
    if (player.id !== featuredId && !ids.includes(player.id)) ids.push(player.id);
  }
  return ids
    .slice(0, 4)
    .map((id) => players.find((p) => p.id === id))
    .filter((p): p is Player => Boolean(p));
}

const filterToRole: Record<string, string> = {
  ALL: "ALL",
  EXP: "EXP",
  JUNGLE: "JUNGLE",
  MID: "MID",
  GOLD: "GOLD",
  ROAM: "ROAM",
};

// MPL Indonesia Season 18 regular season, published at
// https://id-mpl.com/s18/en/statistics — the only source for the hex readout.
// Games played is shown alongside the rates so a smaller sample is never
// mistaken for a stronger player. Febbb has no published figures.
type SeasonStats = { gp: number; k: number; d: number; a: number; kda: number; kp: number };
const seasonStats: Record<string, SeasonStats> = {
  joshuaa: { gp: 25, k: 5.28, d: 1.72, a: 5.04, kda: 6.0, kp: 81 },
  karss: { gp: 37, k: 1.27, d: 2.05, a: 6.51, kda: 3.79, kp: 67 },
  andoryuuu: { gp: 12, k: 3.58, d: 2.25, a: 4.17, kda: 3.44, kp: 84 },
  aprho: { gp: 37, k: 0.95, d: 2.14, a: 7.95, kda: 4.16, kp: 76 },
  zeonn: { gp: 37, k: 2.27, d: 0.92, a: 4.95, kda: 7.85, kp: 62 },
  jiizee: { gp: 37, k: 2.43, d: 1.24, a: 6.95, kda: 7.54, kp: 81 },
};

// `raw` is the published figure shown to the visitor; `axisValue` only drives
// the polygon's geometry. The two must never be confused: a derived shape is
// not a published statistic.
const statAxes = [
  { key: "kda", label: "KDA", raw: (s: SeasonStats) => s.kda, format: (v: number) => v.toFixed(2) },
  { key: "kp", label: "KP", raw: (s: SeasonStats) => s.kp, format: (v: number) => `${Math.round(v)}%` },
  { key: "k", label: "K", raw: (s: SeasonStats) => s.k, format: (v: number) => v.toFixed(2) },
  { key: "a", label: "A", raw: (s: SeasonStats) => s.a, format: (v: number) => v.toFixed(2) },
  { key: "deaths", label: "AVG D* LOW", raw: (s: SeasonStats) => s.d, format: (v: number) => v.toFixed(2) },
  { key: "gp", label: "GP", raw: (s: SeasonStats) => s.gp, format: (v: number) => String(Math.round(v)) },
] as const;

function axisValue(stats: SeasonStats, key: (typeof statAxes)[number]["key"]): number {
  if (key === "deaths") {
    // Polygon geometry only: fewer deaths should push the vertex outward.
    // The visible value stays the raw published average deaths.
    const worst = Math.max(...Object.values(seasonStats).map((s) => s.d));
    return (worst - stats.d) / worst;
  }
  return stats[key];
}

const statMax = Object.fromEntries(
  statAxes.map((axis) => [
    axis.key,
    Math.max(...Object.values(seasonStats).map((s) => axisValue(s, axis.key))),
  ]),
) as Record<(typeof statAxes)[number]["key"], number>;

function hexPoint(index: number, radius: number, cx = 100, cy = 100) {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
}

function polygonFor(values: number[]) {
  return values.map((v, i) => {
    const p = hexPoint(i, v * 66);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

// Ease-out matching the design's single curve, cubic-bezier(0.16, 1, 0.3, 1),
// solved on the x axis with a few Newton-Raphson steps. The morph needs a real
// easing function because SVG `points` is geometry, not a CSS property a
// transition could drive — it is interpolated frame by frame instead.
function easeOutCraft(t: number): number {
  const cx = 3 * 0.16;
  const bx = 3 * (0.3 - 0.16) - cx;
  const ax = 1 - cx - bx;
  const cy = 3;
  const by = -3;
  const ay = 1 - cy - by;
  let u = t;
  for (let i = 0; i < 5; i += 1) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const dx = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(dx) < 1e-6) break;
    u -= x / dx;
  }
  u = Math.min(1, Math.max(0, u));
  return ((ay * u + by) * u + cy) * u;
}

// Interpolate the six normalized axes so both the polygon and its vertex dots
// read the same in-between geometry. Reads `prefers-reduced-motion` at the
// moment of change: under the preference it snaps to the final values, keeping
// every published figure legible while dropping the spatial movement. An
// in-flight morph interrupted by a new selection resumes from the frame it was
// on, so rapid cycling never snaps or stacks animations.
function useTweenedHex(target: number[]): number[] {
  const [display, setDisplay] = useState(target);
  const current = useRef(target);
  const raf = useRef<number | null>(null);
  const targetKey = target.join(",");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = current.current;
    if (
      reduce ||
      from.length !== target.length ||
      from.every((v, i) => v === target[i])
    ) {
      current.current = target;
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const duration = 420;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeOutCraft(t);
      const next = target.map((v, i) => from[i] + (v - from[i]) * e);
      current.current = next;
      setDisplay(next);
      raf.current = t < 1 ? requestAnimationFrame(tick) : null;
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
    // `target` is a fresh array each render; `targetKey` is its stable value
    // signature, which is the only thing that should restart the morph.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey]);

  return display;
}

const staff = [
  { name: "YnoT", role: "Head Coach", country: "PH", img: "/assets/staff/ynot.webp", w: 830, h: 1044 },
  { name: "Jacklee", role: "Assistant Coach", country: "ID", img: "/assets/staff/jacklee.webp", w: 830, h: 1044 },
  // The league publishes its analyst cutout at a square 500×500, not the NAVI
  // portrait ratio — keep the real intrinsic size so it is not letterboxed.
  { name: "HAN", role: "Analyst", country: "ID", img: "/assets/staff/han.webp", w: 500, h: 500 },
];

function filterForRole(role: string): string {
  return Object.entries(filterToRole).find(([, value]) => value === role)?.[0] ?? "ALL";
}

type Tab = "players" | "staff";

// Color the final grapheme of a handle. Code-unit slicing breaks emoji
// (surrogate pairs), combining marks and single-character handles. Build the
// segmenter once at module scope: constructing Intl.Segmenter on every call was
// the hot path here, and the instance is stateless and safe to share.
const graphemeSegmenter =
  typeof Intl === "object" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : undefined;

function graphemes(value: string): string[] {
  return graphemeSegmenter
    ? Array.from(graphemeSegmenter.segment(value), (segment) => segment.segment)
    : Array.from(value); // code-point-safe fallback
}

function accentHandle(handle: string): { head: string; tail: string; length: number } {
  if (!handle) return { head: "", tail: "", length: 0 };
  const parts = graphemes(handle);
  if (parts.length < 2) return { head: "", tail: handle, length: parts.length };
  return {
    head: parts.slice(0, -1).join(""),
    tail: parts[parts.length - 1],
    length: parts.length,
  };
}

// The monogram is a single grapheme. Code-unit slicing breaks emoji surrogate
// pairs and combining marks — the same reason the handle accent uses a segmenter.
function firstGrapheme(value: string): string {
  return value ? graphemes(value)[0] ?? "" : "";
}

function SideCard({
  player,
  dimmed,
  onSelect,
  position,
}: {
  player: Player;
  dimmed: boolean;
  onSelect: () => void;
  position: "far" | "near";
}) {
  return (
    <button
      type="button"
      className={`print-card print-card--${position}${dimmed ? " dim" : ""}`}
      onClick={onSelect}
      aria-label={`Feature ${player.handle}, ${player.roleLabel}`}
    >
      <span className="print-swatch" aria-hidden="true" />
      <MediaImage
        src={asset(player.img)}
        alt=""
        width={830}
        height={1044}
        fallbackLabel={firstGrapheme(player.handle)}
      />
      <span className="print-card-label">
        <b dir="auto">{player.handle}</b>
        <span>{player.role}</span>
      </span>
    </button>
  );
}

function StatsPanel({
  player,
  onClose,
  hidden,
}: {
  player: Player;
  onClose: () => void;
  hidden: boolean;
}) {
  const stats = seasonStats[player.id];
  const targetValues = statAxes.map((axis) =>
    stats ? axisValue(stats, axis.key) / statMax[axis.key] : 0,
  );
  const values = useTweenedHex(targetValues);
  return (
    <section
      className="stats-panel"
      id="stats-readout"
      role="region"
      hidden={hidden}
      inert={hidden}
      aria-label={`Season 18 statistics for ${player.handle}`}
    >
      <div className="stats-panel-head">
        <h2 className="stats-title">Season 18</h2>
        <button type="button" className="stats-close" onClick={onClose} aria-label="Close statistics">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      {stats ? (
        <>
          <span className="stats-shape-note" aria-hidden="true">Shape · not a score</span>
          <svg className="stats-hex" viewBox="0 0 200 200" role="img" aria-label={`Six-axis statistics hexagon for ${player.handle}`}>
            {[0.33, 0.66, 1].map((ring) => (
              <polygon
                key={ring}
                className="stats-ring"
                points={polygonFor([ring, ring, ring, ring, ring, ring])}
              />
            ))}
            {statAxes.map((axis, i) => {
              const end = hexPoint(i, 66);
              return <line key={axis.key} className="stats-spoke" x1={100} y1={100} x2={end.x} y2={end.y} />;
            })}
            <g className="stats-current" key={player.id}>
              <polygon className="stats-shape" points={polygonFor(values)} />
              {values.map((v, i) => {
                const p = hexPoint(i, v * 66);
                return <circle key={i} className="stats-dot" cx={p.x} cy={p.y} r={2.4} />;
              })}
            </g>
          </svg>
          <dl className="stats-values">
            {statAxes.map((axis) => (
              <div key={axis.key}>
                <dt>{axis.label}</dt>
                <dd>{stats ? axis.format(axis.raw(stats)) : "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="stats-source">
            MPL ID Season 18 regular season · polygon scaled to NAVI&apos;s published maximum ·
            * AVG D is published average deaths; fewer deaths extends the shape
          </p>
        </>
      ) : (
        <div className="stats-empty">
          <p>No published Season 18 figures for {player.handle}.</p>
        </div>
      )}
    </section>
  );
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("players");
  const [filter, setFilter] = useState("ALL");
  const [featuredId, setFeaturedId] = useState("joshuaa");
  const [statsOpen, setStatsOpen] = useState(false);
  // One-time, pre-click cue for touch visitors. It disappears on the first
  // real interaction; it is not a persistent tutorial overlay.
  const [hintDismissed, setHintDismissed] = useState(false);
  // Direction of the last feature change, read by the lightboard swap. Every
  // entry point (arrows, cards, filters, swipe) writes it so the new cutout
  // enters from the side it actually came from.
  const [dir, setDir] = useState<1 | -1>(1);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    players: null,
    staff: null,
  });
  const swipeStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const statsToggleRef = useRef<HTMLButtonElement | null>(null);
  const rosterRef = useRef<HTMLElement | null>(null);

  // A window losing focus mid-swap can swallow pointerup/pointercancel. Clear
  // the pending gesture on blur so the next tap can never inherit a stale one.
  useEffect(() => {
    const clear = () => {
      swipeStart.current = null;
    };
    window.addEventListener("blur", clear);
    return () => window.removeEventListener("blur", clear);
  }, []);

  // Every close path hands focus back to the STATS toggle: the readout is a
  // docked, non-modal region, so it never traps focus — it just has to leave
  // the keyboard user where they started. Guard the trigger first: a control
  // inside a hidden-mounted region (display:none / visibility:hidden, or a
  // panel that was already unmounted) cannot take focus, and calling focus()
  // there silently strands the user on <body>. Fall back to the stage.
  const restoreStatsFocus = useCallback(() => {
    const toggle = statsToggleRef.current;
    if (
      toggle &&
      toggle.getClientRects().length > 0 &&
      window.getComputedStyle(toggle).visibility !== "hidden"
    ) {
      toggle.focus();
      return;
    }
    rosterRef.current?.focus();
  }, []);

  const closeStats = useCallback(() => {
    setStatsOpen(false);
    restoreStatsFocus();
  }, [restoreStatsFocus]);

  // Escape is the expected exit from a transient overlay.
  useEffect(() => {
    if (!statsOpen) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeStats();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [statsOpen, closeStats]);

  const featured = players.find((p) => p.id === featuredId) ?? players[0];
  const featuredIndex = Math.max(0, players.findIndex((p) => p.id === featuredId));
  const handleParts = accentHandle(featured?.handle ?? "");
  const activeRole = filterToRole[filter] ?? "ALL";
  const inRoleCount = activeRole === "ALL" ? players.length : players.filter((p) => p.role === activeRole).length;
  // With a single in-role player there is nobody on the bench to focus: dimming
  // every companion would read as a broken board, so keep the bench lit.
  const isDimmed = (role: string) => activeRole !== "ALL" && role !== activeRole && inRoleCount > 1;

  // One persistent live region outside the hidden/inert readout. It stays in
  // the accessibility tree at all times, so a text change is reliably announced
  // when the hexagon values change (player switched while STATS is open). It
  // reads the published figures verbatim — the same formatted values shown at
  // the vertices — and never a derived polygon coordinate.
  const activeStats = featured ? seasonStats[featured.id] : undefined;
  const statsAnnouncement =
    statsOpen && tab === "players" && featured
      ? activeStats
        ? `${featured.handle}: ${statAxes.map((axis) => `${axis.label} ${axis.format(axis.raw(activeStats))}`).join(", ")}.`
        : `No published Season 18 figures for ${featured.handle}.`
      : "";
  // Guard the empty-data path: with no players `featured` is undefined, and
  // dereferencing it here would crash before the degraded panel can render.
  const [farLeft, nearLeft, nearRight, farRight] = featured
    ? companionsFor(featured.id, activeRole)
    : [];

  // The featured player and the active filter are two views of one selection.
  // Every entry point goes through here so a companion card cannot leave a
  // stale filter chip behind while it changes the player on stage.
  function selectPlayer(id: string, from?: 1 | -1, preserveFilter = false) {
    const next = players.find((p) => p.id === id);
    if (!next) return;
    setHintDismissed(true);
    // An explicit direction comes from spatial entry points (a card on the
    // left, a left swipe, the prev arrow). Otherwise fall back to roster order
    // so a filter jump still animates toward the new player, never at random.
    if (from) {
      setDir(from);
    } else {
      const currentIndex = players.findIndex((p) => p.id === featuredId);
      const nextIndex = players.findIndex((p) => p.id === id);
      setDir(nextIndex >= currentIndex ? 1 : -1);
    }
    // Selecting a player never rewrites the filter: arrows and bench cards
    // keep the active lens. Filter chips themselves promote the first in-role
    // player so the control's effect is visible on the hero, not just the bench.
    // A bench card can promote an out-of-role player. When that happens the
    // active lens no longer describes the stage, so clear it: the pressed chip
    // must never contradict the hero, and arrows must never be trapped in a
    // one-player pool.
    if (!preserveFilter && activeRole !== "ALL" && next.role !== activeRole) setFilter("ALL");
    setFeaturedId(next.id);
  }

  function chooseFilter(next: string) {
    setHintDismissed(true);
    setFilter(next);
    const role = filterToRole[next] ?? "ALL";
    if (role === "ALL") {
      const first = players[0];
      if (first) selectPlayer(first.id, undefined, true);
      return;
    }
    if (featured?.role !== role) {
      const match = players.find((p) => p.role === role);
      if (match) selectPlayer(match.id, undefined, true);
    }
  }

  function cycle(direction: 1 | -1) {
    if (players.length === 0) return;
    const role = filterToRole[filter] ?? "ALL";
    const pool = role === "ALL" ? players : players.filter((p) => p.role === role);
    if (pool.length === 0) return;
    const idx = pool.findIndex((p) => p.id === featuredId);
    const base = idx < 0 ? (direction > 0 ? -1 : 0) : idx;
    const next = pool[(base + direction + pool.length) % pool.length];
    selectPlayer(next.id, direction, true);
  }

  // On touch, the hero is the carousel: a horizontal flick cycles the roster
  // while vertical drags stay with the page (see touch-action: pan-y).
  function handleHeroPointerDown(event: PointerEvent<HTMLElement>) {
    // Mouse clicks are not swipes, and a second finger landing mid-drag must
    // not hijack the pointer being tracked.
    if (event.pointerType === "mouse" || swipeStart.current) return;
    // Capture the pointer on the hero. The featured box is narrow, so without
    // capture a finger that drags past its edge sends pointerup to whatever it
    // ends over and the flick is lost. Capture routes every event for this
    // pointer back here until it lifts; lostpointercapture then clears state.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // A pointer that ended between dispatch and capture can reject; fall
      // back to the uncaptured path instead of throwing from a gesture handler.
    }
    swipeStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }

  function handleHeroPointerUp(event: PointerEvent<HTMLElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    cycle(dx < 0 ? 1 : -1);
  }

  function handleHeroGestureEnd() {
    swipeStart.current = null;
  }

  // APG tabs pattern: Left/Right move between the two tabs, Home/End jump to
  // first/last. Focus follows selection so keyboard users are never stranded.
  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const { key } = event;
    if (key !== "ArrowLeft" && key !== "ArrowRight" && key !== "Home" && key !== "End") {
      return;
    }
    event.preventDefault();
    const next: Tab =
      key === "Home"
        ? "players"
        : key === "End"
          ? "staff"
          : tab === "players"
            ? "staff"
            : "players";
    setTab(next);
    setStatsOpen(false);
    tabRefs.current[next]?.focus();
  }

  return (
    <main className="garment">
      <h1 className="sr-only">NAVI MPL ID roster</h1>
      <p className="sr-only" role="status" hidden={statsOpen && tab === "players"}>
        {tab === "staff"
          ? "Showing coaching staff"
          : featured
            ? `Featured player: ${featured.handle}, ${featured.roleLabel}`
            : "Featured player unavailable."}
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {statsAnnouncement}
      </p>
      <SiteHeader active="Roster" />

      <div className="seam-controls">
        <div className="control-cluster">
        <div
          className="tabs"
          role="tablist"
          aria-label="Roster section"
          onKeyDown={handleTabKeyDown}
        >
          <button
            type="button"
            id="tab-players"
            className="tab"
            role="tab"
            aria-selected={tab === "players"}
            aria-controls="roster"
            tabIndex={tab === "players" ? 0 : -1}
            ref={(el) => {
              tabRefs.current.players = el;
            }}
            onClick={() => { setTab("players"); setStatsOpen(false); }}
          >
            Players
          </button>
          <button
            type="button"
            id="tab-staff"
            className="tab"
            role="tab"
            aria-selected={tab === "staff"}
            aria-controls="roster"
            tabIndex={tab === "staff" ? 0 : -1}
            ref={(el) => {
              tabRefs.current.staff = el;
            }}
            onClick={() => { setTab("staff"); setStatsOpen(false); }}
          >
            Staff
          </button>
        </div>
        {tab === "players" && (
          <button
            type="button"
            ref={statsToggleRef}
            className={`stats-toggle${statsOpen ? " is-open" : ""}`}
            aria-pressed={statsOpen}
            aria-controls="stats-readout"
            aria-label="Season 18 statistics"
            onClick={() => {
              if (statsOpen) {
                closeStats();
                return;
              }
              setStatsOpen(true);
              requestAnimationFrame(() => {
                const panel = document.getElementById("stats-readout");
                if (!panel) return;
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                panel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
              });
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M8 1.5 14 5v6L8 14.5 2 11V5z" />
            </svg>
            Season 18
          </button>
        )}
        </div>
        {tab === "players" ? (
          <>
            <div className="filters" role="group" aria-label="Filter by role">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="filter"
                  aria-pressed={filter === f}
                  onClick={() => chooseFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            {activeRole !== "ALL" && (
              <span className="role-count" role="status">
                Focus · {(() => {
                  const n = players.filter((p) => p.role === activeRole).length;
                  const label = roleCountLabel[activeRole] ?? "player";
                  return `${n} ${label}`;
                })()}
              </span>
            )}
          </>
        ) : (
          <span className="role-count">{staff.length} COACHING STAFF</span>
        )}
      </div>

      <section
        ref={rosterRef}
        className={`jersey${statsOpen && tab === "players" ? " stats-open" : ""}`}
        id="roster"
        role="tabpanel"
        aria-labelledby={tab === "players" ? "tab-players" : "tab-staff"}
        tabIndex={0}
      >
        <span className="cloth cloth--white" aria-hidden="true" />
        <span className="cloth cloth--black" aria-hidden="true" />
        <span className="stitch stitch--shoulder" aria-hidden="true" />
        <span className="piping" key={`piping-${featured?.id ?? "none"}`} aria-hidden="true" />

        <div className="chest">
          {tab === "staff" ? (
            staff.length ? (
              <div className="staff-lineup">
                {staff.map((member, index) => (
                  <div
                    className="staff-card"
                    key={`${member.name}-${index}`}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <div className="staff-figure">
                      <span className="staff-swatch" aria-hidden="true" />
                      <MediaImage
                        src={asset(member.img)}
                        alt=""
                        width={member.w}
                        height={member.h}
                        fallbackLabel={firstGrapheme(member.name)}
                        className="staff-portrait"
                      />
                    </div>
                    <h2 className="staff-name" dir="auto">{member.name}</h2>
                    <span>{member.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="lineup-empty">Staff information is currently unavailable.</p>
            )
          ) : !featured ? (
            <p className="lineup-empty">Roster information is currently unavailable.</p>
          ) : (
            <>
              <div className={`chest-copy${statsOpen && tab === "players" ? " is-reading" : ""}`}>
                <h2 className="chest-name">NAVI MPL ID</h2>
                <p className="chest-proof">MPL ID Season 18 runners-up</p>
                <p className="chest-context">Indonesian Mobile Legends team · MPL Indonesia</p>
              </div>

              <article
                className="print"
                onPointerDown={(event) => {
                  if (event.pointerType !== "mouse") setHintDismissed(true);
                  handleHeroPointerDown(event);
                }}
                onPointerUp={handleHeroPointerUp}
                onPointerCancel={handleHeroGestureEnd}
                onLostPointerCapture={handleHeroGestureEnd}
              >
                <div className="feature-figure" key={featured.id} data-dir={dir}>
                  <span className="print-plate" aria-hidden="true" />
                  <MediaImage
                    key={featured.img}
                    src={asset(featured.img)}
                    alt={`${featured.handle}, ${featured.roleLabel} for NAVI`}
                    width={830}
                    height={1044}
                    fallbackLabel={firstGrapheme(featured.handle)}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <p className="hero-hint" hidden={hintDismissed}>
                  Select a teammate · filters focus the roster
                </p>
                <div className="print-name" key={`name-${featured.id}`} data-dir={dir}>
                  <h3
                    className="print-handle"
                    dir="auto"
                    style={{ "--chars": handleParts.length || 7 } as CSSProperties}
                  >
                    {handleParts.head}
                    <em>{handleParts.tail}</em>
                  </h3>
                  <span className="print-role">{featured.role}</span>
                </div>
              </article>

              <div className="print-bench" aria-label="Other players">
                {[farLeft, nearLeft, nearRight, farRight].map((player, index) =>
                  player ? (
                    <SideCard
                      key={player.id}
                      player={player}
                      dimmed={isDimmed(player.role)}
                      onSelect={() => selectPlayer(player.id, index < 2 ? -1 : 1)}
                      position={index === 0 || index === 3 ? "far" : "near"}
                    />
                  ) : null,
                )}
              </div>

              <span className="feature-count" aria-hidden="true">
                {String(featuredIndex + 1).padStart(2, "0")} / {String(players.length).padStart(2, "0")} · BROWSE
              </span>
              <div className="feature-nav">
                <button type="button" aria-label="Previous player" onClick={() => cycle(-1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M14.5 5 7.5 12l7 7" />
                  </svg>
                </button>
                <button type="button" aria-label="Next player" onClick={() => cycle(1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M9.5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <StatsPanel player={featured} hidden={!statsOpen} onClose={closeStats} />
            </>
          )}
        </div>

        <aside className="woven-tag" aria-label={tab === "staff" ? "Coaching staff" : "Player line-up"}>
          <span className="tag-heading">{tab === "staff" ? "Staff" : "Line-up"}</span>
          <ul className="tag-list">
            {tab === "staff"
              ? staff.map((member, index) => (
                  <li key={`${member.name}-${index}`}>
                    <span className="tag-name" dir="auto">{member.name}</span>
                    <span className="tag-role">{member.role}</span>
                  </li>
                ))
              : players.map((player) => (
                  <li key={player.id}>
                    <button
                      type="button"
                      className={[
                        player.id === featuredId ? "is-current" : undefined,
                        player.role === "RES" ? "is-reserve" : undefined,
                      ].filter(Boolean).join(" ") || undefined}
                      onClick={() => selectPlayer(player.id)}
                      aria-pressed={player.id === featuredId}
                    >
                      <span className="tag-name" dir="auto">{player.handle}</span>
                      <span className="tag-role">{player.role === "RES" ? "RESERVE" : player.role}</span>
                    </button>
                  </li>
                ))}
          </ul>
          <a className="care-label" href="/shop">
            Shop the collection <span aria-hidden="true">→</span>
          </a>
        </aside>
      </section>

      <aside className="hem" aria-label="Verified achievements">
        {tab === "staff" ? (
          <>
            <span className="hem-item">Team honours · MPL ID Season 18 runners-up</span>
            <span className="hem-item">Coaching staff · Head coach / Assistant / Analyst</span>
          </>
        ) : (
          <>
            <span className="hem-item">MPL ID Season 18 runners-up</span>
            <span className="hem-item">Joshuaa · First Team jungler</span>
            <span className="hem-item">Joshuaa · Rookie of the Season</span>
            <span className="hem-item">Aprho · First Team roamer</span>
          </>
        )}
      </aside>
    </main>
  );
}
