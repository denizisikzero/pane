"use client";

import { motion } from "motion/react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { useGlassConfig } from "@/lib/glass/context";
import { cn } from "@/lib/utils";

interface ToggleGroupContextValue {
  value?: string;
  indicatorId: string;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
);

type ToggleGroupProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

/**
 * A single-choice control built on a Radix toggle group. Unlike the Radix and
 * shadcn versions there is no `type` prop and no multiple mode, and the active
 * item can't be pressed off again — there is always exactly one selection, the
 * way a native segmented control behaves.
 */
function ToggleGroup({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: ToggleGroupProps) {
  const indicatorId = React.useId();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value ?? internalValue;

  return (
    <ToggleGroupContext.Provider value={{ value: activeValue, indicatorId }}>
      <Pane radius={16} className="inline-flex w-fit">
        <ToggleGroupPrimitive.Root
          type="single"
          value={activeValue ?? ""}
          onValueChange={(next) => {
            // Radix reports "" when the active item is pressed again
            if (!next) return;
            setInternalValue(next);
            onValueChange?.(next);
          }}
          data-slot="toggle-group"
          className={cn(
            "relative inline-flex h-10 items-center gap-1 p-1",
            className,
          )}
          {...props}
        />
      </Pane>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const ctx = React.useContext(ToggleGroupContext);
  const isActive = ctx?.value === value;
  const { spring } = useGlassConfig();

  return (
    <ToggleGroupPrimitive.Item
      value={value}
      data-slot="toggle-group-item"
      className={cn(
        "relative inline-flex h-8 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-medium text-muted-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {isActive ? (
        <motion.div
          layoutId={`${ctx?.indicatorId}-indicator`}
          transition={spring.hover}
          className="absolute inset-0"
        >
          <Pane radius={12} className="h-full w-full" />
        </motion.div>
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
      </span>
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
