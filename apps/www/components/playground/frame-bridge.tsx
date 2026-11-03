"use client";

import * as React from "react";
import { GlassConfigProvider } from "@/lib/glass/context";

export type GlassOverride = React.ComponentProps<
  typeof GlassConfigProvider
>["value"];

/** What the playground sends a template page in its iframe. */
export interface FrameMessage {
  type: "pane:tune";
  vars: Record<string, string>;
  config: GlassOverride;
}

/**
 * The template page's half of the playground. Inside the playground's iframe
 * it takes the tokens and glass config the panel sends, and keeps clicks on
 * the template's links inside the frame: in-page anchors scroll, links to
 * other pages of the site are ignored. Opened on its own it does nothing.
 */
export function FrameBridge({ children }: { children: React.ReactNode }) {
  const [tune, setTune] = React.useState<FrameMessage | null>(null);

  React.useEffect(() => {
    if (window.parent === window) return;
    const parent = window.parent;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as FrameMessage | undefined;
      if (data?.type === "pane:tune") setTune(data);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("#")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick);
    parent.postMessage({ type: "pane:ready" }, window.location.origin);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick);
    };
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const vars = tune?.vars ?? {};
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(`--${key}`, value);
    }
    return () => {
      for (const key of Object.keys(vars))
        root.style.removeProperty(`--${key}`);
    };
  }, [tune?.vars]);

  return (
    <GlassConfigProvider value={tune?.config ?? {}}>
      {/* remounted on a radius change: the refraction map is built for a
          corner in px when a pane mounts */}
      <React.Fragment key={tune?.vars["pane-radius-scale"] ?? "1"}>
        {children}
      </React.Fragment>
    </GlassConfigProvider>
  );
}
