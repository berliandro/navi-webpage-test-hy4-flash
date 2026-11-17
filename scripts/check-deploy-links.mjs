import fs from "node:fs";
import path from "node:path";

// Static hosting serves the export under a repo subpath. Next rewrites its own
// chunks but not raw <a href>/<img src> values in our components, so verify the
// built HTML: every internal URL must carry the same prefix as its CSS chunk.
const read = (p) => fs.readFileSync(p, "utf8");
const index = read(path.join("out", "index.html"));
const prefixMatch = index.match(/href="(\/[^/"]+)\/_next\//);
const base = prefixMatch ? prefixMatch[1] : "";

if (!base) {
  console.log("No basePath in the export (root deployment) — link check skipped.");
  process.exit(0);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const files = walk("out").filter((file) => file.endsWith(".html"));
const offenders = [];

for (const file of files) {
  const html = read(file);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)) {
    const url = match[1];
    if (url.startsWith(`${base}/`) || url === base) continue;
    offenders.push(`${file.replace(/\\/g, "/")} -> ${url}`);
  }
}

if (offenders.length) {
  console.error(`Found ${offenders.length} internal URL(s) without prefix "${base}/":`);
  for (const offender of [...new Set(offenders)].slice(0, 30)) console.error(`  ${offender}`);
  process.exit(1);
}

console.log(`PASS: ${files.length} exported HTML files, every internal link carries "${base}/".`);
