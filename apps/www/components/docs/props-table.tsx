import { Pane } from "@/components/ui/pane";
import type { PropRow } from "@/lib/components-meta";

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <Pane radius={20} className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--pane-border-default)] text-left">
            <th className="px-4 py-3 font-medium text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-3 font-medium text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-3 font-medium text-muted-foreground">
              Default
            </th>
            <th className="px-4 py-3 font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-[var(--pane-border-default)] last:border-0"
            >
              <td className="px-4 py-3 font-mono text-xs">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Pane>
  );
}
