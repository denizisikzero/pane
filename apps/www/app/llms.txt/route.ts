import { componentsMeta } from "@/lib/components-meta";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

/**
 * /llms.txt: a map of the docs for language models, pointing at the Markdown
 * twin of every page (see https://llmstxt.org).
 */
export function GET() {
  const url = getSiteUrl();
  const md = (path: string) => `${url}${path}.md`;
  const guides = [
    [
      "Introduction",
      "/docs",
      "What Pane is and what makes the material glass.",
    ],
    [
      "Installation",
      "/docs/installation",
      "Add your first component with the shadcn CLI.",
    ],
    [
      "Theming",
      "/docs/theming",
      "The --pane-* tokens, the accent color and the glass config.",
    ],
    [
      "Rendering",
      "/docs/rendering",
      "The WebGPU lens, SVG refraction and the CSS fallback.",
    ],
    [
      "MCP",
      "/docs/mcp",
      "Use the registry from an AI assistant through the shadcn MCP server.",
    ],
    ["Changelog", "/docs/changelog", "Every release, newest first."],
  ];

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Components install with \`npx shadcn@latest add @pane/<name>\`. The registry index is at ${url}/r/registry.json.`,
    "",
    "## Docs",
    "",
    ...guides.map(
      ([title, path, about]) => `- [${title}](${md(path)}): ${about}`,
    ),
    "",
    "## Components",
    "",
    ...componentsMeta.map(
      (c) =>
        `- [${c.title}](${md(`/docs/components/${c.slug}`)}): ${c.description}`,
    ),
    "",
    "## Optional",
    "",
    `- [Playground](${url}/playground): tune the look on every component and copy one install line.`,
    `- [Source](${siteConfig.links.github})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
