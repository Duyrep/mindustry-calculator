"use client";

import { SideBarProvider } from "@/context";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={300}>
      <SideBarProvider>{children}</SideBarProvider>
    </TooltipProvider>
  );
}
