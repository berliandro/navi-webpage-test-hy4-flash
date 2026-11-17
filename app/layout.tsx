import type { Metadata, Viewport } from "next";
import "./globals.css";
import { asset, route } from "./assetPath";
import PressFeedback from "./PressFeedback";
import AmbientMotion from "./AmbientMotion";

const siteTitle = "NAVI MPL ID — Season 18 Fan Hub";
const siteDescription =
  "The NAVI Mobile Legends: Bangbang Professional League Indonesia Season 18 fan hub: verified roster, results and titles, plus a directory of real team merchandise.";

export const metadata: Metadata = {
  // Relative og:image URLs resolve against this base. The default is the local
  // preview only; set NEXT_PUBLIC_SITE_URL to the published origin in production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200"),
  title: siteTitle,
  description: siteDescription,
  icons: { icon: asset("/assets/brand/team-logo.png") },
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    url: route("/"),
    siteName: "NAVI MPL ID Season 18 Fan Hub",
    images: [
      {
        url: asset("/og-card.png"),
        width: 1200,
        height: 630,
        alt: "NAVI MPL ID Season 18 roster, results and merchandise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [asset("/og-card.png")],
  },
};

// viewport-fit=cover lets the safe-area insets in globals.css push the field
// clear of notches and home indicators instead of letting the layout sit under
// them. Without it, env() resolves to zero on notched phones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0f10",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PressFeedback />
        <AmbientMotion />
        {children}
      </body>
    </html>
  );
}
