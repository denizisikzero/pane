/**
 * Ready-made values for `--pane-accent`: Apple's system colors, each with
 * its own light and dark shade. `text` is the color's accessible shade, for
 * a label on plain glass. Green is what pane-style ships with.
 */
export const accents = {
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

export type AccentName = keyof typeof accents;
export const accentNames = Object.keys(accents) as AccentName[];
export const DEFAULT_ACCENT: AccentName = "green";

/** The declarations to paste under `:root` or `.dark`. */
export function accentVars(name: AccentName, scheme: "light" | "dark") {
  const { accent, foreground, text } = accents[name][scheme];
  return {
    "pane-accent": accent,
    "pane-accent-foreground": foreground,
    "pane-accent-text": text,
  };
}

export function accentCss(name: AccentName) {
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
