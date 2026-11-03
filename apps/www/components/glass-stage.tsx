"use client";

import * as React from "react";
import { GlassScene, type GlassSource } from "@/lib/glass/gpu/scene";
import { cn } from "@/lib/utils";

/**
 * A framed photo with glass on it: every pane inside is drawn by the WebGPU
 * lens over the photo. `dark` sets the dark scheme on what's inside — white
 * text on dark glass — for a dark photo, whatever the site's theme.
 */
export function GlassStage({
  photo,
  dark = false,
  className,
  imageClassName,
  imageStyle,
  children,
}: {
  photo: string;
  dark?: boolean;
  className?: string;
  /** where the photo is cropped, e.g. object-[50%_30%] */
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const source = React.useRef<GlassSource | null>(null);

  return (
    <GlassScene source={source}>
      <div
        className={cn(
          "relative isolate overflow-hidden bg-foreground/5",
          dark && "dark text-foreground",
          className,
        )}
      >
        {/* biome-ignore lint/performance/noImgElement: the lens reads this element's pixels; next/image would hand it a placeholder first */}
        <img
          ref={(node) => {
            source.current = node;
          }}
          src={photo}
          style={imageStyle}
          alt=""
          className={cn(
            "-z-10 absolute inset-0 h-full w-full object-cover",
            imageClassName,
          )}
        />
        {children}
      </div>
    </GlassScene>
  );
}
