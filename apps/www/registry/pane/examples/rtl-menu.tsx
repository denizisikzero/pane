import { ChevronDownIcon } from "lucide-react";
import { Direction } from "radix-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function RtlMenu() {
  return (
    <Direction.Provider dir="rtl">
      <div
        dir="rtl"
        lang="he"
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <ToggleGroup defaultValue="week" aria-label="טווח">
          <ToggleGroupItem value="day">יום</ToggleGroupItem>
          <ToggleGroupItem value="week">שבוע</ToggleGroupItem>
          <ToggleGroupItem value="month">חודש</ToggleGroupItem>
        </ToggleGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              פעולות
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>הקובץ שלי</DropdownMenuLabel>
            <DropdownMenuItem>
              שכפול
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              שינוי שם
              <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>שיתוף</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>אימייל</DropdownMenuItem>
                <DropdownMenuItem>העתקת קישור</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">מחיקה</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Badge>חדש</Badge>
      </div>
    </Direction.Provider>
  );
}
