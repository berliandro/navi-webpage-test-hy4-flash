// Static hosting (GitHub Pages) serves the site under a repo subpath. Next's
// basePath rewrites its own chunks, but plain img/metadata URLs are ours to
// prefix. Keep every asset reference in one place so a root deployment (empty
// NEXT_PUBLIC_BASE_PATH) keeps working unchanged.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}

// Static export writes each route to <route>/index.html (trailingSlash), and
// GitHub Pages serves the project under basePath. Raw <a href> tags are not
// rewritten by Next, so every internal link must go through this helper.
export function route(path: string): string {
  const withSlash = path === "/" || path.endsWith("/") ? path : `${path}/`;
  return `${basePath}${withSlash}`;
}
