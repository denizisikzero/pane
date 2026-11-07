"use client";

import * as React from "react";
import { GlassScene, type GlassSource } from "@/lib/glass/gpu/scene";
import { previewBackgrounds, usePreviewBackground } from "@/lib/previews";

/**
 * The background picked for the component previews, fixed behind a whole
 * block page. The block's panes sit in one GlassScene with the photo as its
 * source, so they refract it with the WebGPU lens.
 */
export function BlockBackdrop({ children }: { children: React.ReactNode }) {
  const [current] = usePreviewBackground();
  const photo = previewBackgrounds.find((b) => b.id === current)?.src ?? null;
  const ref = React.useRef<GlassSource | null>(null);

  return (
    <GlassScene source={ref}>
      {photo ? (
        // biome-ignore lint/performance/noImgElement: the lens reads this element's pixels; next/image would hand it a placeholder first
        <img
          key={photo}
          ref={(node) => {
            ref.current = node;
          }}
          src={photo}
          alt=""
          className="-z-10 fixed inset-0 h-full w-full object-cover"
        />
      ) : null}
      {children}
    </GlassScene>
  );
}
