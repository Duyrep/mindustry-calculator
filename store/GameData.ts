import { GameMode } from "@/enums";
import { getData } from "@/game";
import type { GameDataType } from "@/types";
import { create } from "zustand";

interface GameDataState {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  getGameData: () => GameDataType | undefined;
}

export const useGameDataStore = create<GameDataState>((set, get) => ({
  mode: GameMode.Serpulo,
  setMode: (mode) => set({ mode }),
  getGameData: () => getData(get().mode),
}));
