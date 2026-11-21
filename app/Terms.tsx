"use client";

import { useEffect, useRef, useState } from "react";

const OPEN_TERMS = "navi:open-terms";

/** Ask the header disclosure to open and take focus. Safe to call from any
 *  client component — no shared state or context, just one document event. */
export function openTerms() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_TERMS));
  }
}

/**
 * The full glossary lives in the header. Point-of-use glosses in Stats and the
 * Shop note link back here: the event opens the disclosure and focuses its
 * summary, so keyboard users land on the control they can then arrow through.
 */
export default function Terms() {
  const [open, setOpen] = useState(false);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      summaryRef.current?.focus();
    };
    window.addEventListener(OPEN_TERMS, onOpen);
    return () => window.removeEventListener(OPEN_TERMS, onOpen);
  }, []);

  return (
    <details
      className="terms"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary ref={summaryRef}>Terms</summary>
      <div className="terms-panel">
        <p className="terms-intro">
          NAVI MPL ID Season 18 fan hub. Verified facts only — roster, results,
          titles and real merchandise.
        </p>
        <dl>
          <div>
            <dt>Line-up tag</dt>
            <dd>The seven names. Pick one to feature on the shirt.</dd>
          </div>
          <div>
            <dt>Care label</dt>
            <dd>The yellow Shop button. Links out to the seller.</dd>
          </div>
          <div>
            <dt>Hem</dt>
            <dd>The verified fact strip along the bottom edge.</dd>
          </div>
          <div>
            <dt>Piping</dt>
            <dd>The one yellow seam. Marks the active state.</dd>
          </div>
          <div>
            <dt>Shape</dt>
            <dd>Six-axis geometry from published stats — not a score.</dd>
          </div>
          <div>
            <dt>AVG D* LOW</dt>
            <dd>Published average deaths; fewer extends the shape.</dd>
          </div>
          <div>
            <dt>RES</dt>
            <dd>Reserve player, not a starting role.</dd>
          </div>
        </dl>
      </div>
    </details>
  );
}
