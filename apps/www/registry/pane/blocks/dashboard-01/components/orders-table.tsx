"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  ReceiptIcon,
  SearchIcon,
  Undo2Icon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Order,
  type OrderStatus,
  orders,
} from "@/registry/pane/blocks/dashboard-01/components/dashboard-data";

const PAGE_SIZE = 6;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const date = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const statusBadge: Record<
  OrderStatus,
  { label: string; variant: "default" | "prominent" | "destructive" }
> = {
  paid: { label: "Paid", variant: "prominent" },
  pending: { label: "Pending", variant: "default" },
  refunded: { label: "Refunded", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
};

type Filter = "all" | OrderStatus;
const filters: Filter[] = ["all", "paid", "pending", "refunded"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function RowActions({ order }: { order: Order }) {
  return (
    <DropdownMenu>
      {/* styled on the trigger itself rather than through asChild, which
          Base UI installs rewrite */}
      <DropdownMenuTrigger
        aria-label={`Actions for ${order.id}`}
        className="flex size-8 items-center justify-center rounded-[10px] text-muted-foreground outline-none transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=open]:bg-foreground/[0.06] data-[state=open]:text-foreground"
      >
        <EllipsisIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem>
          <ReceiptIcon />
          View invoice
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => navigator.clipboard?.writeText(order.id)}
        >
          <CopyIcon />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={order.status !== "paid"}>
          <Undo2Icon />
          Refund
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function OrdersTable() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const counts = React.useMemo(() => {
    const result: Record<Filter, number> = {
      all: orders.length,
      paid: 0,
      pending: 0,
      refunded: 0,
      failed: 0,
    };
    for (const order of orders) result[order.status]++;
    return result;
  }, []);

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter(
      (order) =>
        (filter === "all" || order.status === filter) &&
        (!q ||
          order.customer.toLowerCase().includes(q) ||
          order.email.toLowerCase().includes(q) ||
          order.id.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const visible = rows.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
  const allVisibleSelected =
    visible.length > 0 && visible.every((order) => selected.has(order.id));
  const someVisibleSelected = visible.some((order) => selected.has(order.id));

  const toggle = (id: string, on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const toggleVisible = (on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      for (const order of visible) {
        if (on) next.add(order.id);
        else next.delete(order.id);
      }
      return next;
    });

  return (
    <Card variant="blur" radius={24} className="mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Recent orders</CardTitle>
        <CardDescription>Invoices from the last 30 days.</CardDescription>
        <CardAction>
          <Button size="sm">
            <DownloadIcon />
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={filter}
            onValueChange={(value) => {
              setFilter(value as Filter);
              setPage(0);
            }}
          >
            <TabsList>
              {filters.map((key) => (
                <TabsTrigger key={key} value={key} className="capitalize">
                  {key}
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {counts[key]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative lg:w-64">
            <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 size-4 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Filter by name, email or ID"
              aria-label="Filter orders"
              className="pl-9"
            />
          </div>
        </div>

        <div className="-mx-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-foreground/10 border-b text-left text-muted-foreground text-xs">
                <th className="w-12 py-2.5 pl-6 font-medium">
                  <Checkbox
                    checked={
                      allVisibleSelected
                        ? true
                        : someVisibleSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={(value) => toggleVisible(value === true)}
                    aria-label="Select all on this page"
                  />
                </th>
                <th className="py-2.5 font-medium">Customer</th>
                <th className="py-2.5 font-medium">Status</th>
                <th className="hidden py-2.5 font-medium lg:table-cell">
                  Plan
                </th>
                <th className="hidden py-2.5 font-medium sm:table-cell">
                  Date
                </th>
                <th className="py-2.5 text-right font-medium">Amount</th>
                <th className="w-14 py-2.5 pr-4" />
              </tr>
            </thead>
            <tbody>
              {visible.map((order) => {
                const status = statusBadge[order.status];
                const isSelected = selected.has(order.id);
                return (
                  <tr
                    key={order.id}
                    data-state={isSelected ? "selected" : undefined}
                    className="border-foreground/[0.06] border-b transition-colors last:border-0 hover:bg-foreground/[0.03] data-[state=selected]:bg-foreground/[0.04]"
                  >
                    <td className="py-2.5 pl-6">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) =>
                          toggle(order.id, value === true)
                        }
                        aria-label={`Select ${order.id}`}
                      />
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback className="text-[10px]">
                            {initials(order.customer)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid leading-tight">
                          <span className="font-medium">{order.customer}</span>
                          <span className="text-muted-foreground text-xs">
                            {order.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <Badge variant={status.variant} tinted>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="hidden py-2.5 text-muted-foreground lg:table-cell">
                      {order.plan}
                    </td>
                    <td className="hidden py-2.5 text-muted-foreground tabular-nums sm:table-cell">
                      {date.format(new Date(order.date))}
                    </td>
                    <td className="py-2.5 text-right font-medium tabular-nums">
                      {money.format(order.amount)}
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <div className="flex justify-end">
                        <RowActions order={order} />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No orders match “{query}”.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-4 text-muted-foreground text-sm">
        <span>
          {selected.size > 0
            ? `${selected.size} of ${orders.length} selected`
            : `${rows.length} orders`}
        </span>
        <div className="flex items-center gap-3">
          <span className="tabular-nums">
            Page {current + 1} of {pages}
          </span>
          <div className="flex gap-1.5">
            <Button
              size="icon-sm"
              aria-label="Previous page"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              size="icon-sm"
              aria-label="Next page"
              disabled={current >= pages - 1}
              onClick={() => setPage(current + 1)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
