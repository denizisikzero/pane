"use client";

import { motion } from "motion/react";
import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { useGlassConfig } from "@/lib/glass/context";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onPointerDown,
  onPointerUp,
  onLostPointerCapture,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const [dragging, setDragging] = React.useState(false);
  const { spring } = useGlassConfig();
  const thumbs = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-dragging={dragging || undefined}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      // Radix captures the pointer on press, so release and capture loss both
      // land here wherever the pointer ends up
      onPointerDown={(event) => {
        setDragging(true);
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setDragging(false);
        onPointerUp?.(event);
      }}
      onLostPointerCapture={(event) => {
        setDragging(false);
        onLostPointerCapture?.(event);
      }}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <Pane
        radius={999}
        className="grow data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        data-orientation={props.orientation ?? "horizontal"}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative block h-full w-full overflow-hidden rounded-full"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="absolute bg-[color-mix(in_oklab,var(--pane-accent)_var(--pane-accent-opacity),transparent)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
      </Pane>
      {thumbs.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
          key={index}
          className="block rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none"
        >
          {/* At rest the thumb is an opaque knob; while dragged it swells and
              drops the knob fill, turning into bare glass over the track —
              the way Liquid Glass sliders lift off their rail. */}
          <motion.span
            className="block"
            animate={{ scale: dragging ? 1.3 : 1 }}
            transition={spring.press}
          >
            <Pane
              variant="blur"
              radius={999}
              className={cn(
                "h-6 w-9 transition-colors in-data-[orientation=vertical]:h-9 in-data-[orientation=vertical]:w-6",
                // both fills, as in Switch: inside a Card the thumb is a
                // nested pane and reads `--pane-nested-*` instead
                !dragging &&
                  "[--pane-nested-blur:var(--pane-knob)] [--pane-tint-blur:var(--pane-knob)]",
              )}
            />
          </motion.span>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
