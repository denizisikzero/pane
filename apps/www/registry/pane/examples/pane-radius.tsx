import { Pane } from "@/components/ui/pane";

export default function PaneRadius() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Pane
        variant="blur"
        radius={12}
        className="flex size-28 items-center justify-center"
      >
        <span className="text-sm font-medium">12px</span>
      </Pane>
      <Pane
        variant="blur"
        radius={24}
        className="flex size-28 items-center justify-center"
      >
        <span className="text-sm font-medium">24px</span>
      </Pane>
      <Pane
        variant="blur"
        radius={40}
        className="flex size-28 items-center justify-center"
      >
        <span className="text-sm font-medium">40px</span>
      </Pane>
    </div>
  );
}
