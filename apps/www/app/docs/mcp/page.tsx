import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { Step, Steps } from "@/components/docs/steps";
import { Surface } from "@/components/surface";
import { mcpClients, mcpPrompts, registryConfig } from "@/lib/docs-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MCP server",
  description:
    "Use the Pane registry with the shadcn MCP server, and let your AI assistant browse and install components for you.",
  path: "/docs/mcp",
  markdown: true,
});

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";
const link = "font-medium text-foreground underline underline-offset-4";

export default function McpPage() {
  return (
    <div className="flex flex-col gap-14">
      <PageHeader slug={["mcp"]} title="MCP server">
        Use the Pane registry with the shadcn MCP server, and let your AI
        assistant browse, search and install components for you. The real ones,
        not a guess at them.
      </PageHeader>

      <Steps>
        <Step number={1} title="Configure the registry">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The <code className={code}>@pane</code> namespace works with or
            without MCP. To pin it in your project, add it to{" "}
            <code className={code}>components.json</code>:
          </p>
          <CodeBlock lang="json" code={registryConfig} />
        </Step>
        <Step number={2} title="Set up your client">
          <p className="text-sm leading-relaxed text-muted-foreground">
            One command writes the shadcn MCP server into your client&apos;s
            config.
          </p>
          <div className="flex flex-col gap-4">
            {mcpClients.map((client) => (
              <div key={client.name} className="flex flex-col gap-2">
                <h3 className="font-medium text-sm">{client.name}</h3>
                <CodeBlock lang="bash" code={client.command} />
                <p className="text-muted-foreground text-sm">{client.after}</p>
              </div>
            ))}
          </div>
        </Step>
        <Step number={3} title="Ask for what you want">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The assistant can now list the registry, read a component&apos;s
            source and docs, and run the install. Try:
          </p>
          <div className="flex flex-col gap-2">
            {mcpPrompts.map((prompt) => (
              <Surface key={prompt} radius={16} className="px-4 py-3 text-sm">
                “{prompt}”
              </Surface>
            ))}
          </div>
        </Step>
      </Steps>

      <section className="flex flex-col gap-4">
        <h2 className="display text-3xl">Docs for LLMs</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every docs page has a Markdown twin at the same address plus{" "}
          <code className={code}>.md</code> (for example{" "}
          <Link href="/docs/installation.md" className={link}>
            /docs/installation.md
          </Link>
          ), and the plain address returns it to clients that ask for{" "}
          <code className={code}>text/markdown</code>. The copy menu at the top
          of each page opens it in ChatGPT or Claude.
        </p>
      </section>
    </div>
  );
}
