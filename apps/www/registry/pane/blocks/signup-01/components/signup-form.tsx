"use client";

import { FingerprintIcon, KeyRoundIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** A rough 0-4 score: length, mixed case, digits, symbols. */
function strength(password: string) {
  if (!password) return 0;
  let score = password.length >= 10 ? 1 : 0;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"];

export function SignupForm() {
  const id = React.useId();
  const [password, setPassword] = React.useState("");
  const score = strength(password);

  return (
    // the dense material Dialog uses: a form is read, not seen through
    <Card
      variant="thick"
      radius={28}
      className="[--pane-blur-thick:var(--pane-blur-overlay)] [--pane-tint-thick:var(--pane-tint-overlay)]"
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>Free for 14 days. No card needed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <Button type="button">
            <FingerprintIcon />
            Passkey
          </Button>
          <Button type="button">
            <KeyRoundIcon />
            SSO
          </Button>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <span className="h-px flex-1 bg-foreground/10" />
          or with email
          <span className="h-px flex-1 bg-foreground/10" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-first`} className="font-medium text-sm">
                First name
              </label>
              <Input id={`${id}-first`} autoComplete="given-name" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-last`} className="font-medium text-sm">
                Last name
              </label>
              <Input id={`${id}-last`} autoComplete="family-name" required />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-email`} className="font-medium text-sm">
              Work email
            </label>
            <Input
              id={`${id}-email`}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-password`} className="font-medium text-sm">
              Password
            </label>
            <Input
              id={`${id}-password`}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {/* only once there is something to rate: an empty meter reads
                as a stray line under the field */}
            {password ? (
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="grid flex-1 grid-cols-4 gap-1.5"
                >
                  {[1, 2, 3, 4].map((step) => (
                    <span
                      key={step}
                      className={cn(
                        "h-1 rounded-full transition-colors",
                        step <= score
                          ? "bg-(--pane-accent)"
                          : "bg-foreground/10",
                      )}
                    />
                  ))}
                </div>
                <span
                  aria-live="polite"
                  className="w-16 text-right text-muted-foreground text-xs"
                >
                  <span className="sr-only">Password strength: </span>
                  {strengthLabel[score]}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`${id}-terms`} required />
            <label
              htmlFor={`${id}-terms`}
              className="text-muted-foreground text-sm leading-snug"
            >
              I agree to the{" "}
              <a href="/terms" className="text-foreground underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-foreground underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <div className="flex flex-col">
            <Button type="submit" variant="prominent" size="lg">
              Create account
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-muted-foreground text-sm">
        Already have an account?&nbsp;
        <a
          href="/login"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign in
        </a>
      </CardFooter>
    </Card>
  );
}
