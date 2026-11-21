import MediaImage from "./MediaImage";
import { asset, route } from "./assetPath";

// The primary navigation is a real set of routes: every item lands on an
// actual page that can be opened in a tab, rather than inert text or a
// dead in-page anchor. The portfolio-only Design notes route is retired.
const NAV = [
  { label: "Roster", href: route("/") },
  { label: "Matches", href: route("/matches") },
  { label: "Titles", href: route("/titles") },
  { label: "Media", href: route("/media") },
  { label: "Shop", href: route("/shop") },
] as const;

export default function SiteHeader({ active }: { active: string }) {
  return (
    <header className="topbar">
      <a className="brand" href={route("/")} aria-label="NAVI MPL ID — home">
        <MediaImage
          className="brand-mark"
          src={asset("/assets/brand/team-logo.png")}
          alt=""
          width={142}
          height={142}
          fallbackLabel="N"
          loading="eager"
          fetchPriority="high"
        />
        <span className="brand-text">
          <span className="brand-name">NAVI</span>
          <span className="brand-sub">MPL ID</span>
          <span className="brand-credit">Fan hub · MPL ID S18</span>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        {NAV.map((item) => {
          const current = item.label === active;
          return (
            <a
              key={item.label}
              href={item.href}
              className={current ? "nav-active" : undefined}
              aria-current={current ? "page" : undefined}
            >
              {item.label}
            </a>
          );
        })}
        <details className="terms">
          <summary>Terms</summary>
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
      </nav>
    </header>
  );
}
