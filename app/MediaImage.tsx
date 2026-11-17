"use client";

import { useEffect, useRef, useState } from "react";

type MediaImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackLabel: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "auto" | "low";
};

/**
 * Image with a designed failure state and a load-gated reveal.
 *
 * - A broken or blocked asset never renders the browser's broken-image glyph;
 *   it falls back to a monogram that stays inside the plate composition.
 * - `loading`/`decoding` hints and intrinsic dimensions are set so the cutouts
 *   do not cause layout shift or compete for bandwidth.
 * - A cached image that finished before hydration is detected via `complete`,
 *   so it is never left stuck in the hidden "loading" state.
 */
export default function MediaImage({
  src,
  alt,
  width,
  height,
  fallbackLabel,
  className,
  loading = "lazy",
  fetchPriority = "auto",
}: MediaImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const [hydrated, setHydrated] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // SSR images stay visible until hydration; the loading gate below only
  // applies once we know JS is alive and can reveal them again.
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Re-evaluate when the source changes, including after a failure rendered the
  // monogram (there is no <img> to fire load/error in that state). A cached new
  // source resolves immediately through `complete`; a slow one hides behind
  // the plate until its own load/error handler runs.
  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth > 0 ? "loaded" : "failed") : "loading");
  }, [src]);

  // Never render a blank monogram, even if a caller passes an empty label —
  // derive one character from the alt text, then a literal "?" as a last resort.
  const monogram = fallbackLabel.trim() || Array.from(alt.trim())[0] || "?";

  if (state === "failed") {
    return (
      <span
        className={["media-fallback", className].filter(Boolean).join(" ")}
        {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
      >
        <span className="media-fallback-monogram" aria-hidden="true">
          {monogram}
        </span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      data-media-state={state}
      data-hydrated={hydrated ? "true" : undefined}
      onLoad={() => setState("loaded")}
      onError={() => setState("failed")}
    />
  );
}
