import { useGameDataStore } from "@/store";

export default function getAllGroupsOfItems() {
  const { getGameData } = useGameDataStore.getState();

  return getGameData()?.items.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.group)) {
      acc.push(item.group);
    }
    return acc;
  }, []) ?? [];
}
