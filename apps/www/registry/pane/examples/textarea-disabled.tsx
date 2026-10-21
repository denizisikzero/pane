import { Textarea } from "@/components/ui/textarea";

export default function TextareaDisabled() {
  return (
    <div className="w-full max-w-sm">
      <Textarea
        disabled
        placeholder="Comments are closed."
        aria-label="Comment"
      />
    </div>
  );
}
