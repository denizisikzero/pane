import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="standard">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="standard" id="shipping-standard" />
        <label htmlFor="shipping-standard" className="text-sm font-medium">
          Standard shipping
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="express" id="shipping-express" />
        <label htmlFor="shipping-express" className="text-sm font-medium">
          Express shipping
        </label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="pickup" id="shipping-pickup" disabled />
        <label
          htmlFor="shipping-pickup"
          className="text-sm font-medium text-muted-foreground"
        >
          Pick up in store
        </label>
      </div>
    </RadioGroup>
  );
}
