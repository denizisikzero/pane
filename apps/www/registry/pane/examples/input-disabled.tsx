import { Input } from "@/components/ui/input";

export default function InputDisabled() {
  return (
    <div className="w-full max-w-sm">
      <Input disabled placeholder="Email address" aria-label="Email" />
    </div>
  );
}
