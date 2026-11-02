import type { Metadata } from "next";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { blocks } from "@/lib/blocks";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Whole screens built from Pane components. Install one with a single command.",
};

export default function BlocksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 pt-10 pb-24">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">Blocks</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Whole screens built from Pane components. Install one with a single
            command, then make it yours.
          </p>
        </div>
        {blocks.map((block) => (
          <BlockViewer key={block.name} block={block} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
