import fs from "node:fs";
import path from "node:path";

const REGISTRY_ROOT = path.join(process.cwd(), "registry", "pane");

function readSource(relativePath: string) {
  const filePath = path.join(REGISTRY_ROOT, relativePath);
  return fs.readFileSync(filePath, "utf-8").trimEnd();
}

export function getComponentSource(name: string) {
  return readSource(`ui/${name}.tsx`);
}

/** `name` is the file in examples/, without the extension. */
export function getExampleSource(name: string) {
  return readSource(`examples/${name}.tsx`);
}

export function getGlassSource(name: string) {
  return readSource(`lib/glass/${name}.ts`);
}

/** The `--pane-*` tokens the registry injects, keyed by theme then name. */
export function getStyleTokens() {
  const registry = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf-8"),
  ) as {
    items: { name: string; cssVars?: Record<string, Record<string, string>> }[];
  };
  const cssVars = registry.items.find(
    (item) => item.name === "pane-style",
  )?.cssVars;
  if (!cssVars) throw new Error("No pane-style cssVars in registry.json");
  return { light: cssVars.light ?? {}, dark: cssVars.dark ?? {} };
}

/**
 * The `--pane-*` block exactly as `shadcn add` writes it into a consumer's
 * stylesheet, rebuilt from the `pane-style` item so the docs can't drift from
 * what the registry ships.
 */
export function getStyleCssVars() {
  const cssVars = getStyleTokens();

  const rule = (selector: string, vars: Record<string, string> = {}) =>
    `${selector} {\n${Object.entries(vars)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n")}\n}`;

  return `${rule(":root", cssVars.light)}\n\n${rule(".dark", cssVars.dark)}`;
}
