import type { MetadataRoute } from "next";
import { docsNav, getSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const docsRoutes = docsNav.flatMap((group) =>
    group.items.map((item) => item.href),
  );

  return ["/", "/playground", ...docsRoutes].map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
