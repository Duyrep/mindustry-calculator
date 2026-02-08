import { useGameData } from "@/context/GameData";

export default function getAllGroupsOfItems() {
  const { getGameData } = useGameData();

  return getGameData().items.reduce<string[]>((acc, item) => {
    if (!acc.includes(item.group)) {
      acc.push(item.group);
    }
    return acc;
  }, []);
}
