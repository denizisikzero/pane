"use client";

import * as React from "react";
import { type GlassPaneParams, useGlassScene } from "./scene";

/**
 * The canvas a pane's lens is drawn into, sitting under its content. It only
 * registers with the scene; the scene's frame loop sizes it and draws it, so a
 * page of panes costs one submit per frame rather than one per pane.
 */
export function GlassCanvas({
  target,
  read,
}: {
  target: React.RefObject<HTMLElement | null>;
  read: () => GlassPaneParams;
}) {
  const scene = useGlassScene();
  const register = scene?.register;
  const canvas = React.useRef<HTMLCanvasElement | null>(null);
  const readRef = React.useRef(read);

  React.useEffect(() => {
    readRef.current = read;
  }, [read]);

  React.useEffect(() => {
    const node = target.current;
    if (!register || !node || !canvas.current) return;
    return register({
      node,
      canvas: canvas.current,
      read: () => readRef.current(),
    });
  }, [register, target]);

  return (
    <canvas
      ref={canvas}
      data-slot="glass-canvas"
      className="-z-10 pointer-events-none absolute inset-0 h-full w-full rounded-[inherit]"
    />
  );
}
