import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonSize() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <Button size="icon-xs" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="xs">Extra small</Button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button size="icon-sm" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="sm">Small</Button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button size="icon" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button>Default</Button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button size="icon-lg" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
