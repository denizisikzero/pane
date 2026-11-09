import Link from "next/link";
import { Wordmark } from "@/components/header";
import { siteConfig } from "@/lib/site-config";

const github = siteConfig.links.github;

interface FooterLink {
  title: string;
  href: string;
}

/** The site, the guides, and the project around it: a library's, not a company's. */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { title: "Components", href: "/docs/components" },
      { title: "Playground", href: "/playground" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Guides",
    links: [
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Rendering", href: "/docs/rendering" },
      { title: "MCP", href: "/docs/mcp" },
    ],
  },
  {
    title: "Project",
    links: [
      { title: "GitHub", href: github },
      { title: "Releases", href: `${github}/releases` },
      { title: "Contributing", href: `${github}/blob/main/CONTRIBUTING.md` },
      { title: "Report an issue", href: `${github}/issues/new` },
    ],
  },
];

const linkClass = "transition-colors hover:text-foreground";

function FooterAnchor({ link }: { link: FooterLink }) {
  return link.href.startsWith("/") ? (
    <Link href={link.href} className={linkClass}>
      {link.title}
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
      {link.title}
    </a>
  );
}

/**
 * The studio's wordmark, drawn through a mask so it takes the text color:
 * dark on the light theme, light on the dark one, from a single SVG.
 */
function UniformInterface({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Uniform Interface"
      className={`block aspect-[3530/1917] bg-foreground [mask:url(/uniform-interface.svg)_center/contain_no-repeat] ${className ?? ""}`}
    />
  );
}

/**
 * The wordmark and what it is on the left, the site in three columns on the
 * right, and the studio underneath.
 */
export function Footer() {
  return (
    <footer className="mt-24 text-muted-foreground text-sm">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pt-12 md:gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col items-start gap-3">
          <Link href="/" className="group" aria-label="Pane home">
            <Wordmark className="text-[30px]" />
          </Link>
          <p className="max-w-[16rem] text-pretty leading-relaxed">
            {siteConfig.tagline} Open source, MIT licensed, yours to own.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 md:contents">
          {columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-2.5"
            >
              <span className="text-foreground">{column.title}</span>
              {column.links.map((link) => (
                <FooterAnchor key={link.title} link={link} />
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl justify-start px-4 pt-12 pb-10 text-xs sm:justify-end md:pt-14">
        <a
          href="https://theui.company"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 transition-colors hover:text-foreground"
        >
          A project by
          <UniformInterface className="h-6" />
        </a>
      </div>
    </footer>
  );
}
