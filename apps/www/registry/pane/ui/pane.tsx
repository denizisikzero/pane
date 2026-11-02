"use client";

import { motion } from "motion/react";
import * as React from "react";
import { useGlassPointer } from "@/hooks/use-glass-pointer";
import { useGlassSupport } from "@/hooks/use-glass-support";
import { GLASS_MIN_FILTER_AREA } from "@/lib/glass/config";
import { useGlassConfig } from "@/lib/glass/context";
import { GlassFilter } from "@/lib/glass/glass-filter";
import { GlassCanvas } from "@/lib/glass/gpu/glass-canvas";
import { type GlassPaneParams, useGlassScene } from "@/lib/glass/gpu/scene";
import type { GlassVariant } from "@/lib/glass/types";
import { type PaneVariantProps, paneVariants } from "@/lib/glass/variants";
import { cn } from "@/lib/utils";

export interface PaneProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children" | "ref">,
    Omit<PaneVariantProps, "variant"> {
  variant?: GlassVariant;
  /** corner radius in px — kept numeric so the refraction filter can match it exactly */
  radius?: number;
  /**
   * Overrides nesting detection. Pass `false` on a pane rendered through a
   * portal: React context crosses the portal, so a dialog opened from inside a
   * Pane would otherwise think it is nested and drop its own backdrop, even
   * though on screen it floats over the page, not over its parent pane.
   */
  nested?: boolean;
  children?: React.ReactNode;
}

/**
 * True inside another Pane. Glass doesn't stack: a backdrop-filtered element
 * nested in another one can only sample its parent's layers, so it re-blurs an
 * already-tinted image and comes out muddy. Nested panes skip the backdrop work
 * and sit on a flat translucent tint instead.
 */
const NestedPaneContext = React.createContext(false);

/**
 * Border-box size, rounded to whole px. It has to be the border box: the
 * refraction map is a rounded rect of exactly this size pinned to the element's
 * origin, so a content-box measurement would shrink it by the padding and leave
 * the rim floating inside the surface. Rounding keeps sub-pixel layout jitter
 * from rebuilding the map.
 */
function usePaneSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const border = entry.borderBoxSize?.[0];
      const width = border ? border.inlineSize : node.offsetWidth;
      const height = border ? border.blockSize : node.offsetHeight;
      setSize((prev) => {
        const next = { width: Math.round(width), height: Math.round(height) };
        return prev.width === next.width && prev.height === next.height
          ? prev
          : next;
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

/**
 * Masks a layer down to a `thickness`-px band hugging the edge: paint the whole
 * rounded rect, then punch out the interior. Every moving highlight goes
 * through this so the shimmer stays on the rim instead of washing the content.
 */
function edgeBand(thickness: number): React.CSSProperties {
  const layers = "linear-gradient(#000 0 0), linear-gradient(#000 0 0)";
  return {
    padding: thickness,
    maskImage: layers,
    maskClip: "content-box, border-box",
    maskComposite: "exclude",
    WebkitMaskImage: layers,
    WebkitMaskClip: "content-box, border-box",
    WebkitMaskComposite: "xor",
  } as React.CSSProperties;
}

/** Reads a `--pane-*` length or number off the node, or `fallback`. */
function readToken(node: HTMLElement, name: string, fallback: number) {
  const value = Number.parseFloat(
    getComputedStyle(node).getPropertyValue(name),
  );
  return Number.isFinite(value) ? value : fallback;
}

/**
 * The lens parameters for this pane, as a stable function the scene calls once
 * per frame. Blur and saturation stay CSS tokens, as on the CSS path, and are
 * read off the node when the variant changes rather than every frame.
 */
function useLensParams(
  ref: React.RefObject<HTMLElement | null>,
  variant: GlassVariant,
  radius: number,
  light: React.RefObject<{ spin: number }>,
) {
  const { lens, specular } = useGlassConfig();
  const live = React.useRef({ variant, radius, lens, specular });
  const tokens = React.useRef({ blur: 0, saturation: 1 });

  React.useEffect(() => {
    live.current = { variant, radius, lens, specular };
  }, [variant, radius, lens, specular]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    tokens.current = {
      blur: readToken(node, `--pane-blur-${variant}`, 0),
      saturation: readToken(node, "--pane-saturation", 1),
    };
  }, [ref, variant]);

  return React.useCallback((): GlassPaneParams => {
    const { variant, radius, lens, specular } = live.current;
    return {
      radius,
      ...lens[variant],
      ...tokens.current,
      spin: light.current.spin,
      rim: specular.rim,
      edge: specular.edge,
      specular: 0.9,
    };
  }, [light]);
}

/**
 * The base glass surface every Pane component is built on: a blurred, tinted
 * body with the refraction, glow and specular sheen confined to a rim at the
 * edge, reacting to pointer position and press. Exported directly for wrapping
 * arbitrary content in glass.
 */
export function Pane({
  variant = "default",
  interactive = false,
  radius = 28,
  nested: nestedProp,
  className,
  style,
  children,
  ...props
}: PaneProps) {
  const reactId = React.useId().replace(/:/g, "");
  const filterId = `pane-filter-${reactId}`;
  const { ref, active, light } = useGlassPointer<HTMLDivElement>();
  const quality = useGlassSupport();
  const nestedContext = React.useContext(NestedPaneContext);
  const nested = nestedProp ?? nestedContext;
  const { width, height } = usePaneSize(ref);
  const { spring, specular } = useGlassConfig();
  const scene = useGlassScene();
  // inside a scene whose source is on the GPU, the shader carries the whole
  // material — refraction, blur, rim light — and the CSS layers stand down
  const gpu = !nested && quality !== "none" && scene?.ready === true;
  const canDisplace =
    !gpu &&
    !nested &&
    quality === "full" &&
    width * height >= GLASS_MIN_FILTER_AREA;
  const readLens = useLensParams(ref, variant, radius, light);

  // the glow has to stay a rim: on a 28px switch a wide band meets in the
  // middle and reads as a frosted collar rather than an edge
  const shortSide = Math.min(width || Infinity, height || Infinity);
  const glow = Math.max(2, Math.min(specular.edge, shortSide * 0.12));

  const blurVar = `var(--pane-blur-${variant})`;
  const backdropFilter =
    gpu || nested || quality === "none"
      ? undefined
      : canDisplace
        ? `blur(${blurVar}) saturate(var(--pane-saturation)) url(#${filterId})`
        : `blur(${blurVar}) saturate(var(--pane-saturation))`;
  const tint = nested
    ? `var(--pane-nested-${variant})`
    : `var(--pane-tint-${variant})`;

  return (
    <motion.div
      ref={ref}
      data-slot="pane"
      data-variant={variant}
      className={cn(
        paneVariants({ variant, interactive }),
        "overflow-hidden rounded-[var(--pane-radius)]",
        className,
      )}
      style={
        {
          ...style,
          "--pane-radius": `${radius}px`,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          // Tailwind's ring utilities are box-shadows too, so the pane's own
          // shadow has to carry their variables or an inline value would
          // wipe out every `ring-*` class — focus rings included.
          boxShadow:
            "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 1px 0 var(--pane-shadow), 0 16px 40px -20px var(--pane-shadow)",
        } as React.CSSProperties
      }
      whileTap={interactive ? { scale: 0.97 } : undefined}
      whileHover={interactive ? { scale: 1.015 } : undefined}
      transition={spring.press}
      {...props}
    >
      {gpu ? <GlassCanvas target={ref} read={readLens} /> : null}
      {/* body — flat tint only, so content sits on an even surface */}
      <span
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit] transition-colors duration-300 ease-out"
        style={{ backgroundColor: tint }}
      />
      {/* inner glow: a short inset feather giving the rim thickness. Kept
          small — a wide one fogs the middle and the backdrop stops showing */}
      {gpu ? null : (
        <span
          aria-hidden="true"
          className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen transition-opacity duration-300 ease-out"
          style={{
            opacity: active ? 0.36 : 0.3,
            boxShadow: `inset 0 0 ${glow}px -1px var(--pane-highlight)`,
          }}
        />
      )}
      {/* rim: bright arcs on opposite sides of the border, the way an edge
          catches a single light source. `--pane-spin` turns them as the surface
          moves through the viewport or the pointer crosses it. */}
      {gpu ? null : (
        <span
          aria-hidden="true"
          className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{
            ...edgeBand(specular.rim),
            opacity: active ? 1 : 0.85,
            transition: "opacity 300ms ease-out",
            background: `conic-gradient(from var(--pane-spin, ${specular.angle}deg) at 50% 50%, transparent 0deg, var(--pane-highlight) 22deg, transparent 68deg, transparent 112deg, var(--pane-highlight) 158deg, transparent 204deg, transparent 248deg, var(--pane-highlight) 338deg, transparent 360deg)`,
          }}
        />
      )}
      <span
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: `inset 0 0 0 var(--pane-border-width, 0.5px) var(--pane-border-${variant})`,
        }}
      />
      <NestedPaneContext.Provider value={true}>
        {children}
      </NestedPaneContext.Provider>
      {canDisplace ? (
        <GlassFilter
          id={filterId}
          variant={variant}
          width={width}
          height={height}
          radius={radius}
        />
      ) : null}
    </motion.div>
  );
}
