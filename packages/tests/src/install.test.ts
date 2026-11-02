import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createNextApp,
  installedPath,
  readRegistry,
  run,
  serveRegistry,
  wwwDir,
  writeComponentsJson,
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
const components = registry.items.filter(
  (item) => item.type === "registry:ui",
);
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
});
