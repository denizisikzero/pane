import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  type GlassTheme,
  themeSlug,
  themeStyleItem,
} from "../../../apps/www/lib/glass-theme";
import {
  createNextApp,
  installedPath,
  readRegistry,
  run,
  serveRegistry,
  writeComponentsJson,
  wwwDir,
} from "./utils/helpers";

/**
 * For Base UI styles `shadcn add` rewrites registry code on install. Twice
 * that silently broke a component — a literal `asChild` on a Radix primitive
 * became a `render` prop Radix ignores, or was dropped — and neither showed
 * up as a type error in this repo. So: install everything into a fresh
 * base-* project and check what actually lands there.
 */

const PORT = 4321;
const registry = readRegistry();
const components = registry.items.filter((item) => item.type === "registry:ui");
const blocks = registry.items.filter((item) => item.type === "registry:block");
// blocks are left out: the CLI rewrites their imports on purpose (see below)
const files = registry.items
  .filter((item) => item.type !== "registry:block")
  .flatMap((item) => (item.files ?? []).map((file) => file.path));

describe("install into a base-nova project", () => {
  let appDir: string;
  let stopServer: () => Promise<void>;

  beforeAll(async () => {
    stopServer = await serveRegistry(PORT);
    appDir = await createNextApp();
    writeComponentsJson(
      appDir,
      "base-nova",
      `http://localhost:${PORT}/r/{name}.json`,
    );
    await run(
      "npx",
      [
        "-y",
        "shadcn@latest",
        "add",
        ...[...components, ...blocks].map((item) => `@pane/${item.name}`),
        "--yes",
        "--overwrite",
      ],
      appDir,
    );
  });

  afterAll(async () => {
    await stopServer?.();
  });

  // A failure here usually means a literal `asChild` on a Radix primitive —
  // see "Don't use asChild on Radix primitives" in CONTRIBUTING.md.
  it.each(files)("installs %s unchanged", (file) => {
    const target = installedPath(appDir, file);
    expect(fs.existsSync(target), `${file} was not installed`).toBe(true);
    expect(fs.readFileSync(target, "utf8")).toBe(
      fs.readFileSync(path.join(wwwDir, file), "utf8"),
    );
  });

  // A block imports its own parts by their registry path; the CLI turns that
  // into the project's components alias. Anything left pointing at
  // registry/ would not resolve in a real project.
  it.each(
    blocks.flatMap((block) =>
      (block.files ?? []).map((file) => ({ block: block.name, file })),
    ),
  )("installs $file.path with project imports", ({ file }) => {
    const target = path.join(
      appDir,
      file.target ?? `components/${path.basename(file.path)}`,
    );
    expect(fs.existsSync(target), `${file.path} was not installed`).toBe(true);
    expect(fs.readFileSync(target, "utf8")).not.toMatch(/@\/registry\//);
  });

  it("type-checks", async () => {
    await run("npx", ["tsc", "--noEmit", "-p", "."], appDir);
  });

  // The playground hands out `shadcn add <site>/r/styles/<slug>.json`
  // for a project that already has the components. That only works if the CLI
  // overwrites the tokens the default pane-style wrote, rather than keeping them.
  it("applies a playground theme over the installed tokens", async () => {
    const theme: GlassTheme = {
      border: "hairline",
      accent: "blue",
      radius: "sharp",
      density: "thick",
    };
    const slug = themeSlug(theme);
    const base = registry.items.find((item) => item.name === "pane-style");
    const dir = path.join(wwwDir, "public", "r", "styles");
    const file = path.join(dir, `${slug}.json`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(themeStyleItem(base ?? {}, theme)));
    try {
      await run(
        "npx",
        [
          "-y",
          "shadcn@latest",
          "add",
          // the short form the playground shows: the @pane namespace resolves
          // `{name}` to styles/<slug>, which is where the theme is served
          `@pane/styles/${slug}`,
          "--yes",
          "--overwrite",
        ],
        appDir,
      );
    } finally {
      fs.rmSync(file);
    }
    const check = () => {
      const css = fs.readFileSync(path.join(appDir, "app/globals.css"), "utf8");
      const value = (scope: string, name: string) =>
        css
          .slice(css.indexOf(`${scope} {`))
          .match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]
          .trim();
      expect(value(":root", "pane-radius-scale")).toBe("0.3");
      expect(value(":root", "pane-rim")).toBe("0");
      expect(value(":root", "pane-blur-thick")).toBe("20px");
      expect(value(":root", "pane-accent")).toBe("#007aff");
      expect(value(".dark", "pane-accent")).toBe("#0a84ff");
    };
    check();

    // adding a component afterwards pulls in the default pane-style again as a
    // dependency; the theme has to survive that
    await run(
      "npx",
      ["-y", "shadcn@latest", "add", "@pane/badge", "--yes"],
      appDir,
    );
    check();
  });
});
