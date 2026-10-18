import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock every component and the full glass engine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Billed annually. Cancel anytime from your account settings.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="prominent" className="flex-1">
          Upgrade
        </Button>
        <Button className="flex-1">Not now</Button>
      </CardFooter>
    </Card>
  );
}
