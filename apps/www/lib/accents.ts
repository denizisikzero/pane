/**
 * Ready-made values for `--pane-accent`: Apple's system colors, each with
 * its own light and dark shade. `text` is the color's accessible shade, for
 * a label on plain glass. Green is what pane-style ships with.
 */
const accents = {
  green: {
    light: { accent: "#34c759", foreground: "#ffffff", text: "#248a3d" },
    dark: { accent: "#30d158", foreground: "#ffffff", text: "#30db5b" },
  },
  blue: {
    light: { accent: "#007aff", foreground: "#ffffff", text: "#0040dd" },
    dark: { accent: "#0a84ff", foreground: "#ffffff", text: "#409cff" },
  },
  indigo: {
    light: { accent: "#5856d6", foreground: "#ffffff", text: "#3634a3" },
    dark: { accent: "#5e5ce6", foreground: "#ffffff", text: "#7d7aff" },
  },
  purple: {
    light: { accent: "#af52de", foreground: "#ffffff", text: "#8944ab" },
    dark: { accent: "#bf5af2", foreground: "#ffffff", text: "#da8fff" },
  },
  pink: {
    light: { accent: "#ff2d55", foreground: "#ffffff", text: "#d30f45" },
    dark: { accent: "#ff375f", foreground: "#ffffff", text: "#ff6482" },
  },
  red: {
    light: { accent: "#ff3b30", foreground: "#ffffff", text: "#d70015" },
    dark: { accent: "#ff453a", foreground: "#ffffff", text: "#ff6961" },
  },
  orange: {
    light: { accent: "#ff9500", foreground: "#ffffff", text: "#c93400" },
    dark: { accent: "#ff9f0a", foreground: "#ffffff", text: "#ffb340" },
  },
  // too light for a white label or check
  yellow: {
    light: { accent: "#ffcc00", foreground: "#1d1d1f", text: "#b25000" },
    dark: { accent: "#ffd60a", foreground: "#1d1d1f", text: "#ffd426" },
  },
  teal: {
    light: { accent: "#30b0c7", foreground: "#ffffff", text: "#008299" },
    dark: { accent: "#40c8e0", foreground: "#ffffff", text: "#5de6ff" },
  },
  // shadcn/ui's neutral primary: near-black on light, near-white on dark
  graphite: {
    light: { accent: "#1d1d1f", foreground: "#ffffff", text: "#1d1d1f" },
    dark: { accent: "#f5f5f7", foreground: "#1d1d1f", text: "#f5f5f7" },
  },
} as const;

type Shade = { accent: string; foreground: string; text: string };

const rgb = (hex: string) =>
  [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
const toHex = (c: number[]) =>
  `#${c
    .map((v) =>
      Math.round(Math.min(255, Math.max(0, v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
const mix = (hex: string, to: number, t: number) =>
  toHex(rgb(hex).map((v) => v + (to - v) * t));

/** WCAG relative luminance, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Darken (to 0) or lighten (to 255) in small steps until `done`. */
function shift(hex: string, to: number, done: (l: number) => boolean) {
  let color = hex;
  for (let i = 0; i < 20 && !done(luminance(color)); i++)
    color = mix(color, to, 0.12);
  return color;
}

/**
 * Both shades of an accent from one color: dark mode lifts it a little, the
 * label on it is white or near-black by contrast, and the text shade is
 * pushed until it reads on plain glass.
 */
export function deriveAccent(hex: string): { light: Shade; dark: Shade } {
  const base = hex.toLowerCase();
  const lifted = mix(base, 255, 0.12);
  const label = (color: string) =>
    luminance(color) > 0.45 ? "#1d1d1f" : "#ffffff";
  return {
    light: {
      accent: base,
      foreground: label(base),
      text: shift(base, 0, (l) => l <= 0.16),
    },
    dark: {
      accent: lifted,
      foreground: label(lifted),
      text: shift(lifted, 255, (l) => l >= 0.38),
    },
  };
}

/** More presets, each derived from a single color. */
const derived = {
  emerald: "#10b981",
  lime: "#84cc16",
  mint: "#00c7be",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  violet: "#7c3aed",
  magenta: "#d946ef",
  rose: "#f43f5e",
  coral: "#ff6b4a",
  amber: "#f59e0b",
  brown: "#a2845e",
  slate: "#64748b",
} as const;

// graphite, the neutral, goes last: after every color
const { graphite, ...colors } = accents;

const presets = {
  ...colors,
  ...(Object.fromEntries(
    Object.entries(derived).map(([name, hex]) => [name, deriveAccent(hex)]),
  ) as Record<keyof typeof derived, { light: Shade; dark: Shade }>),
  graphite,
};

export type AccentName = keyof typeof presets;
export const accentNames = Object.keys(presets) as AccentName[];
export const DEFAULT_ACCENT: AccentName = "green";

/** A preset by name, or any color as six hex digits (`ff5500`). */
export type Accent = AccentName | (string & {});

export const isCustomAccent = (accent: string) => /^[0-9a-f]{6}$/.test(accent);

export function isAccent(value: string): value is Accent {
  return (accentNames as string[]).includes(value) || isCustomAccent(value);
}

/** Both shades of a preset or a custom color. */
export function accentShades(accent: Accent) {
  return isCustomAccent(accent)
    ? deriveAccent(`#${accent}`)
    : presets[accent as AccentName];
}

/** The declarations to paste under `:root` or `.dark`. */
export function accentVars(name: Accent, scheme: "light" | "dark") {
  const { accent, foreground, text } = accentShades(name)[scheme];
  return {
    "pane-accent": accent,
    "pane-accent-foreground": foreground,
    "pane-accent-text": text,
  };
}

export function accentCss(name: Accent) {
  const block = (selector: string, scheme: "light" | "dark") =>
    [
      `${selector} {`,
      ...Object.entries(accentVars(name, scheme)).map(
        ([k, v]) => `  --${k}: ${v};`,
      ),
      "}",
    ].join("\n");
  return `${block(":root", "light")}\n\n${block(".dark", "dark")}`;
}
