import { siteConfig } from "@/lib/site-config";

export interface Release {
  version: string;
  /** ISO date the GitHub release was published */
  date: string;
  prerelease?: boolean;
  summary: string;
  changes: string[];
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
 * body is read as a summary paragraph followed by a `- ` bullet per change.
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
      return {
        version: release.tag_name.replace(/^v/, ""),
        date: (release.published_at as string).slice(0, 10),
        prerelease: release.prerelease,
        summary: lines
          .filter((line) => line && !line.startsWith("- "))
          .join(" "),
        changes: lines
          .filter((line) => line.startsWith("- "))
          .map((line) => line.slice(2)),
      };
    });
}
