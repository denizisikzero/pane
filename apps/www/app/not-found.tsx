import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Where most people were headed: a way back in, not a dead end. */
const pages = [
  {
    title: "Installation",
    description: "Add your first component with the shadcn CLI.",
    href: "/docs/installation",
  },
  {
    title: "Components",
    description: "Every component, with live previews.",
    href: "/docs/components",
  },
  {
    title: "Playground",
    description: "Pick a look and see every component take it.",
    href: "/playground",
  },
];

/** Set like a docs page: the code as an eyebrow, a title, and where to go. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-12 px-4 pt-20 sm:pt-28">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">404</span>
          <h1 className="display text-5xl sm:text-6xl">Page not found</h1>
          <p className="text-balance text-lg text-muted-foreground">
            It moved or never existed. One of these is probably what you were
            after.
          </p>
        </div>

        <nav aria-label="Popular pages" className="flex flex-col">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center justify-between gap-6 border-hairline border-t py-5 last:border-b"
            >
              <span className="flex flex-col gap-1">
                <span className="font-medium">{page.title}</span>
                <span className="text-muted-foreground text-sm">
                  {page.description}
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
