import type { CSSProperties } from "react";

/**
 * Selvedge — loose thread ends at the raw edges of the garment.
 *
 * The old version made a visible lattice: evenly spaced tops, alternating
 * heights and arithmetic duration/delay sequences. Here every attribute is
 * drawn from a seeded PRNG at module load, so the result is irregular but
 * deterministic — no hydration mismatch and no runtime randomness per frame.
 * Each edge has its own seed; positions are stratified into narrow bands so
 * the edge stays evenly covered without looking like a grid.
 *
 * Presentational only: all motion is CSS, and the global `data-motion` flag
 * pauses it when the tab is hidden.
 */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Bit = {
  top: number;
  dur: number;
  delay: number;
  w: number;
  h: number;
  peak: number;
  mx: number;
  ex: number;
  climb: number;
};

function buildBits(seed: number, count = 20): Bit[] {
  const rnd = seeded(seed);
  const band = 100 / count;
  return Array.from({ length: count }, (_, i) => {
    const dur = 5.4 + rnd() * 9.8;
    const ex = 15 + rnd() * 12;
    return {
      top: Math.min(98, i * band + rnd() * band),
      dur,
      delay: -(0.15 + rnd() * 0.85) * dur,
      w: rnd() < 0.3 ? 2 : 1,
      h: 2 + Math.floor(rnd() * 2),
      peak: 0.55 + rnd() * 0.4,
      mx: ex * (0.25 + rnd() * 0.2),
      ex,
      climb: 82 + rnd() * 46,
    };
  });
}

const leftBits = buildBits(0x5eed_51de);
const rightBits = buildBits(0xb17d_5eed);

export default function Selvedge() {
  const render = (bit: Bit, side: "left" | "right", i: number) => (
    <span
      key={`${side}-${i}`}
      className={`selvedge-bit selvedge-bit--${side}`}
      style={
        {
          top: `${bit.top}%`,
          "--dur": `${bit.dur.toFixed(2)}s`,
          "--delay": `${bit.delay.toFixed(2)}s`,
          "--w": `${bit.w}px`,
          "--h": `${bit.h}px`,
          "--peak": bit.peak.toFixed(2),
          "--mx": `${bit.mx.toFixed(1)}px`,
          "--ex": `${bit.ex.toFixed(1)}px`,
          "--climb": `${bit.climb.toFixed(1)}px`,
        } as CSSProperties
      }
    />
  );

  return (
    <div className="selvedge" aria-hidden="true">
      {leftBits.map((bit, i) => render(bit, "left", i))}
      {rightBits.map((bit, i) => render(bit, "right", i))}
    </div>
  );
}
