import { FooterHeart } from "@/components/footer-heart";
import { siteConfig } from "@/lib/site-config";

const github = siteConfig.links.github;

const links = [
  { title: "Source code", href: github },
  { title: "Contributing", href: `${github}/blob/main/CONTRIBUTING.md` },
  { title: "Report an issue", href: `${github}/issues/new` },
  { title: "Releases", href: `${github}/releases` },
  { title: "MIT License", href: `${github}/blob/main/LICENSE` },
];

/**
 * Laid out after Next.js Commerce's footer strip: the project links on one
 * side, the credit on the other.
 */
export function Footer() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
      <nav aria-label="Project">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p>
        Made with <FooterHeart /> by{" "}
        <a
          href="https://theui.company"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Uniform Interface
        </a>
      </p>
    </footer>
  );
}
