import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo-name>. The buyer can change
// NEXT_PUBLIC_BASE_PATH to their repository name, or leave it empty for a
// custom domain / root deployment. Every asset and route is self-hosted, so a
// plain static host needs no server and no runtime configuration.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default config;
