import { Tile } from "@/models";
import { useGameDataStore } from "@/store";

export default function getTileById(id: string) {
  const { getGameData } = useGameDataStore.getState();
  const d = getGameData()?.tiles.find((v) => v.id === id);
  return new Tile({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    image: d?.image ?? { row: 0, col: 0 },
  });
}