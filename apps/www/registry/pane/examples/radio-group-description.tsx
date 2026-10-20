import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
  { value: "monthly", label: "Monthly", hint: "$12 a month, cancel anytime." },
  { value: "yearly", label: "Yearly", hint: "$120 a year, two months free." },
];

export default function RadioGroupWithDescription() {
  return (
    <RadioGroup defaultValue="yearly" className="max-w-sm gap-4">
      {plans.map((plan) => (
        <div key={plan.value} className="flex items-start gap-3">
          <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
          <div className="grid gap-1">
            <label
              htmlFor={`plan-${plan.value}`}
              className="text-sm font-medium"
            >
              {plan.label}
            </label>
            <p className="text-sm text-muted-foreground">{plan.hint}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
