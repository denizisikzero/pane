import { docsMarkdownSlugs, getDocMarkdown } from "@/lib/docs-markdown";

// the changelog reads GitHub releases; the rest is static
export const revalidate = 3600;

export function generateStaticParams() {
  return docsMarkdownSlugs().map((slug) => ({ slug }));
}

/**
 * Markdown versions of the docs. Reached through the rewrites in
 * next.config.ts: `/docs/theming.md`, or `/docs/theming` asked for with
 * `Accept: text/markdown`.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const markdown = await getDocMarkdown(slug);
  if (markdown === null) return new Response("Not found", { status: 404 });

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
