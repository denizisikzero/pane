"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuCheckboxes() {
  const [columns, setColumns] = React.useState({
    status: true,
    owner: true,
    updated: false,
  });
  const toggle = (key: keyof typeof columns) => (checked: boolean) =>
    setColumns((prev) => ({ ...prev, [key]: checked }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Show columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={columns.status}
          onCheckedChange={toggle("status")}
        >
          Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.owner}
          onCheckedChange={toggle("owner")}
        >
          Owner
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={columns.updated}
          onCheckedChange={toggle("updated")}
        >
          Last updated
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
