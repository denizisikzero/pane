import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

/** The docs app, which holds the registry source and its build in public/r. */
export const wwwDir = path.resolve(import.meta.dirname, "../../../../apps/www");

export interface RegistryItem {
  name: string;
  type: string;
  files?: { path: string; type: string; target?: string }[];
  cssVars?: { light?: Record<string, string>; dark?: Record<string, string> };
}

export function readRegistry(): { items: RegistryItem[] } {
  return JSON.parse(
    fs.readFileSync(path.join(wwwDir, "registry.json"), "utf8"),
  );
}

/**
 * Serves the built registry from public/ on localhost, so the CLI installs
 * this checkout rather than the published site.
 */
export async function serveRegistry(port: number) {
  const publicDir = path.join(wwwDir, "public");
  if (!fs.existsSync(path.join(publicDir, "r", "pane.json"))) {
    throw new Error("public/r is empty — run `pnpm registry:build` first.");
  }

  const server = http.createServer((req, res) => {
    const file = path.join(
      publicDir,
      decodeURIComponent((req.url ?? "/").split("?")[0]),
    );
    if (!file.startsWith(publicDir) || !fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": "application/json" });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise<void>((resolve) => server.listen(port, resolve));
  return () => new Promise<void>((resolve) => server.close(() => resolve()));
}

/**
 * Runs a command to completion. Async on purpose: the registry server runs in
 * this process, and a sync spawn would block it from answering the very CLI
 * it's waiting on.
 */
export function run(command: string, args: string[], cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`)),
    );
  });
}

/**
 * A fresh Next.js app to install into. Set PANE_TEST_APP to a directory to
 * reuse one between runs; it's created there on the first run.
 */
export async function createNextApp() {
  const appDir = process.env.PANE_TEST_APP
    ? path.resolve(process.env.PANE_TEST_APP)
    : path.join(fs.mkdtempSync(path.join(os.tmpdir(), "pane-tests-")), "app");

  if (!fs.existsSync(path.join(appDir, "package.json"))) {
    await run(
      "npx",
      [
        "-y",
        "create-next-app@latest",
        appDir,
        "--ts",
        "--tailwind",
        "--app",
        "--biome",
        "--import-alias",
        "@/*",
        "--use-npm",
        "--disable-git",
        "--no-agent-feedback",
        "--yes",
      ],
      path.dirname(appDir),
    );
  }
  return appDir;
}

/** components.json for a Base UI style, with `@pane` pointed at `registryUrl`. */
export function writeComponentsJson(
  appDir: string,
  style: string,
  registryUrl: string,
) {
  const config = {
    $schema: "https://ui.shadcn.com/schema.json",
    style,
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    iconLibrary: "lucide",
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    registries: { "@pane": registryUrl },
  };
  fs.writeFileSync(
    path.join(appDir, "components.json"),
    `${JSON.stringify(config, null, 2)}\n`,
  );
}

/** Where a registry file lands in a project with the default aliases. */
export function installedPath(appDir: string, registryPath: string) {
  const relative = registryPath.replace(/^registry\/pane\//, "");
  return path.join(
    appDir,
    relative.startsWith("ui/") ? `components/${relative}` : relative,
  );
}
