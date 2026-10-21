import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="overview" className="items-center">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
