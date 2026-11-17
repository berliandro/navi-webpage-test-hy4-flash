import fs from "node:fs";
const css = fs.readFileSync("app/globals.css", "utf8");
let selector = "";
for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  selector = m[1].trim().replace(/\s+/g, " ");
  for (const f of m[2].matchAll(/font-size:\s*var\((--type-step-\d+)\)/g)) {
    console.log(`${f[1]}  <=  ${selector.slice(0, 90)}`);
  }
}
