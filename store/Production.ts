import { create } from "zustand";
import { INITIAL_TARGETS } from "@/constants";
import { ProductionUnit } from "@/enums";
import { calculateBuildings, calculateItemsPerSecond } from "@/core/calculate";
import { useGameSettingsStore } from "./GameSettings";

export interface ProductionTarget {
  id: string;
  itemId: string;
  currentUnit: ProductionUnit;
  values: Record<ProductionUnit, number>;
}

interface ProductionState {
  // states
  ignores: string[];
  targets: ProductionTarget[];
  // Actions
  addTarget: (itemId: string) => void;
  changeTarget: (id: string, itemId: string) => void;
  changeUnit: (id: string, unit: ProductionUnit) => void;
  changeValue: (id: string, value: number) => void;
  refreshValues: () => void;
  removeTarget: (id: string) => void;
  removeAllTargets: () => void;

  toggleIgnore: (itemId: string) => void;
  setIgnores: (itemIds: string[]) => void;
  clearIgnores: () => void;
}

export const useProductionStore = create<ProductionState>((set, get) => ({
  ignores: [],
  targets: INITIAL_TARGETS,

  addTarget: (itemId) => {
    set((state) => ({
      targets: [
        ...state.targets,
        { ...INITIAL_TARGETS[0], id: crypto.randomUUID(), itemId },
      ],
    }));
    get().refreshValues();
  },

  changeTarget: (id, itemId) => {
    set((state) => ({
      targets: state.targets.map((target) =>
        target.id === id ? { ...target, itemId } : target,
      ),
    }));
    get().refreshValues();
  },

  changeUnit: (id, currentUnit) =>
    set((state) => ({
      targets: state.targets.map((target) =>
        target.id === id ? { ...target, currentUnit } : target,
      ),
    })),

  changeValue: (id, value) => {
    const { settings } = useGameSettingsStore.getState();
    // const customPeriod = settings.customPeriod || 1;
    const customPeriod = 1;

    set((state) => ({
      targets: state.targets.map((target) => {
        if (target.id !== id) return target;

        let ips = 0;
        const currentUnit = target.currentUnit;

        if (currentUnit === ProductionUnit.PerSec) {
          ips = value;
        } else if (currentUnit === ProductionUnit.PerMin) {
          ips = value / 60;
        } else if (currentUnit === ProductionUnit.PerHour) {
          ips = value / 3600;
        } else if (currentUnit === ProductionUnit.Custom) {
          ips = value / customPeriod;
        } else if (currentUnit === ProductionUnit.Buildings) {
          ips = calculateItemsPerSecond(target.itemId, value, settings);
        }

        return {
          ...target,
          values: {
            ...target.values,
            [ProductionUnit.PerSec]: ips,
            [ProductionUnit.PerMin]: ips * 60,
            [ProductionUnit.PerHour]: ips * 3600,
            [ProductionUnit.Custom]: ips * customPeriod,
            [ProductionUnit.Buildings]:
              currentUnit === ProductionUnit.Buildings
                ? value
                : calculateBuildings(target.itemId, ips, settings),
            [currentUnit]: value,
          },
        };
      }),
    }));
  },

  refreshValues: () => {
    const { settings } = useGameSettingsStore.getState();
    // const customPeriod = settings.customPeriod || 1;
    const customPeriod = 1;

    set((state) => ({
      targets: state.targets.map((target) => {
        const currentBuildings = target.values[ProductionUnit.Buildings];

        const newIPS = calculateItemsPerSecond(
          target.itemId,
          currentBuildings,
          settings,
        );

        return {
          ...target,
          values: {
            ...target.values,
            [ProductionUnit.PerSec]: newIPS,
            [ProductionUnit.PerMin]: newIPS * 60,
            [ProductionUnit.PerHour]: newIPS * 3600,
            [ProductionUnit.Custom]: newIPS * customPeriod,
            [ProductionUnit.Buildings]: currentBuildings,
          },
        };
      }),
    }));
  },

  removeTarget: (id) =>
    set((state) => ({
      targets: state.targets.filter((target) => target.id !== id),
    })),

  removeAllTargets: () => set({ targets: [] }),

  toggleIgnore: (itemId) => {
    set((state) => ({
      ignores: state.ignores.includes(itemId)
        ? state.ignores.filter((id) => id !== itemId)
        : [...state.ignores, itemId],
    }));
  },

  setIgnores: (itemIds) => set({ ignores: itemIds }),

  clearIgnores: () => set({ ignores: [] }),
}));

export const useTarget = (id: string) =>
  useProductionStore((state) => state.targets.find((t) => t.id === id));

export const useTargetCurrentUnit = (id: string) =>
  useProductionStore(
    (state) => state.targets.find((t) => t.id === id)?.currentUnit,
  );

export const useTargetValue = (id: string) => {
  const currentUnit = useTargetCurrentUnit(id);
  return useProductionStore((state) =>
    currentUnit !== undefined
      ? state.targets.find((t) => t.id === id)?.values[currentUnit]
      : undefined,
  );
};

export const useIsIgnored = (itemId: string) =>
  useProductionStore((state) => state.ignores.includes(itemId));
