"use client";

import { PipetteIcon } from "lucide-react";
import type * as React from "react";
import {
  type Accent,
  accentNames,
  accentShades,
  isCustomAccent,
} from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Applies an accent to everything inside, in both themes, without waiting for
 * the client to know the theme: the light and dark shades ride along as
 * variables and the `.dark` class picks between them.
 */
export const accentScopeClass =
  "[--pane-accent:var(--accent-l)] [--pane-accent-foreground:var(--fg-l)] [--pane-accent-text:var(--text-l)] [.dark_&]:[--pane-accent:var(--accent-d)] [.dark_&]:[--pane-accent-foreground:var(--fg-d)] [.dark_&]:[--pane-accent-text:var(--text-d)]";

export function accentScopeStyle(name: Accent) {
  const { light, dark } = accentShades(name);
  return {
    "--accent-l": light.accent,
    "--accent-d": dark.accent,
    "--fg-l": light.foreground,
    "--fg-d": dark.foreground,
    "--text-l": light.text,
    "--text-d": dark.text,
  } as React.CSSProperties;
}

const swatch =
  "size-7 cursor-pointer rounded-full ring-1 ring-foreground/10 ring-inset outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50";
// the chosen one: a gap, then a ring in the text color
const chosen =
  "shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--foreground)]";

/**
 * Every preset, then a custom swatch: it opens the system color picker, and
 * any color becomes an accent with its shades worked out for both themes.
 */
export function AccentSwatches({
  value,
  onValueChange,
  className,
}: {
  value: Accent;
  onValueChange: (accent: Accent) => void;
  className?: string;
}) {
  const custom = isCustomAccent(value);

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
            swatch,
            "bg-[linear-gradient(135deg,var(--accent-l)_50%,var(--accent-d)_50%)]",
            value === name && chosen,
          )}
        />
      ))}
      <label
        title="Custom color"
        style={custom ? accentScopeStyle(value) : undefined}
        className={cn(
          swatch,
          "relative flex items-center justify-center has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
          custom
            ? cn(
                "bg-[linear-gradient(135deg,var(--accent-l)_50%,var(--accent-d)_50%)]",
                chosen,
              )
            : "bg-[conic-gradient(from_180deg,#ff3b30,#ff9500,#ffcc00,#34c759,#00c7be,#007aff,#af52de,#ff2d55,#ff3b30)]",
        )}
      >
        <PipetteIcon
          className={cn(
            "size-3.5 drop-shadow",
            custom ? "text-[var(--fg-l)]" : "text-white",
          )}
        />
        <input
          type="color"
          aria-label="Custom accent color"
          value={custom ? `#${value}` : "#ff6b4a"}
          onChange={(event) => onValueChange(event.target.value.slice(1))}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
    </fieldset>
  );
}
