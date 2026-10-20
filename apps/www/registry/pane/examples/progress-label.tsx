import { Progress } from "@/components/ui/progress";

export default function ProgressWithLabel() {
  return (
    <div className="flex w-72 max-w-full flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Uploading photos</span>
        <span className="text-muted-foreground tabular-nums">72%</span>
      </div>
      <Progress value={72} aria-label="Uploading photos" />
    </div>
  );
}
