import { useGameDataStore } from "@/store";
import { Item } from "@/models";

export default function getItemById(id: string) {
  const { getGameData } = useGameDataStore.getState();
  const d = getGameData()?.items.find((v) => v.id === id);
  return new Item({
    id: d?.id ?? "oh no",
    name: d?.name ?? "Oh no",
    group: d?.group ?? "ohno",
    producedBy: d?.producedBy ?? [],
    image: d?.image ?? { row: 0, col: 0 },
  });
}
