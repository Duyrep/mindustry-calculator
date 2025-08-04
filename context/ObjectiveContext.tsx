"use client";

import { getDefaultSettings } from "@/utils";
import { calculateItemsPerSecond } from "@/utils/calculate";
import { createContext, useState } from "react";

export const ObjectiveContext = createContext(
  {} as {
    objectiveState: [string, React.Dispatch<React.SetStateAction<string>>];
    productsPerSecState: [number, React.Dispatch<React.SetStateAction<number>>];
    modeState: [string, React.Dispatch<React.SetStateAction<string>>];
  }
);

export default function ObjectiveContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [objective, setObjective] = useState("surge-alloy");
  const [mode, setMode] = useState<string>("building");
  const [productsPerSec, setProductsPerSec] = useState(
    calculateItemsPerSecond(objective, 1, getDefaultSettings())
  );

  return (
    <ObjectiveContext
      value={{
        modeState: [mode, setMode],
        objectiveState: [objective, setObjective],
        productsPerSecState: [productsPerSec, setProductsPerSec],
      }}
    >
      {children}
    </ObjectiveContext>
  );
}
