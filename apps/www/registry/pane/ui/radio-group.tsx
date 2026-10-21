"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <Pane
      radius={999}
      className={cn(
        "inline-flex size-5 shrink-0 has-[:disabled]:opacity-50 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
        // Selected: the accent fills the glass, as in Checkbox and Switch
        "has-[[data-state=checked]]:[--pane-tint-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=checked]]:[--pane-nested-default:color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)]",
        "has-[[data-state=checked]]:[--pane-border-default:var(--pane-border-accent)]",
      )}
    >
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          "flex size-full items-center justify-center rounded-full border border-foreground/20 bg-transparent outline-none disabled:cursor-not-allowed data-[state=checked]:border-transparent",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="size-2 rounded-full bg-[var(--pane-accent-foreground)]"
        />
      </RadioGroupPrimitive.Item>
    </Pane>
  );
}

export { RadioGroup, RadioGroupItem };
