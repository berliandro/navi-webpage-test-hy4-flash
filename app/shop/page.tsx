"use client";

import { useState } from "react";
import MediaImage from "../MediaImage";
import SubPage from "../SubPage";
import { merch, type MerchKind } from "../merch";
import { asset } from "../assetPath";

type Lens = "all" | MerchKind;
type Sort = "curated" | "official" | "az";

const lenses: { id: Lens; label: string }[] = [
  { id: "all", label: "All items" },
  { id: "official", label: "Official" },
  { id: "fan", label: "Fan-made" },
];

// Non-price, deterministic orders. Sorting only rearranges cards — every
// listing stays reachable and the Official / Fan-made lens stays independent.
const sorts: { id: Sort; label: string }[] = [
  { id: "curated", label: "Curated" },
  { id: "official", label: "Official first" },
  { id: "az", label: "Name A–Z" },
];

function firstGrapheme(value: string): string {
  return Array.from(value.trim())[0] ?? "?";
}

export default function ShopPage() {
  const [lens, setLens] = useState<Lens>("all");
  const [sort, setSort] = useState<Sort>("curated");
  const officialCount = merch.filter((item) => item.kind === "official").length;
  const fanCount = merch.length - officialCount;

  let visible = lens === "all" ? merch : merch.filter((item) => item.kind === lens);
  if (sort === "official") {
    visible = [...visible].sort((a, b) =>
      a.kind === b.kind ? 0 : a.kind === "official" ? -1 : 1,
    );
  } else if (sort === "az") {
    visible = [...visible].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
  }

  return (
    <SubPage
      active="Shop"
      title="Shop"
      lede="Real NAVI merchandise, sourced from listings you can actually visit. Official and fan-made goods are labelled separately — nothing here is an endorsed product unless the listing says so."
    >
      <div className="shop-rail" role="group" aria-label="Filter merchandise">
        {lenses.map((option) => (
          <button
            key={option.id}
            type="button"
            className="shop-filter"
            aria-pressed={lens === option.id}
            onClick={() => setLens(option.id)}
          >
            {option.label}
            {option.id !== "all" && (
              <> · {option.id === "official" ? officialCount : fanCount}</>
            )}
          </button>
        ))}
        <span className="shop-count" role="status">
          {visible.length} of {merch.length} items
        </span>
      </div>

      <div className="shop-sort" role="group" aria-label="Sort merchandise">
        <span className="shop-sort-label">Sort</span>
        {sorts.map((option) => (
          <button
            key={option.id}
            type="button"
            className="shop-filter"
            aria-pressed={sort === option.id}
            onClick={() => setSort(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="shop-note">
        Every card links out to the seller&apos;s own listing. Buying happens there, not on this site.
        Images remain the property of their respective owners; sources are recorded in the merchandise provenance file.
      </p>

      {visible.length ? (
        <div className="shop-grid">
          {visible.map((item, index) => (
            <article
              className={`shop-card kind-${item.kind}`}
              key={`${item.file}-${index}`}
            >
              <div className="shop-media">
                <MediaImage
                  src={asset(item.file)}
                  alt={item.name}
                  width={1024}
                  height={1024}
                  fallbackLabel={firstGrapheme(item.name)}
                />
                <span
                  className={`shop-badge${item.kind === "official" ? " shop-badge--official" : ""}`}
                >
                  {item.kind === "official" ? "Official" : "Fan-made"}
                </span>
              </div>
              <h2 className="shop-name">{item.name}</h2>
              <p className="shop-meta">{item.resolution} · local asset</p>
              <a
                className="shop-link"
                href={item.page}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.name} at the seller's listing (opens in a new tab)`}
              >
                View at seller ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="page-empty">
          <p className="page-empty-title">No items match this filter.</p>
        </div>
      )}
    </SubPage>
  );
}
