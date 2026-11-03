"use client";

import * as React from "react";

/**
 * The photos a component preview can sit on, or none. `dark` photos put the
 * preview in the dark scheme, so the glass's type stays readable on them.
 */
export const previewBackgrounds = [
  { id: "chrome", label: "Chrome", src: "/previews/chrome.jpg", dark: false },
  { id: "frost", label: "Frost", src: "/previews/frost.jpg", dark: false },
  { id: "mesh", label: "Mesh", src: "/previews/mesh.jpg", dark: true },
  { id: "satin", label: "Satin", src: "/previews/satin.jpg", dark: false },
  { id: "none", label: "No background", src: null, dark: false },
] as const;

export type PreviewBackground = (typeof previewBackgrounds)[number]["id"];

const BACKGROUND_KEY = "pane-preview-background";
const DEFAULT_BACKGROUND: PreviewBackground = "chrome";

/**
 * Which photo the component previews sit on, remembered in localStorage and
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
