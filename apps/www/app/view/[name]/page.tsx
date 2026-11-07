import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockBackdrop } from "@/components/blocks/block-backdrop";
import { FrameBridge } from "@/components/playground/frame-bridge";
import { blocks, getBlock } from "@/lib/blocks";

// A block on its own: the pages of the playground's template site.

export function generateStaticParams() {
  return blocks.map((block) => ({ name: block.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const block = getBlock(name);
  return {
    title: block?.title,
    robots: { index: false },
  };
}

export default async function BlockViewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = getBlock(name);
  if (!block) notFound();

  const Page = block.page;
  if (block.backdrop === false)
    return (
      <FrameBridge>
        <Page />
      </FrameBridge>
    );
  return (
    <BlockBackdrop>
      <FrameBridge>
        <Page />
      </FrameBridge>
    </BlockBackdrop>
  );
}
