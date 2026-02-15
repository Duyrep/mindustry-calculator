import { useGameDataStore } from "@/store";
import getBeltById from "./getBeltById";

export default function getAllBelts() {
  const { getGameData } = useGameDataStore.getState();
  return getGameData()?.belts.map((belt) => getBeltById(belt.id)) ?? [];
}
