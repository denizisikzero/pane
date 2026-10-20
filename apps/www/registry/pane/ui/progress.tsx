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
          className="h-full w-full rounded-full bg-[color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)] transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </Pane>
  );
}

export { Progress };
