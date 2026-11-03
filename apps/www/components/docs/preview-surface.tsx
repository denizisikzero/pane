"use client";

import { BanIcon } from "lucide-react";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { GlassScene, type GlassSource } from "@/lib/glass/gpu/scene";
import {
  previewBackgrounds,
  usePreviewBackground,
} from "@/lib/use-preview-video";
import { cn } from "@/lib/utils";

/** Five small swatches: four photos and none. The choice is shared by every preview. */
export function BackgroundPicker() {
  const [current, setCurrent] = usePreviewBackground();

  return (
    <Pane radius={999} className="flex items-center gap-1 p-1">
      {previewBackgrounds.map((background) => {
        const active = background.id === current;
        return (
          <button
            key={background.id}
            type="button"
            aria-pressed={active}
            aria-label={background.label}
            title={background.label}
            onClick={() => setCurrent(background.id)}
            className={cn(
              "flex size-6 items-center justify-center overflow-hidden rounded-full bg-foreground/[0.06] bg-center bg-cover text-muted-foreground outline-none ring-offset-1 ring-offset-transparent transition-[box-shadow,opacity] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
              active ? "ring-2 ring-foreground" : "opacity-70",
            )}
            style={
              background.src
                ? { backgroundImage: `url(${background.src})` }
                : undefined
            }
          >
            {background.src ? null : <BanIcon className="size-3.5" />}
          </button>
        );
      })}
    </Pane>
  );
}

export function PreviewSurface({
  compact = false,
  children,
}: {
  /** shorter, for the examples below a page's main preview */
  compact?: boolean;
  children: React.ReactNode;
}) {
  const [current] = usePreviewBackground();
  const background = previewBackgrounds.find((b) => b.id === current);
  const photo = background?.src ?? null;
  const source = React.useRef<GlassSource | null>(null);

  return (
    <GlassScene source={source}>
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-3xl p-4 pt-14 sm:p-10",
          compact ? "min-h-[200px]" : "min-h-[320px]",
          !photo && "border border-foreground/10",
          background?.dark && "dark text-foreground",
        )}
      >
        {photo ? (
          // biome-ignore lint/performance/noImgElement: the lens reads this element's pixels; next/image would hand it a placeholder first
          <img
            key={photo}
            ref={(node) => {
              source.current = node;
            }}
            src={photo}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute top-3 right-3 z-20">
          <BackgroundPicker />
        </div>
        <div className="relative">{children}</div>
      </div>
    </GlassScene>
  );
}
