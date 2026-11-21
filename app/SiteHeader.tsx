import MediaImage from "./MediaImage";
import Terms from "./Terms";
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
        <Terms />
      </nav>
    </header>
  );
}
