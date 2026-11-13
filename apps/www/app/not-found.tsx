import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="glass-text display text-[120px] leading-none sm:text-[180px]">
            404
          </p>
          <h1 className="display text-balance text-5xl sm:text-6xl">
            Nothing <em>behind this glass.</em>
          </h1>
          <p className="max-w-md text-balance text-muted-foreground">
            The page you were looking for has moved or never existed. The
            components are all still here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="inverted" size="lg">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/docs/components">
                Browse components
                <ArrowRightIcon className="rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
