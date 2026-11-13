import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Sheet>
          <SheetTrigger asChild>
            <Button>افتح اللوحة</Button>
          </SheetTrigger>
          {/* sides are physical: "left" is the inline end in RTL */}
          <SheetContent side="left" dir="rtl">
            <SheetHeader>
              <SheetTitle>الإشعارات</SheetTitle>
              <SheetDescription>تحكّم في طريقة تواصلنا معك.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </Direction.Provider>
  );
}
