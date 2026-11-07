"use client";

import * as React from "react";
import { GlassScene, type GlassSource } from "@/lib/glass/gpu/scene";
import { type RenderId, useRender } from "@/lib/previews";
import { cn } from "@/lib/utils";

/**
 * A framed render with glass on it: every pane inside is drawn by the WebGPU
 * lens over the photo. The photo is the render's version for the site's
 * theme, so what sits on it follows the theme like the rest of the page.
 */
export function GlassStage({
  render,
  className,
  imageClassName,
  imageStyle,
  children,
}: {
  /** a render, in its version for the site's theme; changing it crossfades */
  render: RenderId;
  className?: string;
  /** where the photo is cropped, e.g. object-[50%_30%] */
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const source = React.useRef<GlassSource | null>(null);
  const photo = useRender(render);
  // the photos on screen, oldest first: a new one fades in over the last,
  // which is dropped once it has
  const [layers, setLayers] = React.useState([{ src: photo, shown: true }]);

  React.useEffect(() => {
    setLayers((current) =>
      current.at(-1)?.src === photo
        ? current
        : [...current.slice(-1), { src: photo, shown: false }],
    );
  }, [photo]);

  return (
    <GlassScene source={source}>
      <div
        className={cn(
          "relative isolate overflow-hidden bg-foreground/5",
          className,
        )}
      >
        {layers.map((layer, index) => {
          const top = index === layers.length - 1;
          return (
            // biome-ignore lint/performance/noImgElement: the lens reads this element's pixels; next/image would hand it a placeholder first
            <img
              key={layer.src}
              ref={
                top
                  ? (node) => {
                      source.current = node;
                    }
                  : undefined
              }
              src={layer.src}
              style={imageStyle}
              alt=""
              onLoad={() =>
                setLayers((current) =>
                  current.map((l) =>
                    l.src === layer.src ? { ...l, shown: true } : l,
                  ),
                )
              }
              onTransitionEnd={() => {
                if (top) setLayers((current) => current.slice(-1));
              }}
              className={cn(
                "-z-10 absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none",
                layer.shown ? "opacity-100" : "opacity-0",
                imageClassName,
              )}
            />
          );
        })}
        {children}
      </div>
    </GlassScene>
  );
}
