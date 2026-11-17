import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop — NAVI MPL ID",
  description: "Official and fan-made NAVI MPL ID merchandise, linked out to the seller.",
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
