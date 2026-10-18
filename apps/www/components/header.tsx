import Image from "next/image";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { MobileNav } from "@/components/docs/mobile-nav";
import { HeaderNav } from "@/components/header-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Pane } from "@/components/ui/pane";
import { siteConfig } from "@/lib/site-config";

/** lucide no longer ships brand marks, so the GitHub one is inlined */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex justify-center px-4 pt-4">
      <Pane
        variant="clear"
        radius={22}
        // three columns, so the links stay centred however wide the
        // buttons on the right get
        className="grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-2.5"
      >
        <Link href="/" className="flex w-fit items-center gap-2">
          <Image
            src="/logo.png"
            alt="Pane"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-base font-medium tracking-[-0.03em]">Pane</span>
        </Link>
        <HeaderNav />
        <div className="col-start-3 flex items-center justify-end gap-2">
          <CommandMenu />
          <Button size="icon" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Pane on GitHub"
            >
              <GitHubIcon />
            </a>
          </Button>
          <ThemeToggle />
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Pane>
    </header>
  );
}
