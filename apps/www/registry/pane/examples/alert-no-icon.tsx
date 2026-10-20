import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertWithoutIcon() {
  return (
    <Alert className="w-96 max-w-full">
      <AlertTitle>Scheduled maintenance</AlertTitle>
      <AlertDescription>
        Sync pauses on Sunday from 2:00 to 3:00 AM.
      </AlertDescription>
    </Alert>
  );
}
