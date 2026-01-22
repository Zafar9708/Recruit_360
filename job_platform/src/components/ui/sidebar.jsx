"use client";

import { PanelLeftIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";
import { useSidebar } from "./sidebar-context";

function Sidebar({ children, className }) {
  return (
    <aside className={cn("bg-sidebar h-full", className)}>
      {children}
    </aside>
  );
}

function SidebarTrigger({ className }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={toggleSidebar}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export { Sidebar, SidebarTrigger };
