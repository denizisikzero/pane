import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertWithIcon() {
  return (
    <div className="grid w-96 max-w-full gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Your changes have been saved</AlertTitle>
        <AlertDescription>
          Everyone on the project can see them now.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment</AlertTitle>
        <AlertDescription>
          Check your card details and try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
