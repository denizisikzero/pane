"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import type * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useGlassSupport } from "@/hooks/use-glass-support";
import { cn } from "@/lib/utils";

/**
 * Sonner draws its own toasts, so the glass comes from the same tokens as a
 * Pane rather than from the component: the dense overlay material Dialog and
 * Sheet use, since a toast is read rather than seen through.
 */
/**
 * Action and cancel buttons as glass pills, like a Button sitting on a pane:
 * the toast is glass already, so they take the flat nested tint plus the rim
 * and shadow. Sonner renders them itself, hence tokens instead of a Pane —
 * and `!` to beat its default button styles.
 */
const glassButton =
  "h-7! rounded-full! border-[length:var(--pane-border-width)]! border-[var(--pane-border-default)]! bg-[var(--pane-nested-default)]! px-3! font-medium! text-[color:var(--pane-fg)]! text-xs! shadow-[0_1px_1px_0_var(--pane-shadow)]! transition-opacity hover:opacity-80";

const Toaster = ({ toastOptions, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const quality = useGlassSupport();
  const backdropFilter =
    quality === "none"
      ? undefined
      : "blur(var(--pane-blur-overlay)) saturate(var(--pane-saturation))";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--pane-tint-overlay)",
          "--normal-text": "var(--pane-fg)",
          "--normal-border": "var(--pane-border-blur)",
          "--border-radius": "18px",
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          actionButton: cn(glassButton, toastOptions?.classNames?.actionButton),
          cancelButton: cn(
            glassButton,
            "text-muted-foreground!",
            toastOptions?.classNames?.cancelButton,
          ),
        },
        style: {
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow:
            "0 1px 1px 0 var(--pane-shadow), 0 16px 40px -20px var(--pane-shadow)",
          ...toastOptions?.style,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
