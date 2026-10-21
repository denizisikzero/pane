import { Pane } from "@/components/ui/pane";

export default function PaneDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Pane radius={28} className="flex h-28 w-40 items-center justify-center">
        <span className="text-sm font-medium">Default</span>
      </Pane>
      <Pane
        variant="blur"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Blur</span>
      </Pane>
      <Pane
        variant="transparent"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Transparent</span>
      </Pane>
    </div>
  );
}
