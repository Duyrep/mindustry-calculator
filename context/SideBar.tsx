"use client";

import { createContext, useContext, useState } from "react";

const SideBarContext = createContext(
  {} as {
    isOpen: boolean;
    isCollapsed: boolean;
    setIsOpen: (open: boolean) => void;
    toggleSideBar: () => void;
    toggleCollapse: () => void;
  },
);

export function SideBarProvider({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <SideBarContext.Provider
      value={{ isOpen, isCollapsed, setIsOpen, toggleSideBar, toggleCollapse }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBar() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("SideBarContext must be used within SideBarProvider");
  }
  return context;
}
