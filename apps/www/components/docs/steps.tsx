import type { ReactNode } from "react";
import { Pane } from "@/components/ui/pane";

/** Numbered steps joined by a rail; each title is an h2 so the TOC lists it. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="flex flex-col">{children}</ol>;
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="group/step relative flex gap-5 pb-10 last:pb-0">
      {/* the rail runs from under this badge to the next one */}
      <span
        aria-hidden="true"
        className="absolute top-9 bottom-1 left-[15px] w-px bg-foreground/10 group-last/step:hidden"
      />
      <Pane
        radius={999}
        className="flex size-[31px] shrink-0 items-center justify-center font-medium text-sm"
      >
        {number}
      </Pane>
      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-0.5">
        <h2 className="font-semibold text-lg">{title}</h2>
        {children}
      </div>
    </li>
  );
}
