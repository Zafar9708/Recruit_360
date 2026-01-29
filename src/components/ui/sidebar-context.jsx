"use client";

import * as React from "react";
import { useIsMobile } from "./use-mobile";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

function SidebarProvider({ children, defaultOpen = true }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((o) => !o);
    } else {
      setOpen((o) => !o);
    }
  }, [isMobile]);

  const value = React.useMemo(
    () => ({
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      state: open ? "expanded" : "collapsed",
    }),
    [open, openMobile, isMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider, useSidebar };
