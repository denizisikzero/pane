"use client";

import * as React from "react";

/**
 * A boolean remembered in localStorage and shared live between documents:
 * `storage` reaches the other ones (the block iframes), the custom event this
 * one, so every preview flips together.
 */
function useStoredToggle(key: string, fallback: boolean) {
  const read = React.useCallback(() => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value === "true";
    } catch {
      return fallback;
    }
  }, [key, fallback]);

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      window.addEventListener("storage", onChange);
      window.addEventListener(key, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(key, onChange);
      };
    },
    [key],
  );

  const value = React.useSyncExternalStore(subscribe, read, () => fallback);

  const toggle = React.useCallback(() => {
    try {
      localStorage.setItem(key, String(!read()));
    } catch {}
    window.dispatchEvent(new Event(key));
  }, [key, read]);

  return [value, toggle] as const;
}

/** Whether component previews play the video background. Off by default. */
export function usePreviewVideo() {
  return useStoredToggle("pane-preview-video", false);
}
