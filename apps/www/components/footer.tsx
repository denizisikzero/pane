import { siteConfig } from "@/lib/site-config";

const github = siteConfig.links.github;

/** The project's own links: an open-source library's, not a company's. */
const links = [
  { title: "Source code", href: github },
  { title: "Contributing", href: `${github}/blob/main/CONTRIBUTING.md` },
  { title: "Report an issue", href: `${github}/issues/new` },
  { title: "Releases", href: `${github}/releases` },
  { title: "MIT License", href: `${github}/blob/main/LICENSE` },
];

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

export function Footer() {
  return (
    <footer className="mt-24 border-hairline border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-8 px-4 py-12 text-muted-foreground text-sm md:flex-row md:items-end md:justify-between">
        <nav
          aria-label="Project"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2"
        >
          {links.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </a>
          ))}
        </nav>
        <a
          href="https://theui.company"
          target="_blank"
          rel="noreferrer"
          aria-label="Uniform Interface"
          className="opacity-90 transition-opacity hover:opacity-100"
        >
          <UniformInterface className="h-14" />
        </a>
      </div>
    </footer>
  );
}
