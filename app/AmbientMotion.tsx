"use client";

import { useEffect } from "react";

// The fabric's ambient loops are decorative: pause them while the tab is
// hidden. CSS handles prefers-reduced-motion separately.
export default function AmbientMotion() {
  useEffect(() => {
    const sync = () => {
      document.documentElement.dataset.motion = document.hidden ? "paused" : "running";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      delete document.documentElement.dataset.motion;
    };
  }, []);

  return null;
}
