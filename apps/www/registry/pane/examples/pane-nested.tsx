import { Pane } from "@/components/ui/pane";

export default function PaneNested() {
  return (
    <Pane variant="blur" radius={32} className="flex w-72 flex-col gap-3 p-4">
      <span className="px-1 text-sm font-medium">Outer pane</span>
      <Pane radius={20} className="px-4 py-3">
        <span className="text-sm text-muted-foreground">
          Nested: no second blur, a lighter tint.
        </span>
      </Pane>
    </Pane>
  );
}
