import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CardForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use the email you signed up with.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input type="email" placeholder="Email address" aria-label="Email" />
        <Input type="password" placeholder="Password" aria-label="Password" />
      </CardContent>
      {/* a column footer stretches the button's glass to the full width */}
      <CardFooter className="flex-col items-stretch">
        <Button variant="prominent">Sign in</Button>
      </CardFooter>
    </Card>
  );
}
