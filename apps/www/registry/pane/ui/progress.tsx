"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    // the size goes on the glass track, so `className="w-1/2"` sizes what
    // you see, as it does in shadcn/ui
    <Pane radius={999} className={cn("h-2 w-full", className)}>
      <ProgressPrimitive.Root
        data-slot="progress"
        value={value}
        className="relative h-full w-full overflow-hidden rounded-full"
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          // slides in from the inline start: the left, or the right in RTL
          className="h-full w-full -translate-x-(--pane-progress-rest) rounded-full bg-[color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)] transition-transform duration-500 ease-out motion-reduce:transition-none rtl:translate-x-(--pane-progress-rest)"
          style={
            {
              "--pane-progress-rest": `${100 - (value ?? 0)}%`,
            } as React.CSSProperties
          }
        />
      </ProgressPrimitive.Root>
    </Pane>
  );
}

export { Progress };
