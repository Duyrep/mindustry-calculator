import { getAllItems } from "@/game";
import { create } from "zustand";
import { useProductionStore } from "./Production";
import { INITIAL_SETTINGS } from "@/constants";

export interface GameSettings {
  items: Record<string, string>;
  belts: Record<string, string>;
  beacons: Record<string, string | null>;
  affinitiesBoosts: Record<string, Record<string, string | null>>;
}

interface GameSettingsState {
  // States
  settings: GameSettings;
  // Action
  setItemProducer: (itemId: string, buildingId: string) => void;
  setItemBelt: (itemId: string, beltId: string) => void;
  setItemProducerAffinity: (
    itemId: string,
    buildingId: string,
    affinityId: string,
  ) => void;
  reset: () => void;
}

export const useGameSettingsStore = create<GameSettingsState>((set) => ({
  settings: INITIAL_SETTINGS,

  setItemProducer: (itemId: string, buildingId: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        items: { ...state.settings.items, [itemId]: buildingId },
      },
    }));
    useProductionStore.getState().refreshValues();
  },

  setItemBelt: (itemId: string, beltId: string) =>
    set((state) => ({
      settings: {
        ...state.settings,
        belts: { ...state.settings.belts, [itemId]: beltId },
      },
    })),

  setItemProducerAffinity: (
    itemId: string,
    buildingId: string,
    affinityId: string,
  ) => {
    set((state) => ({
      settings: {
        ...state.settings,
        affinitiesBoosts: {
          ...state.settings.affinitiesBoosts,
          [itemId]: {
            ...state.settings.affinitiesBoosts[itemId],
            [buildingId]: affinityId,
          },
        },
      },
    }));
    useProductionStore.getState().refreshValues();
  },

  reset: () =>
    set(() => ({
      settings: {
        items: Object.fromEntries(
          getAllItems().map((item) => [item, item.producedBy[0]]),
        ),
        belts: {},
        beacons: {},
        affinitiesBoosts: {},
      },
    })),
}));
