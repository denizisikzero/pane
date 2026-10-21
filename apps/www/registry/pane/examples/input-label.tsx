import { Input } from "@/components/ui/input";

export default function InputWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor="input-email" className="text-sm font-medium">
        Email
      </label>
      <Input id="input-email" type="email" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">
        We'll only use it to send your receipts.
      </p>
    </div>
  );
}
