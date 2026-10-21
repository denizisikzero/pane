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
import { Input } from "@/components/ui/input";

export default function DialogWithForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Changes show up for everyone.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input defaultValue="Deniz" aria-label="Name" />
          <Input defaultValue="@deniz" aria-label="Username" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button variant="prominent">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
