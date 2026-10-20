import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email address" aria-label="Email" />
      <Button variant="prominent" className="h-10">
        Subscribe
      </Button>
    </div>
  );
}
