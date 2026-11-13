import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>مرّر هنا</Button>
          </TooltipTrigger>
          {/* the tooltip renders in a portal, outside the wrapper above */}
          <TooltipContent dir="rtl">تم الحفظ في مكتبتك</TooltipContent>
        </Tooltip>
      </div>
    </Direction.Provider>
  );
}
