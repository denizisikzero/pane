"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "pane-preview-video";

/** one clip per theme — each is graded for the UI that sits on it */
export const BACKGROUNDS = {
  light: "/bg-light.mp4",
  dark: "/bg-dark.mp4",
} as const;

export function PreviewSurface({
  compact = false,
  children,
}: {
  /** shorter, for the examples below a page's main preview */
  compact?: boolean;
  children: React.ReactNode;
}) {
  const [video, setVideo] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setVideo(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const toggle = () => {
    const next = !video;
    setVideo(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  // `resolvedTheme` is undefined until next-themes reads the DOM; staying null
  // through the first paint avoids flashing the light clip at dark-theme users
  const src =
    resolvedTheme === "dark"
      ? BACKGROUNDS.dark
      : resolvedTheme === "light"
        ? BACKGROUNDS.light
        : null;
  const showVideo = video && src !== null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl p-4 pt-14 sm:p-10",
        compact ? "min-h-[200px]" : "min-h-[320px]",
        !showVideo && "border border-foreground/10",
      )}
    >
      {showVideo ? (
        // keyed to remount on theme change: assigning a new `src` to a playing
        // <video> leaves the old frame up until load() is called
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute top-3 right-3 z-20">
        <Pane
          variant="clear"
          radius={999}
          className="inline-flex items-center p-1"
        >
          <button
            type="button"
            onClick={toggle}
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            {video ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
            <span className="sr-only">
              {video ? "Hide video background" : "Show video background"}
            </span>
          </button>
        </Pane>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
