"use client";

import { CheckIcon, LinkIcon, PlusIcon, RotateCcwIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  AccentSwatches,
  accentScopeClass,
  accentScopeStyle,
} from "@/components/accent-swatches";
import { CopyButton } from "@/components/docs/copy-button";
import { ShowcaseBackdrop } from "@/components/showcase-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pane } from "@/components/ui/pane";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  type AccentName,
  accents,
  accentVars,
  DEFAULT_ACCENT,
} from "@/lib/accents";
import {
  GLASS_DISPLACEMENT,
  GLASS_MIN_FILTER_AREA,
  GLASS_SPECULAR,
  GLASS_SPRING,
} from "@/lib/glass/config";
import { type GlassConfig, GlassConfigProvider } from "@/lib/glass/context";
import { cn } from "@/lib/utils";

type Tokens = Record<"light" | "dark", Record<string, string>>;

/**
 * Motion presets. Default is what ships in config.ts; the others are starting
 * points for a feel, applied to both press and hover springs.
 */
const presets = {
  default: null,
  snappy: { stiffness: 700, damping: 35 },
  soft: { stiffness: 180, damping: 22 },
  bouncy: { stiffness: 420, damping: 12 },
} as const;
type Preset = keyof typeof presets;

const initial = {
  /** replaced by the shipped blur from the tokens on mount */
  blur: 12,
  tint: 100,
  saturation: 1.7,
  refraction: 100,
  aberration: 100,
  highlight: GLASS_SPECULAR.intensity,
  preset: "default" as Preset,
  accent: DEFAULT_ACCENT as AccentName,
  stiffness: GLASS_SPRING.press.stiffness,
  damping: GLASS_SPRING.press.damping,
};
type State = typeof initial;

/** "rgba(255, 255, 255, 0.26)" → [255, 255, 255, 0.26] */
function parseRgba(value: string) {
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 1];
  return parts as [number, number, number, number];
}

function rgba(value: string, factor: number) {
  const [r, g, b, a] = parseRgba(value);
  const alpha = Math.min(1, Math.round(a * factor * 1000) / 1000);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const round = (value: number, digits = 2) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

/** Slider bounds, also used to clamp values read from a shared link. */
const limits: Record<
  Exclude<keyof State, "preset" | "accent">,
  [number, number]
> = {
  blur: [0, 40],
  tint: [0, 300],
  saturation: [1, 3],
  refraction: [0, 200],
  aberration: [0, 300],
  highlight: [0, 1],
  stiffness: [50, 1000],
  damping: [5, 60],
};

/**
 * The settings live in the query string, so a link reproduces them and a
 * reload keeps them. Only values that differ from the defaults are written,
 * which keeps shared links short.
 */
function toQuery(state: State, defaults: State) {
  const params = new URLSearchParams();
  for (const key of Object.keys(state) as (keyof State)[]) {
    if (state[key] !== defaults[key]) params.set(key, String(state[key]));
  }
  return params.toString();
}

function fromQuery(search: string, defaults: State): State {
  const params = new URLSearchParams(search);
  const next = { ...defaults };
  for (const [key, [min, max]] of Object.entries(limits) as [
    keyof typeof limits,
    [number, number],
  ][]) {
    const raw = params.get(key);
    const value = raw === null ? Number.NaN : Number(raw);
    if (Number.isFinite(value)) next[key] = Math.min(max, Math.max(min, value));
  }
  const preset = params.get("preset");
  if (preset && Object.hasOwn(presets, preset)) next.preset = preset as Preset;
  const accent = params.get("accent");
  if (accent && Object.hasOwn(accents, accent))
    next.accent = accent as AccentName;
  return next;
}

function Control({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}

/**
 * One panel for both files: a tab per file and a single copy button for the
 * open one, so the export reads as one thing rather than two code stubs.
 */
function ExportPanel({ files }: { files: { name: string; code: string }[] }) {
  const [active, setActive] = React.useState(files[0]?.name ?? "");
  const current = files.find((file) => file.name === active) ?? files[0];

  return (
    <Pane variant="clear" radius={24} className="flex flex-col">
      <div className="flex items-center justify-between gap-3 border-foreground/5 border-b p-2">
        <Tabs value={current?.name} onValueChange={setActive}>
          <TabsList>
            {files.map((file) => (
              <TabsTrigger key={file.name} value={file.name}>
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {current ? <CopyButton text={current.code} /> : null}
      </div>
      <pre className="max-h-[26rem] overflow-auto p-5 font-mono text-[13px] leading-relaxed">
        {current?.code}
      </pre>
    </Pane>
  );
}

export function Playground({ tokens }: { tokens: Tokens }) {
  const baseBlur = Number.parseFloat(tokens.light["pane-blur-regular"] ?? "12");
  const baseSaturation = Number.parseFloat(
    tokens.light["pane-saturation"] ?? "1.7",
  );
  const defaults = React.useMemo(
    () => ({ ...initial, blur: baseBlur, saturation: baseSaturation }),
    [baseBlur, baseSaturation],
  );
  const [state, setState] = React.useState<State>(defaults);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  // the theme is only known on the client: theme-specific tint waits for
  // mount so the first render matches the server HTML
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // read the link once on mount (the server renders the defaults), then keep
  // the address bar in step with every change
  // biome-ignore lint/correctness/useExhaustiveDependencies: read the URL once
  React.useEffect(() => {
    setState(fromQuery(window.location.search, defaults));
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const query = toQuery(state, defaults);
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [state, mounted, defaults]);

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const choosePreset = (preset: Preset) => {
    const values = presets[preset] ?? GLASS_SPRING.press;
    setState((s) => ({
      ...s,
      preset,
      stiffness: values.stiffness,
      damping: values.damping,
    }));
  };

  const light = { ...tokens.light };
  const dark = { ...tokens.light, ...tokens.dark };
  const clearRatio =
    Number.parseFloat(light["pane-blur-clear"] ?? "5") / baseBlur;
  const tintFactor = state.tint / 100;

  const cssFor = (vars: Record<string, string>) => ({
    "pane-tint-regular": rgba(vars["pane-tint-regular"], tintFactor),
    "pane-tint-clear": rgba(vars["pane-tint-clear"], tintFactor),
  });
  const shared = {
    "pane-blur-regular": `${state.blur}px`,
    "pane-blur-clear": `${round(state.blur * clearRatio, 1)}px`,
    "pane-saturation": String(state.saturation),
  };
  const themed = cssFor(theme === "dark" ? dark : light);

  const style = Object.fromEntries(
    Object.entries(mounted ? { ...shared, ...themed } : shared).map(
      ([k, v]) => [`--${k}`, v],
    ),
  ) as React.CSSProperties;

  // the default preset keeps press and hover as shipped; moving a slider or
  // picking another preset drives both springs from the same values
  const isDefaultSpring =
    state.preset === "default" &&
    state.stiffness === GLASS_SPRING.press.stiffness &&
    state.damping === GLASS_SPRING.press.damping;

  const config = React.useMemo<Partial<GlassConfig>>(() => {
    const scale = (variant: "regular" | "clear") => ({
      ...GLASS_DISPLACEMENT[variant],
      strength: round(
        (GLASS_DISPLACEMENT[variant].strength * state.refraction) / 100,
        1,
      ),
      chromaticAberration: round(
        (GLASS_DISPLACEMENT[variant].chromaticAberration * state.aberration) /
          100,
      ),
    });
    return {
      displacement: { regular: scale("regular"), clear: scale("clear") },
      specular: { ...GLASS_SPECULAR, intensity: state.highlight },
      spring: isDefaultSpring
        ? GLASS_SPRING
        : {
            ...GLASS_SPRING,
            press: {
              ...GLASS_SPRING.press,
              stiffness: state.stiffness,
              damping: state.damping,
            },
            hover: {
              ...GLASS_SPRING.hover,
              stiffness: state.stiffness,
              damping: state.damping,
            },
          },
    };
  }, [
    state.refraction,
    state.aberration,
    state.highlight,
    state.stiffness,
    state.damping,
    isDefaultSpring,
  ]);

  const css = [
    ":root {",
    ...Object.entries({
      ...shared,
      ...cssFor(light),
      ...accentVars(state.accent, "light"),
    }).map(([k, v]) => `  --${k}: ${v};`),
    "}",
    "",
    ".dark {",
    ...Object.entries({
      ...cssFor(dark),
      ...accentVars(state.accent, "dark"),
    }).map(([k, v]) => `  --${k}: ${v};`),
    "}",
  ].join("\n");

  const springs = config.spring ?? GLASS_SPRING;
  const ts = [
    `export const GLASS_DISPLACEMENT = ${JSON.stringify(config.displacement, null, 2)};`,
    "",
    `export const GLASS_SPECULAR = ${JSON.stringify(config.specular, null, 2)};`,
    "",
    `export const GLASS_SPRING = ${JSON.stringify(springs, null, 2)};`,
    "",
    // unchanged, but pane.tsx imports it: the file must keep exporting it
    `export const GLASS_MIN_FILTER_AREA = ${GLASS_MIN_FILTER_AREA};`,
  ]
    .join("\n")
    .replace(/"(\w+)":/g, "$1:");

  return (
    // the accent recolors the controls panel too, not just the preview
    <div
      style={accentScopeStyle(state.accent)}
      className={cn("flex flex-col gap-10", accentScopeClass)}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <ShowcaseBackdrop toggleKey="pane-playground-video">
          <GlassConfigProvider value={config}>
            <div
              style={style}
              className="grid min-h-[30rem] place-content-center gap-8 p-4 sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="prominent">Continue</Button>
                <Button variant="destructive">Delete</Button>
                <Button size="icon" aria-label="Add">
                  <PlusIcon />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Tabs defaultValue="music">
                  <TabsList>
                    <TabsTrigger value="music">Music</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                  </TabsList>
                </Tabs>
                <ToggleGroup defaultValue="week">
                  <ToggleGroupItem value="day">Day</ToggleGroupItem>
                  <ToggleGroupItem value="week">Week</ToggleGroupItem>
                  <ToggleGroupItem value="month">Month</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
                <Input placeholder="Email address" />
                <Slider defaultValue={[60]} />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Switch id="pg-switch" defaultChecked />
                    <label htmlFor="pg-switch" className="font-medium text-sm">
                      Airplane mode
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox defaultChecked aria-label="Done" />
                    <Badge variant="prominent">New</Badge>
                  </div>
                </div>
              </div>
            </div>
          </GlassConfigProvider>
        </ShowcaseBackdrop>

        <Pane radius={24} className="flex flex-col gap-6 self-start p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Material</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={share}>
                {copied ? <CheckIcon /> : <LinkIcon />}
                {copied ? "Copied" : "Share"}
              </Button>
              <Button
                size="sm"
                onClick={() => setState(defaults)}
                aria-label="Reset all"
              >
                <RotateCcwIcon />
                Reset
              </Button>
            </div>
          </div>
          <Control label="Blur" value={`${state.blur}px`}>
            <Slider
              min={0}
              max={40}
              step={1}
              value={[state.blur]}
              onValueChange={([v]) => set("blur", v)}
              aria-label="Blur"
            />
          </Control>
          <Control label="Tint" value={`${state.tint}%`}>
            <Slider
              min={0}
              max={300}
              step={5}
              value={[state.tint]}
              onValueChange={([v]) => set("tint", v)}
              aria-label="Tint"
            />
          </Control>
          <Control label="Saturation" value={state.saturation.toFixed(1)}>
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={[state.saturation]}
              onValueChange={([v]) => set("saturation", round(v, 1))}
              aria-label="Saturation"
            />
          </Control>
          <Control label="Refraction" value={`${state.refraction}%`}>
            <Slider
              min={0}
              max={200}
              step={5}
              value={[state.refraction]}
              onValueChange={([v]) => set("refraction", v)}
              aria-label="Refraction"
            />
          </Control>
          <Control label="Chromatic aberration" value={`${state.aberration}%`}>
            <Slider
              min={0}
              max={300}
              step={5}
              value={[state.aberration]}
              onValueChange={([v]) => set("aberration", v)}
              aria-label="Chromatic aberration"
            />
          </Control>
          <Control label="Highlight" value={state.highlight.toFixed(2)}>
            <Slider
              min={0}
              max={1}
              step={0.05}
              value={[state.highlight]}
              onValueChange={([v]) => set("highlight", round(v))}
              aria-label="Highlight"
            />
          </Control>

          <div className="flex flex-col gap-4 border-foreground/5 border-t pt-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Accent</h2>
              <span className="text-muted-foreground text-sm capitalize">
                {state.accent}
              </span>
            </div>
            <AccentSwatches
              value={state.accent}
              onValueChange={(name) => set("accent", name)}
            />
          </div>

          <div className="flex flex-col gap-5 border-foreground/5 border-t pt-5">
            <h2 className="font-semibold">Motion</h2>
            <ToggleGroup
              value={state.preset}
              onValueChange={(v) => v && choosePreset(v as Preset)}
              className="w-full"
            >
              {(Object.keys(presets) as Preset[]).map((p) => (
                <ToggleGroupItem key={p} value={p} className="capitalize">
                  {p}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Control label="Stiffness" value={String(state.stiffness)}>
              <Slider
                min={50}
                max={1000}
                step={10}
                value={[state.stiffness]}
                onValueChange={([v]) => set("stiffness", v)}
                aria-label="Stiffness"
              />
            </Control>
            <Control label="Damping" value={String(state.damping)}>
              <Slider
                min={5}
                max={60}
                step={1}
                value={[state.damping]}
                onValueChange={([v]) => set("damping", v)}
                aria-label="Damping"
              />
            </Control>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Press a button, switch a tab or drag the slider to feel it.
            </p>
          </div>
        </Pane>
      </div>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-semibold text-xl">Use it in your project</h2>
          <p className="text-muted-foreground text-sm">
            Paste the variables into your <code>globals.css</code> and the
            values into <code>lib/glass/config.ts</code>.
          </p>
        </div>
        <ExportPanel
          files={[
            { name: "globals.css", code: css },
            { name: "lib/glass/config.ts", code: ts },
          ]}
        />
      </section>
    </div>
  );
}
