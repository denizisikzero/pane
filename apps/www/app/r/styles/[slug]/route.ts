import {
  allThemeSlugs,
  parseThemeSlug,
  themeStyleItem,
} from "@/lib/glass-theme";
import registry from "@/registry.json";

// A pane-style for every theme the playground can make: the presets are
// built at deploy time, a custom accent color on its first request.
// `shadcn add <site>/r/styles/<slug>.json` writes the shipped tokens with
// the theme's choices on top.

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return allThemeSlugs().map((slug) => ({ slug: `${slug}.json` }));
}

const base = registry.items.find((item) => item.name === "pane-style");

export async function GET(
  _request: Request,
  ctx: RouteContext<"/r/styles/[slug]">,
) {
  const { slug } = await ctx.params;
  const theme = parseThemeSlug(slug.replace(/\.json$/, ""));
  if (!base || !theme) {
    return Response.json({ error: "Unknown theme" }, { status: 404 });
  }
  return Response.json(themeStyleItem(base, theme));
}
