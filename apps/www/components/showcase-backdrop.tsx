"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { BACKGROUNDS } from "@/components/docs/preview-surface";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

/**
 * A moving backdrop for showcasing glass. Glass needs something behind it to
 * bend — over the flat page it reads as plain white cards.
 *
 * With `toggleKey`, an eye button switches the clip off to show the glass on
 * the plain page instead, and the choice is remembered under that key. The
 * clip stays on by default here, unlike the docs previews: the backdrop is
 * the point of a showcase.
 */
export function ShowcaseBackdrop({
  children,
  toggleKey,
}: {
  children: React.ReactNode;
  toggleKey?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [still, setStill] = React.useState(false);
  const [video, setVideo] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (toggleKey) {
      try {
        setVideo(localStorage.getItem(toggleKey) !== "false");
      } catch {
        // storage can be blocked; the clip simply stays on
      }
    }
  }, [toggleKey]);

  const toggle = () => {
    const next = !video;
    setVideo(next);
    if (!toggleKey) return;
    try {
      localStorage.setItem(toggleKey, String(next));
    } catch {
      // not remembered, but the toggle still works for this visit
    }
  };

  // The theme is only known on the client, so the clip waits for mount:
  // rendering it during hydration would mismatch the server HTML, and
  // guessing would flash the light clip at dark-theme visitors.
  const src =
    !mounted || !video
      ? null
      : resolvedTheme === "dark"
        ? BACKGROUNDS.dark
        : resolvedTheme === "light"
          ? BACKGROUNDS.light
          : null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2rem] p-3 sm:p-6",
        // on the plain page the area still needs an edge
        toggleKey && !video && "border border-foreground/10",
      )}
    >
      {src ? (
        // keyed to remount on theme change: swapping `src` on a playing
        // <video> leaves the old frame up until load() is called
        <video
          key={src}
          src={src}
          autoPlay={!still}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {toggleKey ? (
        <div className="absolute top-3 right-3 z-20">
          <Pane radius={999} className="inline-flex items-center p-1">
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
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
