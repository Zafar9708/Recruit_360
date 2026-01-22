import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";
import { navigationMenuTriggerStyle } from "./navigation-menu.styles";

function NavigationMenuTrigger({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="ml-1 h-3 w-3 transition group-data-[state=open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  );
}

export { NavigationMenuTrigger };
