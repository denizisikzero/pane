import { HeartIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonTinted() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="prominent" tinted>
        Tinted
      </Button>
      <Button variant="destructive" tinted>
        Delete
      </Button>
      <Button variant="prominent" tinted size="icon" aria-label="Like">
        <HeartIcon />
      </Button>
      <Button variant="destructive" tinted size="icon" aria-label="Delete">
        <Trash2Icon />
      </Button>
    </div>
  );
}
