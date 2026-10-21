"use client";

import type * as React from "react";
import { type AccentName, accentNames, accents } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Applies an accent to everything inside, in both themes, without waiting for
 * the client to know the theme: the light and dark shades ride along as
 * variables and the `.dark` class picks between them.
 */
export const accentScopeClass =
  "[--pane-accent:var(--accent-l)] [--pane-accent-foreground:var(--fg-l)] [--pane-accent-text:var(--text-l)] [.dark_&]:[--pane-accent:var(--accent-d)] [.dark_&]:[--pane-accent-foreground:var(--fg-d)] [.dark_&]:[--pane-accent-text:var(--text-d)]";

export function accentScopeStyle(name: AccentName) {
  const { light, dark } = accents[name];
  return {
    "--accent-l": light.accent,
    "--accent-d": dark.accent,
    "--fg-l": light.foreground,
    "--fg-d": dark.foreground,
    "--text-l": light.text,
    "--text-d": dark.text,
  } as React.CSSProperties;
}

export function AccentSwatches({
  value,
  onValueChange,
  className,
}: {
  value: AccentName;
  onValueChange: (name: AccentName) => void;
  className?: string;
}) {
  return (
    <fieldset
      aria-label="Accent color"
      className={cn("m-0 flex min-w-0 flex-wrap gap-2 border-0 p-0", className)}
    >
      {accentNames.map((name) => (
        <button
          key={name}
          type="button"
          aria-pressed={value === name}
          aria-label={name}
          title={name}
          onClick={() => onValueChange(name)}
          style={accentScopeStyle(name)}
          className={cn(
            // split on the diagonal: the light shade, then the dark one
            "size-7 cursor-pointer rounded-full bg-[linear-gradient(135deg,var(--accent-l)_50%,var(--accent-d)_50%)] ring-1 ring-foreground/10 ring-inset outline-none transition-shadow",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            // the chosen one: a gap, then a ring in the text color
            value === name &&
              "shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--foreground)]",
          )}
        />
      ))}
    </fieldset>
  );
}
