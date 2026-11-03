"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DocsNav } from "@/components/docs/docs-nav";
import { DocsPager } from "@/components/docs/docs-pager";
import { Toc } from "@/components/docs/toc";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-4 pt-6 pb-24 lg:pt-10">
      <aside className="hidden w-56 shrink-0 lg:block">
        {/* scrolls on its own: twenty links outgrow a short viewport */}
        <div className="sticky top-24 -mx-1 max-h-[calc(100svh-7rem)] overflow-y-auto px-1 pb-6">
          <DocsNav />
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        {children}
        <DocsPager />
      </main>
      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-24">
          <Toc key={pathname} />
        </div>
      </aside>
    </div>
  );
}
