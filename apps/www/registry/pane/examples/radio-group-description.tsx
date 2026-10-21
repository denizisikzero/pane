import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupWithDescription() {
  return (
    <RadioGroup defaultValue="yearly" className="max-w-sm gap-4">
      <div className="flex items-start gap-3">
        <RadioGroupItem value="monthly" id="plan-monthly" />
        <div className="grid gap-1">
          <label htmlFor="plan-monthly" className="text-sm font-medium">
            Monthly
          </label>
          <p className="text-sm text-muted-foreground">
            $12 a month, cancel anytime.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="yearly" id="plan-yearly" />
        <div className="grid gap-1">
          <label htmlFor="plan-yearly" className="text-sm font-medium">
            Yearly
          </label>
          <p className="text-sm text-muted-foreground">
            $120 a year, two months free.
          </p>
        </div>
      </div>
    </RadioGroup>
  );
}
