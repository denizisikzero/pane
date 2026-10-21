import type { NextConfig } from "next";

const wantsMarkdown = [
  { type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
];

const nextConfig: NextConfig = {
  // every docs page has a Markdown twin at the same URL plus `.md`, and at
  // the plain URL for clients that ask for text/markdown
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/md" },
      { source: "/docs/:page.md", destination: "/md/:page" },
      {
        source: "/docs/components/:slug.md",
        destination: "/md/components/:slug",
      },
      { source: "/docs", has: wantsMarkdown, destination: "/md" },
      { source: "/docs/:path*", has: wantsMarkdown, destination: "/md/:path*" },
    ];
  },
};

export default nextConfig;
