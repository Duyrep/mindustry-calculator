"use client";

import { createContext, useContext, useState } from "react";
import { GameMode } from "@/enums";
import { getData } from "@/game";
import type { GameDataType } from "@/types";

const GameDataContext = createContext<
  | {
      mode: GameMode;
      setMode: (m: GameMode) => void;
      getGameData: () => GameDataType;
    }
  | undefined
>(undefined);

export function GameDataProvider({ children }: { children?: React.ReactNode }) {
  const [mode, setMode] = useState(GameMode.Serpulo);

  const getGameData = () => {
    return getData(mode)
  }

  return (
    <GameDataContext.Provider value={{ mode, setMode, getGameData }}>
      {children}
    </GameDataContext.Provider>
  );
}

export function useGameData() {
  const context = useContext(GameDataContext);
  if (!context) throw new Error("useGameData must be used within GameDataProvider");
  return context;
}
