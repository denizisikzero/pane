"use client";

import * as React from "react";

/**
 * The four renders the site puts glass on: the home page, the playground and
 * the component previews. `dark` renders want white type on top, so whatever
 * sits on them takes the dark scheme.
 */
export const renders = {
  chrome: { label: "Chrome", src: "/previews/chrome.jpg", dark: false },
  frost: { label: "Frost", src: "/previews/frost.jpg", dark: true },
  mesh: { label: "Mesh", src: "/previews/mesh.jpg", dark: true },
  satin: { label: "Satin", src: "/previews/satin.jpg", dark: false },
} as const;

/** What a component preview can sit on: one of the renders, or none. */
export const previewBackgrounds = [
  ...(Object.keys(renders) as (keyof typeof renders)[]).map((id) => ({
    id,
    ...renders[id],
  })),
  { id: "none", label: "No background", src: null, dark: false },
] as const;

export type PreviewBackground = (typeof previewBackgrounds)[number]["id"];

const BACKGROUND_KEY = "pane-preview-background";
const DEFAULT_BACKGROUND: PreviewBackground = "chrome";

/**
 * Which render the component previews sit on, remembered in localStorage and
 * shared live, so picking one in any preview changes them all.
 */
export function usePreviewBackground() {
  const read = React.useCallback((): PreviewBackground => {
    try {
      const value = localStorage.getItem(BACKGROUND_KEY);
      return previewBackgrounds.some((b) => b.id === value)
        ? (value as PreviewBackground)
        : DEFAULT_BACKGROUND;
    } catch {
      return DEFAULT_BACKGROUND;
    }
  }, []);

  const subscribe = React.useCallback((onChange: () => void) => {
    window.addEventListener("storage", onChange);
    window.addEventListener(BACKGROUND_KEY, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(BACKGROUND_KEY, onChange);
    };
  }, []);

  const value = React.useSyncExternalStore(
    subscribe,
    read,
    () => DEFAULT_BACKGROUND,
  );

  const set = React.useCallback((next: PreviewBackground) => {
    try {
      localStorage.setItem(BACKGROUND_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(BACKGROUND_KEY));
  }, []);

  return [value, set] as const;
}
