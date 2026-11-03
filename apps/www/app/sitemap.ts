import type { MetadataRoute } from "next";
import { docsNav, getSiteUrl } from "@/lib/site-config";

/** The home page first, then the guides, then each component's page. */
function priority(route: string) {
  if (route === "/") return 1;
  if (route === "/playground" || route === "/docs") return 0.9;
  if (route.startsWith("/docs/components/")) return 0.7;
  return 0.8;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // built with the site, so this is when the content last changed
  const lastModified = new Date();
  const docsRoutes = docsNav.flatMap((group) =>
    group.items.map((item) => item.href),
  );
  const routes = [...new Set(["/", "/playground", ...docsRoutes])];

  return routes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/docs/changelog" ? "daily" : "weekly",
    priority: priority(route),
  }));
}
