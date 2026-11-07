"use client";

import { useTheme } from "next-themes";
import * as React from "react";

type Scheme = "light" | "dark";

/**
 * Every render the site puts glass on, in a light and a dark version of the
 * same image. Whatever sits on a render follows the site's theme, and the
 * photo follows it too — never the other way round.
 */
export const renders = {
  chrome: {
    label: "Chrome",
    light: "/previews/chrome-light.jpg",
    dark: "/previews/chrome-dark.jpg",
  },
  reed: {
    label: "Reed",
    light: "/previews/reed-light.jpg",
    dark: "/previews/reed-dark.jpg",
  },
  vinyl: {
    label: "Vinyl",
    light: "/previews/vinyl-light.jpg",
    dark: "/previews/vinyl-dark.jpg",
  },
  silk: {
    label: "Silk",
    light: "/previews/silk-light.jpg",
    dark: "/previews/silk-dark.jpg",
  },
} as const;

export type RenderId = keyof typeof renders;

const subscribeNever = () => () => {};

/**
 * The site's theme once it's known on the client, and null before. The
 * server can't know it, so neither does the hydrating render: next-themes
 * already has it on the client, and using it straight away would render
 * something else than the server did.
 */
export function useScheme(): Scheme | null {
  const { resolvedTheme } = useTheme();
  const hydrated = React.useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  if (!hydrated) return null;
  return resolvedTheme === "dark"
    ? "dark"
    : resolvedTheme === "light"
      ? "light"
      : null;
}

/** A render in the version for the site's theme; light until it's known. */
export function useRender(id: RenderId) {
  return renders[id][useScheme() ?? "light"];
}

export interface PreviewBackground {
  id: RenderId | "none";
  label: string;
  src: string | null;
}

/** What a component preview can sit on in one theme: every render, or none. */
export function previewBackgrounds(scheme: Scheme): PreviewBackground[] {
  return [
    ...(Object.keys(renders) as RenderId[]).map((id) => ({
      id,
      label: renders[id].label,
      src: renders[id][scheme],
    })),
    { id: "none", label: "No background", src: null },
  ];
}

const BACKGROUND_KEY = "pane-preview-background";
const DEFAULT_BACKGROUND: PreviewBackground["id"] = "chrome";

/**
 * The background the component previews sit on, and the ones to pick from.
 * The pick is remembered in localStorage and shared live, so choosing one in
 * any preview changes them all; it stays the same render in both themes.
 * `background` is null until the theme is known on the client.
 */
export function usePreviewBackground() {
  const scheme = useScheme();
  const options = previewBackgrounds(scheme ?? "light");

  const read = React.useCallback((): PreviewBackground["id"] => {
    try {
      const value = localStorage.getItem(BACKGROUND_KEY);
      return previewBackgrounds("light").some((b) => b.id === value)
        ? (value as PreviewBackground["id"])
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

  const id = React.useSyncExternalStore(
    subscribe,
    read,
    () => DEFAULT_BACKGROUND,
  );

  const set = React.useCallback((next: PreviewBackground["id"]) => {
    try {
      localStorage.setItem(BACKGROUND_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(BACKGROUND_KEY));
  }, []);

  const background = options.find((b) => b.id === id) ?? options[0];
  return { background: scheme ? background : null, options, set };
}
