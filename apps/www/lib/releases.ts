import { siteConfig } from "@/lib/site-config";

export interface Release {
  version: string;
  /** ISO date the GitHub release was published */
  date: string;
  prerelease?: boolean;
  summary: string;
  /** "What's new", "What's changed"; untitled when the notes have no headings */
  sections: { title?: string; changes: string[] }[];
}

interface GitHubRelease {
  tag_name: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  body: string | null;
}

/**
 * Release notes come straight from GitHub so they're written once. A release
 * body is read as a summary paragraph, then `## ` headings with a `- ` bullet
 * per change under each.
 */
export async function getReleases(): Promise<Release[]> {
  const repo = new URL(siteConfig.links.github).pathname.slice(1);
  // anonymous requests share a 60/hour limit per IP, which build machines
  // regularly exhaust; a token (no scopes needed for a public repo) lifts it
  const token = process.env.GITHUB_TOKEN;
  // At build time a GitHub hiccup — an error status or no response at all —
  // must not fail the deploy: ship an empty changelog and let the hourly
  // revalidation fill it in. Later, throwing keeps the last good page instead
  // of replacing it with an empty one.
  const fail = (reason: string): Release[] => {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Changelog: GitHub releases ${reason}`);
      return [];
    }
    throw new Error(`GitHub releases ${reason}`);
  };

  let res: Response;
  try {
    res = await fetch(`https://api.github.com/repos/${repo}/releases`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
  } catch (error) {
    return fail(`could not be reached: ${(error as Error).message}`);
  }
  if (!res.ok) return fail(`returned ${res.status}`);

  const data: GitHubRelease[] = await res.json();
  return data
    .filter((release) => !release.draft && release.published_at)
    .map((release) => {
      const lines = (release.body ?? "").split(/\r?\n/).map((l) => l.trim());
      const summary: string[] = [];
      const sections: Release["sections"] = [];
      for (const line of lines) {
        if (line.startsWith("## ")) {
          sections.push({ title: line.slice(3), changes: [] });
        } else if (line.startsWith("- ")) {
          if (!sections.length) sections.push({ changes: [] });
          sections[sections.length - 1].changes.push(line.slice(2));
        } else if (line && !sections.length) {
          summary.push(line);
        }
      }
      return {
        version: release.tag_name.replace(/^v/, ""),
        date: (release.published_at as string).slice(0, 10),
        prerelease: release.prerelease,
        summary: summary.join(" "),
        sections: sections.filter((section) => section.changes.length),
      };
    });
}
