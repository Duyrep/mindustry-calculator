import { useGameDataStore } from "@/store";

export default function getAllItems() {
  const { getGameData } = useGameDataStore.getState();
  return getGameData()?.items ?? []
}
