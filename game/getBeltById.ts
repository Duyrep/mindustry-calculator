import Belt from "@/models/Belt";
import { useGameDataStore } from "@/store";

export default function getBeltById(id: string) {
  const { getGameData } = useGameDataStore.getState();
  const d = getGameData()?.belts.find((v) => v.id === id);
  return new Belt({
    id: d?.id ?? "ohno",
    name: d?.name ?? "Oh no",
    speed: d?.speed ?? NaN,
    image: d?.image ?? { row: 0, col: 0 },
    transportType: d?.transportType ?? "ohno"
  });
}