import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithLabel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor="textarea-bio" className="text-sm font-medium">
        Bio
      </label>
      <Textarea
        id="textarea-bio"
        placeholder="Tell us a little about yourself."
      />
      <p className="text-xs text-muted-foreground">
        It grows with the text, up to the space it has.
      </p>
    </div>
  );
}
