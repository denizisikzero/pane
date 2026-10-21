import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavigationMenuDemo() {
  return (
    // room below the triggers, so an open panel isn't cut off by the preview
    <div className="flex min-h-72 items-start">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1">
                <li>
                  <NavigationMenuLink href="/docs">
                    <div className="font-medium">Introduction</div>
                    <p className="text-muted-foreground">
                      What Pane is and what makes the material glass.
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs/installation">
                    <div className="font-medium">Installation</div>
                    <p className="text-muted-foreground">
                      Add your first component with the shadcn CLI.
                    </p>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs/theming">
                    <div className="font-medium">Theming</div>
                    <p className="text-muted-foreground">
                      Tune tint, blur, refraction and springs.
                    </p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-60 grid-cols-2 gap-1">
                <li>
                  <NavigationMenuLink href="/docs/components/button">
                    Button
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs/components/dialog">
                    Dialog
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs/components/select">
                    Select
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/docs/components/slider">
                    Slider
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/docs/changelog"
            >
              Changelog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
