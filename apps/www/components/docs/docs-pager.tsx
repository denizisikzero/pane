"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Surface } from "@/components/surface";
import { docsNav } from "@/lib/site-config";

const pages = docsNav.flatMap((group) => group.items);

export function DocsPager() {
  const pathname = usePathname();
  const index = pages.findIndex((page) => page.href === pathname);

  if (index === -1) return null;

  const prev = pages[index - 1];
  const next = pages[index + 1];

  return (
    <nav aria-label="Docs pages" className="mt-12 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Surface interactive radius={20}>
          <Link href={prev.href} className="flex flex-col gap-1 p-5 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <ChevronLeftIcon className="size-4" />
              Previous
            </span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        </Surface>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
      {next ? (
        <Surface interactive radius={20}>
          <Link
            href={next.href}
            className="flex flex-col items-end gap-1 p-5 text-sm"
          >
            <span className="flex items-center gap-1 text-muted-foreground">
              Next
              <ChevronRightIcon className="size-4" />
            </span>
            <span className="font-medium">{next.title}</span>
          </Link>
        </Surface>
      ) : null}
    </nav>
  );
}
