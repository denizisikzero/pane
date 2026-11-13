import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Popover>
          <PopoverTrigger asChild>
            <Button>مشاركة</Button>
          </PopoverTrigger>
          {/* the popover renders in a portal, outside the wrapper above */}
          <PopoverContent dir="rtl" className="grid w-80 gap-3">
            <div className="grid gap-1">
              <p className="font-medium">شارك هذا الألبوم</p>
              <p className="text-muted-foreground">
                يمكن لأي شخص لديه الرابط مشاهدته.
              </p>
            </div>
            <Input
              readOnly
              defaultValue="pane.theui.company/a/summer"
              aria-label="رابط الألبوم"
            />
          </PopoverContent>
        </Popover>
      </div>
    </Direction.Provider>
  );
}
