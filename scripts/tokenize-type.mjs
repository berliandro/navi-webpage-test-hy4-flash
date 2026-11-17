import fs from "node:fs";

const path = "app/globals.css";
const css = fs.readFileSync(path, "utf8");
const rootStart = css.indexOf(":root {");
const rootEnd = css.indexOf("\n}", rootStart);
if (rootStart < 0 || rootEnd < 0) throw new Error("Could not find :root block");
const root = css.slice(rootStart, rootEnd);
const rest = css.slice(rootEnd);

const values = new Set();
for (const m of rest.matchAll(/font-size:\s*([^;]+);/g)) {
  values.add(m[1].trim());
}

const sorted = [...values].sort();
const defs = [];
const map = new Map();
sorted.forEach((value, i) => {
  const name = `--type-step-${String(i + 1).padStart(2, "0")}`;
  map.set(value, name);
  defs.push(`  ${name}: ${value};`);
});

let updatedRest = rest;
for (const [value, name] of map) {
  updatedRest = updatedRest.split(`font-size: ${value};`).join(`font-size: var(${name});`);
}

const updatedRoot = root.replace("\n}", `\n${defs.join("\n")}\n}`);
fs.writeFileSync(path, rootStart >= 0 ? css.slice(0, rootStart) + updatedRoot + updatedRest : css);
console.log(`Tokenized ${map.size} distinct font-size values`);
