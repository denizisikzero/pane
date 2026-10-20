import type { Metadata } from "next";
import { PageHeader } from "@/components/docs/page-header";
import { Badge } from "@/components/ui/badge";
import { Pane } from "@/components/ui/pane";
import { getReleases } from "@/lib/releases";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every Pane release, newest first.",
};

/** Release notes are plain text with `code` spans, as GitHub renders them. */
function Inline({ text }: { text: string }) {
  return text.split(/`([^`]+)`/).map((part, i) =>
    i % 2 ? (
      <code
        // biome-ignore lint/suspicious/noArrayIndexKey: parts of a fixed string
        key={i}
        className="rounded bg-foreground/[0.06] px-1 py-0.5 font-mono text-[0.9em] text-foreground"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <div className="flex flex-col gap-10">
      <PageHeader slug={["changelog"]} title="Changelog">
        Every Pane release, newest first, with full{" "}
        <a
          href={`${siteConfig.links.github}/releases`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          release notes
        </a>
        .
      </PageHeader>

      {releases.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Release notes couldn't be loaded right now. Read the{" "}
          <a
            href={`${siteConfig.links.github}/releases`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            full release notes
          </a>
          .
        </p>
      ) : null}

      <ol className="flex flex-col gap-8">
        {releases.map((release, index) => (
          <li key={release.version}>
            <Pane
              variant="blur"
              radius={20}
              className="flex flex-col gap-4 p-6"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="mr-1 text-xl font-semibold">
                  <a
                    href={`${siteConfig.links.github}/releases/tag/v${release.version}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    v{release.version}
                  </a>
                </h2>
                {index === 0 ? <Badge variant="prominent">Latest</Badge> : null}
                {release.prerelease ? <Badge>Pre-release</Badge> : null}
                <time
                  dateTime={release.date}
                  className="basis-full text-sm text-muted-foreground sm:ml-auto sm:basis-auto"
                >
                  {formatDate(release.date)}
                </time>
              </div>
              {release.summary ? (
                <p className="text-[15px] leading-relaxed">
                  <Inline text={release.summary} />
                </p>
              ) : null}
              {release.changes.length ? (
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {release.changes.map((change) => (
                    <li key={change} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-foreground/25"
                      />
                      <span>
                        <Inline text={change} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Pane>
          </li>
        ))}
      </ol>
    </div>
  );
}
