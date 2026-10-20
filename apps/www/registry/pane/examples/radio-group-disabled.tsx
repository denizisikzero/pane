import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  { value: "standard", label: "Standard shipping" },
  { value: "express", label: "Express shipping" },
  { value: "pickup", label: "Pick up in store", disabled: true },
];

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="standard">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-3">
          <RadioGroupItem
            value={option.value}
            id={`shipping-${option.value}`}
            disabled={option.disabled}
          />
          <label
            htmlFor={`shipping-${option.value}`}
            className="text-sm font-medium aria-disabled:text-muted-foreground"
            aria-disabled={option.disabled}
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
