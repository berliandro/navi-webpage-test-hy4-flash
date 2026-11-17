import fs from "node:fs";
const path = "app/globals.css";
let css = fs.readFileSync(path, "utf8");
if (css.includes("--type-step-01:")) {
  console.log("tokens already present");
  process.exit(0);
}
const values = [
  "0.46rem",
  "0.52rem",
  "0.54rem",
  "0.56rem",
  "0.58rem",
  "0.5rem",
  "0.62rem",
  "0.64rem",
  "0.66rem",
  "0.68rem",
  "0.6rem",
  "0.72rem",
  "1.3rem",
  "clamp(0.66rem, 0.76vw, 0.8rem)",
  "clamp(0.95rem, 1.1vw, 1.2rem)",
  "clamp(0.9rem, 1.3vw, 1.1rem)",
  "clamp(1.1rem, 2vw, 1.7rem)",
  "clamp(1.5rem, 7vw, 2.4rem)",
  "clamp(1.9rem, 8vw, 3rem)",
  "clamp(1.8rem, 5vw, 3rem)",
  "clamp(1rem, 1.8vw, 1.5rem)",
  "clamp(2.4rem, 5vw, 5.2rem)",
  "clamp(2.8rem, 7vw, 6rem)",
  "clamp(2rem, 6vw, 4.6rem)",
  "clamp(2rem, calc(var(--type-print-vw) * 7 / var(--chars, 7)), 4.6rem)",
];
const defs = values
  .map((v, i) => `  --type-step-${String(i + 1).padStart(2, "0")}: ${v};`)
  .join("\n");
const start = css.indexOf(":root {");
const end = css.indexOf("\n}", start);
css = css.slice(0, end) + `\n${defs}` + css.slice(end);
fs.writeFileSync(path, css);
console.log(`Inserted ${values.length} type tokens`);
