import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockBackdrop } from "@/components/blocks/block-backdrop";
import { blocks, getBlock } from "@/lib/blocks";

// A block on its own, for the preview iframes on /blocks.

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
  return (
    <BlockBackdrop>
      <Page />
    </BlockBackdrop>
  );
}
