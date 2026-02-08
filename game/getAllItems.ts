import { useGameData } from "@/context/GameData";

export default function getAllItems() {
  const { getGameData } = useGameData();

  return getGameData().items
}
