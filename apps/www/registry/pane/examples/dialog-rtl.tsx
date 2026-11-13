import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar">
        <Dialog>
          <DialogTrigger asChild>
            <Button>افتح النافذة</Button>
          </DialogTrigger>
          {/* the dialog renders in a portal, outside the wrapper above */}
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>حذف هذا المشروع؟</DialogTitle>
              <DialogDescription>
                لا يمكن التراجع عن هذا الإجراء.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>إلغاء</Button>
              </DialogClose>
              <Button variant="destructive">حذف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Direction.Provider>
  );
}
