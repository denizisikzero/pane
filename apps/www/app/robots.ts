import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /view renders a block bare for the playground's frame, and /r is the
      // registry's JSON for the shadcn CLI: neither is a page to rank
      disallow: ["/view/", "/r/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}
