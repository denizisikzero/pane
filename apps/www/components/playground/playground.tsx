"use client";

import {
  AppWindowIcon,
  CheckIcon,
  ChevronDownIcon,
  CodeIcon,
  CopyIcon,
  ExternalLinkIcon,
  LinkIcon,
  LockIcon,
  MonitorIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import {
  AccentSwatches,
  accentScopeClass,
  accentScopeStyle,
} from "@/components/accent-swatches";
import { CopyButton } from "@/components/docs/copy-button";
import { InstallCommand } from "@/components/install-command";
import type {
  FrameMessage,
  GlassOverride,
} from "@/components/playground/frame-bridge";
import { Button } from "@/components/ui/button";
import { Pane } from "@/components/ui/pane";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  GLASS_DISPLACEMENT,
  GLASS_LENS,
  GLASS_MIN_FILTER_AREA,
  GLASS_SPECULAR,
  GLASS_SPRING,
} from "@/lib/glass/config";
import { GlassConfigProvider } from "@/lib/glass/context";
import type { GlassVariant } from "@/lib/glass/types";
import {
  DEFAULT_THEME,
  type GlassTheme,
  options,
  parseThemeSlug,
  themeSlug,
  themeVars,
} from "@/lib/glass-theme";
import { renders } from "@/lib/previews";
import { cn } from "@/lib/utils";

/** Motion presets, applied to both the press and the hover spring. */
const presets = {
  default: null,
  snappy: { stiffness: 700, damping: 35 },
  soft: { stiffness: 180, damping: 22 },
  bouncy: { stiffness: 420, damping: 12 },
} as const;
type Preset = keyof typeof presets;

interface Tuning {
  saturation: number;
  refraction: number;
  aberration: number;
  preset: Preset;
  stiffness: number;
  damping: number;
}

const DEFAULT_TUNING: Tuning = {
  saturation: 1.7,
  refraction: 100,
  aberration: 100,
  preset: "default",
  stiffness: GLASS_SPRING.press.stiffness,
  damping: GLASS_SPRING.press.damping,
};

/** Slider bounds, also used to clamp values read from a shared link. */
const limits: Record<Exclude<keyof Tuning, "preset">, [number, number]> = {
  saturation: [1, 3],
  refraction: [0, 200],
  aberration: [0, 300],
  stiffness: [50, 1000],
  damping: [5, 60],
};

const viewports = {
  desktop: { label: "Desktop", width: "100%", icon: MonitorIcon },
  tablet: { label: "Tablet", width: "820px", icon: TabletIcon },
  phone: { label: "Phone", width: "390px", icon: SmartphoneIcon },
} as const;
type Viewport = keyof typeof viewports;

const round = (value: number, digits = 2) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

/** The template site the playground shows: one landing page. */
const BLOCK = "landing-01";

interface State {
  theme: GlassTheme;
  tuning: Tuning;
}

/**
 * Everything lives in the query string, so a link reproduces a look and a
 * reload keeps it. Only what differs from the defaults is written.
 */
function readQuery(search: string): State {
  const params = new URLSearchParams(search);
  const tuning = { ...DEFAULT_TUNING };
  for (const [key, [min, max]] of Object.entries(limits) as [
    keyof typeof limits,
    [number, number],
  ][]) {
    const raw = params.get(key);
    const value = raw === null ? Number.NaN : Number(raw);
    if (Number.isFinite(value))
      tuning[key] = Math.min(max, Math.max(min, value));
  }
  const preset = params.get("preset");
  if (preset && Object.hasOwn(presets, preset))
    tuning.preset = preset as Preset;
  const slug = params.get("theme");
  return {
    theme: (slug && parseThemeSlug(slug)) || DEFAULT_THEME,
    tuning,
  };
}

function writeQuery(state: State) {
  const params = new URLSearchParams();
  const slug = themeSlug(state.theme);
  if (slug !== themeSlug(DEFAULT_THEME)) params.set("theme", slug);
  for (const key of Object.keys(state.tuning) as (keyof Tuning)[]) {
    if (state.tuning[key] !== DEFAULT_TUNING[key])
      params.set(key, String(state.tuning[key]));
  }
  const query = params.toString();
  return `${window.location.pathname}${query ? `?${query}` : ""}`;
}

function glassConfig(tuning: Tuning): GlassOverride {
  const scale = (variant: GlassVariant) => ({
    strength: round(
      (GLASS_DISPLACEMENT[variant].strength * tuning.refraction) / 100,
      1,
    ),
    chromaticAberration: round(
      (GLASS_DISPLACEMENT[variant].chromaticAberration * tuning.aberration) /
        100,
    ),
  });
  // the same two sliders drive the WebGPU lens, for when the video plays
  const lens = (variant: GlassVariant) => ({
    refraction: round(
      (GLASS_LENS[variant].refraction * tuning.refraction) / 100,
      1,
    ),
    dispersion: round(
      (GLASS_LENS[variant].dispersion * tuning.aberration) / 100,
      3,
    ),
  });
  const spring =
    tuning.preset === "default" &&
    tuning.stiffness === DEFAULT_TUNING.stiffness &&
    tuning.damping === DEFAULT_TUNING.damping
      ? undefined
      : {
          press: { stiffness: tuning.stiffness, damping: tuning.damping },
          hover: { stiffness: tuning.stiffness, damping: tuning.damping },
        };
  return {
    displacement: {
      regular: scale("regular"),
      thick: scale("thick"),
      thin: scale("thin"),
    },
    lens: {
      regular: lens("regular"),
      thick: lens("thick"),
      thin: lens("thin"),
    },
    ...(spring ? { spring } : {}),
  };
}

function Section({
  title,
  action,
  collapsible = false,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  /** starts closed, opens from its title: for the finer controls */
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const frame =
    "border-foreground/[0.06] border-t pt-4 first:border-t-0 first:pt-0";
  if (collapsible)
    return (
      <details className={cn("group", frame)}>
        <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
          <h2 className="eyebrow">{title}</h2>
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="flex flex-col gap-4 pt-4">{children}</div>
      </details>
    );
  return (
    <section className={cn("flex flex-col gap-3.5", frame)}>
      <div className="flex items-center justify-between">
        <h2 className="eyebrow">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        {value ? <span className="tabular-nums">{value}</span> : null}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  items,
  onValueChange,
}: {
  label: string;
  value: T;
  items: readonly { value: T; label: string }[];
  onValueChange: (value: T) => void;
}) {
  return (
    <Field label={label}>
      <ToggleGroup
        value={value}
        onValueChange={(next) => next && onValueChange(next as T)}
        aria-label={label}
        className="w-full"
      >
        {items.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Field>
  );
}

function Range({
  label,
  value,
  display,
  min,
  max,
  step,
  onValueChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
}) {
  return (
    <Field label={label} value={display}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([next]) => onValueChange(next)}
        aria-label={label}
      />
    </Field>
  );
}

/**
 * The command for the look in the panel, the item on its own line so the
 * slug is never cut off.
 */
function InstallLook({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  const [cli, item] = command.split(/ (?=@pane\/)/);
  return (
    <div className="relative rounded-2xl bg-foreground/[0.05] p-3 pr-11 font-mono text-xs leading-relaxed">
      <div>
        <span className="select-none text-muted-foreground">$ </span>
        {cli}
      </div>
      <div className="break-words pl-[2ch]">{item}</div>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
    </div>
  );
}

export interface PlaygroundFile {
  name: string;
  code: string;
  /** the code highlighted on the server; plain text when missing */
  node?: React.ReactNode;
}

/** The code behind the preview: install commands, then a tab per file. */
function CodeView({
  files,
  commands,
  className,
}: {
  files: PlaygroundFile[];
  commands: string[];
  className?: string;
}) {
  const [active, setActive] = React.useState(files[0]?.name ?? "");
  const current = files.find((file) => file.name === active) ?? files[0];

  return (
    <div className={cn("flex flex-col bg-background", className)}>
      <div className="flex flex-col gap-2 border-hairline border-b p-3 lg:flex-row">
        {commands.map((command) => (
          <InstallCommand key={command} command={command} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-hairline border-b px-3 py-2">
        <div className="min-w-0 overflow-x-auto">
          <Tabs value={current?.name} onValueChange={setActive}>
            <TabsList>
              {files.map((file) => (
                <TabsTrigger key={file.name} value={file.name}>
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {current ? <CopyButton text={current.code} /> : null}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {current?.node ?? (
          <pre className="p-5 font-mono text-[13px] leading-relaxed">
            {current?.code}
          </pre>
        )}
      </div>
    </div>
  );
}

export interface PlaygroundComponent {
  slug: string;
  title: string;
  node: React.ReactNode;
}

/** demos too wide for one column, or too tall for one row, of the board */
const wide = new Set([
  "card",
  "command",
  "accordion",
  "alert",
  "tabs",
  "navigation-menu",
  "text",
]);
const tall = new Set(["pane", "card", "command", "accordion"]);

/**
 * The cells take turns on the four renders, each cropped to a part the type
 * reads on: the pale ground around chrome and satin, anywhere on frost, and
 * mesh, which is dark, in the dark scheme.
 */
const cellBackgrounds = [
  { ...renders.frost, positions: ["30% 30%", "70% 80%", "50% 55%"] },
  { ...renders.chrome, positions: ["5% 60%", "8% 15%", "100% 95%"] },
  { ...renders.satin, positions: ["95% 20%", "10% 90%", "60% 98%"] },
  { ...renders.mesh, positions: ["20% 20%", "60% 40%", "35% 70%"] },
];

/**
 * Every component in a cell of its own, each on its own crop of the picked
 * background, with the panel's look set on all of them: the tokens as CSS
 * variables, the material and motion through GlassConfigProvider. The panes
 * refract their own cell's photo, so no shared WebGPU scene is needed.
 */
function ComponentBoard({
  components,
  style,
  config,
  radiusKey,
}: {
  components: PlaygroundComponent[];
  style: React.CSSProperties;
  config: GlassOverride;
  radiusKey: string;
}) {
  return (
    <GlassConfigProvider value={config}>
      {/* remounted on a radius change: the refraction map is built for a
          corner in px when a pane mounts */}
      <div
        key={radiusKey}
        style={style}
        className="grid auto-rows-[11rem] grid-flow-dense grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4"
      >
        {components.map((component, index) => {
          const background = cellBackgrounds[index % cellBackgrounds.length];
          const position =
            background.positions[
              Math.floor(index / cellBackgrounds.length) %
                background.positions.length
            ];
          return (
            <div
              key={component.slug}
              className={cn(
                "relative isolate overflow-hidden rounded-[20px]",
                wide.has(component.slug) && "col-span-2",
                tall.has(component.slug) && "row-span-2",
                background.dark && "dark text-foreground",
              )}
            >
              {/* biome-ignore lint/performance/noImgElement: a plain img for the glass to refract; next/image would hand it a placeholder first */}
              <img
                src={background.src}
                alt=""
                loading="lazy"
                style={{ objectPosition: position }}
                className="-z-10 absolute inset-0 size-full scale-150 object-cover"
              />
              <a
                href={`/docs/components/${component.slug}`}
                className="absolute top-2.5 left-2.5 z-10 rounded-full bg-background/70 px-2 py-0.5 font-medium text-[11px] text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground"
              >
                {component.title}
              </a>
              {/* at 80%: an overview, every component at a glance; their own
                pages show them full size */}
              <div className="flex size-full items-center justify-center p-4 pt-10 [&_.min-h-72]:min-h-0">
                <div style={{ zoom: 0.8 }} className="max-w-full">
                  {component.node}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassConfigProvider>
  );
}

/**
 * The playground: a landing page in a browser window, with the panel beside
 * it tuning its glass, a viewport switch and a code view. The page runs in an
 * iframe, so its breakpoints follow the window's width, and the panel sends
 * it tokens and config through FrameBridge.
 */
export function Playground({
  files,
  components,
}: {
  files: PlaygroundFile[];
  components: PlaygroundComponent[];
}) {
  const [state, setState] = React.useState<State>({
    theme: DEFAULT_THEME,
    tuning: DEFAULT_TUNING,
  });
  const [mounted, setMounted] = React.useState(false);
  const [viewport, setViewport] = React.useState<Viewport>("desktop");
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const [copied, setCopied] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const frame = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    setState(readQuery(window.location.search));
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) window.history.replaceState(null, "", writeQuery(state));
  }, [state, mounted]);

  const scheme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const { theme, tuning } = state;

  const vars = React.useMemo(
    () => ({
      ...themeVars(theme, "light"),
      ...(scheme === "dark" ? themeVars(theme, "dark") : {}),
      "pane-saturation": String(tuning.saturation),
    }),
    [theme, scheme, tuning.saturation],
  );
  const config = React.useMemo(() => glassConfig(tuning), [tuning]);
  const boardStyle = React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(vars).map(([key, value]) => [`--${key}`, value]),
      ) as React.CSSProperties,
    [vars],
  );

  const send = React.useCallback(() => {
    const message: FrameMessage = { type: "pane:tune", vars, config };
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  }, [vars, config]);

  React.useEffect(() => {
    send();
  }, [send]);

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "pane:ready") send();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [send]);

  const setTheme = <K extends keyof GlassTheme>(key: K, value: GlassTheme[K]) =>
    setState((s) => ({ ...s, theme: { ...s.theme, [key]: value } }));
  const setTuning = <K extends keyof Tuning>(key: K, value: Tuning[K]) =>
    setState((s) => ({ ...s, tuning: { ...s.tuning, [key]: value } }));
  const choosePreset = (preset: Preset) => {
    const values = presets[preset] ?? GLASS_SPRING.press;
    setState((s) => ({
      ...s,
      tuning: {
        ...s.tuning,
        preset,
        stiffness: values.stiffness,
        damping: values.damping,
      },
    }));
  };

  const isDefault =
    themeSlug(theme) === themeSlug(DEFAULT_THEME) &&
    JSON.stringify(tuning) === JSON.stringify(DEFAULT_TUNING);

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const styleCommand = `npx shadcn@latest add @pane/styles/${themeSlug(theme)}`;
  const css = [
    ":root {",
    ...Object.entries({
      ...themeVars(theme, "light"),
      "pane-saturation": String(tuning.saturation),
    }).map(([k, v]) => `  --${k}: ${v};`),
    "}",
    "",
    ".dark {",
    ...Object.entries(themeVars(theme, "dark")).map(
      ([k, v]) => `  --${k}: ${v};`,
    ),
    "}",
  ].join("\n");
  const springs = config.spring
    ? {
        ...GLASS_SPRING,
        press: { ...GLASS_SPRING.press, ...config.spring.press },
        hover: { ...GLASS_SPRING.hover, ...config.spring.hover },
      }
    : GLASS_SPRING;
  const merge = <T extends Record<GlassVariant, object>>(
    base: T,
    over: Partial<Record<GlassVariant, object>> | undefined,
  ) =>
    Object.fromEntries(
      (Object.keys(base) as GlassVariant[]).map((v) => [
        v,
        { ...base[v], ...over?.[v] },
      ]),
    );
  const ts = [
    `export const GLASS_DISPLACEMENT = ${JSON.stringify(merge(GLASS_DISPLACEMENT, config.displacement), null, 2)};`,
    "",
    `export const GLASS_LENS = ${JSON.stringify(merge(GLASS_LENS, config.lens), null, 2)};`,
    "",
    `export const GLASS_SPECULAR = ${JSON.stringify(GLASS_SPECULAR, null, 2)};`,
    "",
    `export const GLASS_SPRING = ${JSON.stringify(springs, null, 2)};`,
    "",
    `export const GLASS_MIN_FILTER_AREA = ${GLASS_MIN_FILTER_AREA};`,
  ]
    .join("\n")
    .replace(/"(\w+)":/g, "$1:");

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <Pane
          variant="thick"
          radius={28}
          // the panel's own controls take the accent too
          style={accentScopeStyle(theme.accent)}
          className={cn(
            "flex h-fit flex-col gap-4 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto",
            accentScopeClass,
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">Your glass</span>
            <div className="flex items-center gap-1">
              <Button size="xs" variant="ghost" onClick={share}>
                {copied ? <CheckIcon /> : <LinkIcon />}
                {copied ? "Copied" : "Share"}
              </Button>
              {isDefault ? null : (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      theme: DEFAULT_THEME,
                      tuning: DEFAULT_TUNING,
                    }))
                  }
                >
                  <RotateCcwIcon />
                  Reset
                </Button>
              )}
            </div>
          </div>

          <Section title="Install">
            <InstallLook command={styleCommand} />
            <p className="text-muted-foreground text-xs leading-relaxed">
              Sets this look in your stylesheet. Add components before or after
              — they follow it. Material and motion live in{" "}
              <code>config.ts</code>, in the code view.
            </p>
          </Section>

          <Section title="Look">
            <Field label="Accent" value={theme.accent}>
              <AccentSwatches
                value={theme.accent}
                onValueChange={(value) => setTheme("accent", value)}
              />
            </Field>
            <Segmented
              label="Border"
              value={theme.border}
              items={options.border}
              onValueChange={(value) => setTheme("border", value)}
            />
            <Segmented
              label="Radius"
              value={theme.radius}
              items={options.radius}
              onValueChange={(value) => setTheme("radius", value)}
            />
            <Segmented
              label="Density"
              value={theme.density}
              items={options.density}
              onValueChange={(value) => setTheme("density", value)}
            />
          </Section>

          <Section title="Material" collapsible>
            <Range
              label="Saturation"
              value={tuning.saturation}
              display={tuning.saturation.toFixed(1)}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(v) => setTuning("saturation", round(v, 1))}
            />
            <Range
              label="Refraction"
              value={tuning.refraction}
              display={`${tuning.refraction}%`}
              min={0}
              max={200}
              step={5}
              onValueChange={(v) => setTuning("refraction", v)}
            />
            <Range
              label="Chromatic aberration"
              value={tuning.aberration}
              display={`${tuning.aberration}%`}
              min={0}
              max={300}
              step={5}
              onValueChange={(v) => setTuning("aberration", v)}
            />
          </Section>

          <Section title="Motion" collapsible>
            <ToggleGroup
              value={tuning.preset}
              onValueChange={(v) => v && choosePreset(v as Preset)}
              aria-label="Motion preset"
              className="w-full"
            >
              {(Object.keys(presets) as Preset[]).map((p) => (
                <ToggleGroupItem
                  key={p}
                  value={p}
                  className="px-2.5 text-xs capitalize"
                >
                  {p}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Range
              label="Stiffness"
              value={tuning.stiffness}
              display={String(tuning.stiffness)}
              min={50}
              max={1000}
              step={10}
              onValueChange={(v) => setTuning("stiffness", v)}
            />
            <Range
              label="Damping"
              value={tuning.damping}
              display={String(tuning.damping)}
              min={5}
              max={60}
              step={1}
              onValueChange={(v) => setTuning("damping", v)}
            />
          </Section>
        </Pane>

        <div className="flex min-w-0 flex-col gap-3">
          {/* the browser window the template site runs in */}
          {/* solid, not frosted: glass inside a backdrop-filter layer
              blurs an already blurred copy and turns grey */}
          <div className="overflow-hidden rounded-[28px] border border-hairline bg-background shadow-[0_30px_80px_-30px_rgb(0_0_0/0.35)]">
            <div className="flex flex-wrap items-center gap-3 border-hairline border-b px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="order-last flex w-full min-w-0 items-center gap-2 rounded-full bg-foreground/[0.05] px-3.5 py-1.5 font-mono text-muted-foreground text-xs sm:order-none sm:w-auto sm:flex-1">
                <LockIcon className="size-3 shrink-0" />
                <span className="truncate">theui.company</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div
                  className={cn(
                    "hidden xl:flex",
                    view === "code" && "pointer-events-none opacity-40",
                  )}
                >
                  <ToggleGroup
                    value={viewport}
                    onValueChange={(value) =>
                      value && setViewport(value as Viewport)
                    }
                    aria-label="Viewport"
                  >
                    {(Object.keys(viewports) as Viewport[]).map((key) => {
                      const { label, icon: Icon } = viewports[key];
                      return (
                        <ToggleGroupItem
                          key={key}
                          value={key}
                          aria-label={label}
                          title={label}
                        >
                          <Icon className="size-4" />
                        </ToggleGroupItem>
                      );
                    })}
                  </ToggleGroup>
                </div>
                <ToggleGroup
                  value={view}
                  onValueChange={(value) =>
                    value && setView(value as "preview" | "code")
                  }
                  aria-label="View"
                >
                  <ToggleGroupItem
                    value="preview"
                    aria-label="Preview"
                    title="Preview"
                  >
                    <AppWindowIcon className="size-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="code" aria-label="Code" title="Code">
                    <CodeIcon className="size-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Button size="icon" variant="ghost" asChild>
                  <a
                    href={`/view/${BLOCK}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the page in a new tab"
                  >
                    <ExternalLinkIcon />
                  </a>
                </Button>
              </div>
            </div>
            {/* the frame stays mounted under the code, so the page keeps
                its scroll and state */}
            <div
              className={cn(
                "flex justify-center bg-foreground/[0.02]",
                view === "code" && "hidden",
              )}
            >
              <iframe
                ref={frame}
                src={`/view/${BLOCK}`}
                title="theui.company"
                onLoad={send}
                className={cn(
                  "block h-[min(860px,calc(100svh-12rem))] min-h-[560px] w-full transition-[max-width] duration-300 ease-out motion-reduce:transition-none",
                  viewport !== "desktop" && "border-hairline border-x",
                )}
                style={{ maxWidth: viewports[viewport].width }}
              />
            </div>
            {view === "code" ? (
              <CodeView
                files={[
                  ...files,
                  { name: "globals.css", code: css },
                  { name: "config.ts", code: ts },
                ]}
                commands={[
                  `npx shadcn@latest add @pane/${BLOCK}`,
                  styleCommand,
                ]}
                className="h-[min(860px,calc(100svh-12rem))] min-h-[560px]"
              />
            ) : null}
          </div>
          <p className="px-2 text-muted-foreground text-xs">
            The page and the look install separately: the code view has both
            commands, the page&apos;s files and your tuned globals.css and
            config.ts.
          </p>

          <section className="flex flex-col gap-5 pt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 px-1">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">Every component</span>
                <h2 className="display text-4xl">
                  One look, <em>everywhere.</em>
                </h2>
                <p className="max-w-md text-muted-foreground text-sm">
                  The same panel drives all of them. Change the accent, the
                  radius or the springs and watch what moves.
                </p>
              </div>
            </div>
            <ComponentBoard
              components={components}
              style={boardStyle}
              config={config}
              radiusKey={theme.radius}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
