"use client";

import { useMotionValue, useSpring } from "motion/react";
import * as React from "react";
import { useGlassConfig } from "../lib/glass/context";

/**
 * Writes the light angle straight to the node as `--pane-spin`, so it never
 * costs a React render. Glass catches the light from a fixed direction, so the
 * angle follows where the surface sits in the viewport (scrolling travels the
 * light around the rim) and the pointer takes over while it's on the surface.
 *
 * The angle is spring-smoothed, and unwrapped before the spring so a pointer
 * crossing due-left takes the short way round.
 */
export function useGlassPointer<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [active, setActive] = React.useState(false);
  // the same smoothed angle as a plain number, for the WebGPU lens to read
  // each frame without going through the style sheet
  const light = React.useRef({ spin: 0 });

  const { specular, spring } = useGlassConfig();
  const spin = useMotionValue(specular.angle);
  const smoothSpin = useSpring(spin, spring.drag);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--pane-spin", `${specular.angle}deg`);
    light.current = { spin: smoothSpin.get() };

    const unsubSpin = smoothSpin.on("change", (value) => {
      node.style.setProperty("--pane-spin", `${value}deg`);
      light.current.spin = value;
    });

    /** shortest way round: keeps the spring from unwinding the long arc */
    const setSpin = (target: number) => {
      const current = spin.get();
      spin.set(current + wrapDelta(target - current));
    };

    /** angle the light comes from, as a function of viewport position */
    const spinFromScroll = (rect: DOMRect) => {
      const viewport = window.innerHeight || 1;
      const progress = clamp01((rect.top + rect.height / 2) / viewport);
      return specular.angle + (progress - 0.5) * specular.travel;
    };

    let pointerOn = false;
    let frame = 0;

    const syncToScroll = () => {
      frame = 0;
      if (pointerOn) return;
      setSpin(spinFromScroll(node.getBoundingClientRect()));
    };

    // one rect read per frame at most: a page of panes each measuring on
    // every scroll event would thrash layout
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(syncToScroll);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerOn = true;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      // conic-gradient angles run clockwise from twelve o'clock, so the
      // highlight sits on the side of the rim the pointer is nearest
      setSpin((Math.atan2(px - 0.5, 0.5 - py) * 180) / Math.PI);
      setActive(true);
    };

    const handleLeave = () => {
      pointerOn = false;
      setActive(false);
      syncToScroll();
    };

    syncToScroll();
    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      unsubSpin();
    };
  }, [spin, smoothSpin, specular.angle, specular.travel]);

  return { ref, active, light };
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** signed difference between two angles, in (-180, 180] */
function wrapDelta(delta: number) {
  return delta - 360 * Math.round(delta / 360);
}
