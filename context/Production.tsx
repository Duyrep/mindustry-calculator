"use client";

import { createContext, useContext, useState } from "react";
import { INITIAL_TARGETS } from "@/constants";
import type { ProductionUnit } from "@/enums";

export interface ProductionTarget {
  id: string;
  itemId: string;
  currentUnit: ProductionUnit;
  values: Record<ProductionUnit, number>;
}

const ProductionContext = createContext(
  {} as {
    targets: ProductionTarget[];
    addTarget: (itemId: string) => void;
    changeTarget: (id: string, itemId: string) => void;
    removeTarget: (id: string) => void;
    removeAllTargets: () => void;
    getTarget: (id: string) => ProductionTarget | undefined;
  },
);

export function ProductionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  // states
  const [targets, setTargets] = useState<ProductionTarget[]>(INITIAL_TARGETS);

  // addTarget: (id: string, itemId: string) => void
  const addTarget = (itemId: string) =>
    setTargets((prev) => [
      ...prev,
      { ...INITIAL_TARGETS[0], id: crypto.randomUUID(), itemId },
    ]);

  // changeTarget: (id: string, itemId: string) => void
  const changeTarget = (id: string, itemId: string) =>
    setTargets((prev) =>
      prev.map((target) => (target.id === id ? { ...target, itemId } : target)),
    );

  // removeTarget: (id: string) => void
  const removeTarget = (id: string) =>
    setTargets((prev) => prev.filter((target) => target.id !== id));

  // removeAllTargets: () => void
  const removeAllTargets = () => setTargets([]);

  // getTarget: (id: string) => ProductionTarget | undefined
  const getTarget = (id: string) => targets.find((target) => target.id === id);

  // return
  return (
    <ProductionContext.Provider
      value={{
        targets,
        addTarget,
        changeTarget,
        removeTarget,
        getTarget,
        removeAllTargets,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  const context = useContext(ProductionContext);
  if (!context) {
    throw new Error("useProduction must be used within ProductionContext");
  }
  return context;
}
