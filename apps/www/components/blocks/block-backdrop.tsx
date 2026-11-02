"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { BACKGROUNDS } from "@/components/docs/preview-surface";
import { GlassScene } from "@/lib/glass/gpu/scene";
import { usePreviewVideo } from "@/lib/use-preview-video";

/**
 * The site's backdrop clip, fixed behind a whole block page and following the
 * same eye toggle as the component previews. The block's panes sit in one
 * GlassScene with the clip as its source, so they refract it with the WebGPU
 * lens while it plays.
 */
export function BlockBackdrop({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [video] = usePreviewVideo();
  const [mounted, setMounted] = React.useState(false);
  const [still, setStill] = React.useState(false);
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    setMounted(true);
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // waits for mount: the theme is only known on the client
  const src = !(mounted && video)
    ? null
    : resolvedTheme === "dark"
      ? BACKGROUNDS.dark
      : resolvedTheme === "light"
        ? BACKGROUNDS.light
        : null;

  return (
    <GlassScene source={ref}>
      {src ? (
        // keyed to remount on theme change: swapping `src` on a playing
        // <video> leaves the old frame up until load() is called
        <video
          ref={ref}
          key={src}
          src={src}
          autoPlay={!still}
          muted
          loop
          playsInline
          className="-z-10 fixed inset-0 h-full w-full object-cover"
        />
      ) : null}
      {children}
    </GlassScene>
  );
}
