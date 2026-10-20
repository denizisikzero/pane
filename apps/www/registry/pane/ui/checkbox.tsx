"use client";

import { CheckIcon, MinusIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <Pane
      radius={999}
      className={cn(
        "inline-flex size-5 shrink-0 has-[:disabled]:opacity-50 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
        // Checked or indeterminate: the glass fills with the accent, rim included — both fill
        // tokens, as in Switch, so it still fills inside a card or dialog.
        "has-[[data-state=checked]]:[--pane-tint-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=indeterminate]]:[--pane-tint-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=checked]]:[--pane-nested-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=indeterminate]]:[--pane-nested-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=checked]]:[--pane-border-default:var(--pane-border-accent)]",
        "has-[[data-state=indeterminate]]:[--pane-border-default:var(--pane-border-accent)]",
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer group flex size-full items-center justify-center rounded-[inherit] border border-foreground/20 bg-transparent text-[var(--pane-accent-foreground)] outline-none disabled:cursor-not-allowed data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent",
          className,
        )}
        {...props}
      >
        {/* an unchecked box needs its own edge: clear glass on a light page
            has none */}
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center"
        >
          {/* a dash for "some of these", the way macOS shows a mixed state */}
          <CheckIcon
            className="size-3.5 group-data-[state=indeterminate]:hidden"
            strokeWidth={3}
          />
          <MinusIcon
            className="hidden size-3.5 group-data-[state=indeterminate]:block"
            strokeWidth={3}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </Pane>
  );
}

export { Checkbox };
