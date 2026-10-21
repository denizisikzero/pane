import type { ReactNode } from "react";
import { PageActions } from "@/components/docs/page-actions";
import { docsUrls, getDocMarkdown } from "@/lib/docs-markdown";

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

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        {markdown ? (
          <div className="pt-1.5">
            <PageActions markdown={markdown} {...docsUrls(slug)} />
          </div>
        ) : null}
      </div>
      <p className="max-w-2xl text-lg text-muted-foreground">{children}</p>
    </div>
  );
}
