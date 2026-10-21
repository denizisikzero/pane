"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogOverlay />
      {/* centered by flexbox rather than a -50% translate: a transformed
          ancestor is a containing block for the glass inside it, and the
          backdrop it samples ends up offset from where the pane is drawn */}
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "pointer-events-auto w-full max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
          {...props}
        >
          {/* the dense overlay material: a dialog is read, not seen through */}
          <Pane
            nested={false}
            variant="blur"
            radius={28}
            className="grid gap-5 p-6 [--pane-blur-blur:var(--pane-blur-overlay)] [--pane-tint-blur:var(--pane-tint-overlay)]"
          >
            {children}
            {showCloseButton ? (
              <Pane
                interactive
                radius={999}
                className="absolute top-4 right-4 inline-flex has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50"
              >
                <DialogPrimitive.Close className="flex size-8 items-center justify-center bg-transparent text-muted-foreground outline-none transition-colors hover:text-foreground disabled:pointer-events-none">
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </Pane>
            ) : null}
          </Pane>
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
