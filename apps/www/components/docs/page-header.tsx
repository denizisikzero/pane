import type { ReactNode } from "react";
import { PageActions } from "@/components/docs/page-actions";
import { docsUrls, getDocMarkdown } from "@/lib/docs-markdown";
import { docsNav } from "@/lib/site-config";

/**
 * Title, lead and the copy-page menu of a docs page. `slug` is the path
 * under /docs, which is also where its Markdown version lives.
 */
export async function PageHeader({
  slug,
  title,
  children,
}: {
  slug: string[];
  title: string;
  children: ReactNode;
}) {
  const markdown = await getDocMarkdown(slug);
  const href = ["/docs", ...slug].join("/");
  const group =
    docsNav.find((g) => g.items.some((item) => item.href === href))?.title ??
    (slug[0] === "components" ? "Components" : "Docs");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow">{group}</span>
        {markdown ? (
          <div>
            <PageActions markdown={markdown} {...docsUrls(slug)} />
          </div>
        ) : null}
      </div>
      <h1 className="display text-5xl sm:text-6xl">{title}</h1>
      <p className="max-w-2xl text-balance text-lg text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
