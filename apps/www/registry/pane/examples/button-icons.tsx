import { ArrowRightIcon, GitBranchIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonIcons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <GitBranchIcon /> New branch
      </Button>
      <Button variant="prominent">
        Continue <ArrowRightIcon />
      </Button>
      <Button size="icon" aria-label="Search">
        <SearchIcon />
      </Button>
    </div>
  );
}
