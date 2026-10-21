import { Badge } from "@/components/ui/badge";

export default function BadgeTinted() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="prominent" tinted>
        Active
      </Badge>
      <Badge variant="destructive" tinted>
        Expired
      </Badge>
    </div>
  );
}
