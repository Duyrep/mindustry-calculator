import { useGameDataStore } from "@/store";
import { Building } from "@/models";

export default function getBuildingById(id: string) {
  const { getGameData } = useGameDataStore.getState();
  const d = getGameData()?.buildings.find((v) => v.id === id);
  return new Building({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    image: d?.image ?? { row: 0, col: 0 },
    power: d?.power,
    requiredTiles: d?.requiredTiles,
    optionalEnhancements: d?.optionalEnhancements,
  });
}
