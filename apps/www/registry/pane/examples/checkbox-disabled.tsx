import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-disabled-off" disabled />
        <label htmlFor="checkbox-disabled-off" className="text-sm font-medium">
          Unchecked
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-disabled-on" disabled defaultChecked />
        <label htmlFor="checkbox-disabled-on" className="text-sm font-medium">
          Checked
        </label>
      </div>
    </div>
  );
}
