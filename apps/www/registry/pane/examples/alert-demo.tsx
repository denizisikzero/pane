import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="grid w-96 max-w-full gap-4">
      <Alert>
        <AlertTitle>Your changes have been saved</AlertTitle>
        <AlertDescription>
          Everyone on the project can see them now.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Unable to process your payment</AlertTitle>
        <AlertDescription>
          Check your card details and try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
