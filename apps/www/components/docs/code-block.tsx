import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/docs/copy-button";
import { Pane } from "@/components/ui/pane";

export async function CodeBlock({
  code,
  lang = "tsx",
  showLineNumbers = false,
}: {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return (
    <Pane radius={20} className="relative">
      <div className="absolute top-3 right-3 z-10">
        <CopyButton text={code} />
      </div>
      <div
        data-line-numbers={showLineNumbers || undefined}
        className="code-block mr-14 max-h-[520px] overflow-auto py-5 pl-5 text-[13px] leading-relaxed [&_pre]:!bg-transparent"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted, generated at build/request time from our own source files
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Pane>
  );
}
