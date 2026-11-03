import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Metadata for one page: its title and description, a canonical URL, and the
 * same for Open Graph and X. Paths are relative; `metadataBase` in the root
 * layout makes them absolute. Docs pages also point to their Markdown twin,
 * so LLMs and tools find the plain-text version.
 */
export function pageMetadata({
  title,
  description,
  path,
  markdown = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** the page's path, e.g. "/docs/theming" */
  path: string;
  /** the page has a `.md` twin (every docs page does) */
  markdown?: boolean;
  /** use the title as is, without the "· Pane" suffix */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      ...(markdown
        ? {
            types: {
              "text/markdown": `${path === "/docs" ? "/docs" : path}.md`,
            },
          }
        : {}),
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      // a page's own openGraph replaces the root one, image included, so the
      // site's card (app/opengraph-image.tsx) is named again here
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
