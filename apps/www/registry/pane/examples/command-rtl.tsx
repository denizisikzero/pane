import { CalendarIcon, SettingsIcon, SmileIcon, UserIcon } from "lucide-react";
import { Direction } from "radix-ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-80 max-w-full">
        <Command>
          <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
          <CommandList>
            <CommandEmpty>لا توجد نتائج.</CommandEmpty>
            <CommandGroup heading="اقتراحات">
              <CommandItem>
                <CalendarIcon />
                <span>التقويم</span>
              </CommandItem>
              <CommandItem>
                <SmileIcon />
                <span>البحث عن رمز تعبيري</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="الإعدادات">
              <CommandItem>
                <UserIcon />
                <span>الملف الشخصي</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <span>الإعدادات</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </Direction.Provider>
  );
}
