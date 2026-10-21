import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertTinted() {
  return (
    <Alert variant="destructive" tinted className="w-96 max-w-full">
      <AlertTitle>Unable to process your payment</AlertTitle>
      <AlertDescription>
        Check your card details and try again.
      </AlertDescription>
    </Alert>
  );
}
