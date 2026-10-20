import { Alert, AlertTitle } from "@/components/ui/alert";

export default function AlertTitleOnly() {
  return (
    <Alert className="w-96 max-w-full">
      <AlertTitle>A new version is available.</AlertTitle>
    </Alert>
  );
}
