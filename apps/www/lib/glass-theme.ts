import {
  type Accent,
  accentNames,
  accentVars,
  DEFAULT_ACCENT,
  isAccent,
} from "./accents";

/**
 * A look for every Pane component, as data: the playground panel edits
 * one, its preview and the install command are built from it, and the
 * registry serves a matching `pane-style` for it at /r/styles/<slug>.json.
 * Everything here becomes `--pane-*` tokens over the shipped ones, so the
 * components themselves never change.
 */

export const borders = ["glow", "hairline", "none"] as const;
export const radii = ["default", "round", "sharp"] as const;
// the same words as the glass variants: how thick all of it is
export const densities = ["regular", "thin", "thick"] as const;

export type Border = (typeof borders)[number];
export type Radius = (typeof radii)[number];
export type Density = (typeof densities)[number];

export interface GlassTheme {
  border: Border;
  /** a preset name, or a custom color as six hex digits */
  accent: Accent;
  radius: Radius;
  density: Density;
}

export const DEFAULT_THEME: GlassTheme = {
  border: "glow",
  accent: DEFAULT_ACCENT,
  radius: "round",
  density: "thin",
};

/** Options in the order a picker shows them: from least to most. */
export const options = {
  border: [
    { value: "none", label: "None" },
    { value: "hairline", label: "Hairline" },
    { value: "glow", label: "Glow" },
  ],
  radius: [
    { value: "sharp", label: "Sharp" },
    { value: "default", label: "Default" },
    { value: "round", label: "Round" },
  ],
  density: [
    { value: "thin", label: "Thin" },
    { value: "regular", label: "Regular" },
    { value: "thick", label: "Thick" },
  ],
} as const satisfies {
  border: { value: Border; label: string }[];
  radius: { value: Radius; label: string }[];
  density: { value: Density; label: string }[];
};

type Scheme = "light" | "dark";
type Vars = Record<string, string>;

const border: Record<Border, Vars> = {
  glow: { "pane-border-width": "0.5px", "pane-rim": "1" },
  hairline: { "pane-border-width": "0.5px", "pane-rim": "0" },
  none: { "pane-border-width": "0px", "pane-rim": "0" },
};

const radius: Record<Radius, Vars> = {
  default: { "pane-radius-scale": "1" },
  round: { "pane-radius-scale": "1.4" },
  sharp: { "pane-radius-scale": "0.3" },
};

/**
 * Blur and tint of the two see-through variants. Regular is what
 * app/globals.css ships. Thick stays under the point where blur and tint
 * together turn into opaque plastic; thin keeps a little tint so text still
 * has a surface.
 */
const density: Record<Density, Record<Scheme, Vars>> = {
  regular: { light: {}, dark: {} },
  thin: {
    light: {
      "pane-blur-regular": "2px",
      "pane-blur-thick": "6px",
      "pane-tint-regular": "rgba(255, 255, 255, 0.04)",
      "pane-tint-thick": "rgba(255, 255, 255, 0.14)",
    },
    dark: {
      "pane-tint-regular": "rgba(18, 18, 22, 0.06)",
      "pane-tint-thick": "rgba(28, 28, 32, 0.16)",
    },
  },
  thick: {
    light: {
      "pane-blur-regular": "12px",
      "pane-blur-thick": "20px",
      "pane-tint-regular": "rgba(255, 255, 255, 0.2)",
      "pane-tint-thick": "rgba(255, 255, 255, 0.42)",
    },
    dark: {
      "pane-tint-regular": "rgba(18, 18, 22, 0.28)",
      "pane-tint-thick": "rgba(28, 28, 32, 0.46)",
    },
  },
};

/**
 * The tokens this theme sets for one scheme. Light holds the scheme-free ones
 * too (radius, rim, blur), the way globals.css does: `.dark` only overrides.
 */
export function themeVars(theme: GlassTheme, scheme: Scheme): Vars {
  const shared =
    scheme === "light"
      ? { ...border[theme.border], ...radius[theme.radius] }
      : {};
  return {
    ...shared,
    ...density[theme.density][scheme],
    ...accentVars(theme.accent, scheme),
  };
}

/**
 * `glow-blue-round-thick`: readable, and the registry path for the theme.
 * A custom accent goes in as its hex digits: `glow-ff5500-round-thick`.
 */
export function themeSlug(theme: GlassTheme) {
  return [theme.border, theme.accent, theme.radius, theme.density].join("-");
}

export function parseThemeSlug(slug: string): GlassTheme | null {
  const [b, a, r, d, ...rest] = slug.split("-");
  if (rest.length) return null;
  const pick = <T extends string>(list: readonly T[], value: string) =>
    (list as readonly string[]).includes(value) ? (value as T) : null;
  const theme = {
    border: pick(borders, b),
    accent: a && isAccent(a) ? a : null,
    radius: pick(radii, r),
    density: pick(densities, d),
  };
  return Object.values(theme).every(Boolean) ? (theme as GlassTheme) : null;
}

/** Every preset combination, built at deploy; custom colors build on demand. */
export function allThemeSlugs() {
  const slugs: string[] = [];
  for (const b of borders)
    for (const a of accentNames)
      for (const r of radii)
        for (const d of densities)
          slugs.push(
            themeSlug({ border: b, accent: a, radius: r, density: d }),
          );
  return slugs;
}

interface StyleItem {
  cssVars?: { light?: Vars; dark?: Vars };
}

/** The shipped pane-style item with the theme's tokens on top of its own. */
export function themeStyleItem<T extends StyleItem>(
  base: T,
  theme: GlassTheme,
) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...base,
    cssVars: {
      light: { ...base.cssVars?.light, ...themeVars(theme, "light") },
      dark: { ...base.cssVars?.dark, ...themeVars(theme, "dark") },
    },
  };
}

export function isDefaultTheme(theme: GlassTheme) {
  return themeSlug(theme) === themeSlug(DEFAULT_THEME);
}
