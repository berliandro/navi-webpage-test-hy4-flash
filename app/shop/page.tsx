"use client";

import { useState } from "react";
import MediaImage from "../MediaImage";
import SubPage from "../SubPage";
import { merch, type MerchItem, type MerchKind } from "../merch";
import { asset } from "../assetPath";

type Lens = "all" | MerchKind;
type Sort = "curated" | "official" | "az";
type Fit = "all" | "s18" | "other";

const lenses: { id: Lens; label: string }[] = [
  { id: "all", label: "All items" },
  { id: "official", label: "Official" },
  { id: "fan", label: "Fan-made" },
];

// Relevance is read from the listing name the seller published — never from a
// new claim. Listings that name MLBB or MPL ID are Season 18 / MLBB relevant;
// a Season 17 listing is explicitly not. Nothing is deleted or relabelled.
function isSeasonFit(name: string): boolean {
  return /MLBB|MPL ID/i.test(name) && !/SEASON 17/i.test(name);
}

const fits: { id: Fit; label: string }[] = [
  { id: "all", label: "All listings" },
  { id: "s18", label: "MLBB / Season 18" },
  { id: "other", label: "Other games & older" },
];

// Non-price, deterministic orders. Sorting only rearranges groups — every
// listing stays reachable and the Official / Fan-made lens stays independent.
const sorts: { id: Sort; label: string }[] = [
  { id: "curated", label: "Curated" },
  { id: "official", label: "Official first" },
  { id: "az", label: "Name A–Z" },
];

type SellerGroup = { url: string; items: MerchItem[] };

function groupBySeller(items: MerchItem[]): SellerGroup[] {
  const map = new Map<string, MerchItem[]>();
  for (const item of items) {
    const bucket = map.get(item.page);
    if (bucket) bucket.push(item);
    else map.set(item.page, [item]);
  }
  return Array.from(map, ([url, group]) => ({ url, items: group }));
}

function firstGrapheme(value: string): string {
  return Array.from(value.trim())[0] ?? "?";
}

export default function ShopPage() {
  const [lens, setLens] = useState<Lens>("all");
  const [fit, setFit] = useState<Fit>("all");
  const [sort, setSort] = useState<Sort>("curated");

  const officialCount = merch.filter((item) => item.kind === "official").length;
  const fanCount = merch.length - officialCount;
  const seasonCount = merch.filter((item) => isSeasonFit(item.name)).length;
  const otherCount = merch.length - seasonCount;

  const fitItems = merch.filter((item) =>
    fit === "all" ? true : fit === "s18" ? isSeasonFit(item.name) : !isSeasonFit(item.name),
  );
  const visible = lens === "all" ? fitItems : fitItems.filter((item) => item.kind === lens);

  let groups = groupBySeller(visible);
  if (sort === "official") {
    groups = groups.sort((a, b) =>
      a.items[0].kind === b.items[0].kind
        ? 0
        : a.items[0].kind === "official"
          ? -1
          : 1,
    );
  } else if (sort === "az") {
    groups = groups.sort((a, b) =>
      a.items[0].name.localeCompare(b.items[0].name, undefined, { sensitivity: "base" }),
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

      <div className="shop-fit" role="group" aria-label="Filter by season relevance">
        <span className="shop-fit-label">Season fit</span>
        {fits.map((option) => (
          <button
            key={option.id}
            type="button"
            className="shop-filter"
            aria-pressed={fit === option.id}
            onClick={() => setFit(option.id)}
          >
            {option.label}
            {option.id !== "all" && (
              <> · {option.id === "s18" ? seasonCount : otherCount}</>
            )}
          </button>
        ))}
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

      {groups.length ? (
        <>
          <p className="shop-summary" role="status">
            {groups.length} sellers · {visible.length} listings · grouped by listing, nothing removed
          </p>
          <div className="shop-grid">
            {groups.map((group) => {
              const primary = group.items[0];
              const count = group.items.length;
              return (
                <article
                  className={`shop-card kind-${primary.kind}`}
                  key={group.url}
                  data-entries={count}
                >
                  <div className="shop-media">
                    <MediaImage
                      src={asset(primary.file)}
                      alt={primary.name}
                      width={1024}
                      height={1024}
                      fallbackLabel={firstGrapheme(primary.name)}
                    />
                    <span
                      className={`shop-badge${primary.kind === "official" ? " shop-badge--official" : ""}`}
                    >
                      {primary.kind === "official" ? "Official" : "Fan-made"}
                    </span>
                  </div>
                  <h2 className="shop-name">{primary.name}</h2>
                  <p className="shop-meta">{primary.resolution} · local asset</p>
                  {count > 1 ? (
                    <details className="shop-variants">
                      <summary>{count} listings from this seller</summary>
                      <ul className="shop-entries">
                        {group.items.map((item) => (
                          <li className="shop-entry" key={item.file}>
                            <a
                              href={item.page}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${item.name} at the seller's listing (opens in a new tab)`}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <ul className="shop-entries shop-entries--single">
                      <li className="shop-entry">{primary.name}</li>
                    </ul>
                  )}
                  <a
                    className="shop-link"
                    href={primary.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${primary.name} at the seller's listing (opens in a new tab)`}
                  >
                    View at seller ↗
                  </a>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className="page-empty">
          <p className="page-empty-title">No items match this filter.</p>
        </div>
      )}
    </SubPage>
  );
}
