import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChartRevenue } from "@/registry/pane/blocks/dashboard-01/components/chart-revenue";
import { DashboardSidebar } from "@/registry/pane/blocks/dashboard-01/components/dashboard-sidebar";
import { OrdersTable } from "@/registry/pane/blocks/dashboard-01/components/orders-table";
import { SectionCards } from "@/registry/pane/blocks/dashboard-01/components/section-cards";
import { SiteHeader } from "@/registry/pane/blocks/dashboard-01/components/site-header";

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {/* min-w-0: the orders table has a minimum width, and without this
          it widens the whole column past the screen instead of scrolling */}
      <SidebarInset className="min-w-0">
        <SiteHeader title="Overview" />
        <div className="flex flex-1 flex-col gap-4 pb-6 md:gap-6">
          <SectionCards />
          <ChartRevenue />
          <OrdersTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
