import Link from "next/link";
import { FooterHeart } from "@/components/footer-heart";
import { Wordmark } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

const github = siteConfig.links.github;

const columns: {
  title: string;
  links: { title: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Docs",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Rendering", href: "/docs/rendering" },
      { title: "MCP", href: "/docs/mcp" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Library",
    links: [
      { title: "Components", href: "/docs/components" },
      { title: "Playground", href: "/playground" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Pane", href: "/docs/components/pane" },
    ],
  },
  {
    title: "Project",
    links: [
      { title: "Source code", href: github, external: true },
      {
        title: "Contributing",
        href: `${github}/blob/main/CONTRIBUTING.md`,
        external: true,
      },
      {
        title: "Report an issue",
        href: `${github}/issues/new`,
        external: true,
      },
      {
        title: "MIT License",
        href: `${github}/blob/main/LICENSE`,
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-hairline border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-14 pb-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="group w-fit">
            <Wordmark className="text-6xl" />
          </Link>
          <p className="max-w-xs text-muted-foreground text-sm">
            {siteConfig.tagline} Free, open source, and yours once it&apos;s in
            your project.
          </p>
        </div>
        {columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="flex flex-col gap-3"
          >
            <span className="eyebrow">{column.title}</span>
            <ul className="flex flex-col gap-2 text-sm">
              {column.links.map((link) => (
                <li key={link.title}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-hairline border-t px-4 py-6 text-muted-foreground text-xs sm:flex-row">
        <span>© 2026 Uniform Interface</span>
        <span>
          Made with <FooterHeart /> by{" "}
          <a
            href="https://theui.company"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Uniform Interface
          </a>
        </span>
      </div>
    </footer>
  );
}
