import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button tinted>Tinted</Button>
        <Button variant="destructive" tinted>
          Delete
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" size="xs">
          Extra small
        </Button>
        <Button variant="secondary" size="sm">
          Small
        </Button>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" size="lg">
          Large
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" size="icon-xs" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button variant="secondary" size="icon-sm" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button variant="secondary" size="icon-lg" aria-label="Add">
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
