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

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>
            This action can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
