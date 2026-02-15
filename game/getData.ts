import { GameMode } from "@/enums";
import serpuloData from "@/public/data/vanilla-serpulo-v8.json";
import type { GameDataType } from "@/types";

export default function getData(mode: GameMode): GameDataType | undefined {
  if (mode === GameMode.Serpulo) {
    return serpuloData;
  } else {
  }
}
