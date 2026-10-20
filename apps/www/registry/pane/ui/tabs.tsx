"use client";

import { motion } from "motion/react";
import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { useGlassConfig } from "@/lib/glass/context";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value?: string;
  indicatorId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const indicatorId = React.useId();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value ?? internalValue;

  return (
    <TabsContext.Provider value={{ value: activeValue, indicatorId }}>
      <TabsPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          setInternalValue(next);
          onValueChange?.(next);
        }}
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <Pane radius={16} className="inline-flex w-fit">
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "relative inline-flex h-10 items-center gap-1 p-1",
          className,
        )}
        {...props}
      />
    </Pane>
  );
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx?.value === value;
  const { spring } = useGlassConfig();

  return (
    <TabsPrimitive.Trigger
      value={value}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-8 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-medium text-muted-foreground outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0",
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
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
