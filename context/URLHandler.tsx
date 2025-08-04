"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";
import { ObjectiveContext, SettingsContext } from ".";
import { calculateBuildings } from "@/utils/calculate";

export const URLHandlerContext = createContext({});

export default function URLHandlerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [objective, setObjective] = useContext(ObjectiveContext).objectiveState;
  const [productsPerSec, setProductsPerSec] = useContext(ObjectiveContext).productsPerSecState;
  const [mode] = useContext(ObjectiveContext).modeState;
  const [settings] = useContext(SettingsContext).settingsState;

  useEffect(() => {
    history.pushState(
      {},
      "",
      generateURL(
        objective,
        mode,
        mode === "building"
          ? calculateBuildings(objective, productsPerSec, settings)
          : productsPerSec
      )
    );
  }, [settings, objective, productsPerSec, mode]);

  useEffect(() => {

  }, [pathname])

  return (
    <URLHandlerContext.Provider value={{}}>
      {children}
    </URLHandlerContext.Provider>
  );
}

export function generateURL(objective: string, mode: string, value: number) {
  const currentUrl = window.location.pathname;
  return `${currentUrl}?item=${objective}:${mode[0]}:${value}`;
}
