import { Switch } from "@/components/ui/switch";

export default function SwitchWithDescription() {
  return (
    <div className="flex w-full max-w-sm items-start justify-between gap-6">
      <div className="grid gap-1">
        <label htmlFor="switch-updates" className="text-sm font-medium">
          Automatic updates
        </label>
        <p className="text-sm text-muted-foreground">
          Install new versions overnight, while you're not using the device.
        </p>
      </div>
      <Switch id="switch-updates" defaultChecked />
    </div>
  );
}
