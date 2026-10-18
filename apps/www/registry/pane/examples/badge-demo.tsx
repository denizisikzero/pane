import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>v1.0</Badge>
      <Badge variant="prominent">New</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="prominent" tinted>
        Pro
      </Badge>
      <Badge variant="destructive" tinted>
        Beta
      </Badge>
    </div>
  );
}
