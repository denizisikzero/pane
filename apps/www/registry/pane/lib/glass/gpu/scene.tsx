"use client";

import * as React from "react";
import { BLUR_SHADER, LENS_SHADER } from "./shaders";

export type GlassSource =
  | HTMLVideoElement
  | HTMLImageElement
  | HTMLCanvasElement;

/** Everything the lens shader needs from a pane, read once per frame. */
export interface GlassPaneParams {
  radius: number;
  bezel: number;
  refraction: number;
  dispersion: number;
  /** backdrop blur, CSS px of standard deviation — same unit as `blur()` */
  blur: number;
  saturation: number;
  /** light direction, deg clockwise from twelve o'clock */
  spin: number;
  rim: number;
  edge: number;
  specular: number;
}

export interface GlassPaneHandle {
  node: HTMLElement;
  canvas: HTMLCanvasElement;
  read: () => GlassPaneParams;
}

interface GlassSceneValue {
  /** true once the source is on the GPU — until then panes stay on CSS glass */
  ready: boolean;
  register: (pane: GlassPaneHandle) => () => void;
}

const GlassSceneContext = React.createContext<GlassSceneValue | null>(null);

export function useGlassScene() {
  return React.useContext(GlassSceneContext);
}

interface Gpu {
  device: GPUDevice;
  format: GPUTextureFormat;
  lens: GPURenderPipeline;
  blur: GPURenderPipeline;
  sampler: GPUSampler;
}

let gpuPromise: Promise<Gpu | null> | null = null;

/**
 * One device for the whole page, however many scenes and panes: canvases can
 * share it, and a page of buttons each holding their own device would run into
 * the browser's limits long before it ran out of GPU.
 */
export function getGpu() {
  gpuPromise ??= createGpu().catch(() => null);
  return gpuPromise;
}

async function createGpu(): Promise<Gpu | null> {
  if (typeof navigator === "undefined" || !navigator.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter({
    powerPreference: "low-power",
  });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  // a lost device takes every pane down with it; the next scene to mount
  // asks for a fresh one
  device.lost.then(() => {
    gpuPromise = null;
  });

  const format = navigator.gpu.getPreferredCanvasFormat();
  const pipeline = (code: string, target: GPUTextureFormat) => {
    const module = device.createShaderModule({ code });
    return device.createRenderPipeline({
      layout: "auto",
      vertex: { module, entryPoint: "vs" },
      fragment: { module, entryPoint: "fs", targets: [{ format: target }] },
      primitive: { topology: "triangle-list" },
    });
  };

  return {
    device,
    format,
    lens: pipeline(LENS_SHADER, format),
    blur: pipeline(BLUR_SHADER, "rgba8unorm"),
    sampler: device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      addressModeU: "clamp-to-edge",
      addressModeV: "clamp-to-edge",
    }),
  };
}

/** 3 vec2f + 10 f32 — exactly the struct's 64 bytes, no padding */
const PANE_FLOATS = 16;

/** Blur levels this many σ (texture px) apart share one pre-blurred texture. */
const BLUR_BUCKET = 0.5;

/** Device pixel ratio is capped: past 2x the lens costs more than it shows. */
const MAX_DPR = 2;

interface PaneGpu {
  context: GPUCanvasContext;
  uniforms: GPUBuffer;
  data: Float32Array<ArrayBuffer>;
  bindGroup: GPUBindGroup | null;
  boundTo: GPUTexture | null;
}

interface BlurLevel {
  temp: GPUTexture;
  out: GPUTexture;
  uniforms: [GPUBuffer, GPUBuffer];
  groups: [GPUBindGroup, GPUBindGroup];
  used: boolean;
}

function intrinsicSize(source: GlassSource) {
  if (source instanceof HTMLVideoElement) {
    return [source.videoWidth, source.videoHeight];
  }
  if (source instanceof HTMLImageElement) {
    return [source.naturalWidth, source.naturalHeight];
  }
  return [source.width, source.height];
}

function hasFrame(source: GlassSource) {
  if (source instanceof HTMLVideoElement) return source.readyState >= 2;
  if (source instanceof HTMLImageElement) {
    return source.complete && source.naturalWidth > 0;
  }
  return source.width > 0 && source.height > 0;
}

/**
 * Where the source's pixels land on screen. Only `fill`, `contain` and `cover`
 * are honored, centred — `object-position` is assumed to be the default.
 */
function placement(source: GlassSource, iw: number, ih: number) {
  const rect = source.getBoundingClientRect();
  const fit = getComputedStyle(source).objectFit;
  let w = rect.width;
  let h = rect.height;
  if (fit === "cover" || fit === "contain") {
    const scale = (fit === "cover" ? Math.max : Math.min)(
      rect.width / iw,
      rect.height / ih,
    );
    w = iw * scale;
    h = ih * scale;
  }
  return {
    left: rect.left + (rect.width - w) / 2,
    top: rect.top + (rect.height - h) / 2,
    width: w,
    height: h,
  };
}

/**
 * Hands a backdrop to the WebGPU glass. WebGPU can't read what the browser
 * painted behind an element, so the glass bends a source it is given: every
 * Pane inside a scene refracts, blurs and lights `source` in a shader, in
 * every browser with WebGPU. Panes outside a scene, or without WebGPU, keep
 * the CSS `backdrop-filter` glass.
 *
 * Only the source is refracted — anything else layered between it and a pane
 * isn't seen by the lens.
 */
export function GlassScene({
  source,
  children,
}: {
  source: React.RefObject<GlassSource | null>;
  children: React.ReactNode;
}) {
  const panes = React.useRef(new Map<GlassPaneHandle, PaneGpu | null>());
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let gpu: Gpu | null = null;
    let texture: GPUTexture | null = null;
    let uploaded: GlassSource | null = null;
    let lastTime = -1;
    const levels = new Map<number, BlurLevel>();
    let isReady = false;

    const setSceneReady = (next: boolean) => {
      if (next === isReady) return;
      isReady = next;
      setReady(next);
    };

    const dropLevels = () => {
      for (const level of levels.values()) {
        level.temp.destroy();
        level.out.destroy();
        level.uniforms[0].destroy();
        level.uniforms[1].destroy();
      }
      levels.clear();
    };

    const blurLevel = (g: Gpu, src: GPUTexture, sigma: number) => {
      const key = Math.round(sigma / BLUR_BUCKET) * BLUR_BUCKET;
      let level = levels.get(key);
      if (!level) {
        // wide blurs run at reduced resolution: nothing survives them that
        // needs the full texture, and the passes get 4-16x cheaper
        const down = key >= 16 ? 4 : key >= 6 ? 2 : 1;
        const w = Math.max(1, Math.round(src.width / down));
        const h = Math.max(1, Math.round(src.height / down));
        const make = () =>
          g.device.createTexture({
            size: [w, h],
            format: "rgba8unorm",
            usage:
              GPUTextureUsage.TEXTURE_BINDING |
              GPUTextureUsage.RENDER_ATTACHMENT,
          });
        const temp = make();
        const out = make();
        const uniform = (x: number, y: number) => {
          const buffer = g.device.createBuffer({
            size: 16,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
          });
          // taps are a quarter-sigma apart, see BLUR_SHADER
          g.device.queue.writeBuffer(
            buffer,
            0,
            new Float32Array([
              (x * key) / 4 / src.width,
              (y * key) / 4 / src.height,
              w,
              h,
            ]),
          );
          return buffer;
        };
        const uniforms: [GPUBuffer, GPUBuffer] = [uniform(1, 0), uniform(0, 1)];
        const group = (buffer: GPUBuffer, from: GPUTexture) =>
          g.device.createBindGroup({
            layout: g.blur.getBindGroupLayout(0),
            entries: [
              { binding: 0, resource: { buffer } },
              { binding: 1, resource: g.sampler },
              { binding: 2, resource: from.createView() },
            ],
          });
        level = {
          temp,
          out,
          uniforms,
          groups: [group(uniforms[0], src), group(uniforms[1], temp)],
          used: false,
        };
        levels.set(key, level);
      }
      level.used = true;
      return level;
    };

    const renderBlur = (
      encoder: GPUCommandEncoder,
      g: Gpu,
      level: BlurLevel,
    ) => {
      const passes: [GPUTexture, GPUBindGroup][] = [
        [level.temp, level.groups[0]],
        [level.out, level.groups[1]],
      ];
      for (const [target, group] of passes) {
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: target.createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: [0, 0, 0, 0],
            },
          ],
        });
        pass.setPipeline(g.blur);
        pass.setBindGroup(0, group);
        pass.draw(3);
        pass.end();
      }
    };

    const setupPane = (g: Gpu, pane: GlassPaneHandle): PaneGpu | null => {
      const context = pane.canvas.getContext("webgpu");
      if (!context) return null;
      context.configure({
        device: g.device,
        format: g.format,
        alphaMode: "premultiplied",
      });
      return {
        context,
        uniforms: g.device.createBuffer({
          size: PANE_FLOATS * 4,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        }),
        data: new Float32Array(PANE_FLOATS),
        bindGroup: null,
        boundTo: null,
      };
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const g = gpu;
      const el = source.current;
      if (!g || !el || !hasFrame(el)) {
        setSceneReady(false);
        return;
      }
      const [iw, ih] = intrinsicSize(el);
      if (!iw || !ih) return;

      const max = g.device.limits.maxTextureDimension2D;
      if (iw > max || ih > max) {
        setSceneReady(false);
        return;
      }

      if (!texture || texture.width !== iw || texture.height !== ih) {
        texture?.destroy();
        dropLevels();
        texture = g.device.createTexture({
          size: [iw, ih],
          format: "rgba8unorm",
          usage:
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.COPY_DST |
            GPUTextureUsage.RENDER_ATTACHMENT,
        });
        uploaded = null;
      }

      // images upload once; video only when it has moved on a frame; a
      // canvas can change at any time, so it goes up every frame
      const stale =
        uploaded !== el ||
        el instanceof HTMLCanvasElement ||
        (el instanceof HTMLVideoElement && el.currentTime !== lastTime);
      if (stale) {
        try {
          g.device.queue.copyExternalImageToTexture(
            { source: el },
            { texture },
            [iw, ih],
          );
        } catch {
          // a cross-origin source without CORS can't be read back
          setSceneReady(false);
          return;
        }
        uploaded = el;
        if (el instanceof HTMLVideoElement) lastTime = el.currentTime;
      }
      setSceneReady(true);

      const place = placement(el, iw, ih);
      if (place.width <= 0 || place.height <= 0) return;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      // texture px per screen px — blur is specified on screen
      const texelScale = iw / place.width;

      for (const level of levels.values()) level.used = false;
      const encoder = g.device.createCommandEncoder();
      const blurred = new Set<BlurLevel>();

      for (const [pane, existing] of panes.current) {
        const node = pane.node;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        if (!width || !height) continue;
        const rect = node.getBoundingClientRect();
        if (
          rect.right < 0 ||
          rect.bottom < 0 ||
          rect.left > viewportW ||
          rect.top > viewportH
        ) {
          continue;
        }

        const state = existing ?? setupPane(g, pane);
        if (!state) continue;
        if (!existing) panes.current.set(pane, state);

        const pw = Math.round(width * dpr);
        const ph = Math.round(height * dpr);
        if (pane.canvas.width !== pw) pane.canvas.width = pw;
        if (pane.canvas.height !== ph) pane.canvas.height = ph;

        const params = pane.read();
        const sigma = params.blur * texelScale;
        let view = texture;
        if (sigma >= BLUR_BUCKET) {
          const level = blurLevel(g, texture, sigma);
          if (!blurred.has(level)) {
            renderBlur(encoder, g, level);
            blurred.add(level);
          }
          view = level.out;
        }

        if (state.boundTo !== view) {
          state.bindGroup = g.device.createBindGroup({
            layout: g.lens.getBindGroupLayout(0),
            entries: [
              { binding: 0, resource: { buffer: state.uniforms } },
              { binding: 1, resource: g.sampler },
              { binding: 2, resource: view.createView() },
            ],
          });
          state.boundTo = view;
        }

        // a transformed pane (hover scale) covers more screen than its
        // layout box, so its px map onto proportionally more texture
        const sx = rect.width / width;
        const sy = rect.height / height;
        const d = state.data;
        d[0] = width;
        d[1] = height;
        d[2] = (rect.left - place.left) / place.width;
        d[3] = (rect.top - place.top) / place.height;
        d[4] = sx / place.width;
        d[5] = sy / place.height;
        d[6] = params.radius;
        d[7] = params.bezel;
        d[8] = params.refraction;
        d[9] = params.dispersion;
        d[10] = params.saturation;
        d[11] = dpr;
        d[12] = (params.spin * Math.PI) / 180;
        d[13] = params.rim;
        d[14] = params.edge;
        d[15] = params.specular;
        g.device.queue.writeBuffer(state.uniforms, 0, d);

        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: state.context.getCurrentTexture().createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: [0, 0, 0, 0],
            },
          ],
        });
        pass.setPipeline(g.lens);
        pass.setBindGroup(0, state.bindGroup);
        pass.draw(3);
        pass.end();
      }

      g.device.queue.submit([encoder.finish()]);

      // a blur level nobody asked for this frame is dropped: variants come
      // and go with hover states, and each level holds two textures
      for (const [key, level] of levels) {
        if (level.used) continue;
        level.temp.destroy();
        level.out.destroy();
        level.uniforms[0].destroy();
        level.uniforms[1].destroy();
        levels.delete(key);
      }
    };

    getGpu().then((g) => {
      if (cancelled || !g) return;
      gpu = g;
      g.device.lost.then(() => {
        gpu = null;
        if (!cancelled) setSceneReady(false);
      });
      frame = requestAnimationFrame(tick);
    });

    const registry = panes.current;
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      texture?.destroy();
      dropLevels();
      for (const [pane, state] of registry) {
        state?.uniforms.destroy();
        registry.set(pane, null);
      }
    };
  }, [source]);

  const register = React.useCallback((pane: GlassPaneHandle) => {
    panes.current.set(pane, null);
    return () => {
      panes.current.get(pane)?.uniforms.destroy();
      panes.current.delete(pane);
    };
  }, []);

  const value = React.useMemo(() => ({ ready, register }), [ready, register]);

  return (
    <GlassSceneContext.Provider value={value}>
      {children}
    </GlassSceneContext.Provider>
  );
}
