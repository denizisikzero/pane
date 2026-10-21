import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithButton() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea placeholder="Type your message here." aria-label="Message" />
      <Button variant="prominent">Send message</Button>
    </div>
  );
}
