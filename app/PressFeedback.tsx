"use client";

import { useEffect } from "react";

// One shared press feedback for every control: a short depression into the
// cloth, then a confident release on the same curve as the rest of the site.
// Keyboard activation gets the same cue; reduced motion gets an opacity-only
// beat so the press is still confirmed without spatial movement.
const CONTROLS = "button, a.care-label, a.shop-link, a.nav-links a, a.brand";

export default function PressFeedback() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new WeakMap<HTMLElement, Animation>();
    const live = new Set<Animation>();

    const press = (target: EventTarget | null) => {
      const element = target instanceof Element ? target.closest(CONTROLS) : null;
      if (!(element instanceof HTMLElement)) return;

      running.get(element)?.cancel();
      const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
      const frames: Keyframe[] = reduced.matches
        ? [{ opacity: 1, easing: ease }, { opacity: 0.82, offset: 0.45, easing: ease }, { opacity: 1 }]
        : [
            { transform: "scale(1)", easing: ease },
            { transform: "scale(0.955) translateY(1px)", offset: 0.35, easing: ease },
            { transform: "scale(1)" },
          ];
      const animation = element.animate(frames, {
        duration: reduced.matches ? 140 : 260,
      });
      running.set(element, animation);
      live.add(animation);
      animation.finished
        .then(() => {
          if (running.get(element) === animation) running.delete(element);
          live.delete(animation);
        })
        .catch(() => {
          // A newer press cancelled this one; the map already points at it.
          live.delete(animation);
        });
    };

    const onPointerDown = (event: PointerEvent) => press(event.target);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") press(document.activeElement);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      live.forEach((animation) => animation.cancel());
    };
  }, []);

  return null;
}
