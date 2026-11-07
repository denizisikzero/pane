import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The site's own panels — callouts, code, tables, cards in the docs. Plain on
 * purpose: glass is what the library sells, so the site keeps it for the
 * components themselves and frames everything else with a quiet hairline.
 */
export function Surface({
  radius = 20,
  interactive = false,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { radius?: number; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--surface-radius)] border border-hairline bg-foreground/[0.02]",
        interactive &&
          "transition-colors hover:border-foreground/[0.14] hover:bg-foreground/[0.04]",
        className,
      )}
      style={
        { ...style, "--surface-radius": `${radius}px` } as React.CSSProperties
      }
      {...props}
    />
  );
}
