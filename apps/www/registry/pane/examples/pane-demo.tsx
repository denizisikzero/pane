import { Pane } from "@/components/ui/pane";

export default function PaneDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Pane radius={28} className="flex h-28 w-40 items-center justify-center">
        <span className="text-sm font-medium">Regular</span>
      </Pane>
      <Pane
        variant="thick"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Thick</span>
      </Pane>
      <Pane
        variant="thin"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Thin</span>
      </Pane>
    </div>
  );
}
