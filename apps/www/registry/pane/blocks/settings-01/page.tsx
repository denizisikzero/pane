import { SettingsPanel } from "@/registry/pane/blocks/settings-01/components/settings-panel";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <SettingsPanel />
      </div>
    </div>
  );
}
