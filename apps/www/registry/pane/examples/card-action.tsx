import { EllipsisIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardWithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>81.4 GB of 128 GB used</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More">
            <EllipsisIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Photos and messages take up the most space.
      </CardContent>
    </Card>
  );
}
