import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Selvedge from "./Selvedge";

type SubPageProps = {
  active: string;
  title: string;
  lede: string;
  children: ReactNode;
};

/**
 * Shared shell for the primary nav's destination pages. It reuses the roster's
 * fabric, header and hem strip so every route reads as one garment, while the
 * content stays honest — only verified facts, and designed empty states where
 * no verified content exists.
 */
export default function SubPage({ active, title, lede, children }: SubPageProps) {
  return (
    <main className="garment page-stage" id="main-content" tabIndex={-1}>
      <Selvedge />
      <SiteHeader active={active} />
      <div className="page-wrap">
        <div className="page-content">
          <h1 className="page-title">{title}</h1>
          <p className="page-lede">{lede}</p>
          {children}
        </div>
      </div>
      <footer className="hem page-proof" aria-label="Verified achievements">
        <span className="hem-item">MPL ID Season 18 runners-up</span>
        <span className="hem-item">Joshuaa · First Team jungler</span>
        <span className="hem-item">Joshuaa · Rookie of the Season</span>
        <span className="hem-item">Aprho · First Team roamer</span>
      </footer>
    </main>
  );
}
