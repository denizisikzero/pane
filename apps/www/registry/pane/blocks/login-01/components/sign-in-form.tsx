"use client";

import { ArrowRightIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const id = React.useId();

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl tracking-tight">Sign in</h1>
        <p className="text-muted-foreground text-sm">
          Pick up where you left off.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="font-medium text-sm">
          Email
        </label>
        <Input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor={`${id}-password`} className="font-medium text-sm">
            Password
          </label>
          <a
            href="/forgot-password"
            className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id={`${id}-password`}
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id={`${id}-remember`} defaultChecked />
        <label htmlFor={`${id}-remember`} className="text-sm">
          Keep me signed in for 30 days
        </label>
      </div>
      <div className="flex flex-col">
        <Button type="submit" variant="prominent" size="lg">
          Sign in
          <ArrowRightIcon />
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">
        New here?{" "}
        <a
          href="/signup"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Create an account
        </a>
      </p>
    </form>
  );
}
