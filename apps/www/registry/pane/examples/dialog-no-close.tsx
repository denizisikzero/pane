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

export default function DialogWithoutCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show terms</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Updated terms</DialogTitle>
          <DialogDescription>
            We've changed how long we keep backups. Accept to keep syncing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="prominent">Accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
