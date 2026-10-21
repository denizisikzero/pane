import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="density-default" />
        <label htmlFor="density-default" className="text-sm font-medium">
          Default
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="density-comfortable" />
        <label htmlFor="density-comfortable" className="text-sm font-medium">
          Comfortable
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="density-compact" />
        <label htmlFor="density-compact" className="text-sm font-medium">
          Compact
        </label>
      </div>
    </RadioGroup>
  );
}
