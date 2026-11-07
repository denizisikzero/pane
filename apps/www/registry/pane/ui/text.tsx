"use client";

import * as React from "react";
import { useGlassSupport } from "@/hooks/use-glass-support";
import { cn } from "@/lib/utils";

/** The same names as Pane's glass: regular, thick (frosted) and thin. */
type TextVariant = "regular" | "thick" | "thin";

/** How much each variant blurs and tints what shows through the letters. */
const variants: Record<TextVariant, { blur: string; tint: string }> = {
  regular: {
    blur: "var(--pane-blur-regular, 4px)",
    tint: "var(--pane-tint-regular, rgba(255, 255, 255, 0.08))",
  },
  thick: {
    blur: "var(--pane-blur-thick, 14px)",
    tint: "var(--pane-tint-thick, rgba(255, 255, 255, 0.24))",
  },
  thin: {
    blur: "var(--pane-blur-thin, 0px)",
    tint: "var(--pane-tint-thin, rgba(255, 255, 255, 0.02))",
  },
};

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /** The words. One line: glass type is for headlines, not paragraphs. */
  children: string;
  /** The element to render, e.g. "h1". Defaults to a span. */
  as?: React.ElementType;
  variant?: TextVariant;
  /** How far the letters bend what's behind them, in px. Chromium only. */
  refraction?: number;
}

interface Glyphs {
  width: number;
  height: number;
  /** the letters, filled: the shape of the glass */
  fill: string;
  /** the letters, outlined: where the light catches the edge */
  edge: string;
}

/** Room around the ink for the edge stroke, in CSS px. */
const PAD = 2;

/**
 * Draws the words with the element's own font into two masks. A canvas sees
 * web fonts once they've loaded, so the masks match the type the page would
 * have set, letter spacing included.
 */
function drawGlyphs(node: HTMLElement, text: string): Glyphs | null {
  const style = getComputedStyle(node);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const setup = () => {
    ctx.font = font;
    if ("letterSpacing" in ctx && style.letterSpacing !== "normal")
      (
        ctx as CanvasRenderingContext2D & { letterSpacing: string }
      ).letterSpacing = style.letterSpacing;
    ctx.textBaseline = "alphabetic";
  };
  setup();
  const m = ctx.measureText(text);
  const left = m.actualBoundingBoxLeft;
  const ascent = m.actualBoundingBoxAscent;
  const width = Math.ceil(left + m.actualBoundingBoxRight + PAD * 2);
  const height = Math.ceil(ascent + m.actualBoundingBoxDescent + PAD * 2);
  if (width <= PAD * 2 || height <= PAD * 2) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const draw = (paint: () => void) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setup();
    paint();
    return canvas.toDataURL();
  };
  const x = PAD + left;
  const y = PAD + ascent;

  const fill = draw(() => {
    ctx.fillStyle = "#000";
    ctx.fillText(text, x, y);
  });
  const edge = draw(() => {
    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(1, Number.parseFloat(style.fontSize) / 60);
    ctx.strokeText(text, x, y);
  });
  return { width, height, fill, edge };
}

const masked = (url: string): React.CSSProperties => ({
  maskImage: `url(${url})`,
  WebkitMaskImage: `url(${url})`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

/**
 * Type cut from glass: each letter is a window onto the page behind it,
 * blurred, saturated and — in Chromium — bent, with light on its edge. Put it
 * over a photo, a video or a gradient; on a flat background there is nothing
 * to see through. It takes its font from CSS like any text and stays real
 * text for screen readers and search; without backdrop-filter it is plain
 * text in the current color.
 */
function Text({
  children,
  as: Comp = "span",
  variant = "regular",
  refraction = 8,
  className,
  style,
  ...props
}: TextProps) {
  const quality = useGlassSupport();
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = React.useRef<HTMLElement>(null);
  const [glyphs, setGlyphs] = React.useState<Glyphs | null>(null);
  const glass = quality !== "none";

  // again once the web font has loaded, and when a breakpoint changes the size
  React.useLayoutEffect(() => {
    if (!glass) return;
    let key = "";
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const s = getComputedStyle(node);
      const next = `${children}|${s.font}|${s.letterSpacing}`;
      if (next === key) return;
      key = next;
      setGlyphs(drawGlyphs(node, children));
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [children, glass]);

  const { blur, tint } = variants[variant];
  const bend = quality === "full" && refraction > 0;
  const filter = `blur(${blur}) saturate(var(--pane-saturation, 1.8)) brightness(1.08)`;
  const ready = glass && glyphs;

  return (
    <Comp
      ref={ref}
      data-slot="text"
      className={cn(
        "relative inline-block whitespace-nowrap align-middle",
        className,
      )}
      style={
        ready ? { ...style, width: glyphs.width, height: glyphs.height } : style
      }
      {...props}
    >
      {ready ? (
        <>
          <span className="sr-only">{children}</span>
          {/* the letters' shadow on what's behind them */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-y-[3px] bg-black/20 blur-[3px]"
            style={masked(glyphs.fill)}
          />
          {/* the glass: the backdrop, seen through the letters */}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              ...masked(glyphs.fill),
              background: tint,
              backdropFilter: `${bend ? `url(#${id}) ` : ""}${filter}`,
              WebkitBackdropFilter: filter,
            }}
          />
          {/* light: a sheen over the top of each letter, and its rim */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.4),transparent_55%)]"
            style={masked(glyphs.fill)}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.95),rgb(255_255_255/0.25)_55%,rgb(255_255_255/0.6))]"
            style={masked(glyphs.edge)}
          />
          {bend ? (
            <svg aria-hidden="true" className="absolute size-0">
              <filter id={id} x="0" y="0" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012"
                  numOctaves="1"
                  seed="3"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  scale={refraction}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </svg>
          ) : null}
        </>
      ) : (
        // before the masks are drawn, and without backdrop-filter
        children
      )}
    </Comp>
  );
}

export { Text };
