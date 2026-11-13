import { ArrowLeftIcon } from "lucide-react";
import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";

export default function ButtonRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div
        dir="rtl"
        lang="ar"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Button>زر</Button>
        <Button variant="prominent">
          التالي
          <ArrowLeftIcon />
        </Button>
      </div>
    </Direction.Provider>
  );
}
