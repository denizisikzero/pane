import { Switch } from "@/components/ui/switch";

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="switch-disabled-off" disabled />
        <label htmlFor="switch-disabled-off" className="text-sm font-medium">
          Off
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="switch-disabled-on" disabled defaultChecked />
        <label htmlFor="switch-disabled-on" className="text-sm font-medium">
          On
        </label>
      </div>
    </div>
  );
}
