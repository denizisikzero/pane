import { BlockTabs } from "@/components/blocks/block-tabs";
import { CodeBlock } from "@/components/docs/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlockMeta } from "@/lib/blocks";
import { getBlockFiles } from "@/lib/registry-source";

/**
 * A block with its preview and code. The preview is an iframe of /view/<name>:
 * blocks are whole pages — the sidebar ones pin themselves to the window — so
 * they need a window of their own, which also lets the viewport switch narrow
 * it to a tablet or phone width.
 */
export function BlockViewer({ block }: { block: BlockMeta }) {
  const files = getBlockFiles(block.name);

  return (
    <section id={block.name} className="flex scroll-mt-24 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">{block.title}</h2>
        <p className="text-muted-foreground text-sm">{block.description}</p>
      </div>
      <BlockTabs
        name={block.name}
        title={block.title}
        height={block.height}
        code={
          <Tabs defaultValue={files[0]?.path} className="gap-3">
            <TabsList className="max-w-full overflow-x-auto">
              {files.map((file) => (
                <TabsTrigger key={file.path} value={file.path}>
                  {file.path}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((file) => (
              <TabsContent key={file.path} value={file.path}>
                <CodeBlock code={file.code} showLineNumbers />
              </TabsContent>
            ))}
          </Tabs>
        }
      />
    </section>
  );
}
