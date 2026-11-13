import { Direction } from "radix-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function NavigationMenuRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="flex min-h-72 items-start">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>البداية</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 gap-1">
                  <li>
                    <NavigationMenuLink href="/docs">
                      <div className="font-medium">مقدمة</div>
                      <p className="text-muted-foreground">
                        ما هو Pane ولماذا هو زجاج.
                      </p>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/installation">
                      <div className="font-medium">التثبيت</div>
                      <p className="text-muted-foreground">
                        أضف أول مكوّن عبر shadcn CLI.
                      </p>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>المكونات</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-60 grid-cols-2 gap-1">
                  <li>
                    <NavigationMenuLink href="/docs/components/button">
                      زر
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/components/dialog">
                      نافذة
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </Direction.Provider>
  );
}
