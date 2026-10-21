import type { ComponentType } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { PreviewSurface } from "@/components/docs/preview-surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExampleSource } from "@/lib/registry-source";

export async function ComponentPreview({
  name,
  demo: Demo,
  compact,
}: {
  /** the example's file in registry/pane/examples */
  name: string;
  demo: ComponentType;
  compact?: boolean;
}) {
  const code = getExampleSource(name);

  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <PreviewSurface compact={compact}>
          <Demo />
        </PreviewSurface>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} showLineNumbers />
      </TabsContent>
    </Tabs>
  );
}
