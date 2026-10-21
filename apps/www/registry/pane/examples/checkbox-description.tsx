import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxWithDescription() {
  return (
    <div className="flex max-w-sm items-start gap-3">
      <Checkbox id="checkbox-marketing" defaultChecked />
      <div className="grid gap-1">
        <label htmlFor="checkbox-marketing" className="text-sm font-medium">
          Product updates
        </label>
        <p className="text-sm text-muted-foreground">
          A short email when we ship something new. No more than once a month.
        </p>
      </div>
    </div>
  );
}
