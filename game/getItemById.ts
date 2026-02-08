import { useGameData } from "@/context";

export default function getItemById(id: string) {
  const { getGameData } = useGameData();

  return getGameData().items.find((item) => item.id === id);
}
