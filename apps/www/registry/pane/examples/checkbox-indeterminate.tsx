"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const files = ["Invoice.pdf", "Contract.pdf", "Photos.zip"];

export default function CheckboxIndeterminate() {
  const [selected, setSelected] = React.useState(["Invoice.pdf"]);
  const all = selected.length === files.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox
          id="checkbox-all"
          checked={all ? true : selected.length ? "indeterminate" : false}
          onCheckedChange={() => setSelected(all ? [] : files)}
        />
        <label htmlFor="checkbox-all" className="text-sm font-medium">
          Select all
        </label>
      </div>
      {files.map((file) => (
        <div key={file} className="ml-8 flex items-center gap-3">
          <Checkbox
            id={`checkbox-${file}`}
            checked={selected.includes(file)}
            onCheckedChange={(checked) =>
              setSelected((prev) =>
                checked ? [...prev, file] : prev.filter((f) => f !== file),
              )
            }
          />
          <label htmlFor={`checkbox-${file}`} className="text-sm">
            {file}
          </label>
        </div>
      ))}
    </div>
  );
}
