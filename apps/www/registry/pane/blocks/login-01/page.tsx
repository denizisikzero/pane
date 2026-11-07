import { Card } from "@/components/ui/card";
import { Pane } from "@/components/ui/pane";
import { SignInForm } from "@/registry/pane/blocks/login-01/components/sign-in-form";

export default function Page() {
  return (
    <div className="grid min-h-svh gap-4 p-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <a href="/" className="flex items-center gap-2 p-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-[calc(10px*var(--pane-radius-scale,1))] bg-foreground text-background text-sm">
            U
          </span>
          Uniform Interface
        </a>
        <div className="flex flex-1 items-center justify-center">
          {/* the dense material Dialog uses: a form is read, not seen through */}
          <Card
            variant="thick"
            radius={28}
            className="w-full max-w-sm px-8 py-8 [--pane-blur-thick:var(--pane-blur-overlay)] [--pane-tint-thick:var(--pane-tint-overlay)]"
          >
            <SignInForm />
          </Card>
        </div>
      </div>
      {/* clear glass over whatever is behind the page: it shows the backdrop
          instead of covering it with a photo */}
      <Pane
        radius={32}
        className="relative hidden flex-col justify-end gap-6 p-10 lg:flex"
      >
        <blockquote className="flex max-w-md flex-col gap-4">
          <p className="font-medium text-2xl leading-snug tracking-tight">
            “We moved billing for 2,000 customers in a weekend. Uniform
            Interface was the one part of the stack nobody had to think about.”
          </p>
          <footer className="text-muted-foreground text-sm">
            Olivia Martin · Head of Finance, Northwind
          </footer>
        </blockquote>
      </Pane>
    </div>
  );
}
