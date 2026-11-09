import { accentCss, accentNames, DEFAULT_ACCENT } from "@/lib/accents";
import { componentsMeta, getComponentMeta } from "@/lib/components-meta";
import {
  installUsage,
  introSections,
  mcpClients,
  mcpPrompts,
  providerExample,
  registryConfig,
  renderers,
  requirements,
  sceneExample,
  tiers,
  tokenGroups,
} from "@/lib/docs-content";
import { options } from "@/lib/glass-theme";
import {
  getExampleSource,
  getGlassSource,
  getStyleCssVars,
  getStyleTokens,
} from "@/lib/registry-source";
import { getReleases } from "@/lib/releases";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

/**
 * Every docs page as Markdown, for "Copy page", the `.md` URLs and LLMs. The
 * prose mirrors the page; anything a page lists (components, tokens, props,
 * releases) comes from the same data, so it can't fall behind.
 */

const fence = (lang: string, code: string) => `\`\`\`${lang}\n${code}\n\`\`\``;

/** A table cell: pipes would end the cell, newlines the row. */
const cell = (text: string) => text.replace(/\|/g, "\\|").replace(/\n/g, " ");

function table(head: string[], rows: string[][]) {
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
  ].join("\n");
}

const url = (path: string) => `${getSiteUrl()}${path}`;

function introduction() {
  return [
    "# Introduction",
    `${siteConfig.name} is an open source library of liquid-glass components for React, distributed as a shadcn registry. Every one of them is built on a single primitive, \`<Pane>\`, so they refract, tint and respond as one material.`,
    ...introSections.flatMap((section) => [
      `## ${section.title}`,
      ...section.body,
    ]),
    `See [Rendering](${url("/docs/rendering.md")}) for each renderer and how to opt into the WebGPU lens.`,
  ];
}

function tokens() {
  const { light, dark } = getStyleTokens();
  const described = new Set(tokenGroups.flatMap((g) => Object.keys(g.tokens)));
  const other = Object.keys(light).filter((name) => !described.has(name));
  const groups = other.length
    ? [
        ...tokenGroups,
        {
          title: "Other",
          tokens: Object.fromEntries(other.map((name) => [name, ""])),
        },
      ]
    : tokenGroups;
  return groups.flatMap((group) => [
    `### ${group.title}`,
    table(
      ["Token", "Light", "Dark", "Description"],
      Object.entries(group.tokens).map(([name, description]) => [
        `\`--${name}\``,
        `\`${light[name] ?? "—"}\``,
        `\`${dark[name] ?? light[name] ?? "—"}\``,
        description,
      ]),
    ),
  ]);
}

function installation() {
  return [
    "# Installation",
    "Four steps from an empty project to glass on the page. Pane ships as a shadcn registry, so the code lands in your project and stays yours.",
    "## 1. Set up shadcn/ui",
    "Skip this if your project already has a `components.json`. Otherwise initialize shadcn in it first:",
    fence("bash", "npx shadcn@latest init"),
    "## 2. Set the look",
    `Pick a border, an accent, a radius and a density in the [playground](${url("/playground")}) and run the command it gives you. Skip it to keep the default glass: the first component you add brings that along.`,
    fence("bash", "npx shadcn@latest add @pane/styles/glow-green-round-thin"),
    "## 3. Add a component",
    fence("bash", "npx shadcn@latest add @pane/button"),
    `Swap \`button\` for any name from the [components](${url("/docs/components.md")}) list, or a whole page from the [playground](${url("/playground")}). Dependencies come along automatically: the \`Pane\` primitive, the glass engine, and the \`--pane-*\` variables in your \`globals.css\`.`,
    "## 4. Use it",
    fence("tsx", installUsage),
    `Glass shows best over something colorful. For real lensing over a video, see [Rendering](${url("/docs/rendering.md")}).`,
    "## Already using shadcn/ui?",
    "Pane components install into `components/ui/` under their own names, so adding `@pane/button` to a project that has the shadcn `button` asks to overwrite it. Keep both by pointing the `ui` alias elsewhere, or rename the file after install.",
    "## Requirements",
    requirements.map((r) => `- **${r.title}.** ${r.description}`).join("\n"),
  ];
}

function theming() {
  return [
    "# Theming",
    `The glass is driven by CSS variables and one config file. Pick a look in the [playground](${url("/playground")}), or change them by hand. Every component built on \`<Pane>\` follows.`,
    `Choose a border (${options.border.map((o) => o.value).join(", ")}), an accent (${accentNames.join(", ")}), a radius (${options.radius.map((o) => o.value).join(", ")}) and a density (${options.density.map((o) => o.value).join(", ")}) in the [playground](${url("/playground")}). It gives you a command such as \`npx shadcn@latest add @pane/styles/hairline-blue-sharp-thick\`. The slug is \`<border>-<accent>-<radius>-<density>\`. Any color works as the accent too: its six hex digits go in the slug, as in \`glow-ff5500-default-regular\`.`,
    "## Glass tokens",
    "Installation adds these `--pane-*` variables to the stylesheet set in `components.json`, usually `app/globals.css`. Light values live on `:root`, and `.dark` overrides them in dark mode. Focus rings use your theme's `--ring`, as shadcn/ui components do.",
    ...tokens(),
    "### Full CSS",
    fence("css", getStyleCssVars()),
    "## Accent color",
    "One color fills the prominent Button and every control that is on. Paste the variables over the ones in your stylesheet, or set them to any color: `var(--primary)` and `var(--primary-foreground)` follow your shadcn/ui theme. `--pane-accent-text` is a deeper shade for labels on plain glass, so the bright accent still reads as text. Set them on an element instead of `:root` to recolor just that part of the page.",
    `Ready-made presets: ${accentNames.map((n) => `\`${n}\``).join(", ")}. The default, ${DEFAULT_ACCENT}:`,
    fence("css", accentCss(DEFAULT_ACCENT)),
    "## Refraction and springs",
    `Anything that feeds the SVG filter, the WebGPU lens or the spring physics lives in JS, in \`lib/glass/config.ts\`. Open it for more or less lensing, a stronger chromatic edge, or snappier or softer press feedback. Or tune it by eye in the [playground](${url("/playground")}) and copy the result.`,
    fence("tsx", getGlassSource("config")),
    "## Overrides for one section",
    "To change the springs or the refraction for part of a page only, wrap it in `GlassConfigProvider`. It merges onto the values above, so pass just what differs.",
    fence("tsx", providerExample),
  ];
}

function rendering() {
  return [
    "# Rendering",
    "One material, three ways to draw it. Every component has the same props and looks the same in all of them; Pane picks the best one the browser can do, and you choose where the WebGPU lens runs.",
    "## Choosing a renderer",
    "You don't pick per component. Outside a `GlassScene` a pane uses SVG refraction where the browser supports it and CSS glass where it doesn't; inside one, it draws with the WebGPU lens.",
    table(
      ["", ...renderers.map((r) => r.name)],
      (
        [
          ["Used", "where"],
          ["Browsers", "browsers"],
          ["Refraction", "refraction"],
          ["Bends", "source"],
          ["Cost", "cost"],
        ] as const
      ).map(([label, key]) => [label, ...renderers.map((r) => r[key])]),
    ),
    "## The WebGPU lens",
    "Wrap a section in `GlassScene` and give it the video, image or canvas behind it. Every Pane inside then draws its glass in a WebGPU shader: the rim bends the backdrop like a real lens, splits it into a faint color fringe and catches the light. It works in any browser with WebGPU, Safari and Firefox included.",
    fence("tsx", sceneExample),
    "WebGPU can't see what the browser painted, so the lens bends only that source: text or other elements between it and a pane aren't refracted. Outside a scene, without WebGPU, or until the source has loaded, panes keep the glass described below.",
    "## SVG refraction",
    "Everywhere else in Chromium, each pane builds a displacement map for its exact size and corner radius and runs the backdrop through an SVG filter, so the rim warps whatever the page painted behind it. Panes too small to show it skip the filter, and a pane inside another pane swaps to a flat tint, since glass can't stack.",
    "## Quality tiers",
    "`use-glass-support` checks what the browser can do, honors `prefers-reduced-transparency`, and picks one of three tiers. Nothing to configure, it's automatic.",
    tiers
      .map((t) => `- **\`${t.name}\`** (${t.who}): ${t.description}`)
      .join("\n"),
  ];
}

function mcp() {
  return [
    "# MCP server",
    "Use the Pane registry with the shadcn MCP server, and let your AI assistant browse, search and install components for you.",
    "## 1. Configure the registry",
    "The `@pane` namespace works with or without MCP. To pin it in your project, add it to `components.json`:",
    fence("json", registryConfig),
    "## 2. Set up your client",
    ...mcpClients.flatMap((c) => [
      `### ${c.name}`,
      fence("bash", c.command),
      c.after,
    ]),
    "## 3. Ask for what you want",
    mcpPrompts.map((p) => `- "${p}"`).join("\n"),
    "## Docs for LLMs",
    "Every docs page has a Markdown twin at the same address plus `.md`, and the plain address returns it to clients that ask for `text/markdown`.",
  ];
}

function components() {
  return [
    "# Components",
    `${componentsMeta.length} liquid-glass components, all built on the same ${siteConfig.name} primitive.`,
    componentsMeta
      .map(
        (c) =>
          `- [${c.title}](${url(`/docs/components/${c.slug}.md`)}): ${c.description}`,
      )
      .join("\n"),
  ];
}

function component(slug: string) {
  const meta = getComponentMeta(slug);
  if (!meta) return null;

  const api = meta.reference
    ? `${meta.props ? "Also accepts" : "Accepts"} every prop of [${meta.reference.label}](${meta.reference.href}).`
    : null;

  return [
    `# ${meta.title}`,
    meta.description,
    "## Installation",
    fence("bash", `npx shadcn@latest add @pane/${meta.registryName}`),
    meta.usage ? ["## Usage", fence("tsx", meta.usage)] : [],
    "## Example",
    fence("tsx", getExampleSource(`${meta.registryName}-demo`)),
    (meta.examples ?? []).flatMap((example) => [
      `## ${example.title}`,
      example.description ?? [],
      fence("tsx", getExampleSource(example.name)),
    ]),
    meta.props || api ? `## ${meta.props ? "Props" : "API reference"}` : [],
    meta.props
      ? table(
          ["Prop", "Type", "Default", "Description"],
          meta.props.map((p) => [
            `\`${p.name}\``,
            `\`${p.type}\``,
            p.default ? `\`${p.default}\`` : "—",
            p.description,
          ]),
        )
      : [],
    api ?? [],
  ].flat();
}

async function changelog() {
  const releases = await getReleases();
  return [
    "# Changelog",
    `Every ${siteConfig.name} release, newest first. Full notes: ${siteConfig.links.github}/releases`,
    ...releases.flatMap((r) => [
      `## v${r.version}${r.prerelease ? " (pre-release)" : ""}, ${r.date}`,
      r.summary || [],
      r.sections.map((section) =>
        [
          section.title ? `### ${section.title}` : [],
          section.changes.map((change) => `- ${change}`).join("\n"),
        ]
          .flat()
          .join("\n\n"),
      ),
    ]),
  ].flat();
}

/** Slugs under /docs with a Markdown version; `[]` is /docs itself. */
export function docsMarkdownSlugs(): string[][] {
  return [
    [],
    ["installation"],
    ["theming"],
    ["rendering"],
    ["mcp"],
    ["changelog"],
    ["components"],
    ...componentsMeta.map((c) => ["components", c.slug]),
  ];
}

export async function getDocMarkdown(slug: string[]) {
  const key = slug.join("/");
  const blocks =
    key === ""
      ? introduction()
      : key === "installation"
        ? installation()
        : key === "theming"
          ? theming()
          : key === "rendering"
            ? rendering()
            : key === "mcp"
              ? mcp()
              : key === "changelog"
                ? await changelog()
                : key === "components"
                  ? components()
                  : slug.length === 2 && slug[0] === "components"
                    ? component(slug[1])
                    : null;
  return blocks ? `${blocks.join("\n\n")}\n` : null;
}

/** Where the page's Markdown lives, for the copy-page menu. */
export function docsUrls(slug: string[]) {
  const path = `${["/docs", ...slug].join("/")}.md`;
  // the link stays on this host (localhost in dev); a chat needs the public URL
  return { markdownPath: path, markdownUrl: url(path) };
}
