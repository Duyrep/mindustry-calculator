"use client";

import { getDefaultSettings } from "@/utils";
import { calculateItemsPerSecond } from "@/utils/calculate";
import { createContext, useState } from "react";

export const ObjectiveContext = createContext(
  {} as {
    objectiveState: [string, React.Dispatch<React.SetStateAction<string>>];
    productsPerSecState: [number, React.Dispatch<React.SetStateAction<number>>];
  }
);

export function ObjectiveContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [objective, setObjective] = useState("silicon");
  const [productsPerSec, setProductsPerSec] = useState(calculateItemsPerSecond(objective, 1, getDefaultSettings()));
  
  return (
    <ObjectiveContext
      value={{
        objectiveState: [objective, setObjective],
        productsPerSecState: [productsPerSec, setProductsPerSec],
      }}
    >
      {children}
    </ObjectiveContext>
  );
}
