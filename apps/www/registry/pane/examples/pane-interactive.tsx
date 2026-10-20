import { Pane } from "@/components/ui/pane";

export default function PaneInteractive() {
  return (
    <Pane
      variant="blur"
      interactive
      radius={24}
      className="flex h-28 w-48 items-center justify-center"
    >
      <span className="text-sm font-medium">Press me</span>
    </Pane>
  );
}
