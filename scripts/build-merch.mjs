import fs from "node:fs";

const md = fs.readFileSync("public/assets/merch/PROVENANCE.md", "utf8");
const rows = md.split(/\r?\n/).filter((line) => line.startsWith("| `navi") || line.startsWith("| `navimlbb"));

const items = rows.map((line) => {
  const cells = line.split("|").map((c) => c.trim());
  // Parse from the end: item names may contain a literal pipe (name | seller).
  // Last cell is empty after the closing pipe.
  const file = cells[1].replace(/^`|`$/g, "");
  const pageCell = cells[cells.length - 2];
  const imageCell = cells[cells.length - 3];
  const resolution = cells[cells.length - 4];
  const classification = cells[cells.length - 5];
  const item = cells.slice(2, cells.length - 5).join("|").trim();
  // URLs may contain literal parentheses; capture through the final markdown
  // link close, not the first ")" inside the URL.
  const imageMatch = imageCell.match(/\]\((https?:\/\/.*)\)\s*$/);
  const pageMatch = pageCell.match(/\]\((https?:\/\/.*)\)\s*$/);
  if (!imageMatch || !pageMatch) throw new Error(`Unparsed row: ${line}`);
  return {
    file: `/assets/merch/${file}`,
    name: item.replace(/\s*\|\s*/g, " · "),
    kind: classification === "official" ? "official" : "fan",
    resolution,
    image: imageMatch[1],
    page: pageMatch[1],
  };
});

if (items.length !== 36) throw new Error(`Expected 36 items, got ${items.length}`);

const body = items
  .map(
    (i) =>
      `  {\n    file: ${JSON.stringify(i.file)},\n    name: ${JSON.stringify(i.name)},\n    kind: ${JSON.stringify(i.kind)},\n    resolution: ${JSON.stringify(i.resolution)},\n    page: ${JSON.stringify(i.page)},\n  },`,
  )
  .join("\n");

const out = `// Generated from public/assets/merch/PROVENANCE.md — do not edit by hand.\n// Every image is a local self-hosted asset; every page is the real seller listing.\nexport type MerchKind = "official" | "fan";\nexport type MerchItem = {\n  file: string;\n  name: string;\n  kind: MerchKind;\n  resolution: string;\n  page: string;\n};\n\nexport const merch: MerchItem[] = [\n${body}\n];\n`;
fs.writeFileSync("app/merch.ts", out);
console.log(`Wrote app/merch.ts with ${items.length} sourced items`);
