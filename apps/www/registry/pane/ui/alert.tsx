import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 px-4 py-3.5 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "text-foreground",
        destructive:
          "text-red-600 *:data-[slot=alert-description]:text-red-600/90 dark:text-red-400 dark:*:data-[slot=alert-description]:text-red-400/90",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <Pane
      data-slot="alert"
      role="alert"
      variant="blur"
      radius={18}
      className={cn(alertVariants({ variant }), className)}
      {...(props as React.ComponentProps<typeof Pane>)}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
