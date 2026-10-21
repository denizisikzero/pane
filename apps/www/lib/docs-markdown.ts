import { accentCss, accentNames, DEFAULT_ACCENT } from "@/lib/accents";
import { componentsMeta, getComponentMeta } from "@/lib/components-meta";
import {
  installUsage,
  providerExample,
  requirements,
  tiers,
  tokenGroups,
} from "@/lib/docs-content";
import { features } from "@/lib/features";
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
    `${siteConfig.name} is a set of liquid-glass components for React, distributed as a shadcn registry. Every one of them is built on a single primitive, \`<Pane>\`, so they refract, tint and respond as one material.`,
    "## What makes it glass",
    features.map((f) => `- **${f.title}.** ${f.description}`).join("\n"),
    "## Next steps",
    [
      `- [Installation](${url("/docs/installation.md")}): add your first component with the shadcn CLI.`,
      `- [Theming](${url("/docs/theming.md")}): tune tint, blur, refraction and springs.`,
      `- [Components](${url("/docs/components.md")}): all ${componentsMeta.length} components.`,
    ].join("\n"),
  ];
}

function installation() {
  return [
    "# Installation",
    "Pane ships as a shadcn registry. Add components with the shadcn CLI, or copy the source from any component page — both put the same code in your project.",
    "## 1. Set up shadcn/ui",
    "Skip this if your project already has a `components.json`. Otherwise initialize shadcn in it first:",
    fence("bash", "npx shadcn@latest init"),
    "## 2. Add a component",
    fence("bash", "npx shadcn@latest add @pane/button"),
    `Swap \`button\` for any name from the [components](${url("/docs/components.md")}) list. Dependencies come along automatically: the \`Pane\` primitive, the glass engine, and the \`--pane-*\` variables in your \`globals.css\`.`,
    "## 3. Use it",
    fence("tsx", installUsage),
    `Glass shows best over something colorful. To change how it looks, see [Theming](${url("/docs/theming.md")}).`,
    "## Already using shadcn/ui?",
    "Pane components install into `components/ui/` under their own names, so adding `@pane/button` to a project that has the shadcn `button` asks to overwrite it. Keep both by pointing the `ui` alias elsewhere, or rename the file after install.",
    "## Requirements",
    requirements.map((r) => `- **${r.title}.** ${r.description}`).join("\n"),
  ];
}

function theming() {
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

  return [
    "# Theming",
    "The glass is driven by CSS variables and one config file. Change them once and every component built on `<Pane>` follows.",
    "## Glass tokens",
    "Installation adds these `--pane-*` variables to the stylesheet set in `components.json`, usually `app/globals.css`. Light values live on `:root`, and `.dark` overrides them in dark mode. Focus rings use your theme's `--ring`, as shadcn/ui components do.",
    ...groups.flatMap((group) => [
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
    ]),
    "### Full CSS",
    fence("css", getStyleCssVars()),
    "## Accent color",
    "One color fills the prominent Button and every control that is on. Paste the variables over the ones in your stylesheet, or set them to any color: `var(--primary)` and `var(--primary-foreground)` follow your shadcn/ui theme. `--pane-accent-text` is a deeper shade for labels on plain glass, so the bright accent still reads as text. Set them on an element instead of `:root` to recolor just that part of the page.",
    `Ready-made presets: ${accentNames.map((n) => `\`${n}\``).join(", ")}. The default, ${DEFAULT_ACCENT}:`,
    fence("css", accentCss(DEFAULT_ACCENT)),
    "## Refraction and springs",
    "Anything that feeds the SVG refraction filter or the spring physics has to live in JS, in `lib/glass/config.ts`. Open it for more or less lensing, a stronger chromatic edge, or snappier or softer press feedback.",
    fence("tsx", getGlassSource("config")),
    "## Overrides for one section",
    `To change the springs or the refraction for part of a page only, wrap it in \`GlassConfigProvider\`. It merges onto the values above, so pass just what differs. Try values live in the [playground](${url("/playground")}).`,
    fence("tsx", providerExample),
    "## Quality tiers",
    "`use-glass-support` checks what the browser can do, honors `prefers-reduced-transparency`, and picks one of three tiers. Nothing to configure — it's automatic.",
    tiers
      .map((t) => `- **\`${t.name}\`** (${t.who}): ${t.description}`)
      .join("\n"),
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
      `## v${r.version}${r.prerelease ? " (pre-release)" : ""} — ${r.date}`,
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
