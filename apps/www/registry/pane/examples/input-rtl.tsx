import { Direction } from "radix-ui";
import { Input } from "@/components/ui/input";

export default function InputRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex w-full max-w-sm flex-col gap-2">
        <label htmlFor="input-rtl-email" className="font-medium text-sm">
          البريد الإلكتروني
        </label>
        <Input
          id="input-rtl-email"
          type="email"
          placeholder="you@example.com"
        />
        <p className="text-muted-foreground text-xs">
          سنستخدمه فقط لإرسال الإيصالات.
        </p>
      </div>
    </Direction.Provider>
  );
}
