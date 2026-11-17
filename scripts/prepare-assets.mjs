import fs from "node:fs";

// Next.js does not rewrite url(/fonts/...) in a stylesheet when basePath is
// set, so write the active base path into the self-hosted font URL at build
// time. Idempotent: re-run with any NEXT_PUBLIC_BASE_PATH value.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const path = "app/globals.css";
const css = fs.readFileSync(path, "utf8");
const next = css.replace(
  /url\("[^"]*\/fonts\/archivo-latin\.woff2"\)/,
  `url("${basePath}/fonts/archivo-latin.woff2")`,
);
if (next !== css) fs.writeFileSync(path, next);
console.log(`Prepared font URL for base path "${basePath || "/"}"`);
