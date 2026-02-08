import { create } from "zustand";
import { INITIAL_TARGETS } from "@/constants";
import type { ProductionUnit } from "@/enums";

export interface ProductionTarget {
  id: string;
  itemId: string;
  currentUnit: ProductionUnit;
  values: Record<ProductionUnit, number>;
}

interface ProductionState {
  // states
  targets: ProductionTarget[];
  // Actions
  addTarget: (itemId: string) => void;
  changeTarget: (id: string, itemId: string) => void;
  removeTarget: (id: string) => void;
  removeAllTargets: () => void;
  getTarget: (id: string) => ProductionTarget | undefined;
}

export const useProductionStore = create<ProductionState>((set, get) => ({
  targets: INITIAL_TARGETS,

  addTarget: (itemId) =>
    set((state) => ({
      targets: [
        ...state.targets,
        { ...INITIAL_TARGETS[0], id: crypto.randomUUID(), itemId },
      ],
    })),

  changeTarget: (id, itemId) =>
    set((state) => ({
      targets: state.targets.map((target) =>
        target.id === id ? { ...target, itemId } : target
      ),
    })),

  removeTarget: (id) =>
    set((state) => ({
      targets: state.targets.filter((target) => target.id !== id),
    })),

  removeAllTargets: () => set({ targets: [] }),

  getTarget: (id) => get().targets.find((target) => target.id === id),
}));